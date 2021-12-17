import {
    ipcMain, dialog
} from 'electron'
import windows from './windows'
import fs from 'fs'
import path from 'path'
import os from 'os'
import info from '../../../package.json'
import axios from 'axios'
import https from 'https'
import unzip from 'node-unzip-2'
import { spawn } from 'child_process'

fs.unlink(path.resolve(__dirname, '..', '..', '..', 'update.bat'), () => {});

const downloadFile = (url, dest, cb = () =>{}) => {
    // 确保dest路径存在
    const file = fs.createWriteStream(dest)
    const urlImage = url;
    
    https.get(urlImage, (res) => {

      if (res.statusCode == 302)
      {
        downloadFile(res.headers.location, dest, cb)
        return
      }
      else if (res.statusCode !== 200) {
        cb(res.statusCode)
        return
      }
  
      // 进度
      const len = parseInt(res.headers['content-length']) // 文件总长度
      let cur = 0
      const total = (len / 1048576).toFixed(2) // 转为M 1048576 - bytes in  1Megabyte
      res.on('data', function (chunk) {
        let progress;
        if (!isNaN(total)) {
            cur += chunk.length
            progress = (100.0 * cur / len).toFixed(2) // 当前进度
        } else {
            progress = -1;
        }
        const currProgress = (cur / 1048576).toFixed(2) // 当前了多少
        cb('data', progress, currProgress, total)
      })
  
      res.on('end', () => {
        cb('download')
      })
  
      // 超时,结束等
      file.on('finish', () => {
        file.close()
        cb('finish', url)
      }).on('error', (err) => {
        fs.unlink(dest)
        if (cb) cb('error', err.message)
      })
      res.pipe(file)
    })
}
  
function updateApp(file, cb) {
    let asarPath = path.resolve(__dirname, '..', '..', '..', 'app.asar');
    fs.createReadStream(file)
    .pipe(unzip.Parse())
    .on('entry', (entry) => {
        if (entry.path.indexOf('app.asar') < 0) return;
        const writer = fs.createWriteStream(asarPath + '.new')
        entry.pipe(writer);
        writer.on('finish', () => {
            try {
                if(fs.existsSync(asarPath)) fs.unlinkSync(asarPath);
                fs.renameSync(asarPath + '.new', asarPath);
                cb('done');
            } catch (error) {
                fs.writeFileSync(path.resolve(__dirname, '..', '..', '..', 'update.bat'), `@echo off
echo '更新中...'
timeout /T 3 /NOBREAK
taskkill /im PWL.exe /F
copy "${asarPath + '.new'}" "${asarPath}"  /y
if %errorlevel% == 0 (
del "${asarPath + '.new'}" /f
${path.resolve(__dirname, '..', '..', '..', '..', 'PWL.exe')}
)
                `)
                spawn(path.resolve(__dirname, '..', '..', '..', 'update.bat'), { detached: true, windowsHide: true });
                process.exit(0);
            };
        });
    });
}

let create = (app, win) => {
    async function check_update() {
        let rsp = await axios.get('https://gitee.com/api/v5/repos/imlinhanchao/pwl-chat/releases/latest');
        return rsp.data;
    }

    ipcMain.on('win-update', async (event, argv) => {
        let data = await check_update();
        if (data.tag_name == info.version) data = null;
        if(argv.callback) event.sender.send('win-update-callback-' + argv.callback, { data })
    })

    ipcMain.on('win-close', (event, arg) => {
        app.quit()
    })

    ipcMain.on('win-min', (event, arg) => {
        win.hide()
    })

    ipcMain.on('win-top', (event, arg) => {
        win.windows.main.win.setAlwaysOnTop(arg, 'floating')
    })

    ipcMain.on('win-opacity', (event, arg) => {
        win.windows.main.win.setOpacity(arg ? .6 : 1)
    })

    ipcMain.on('pwl-img', (event, argv) => {
        try {
            let size = argv.size;
            if (size.width < 400) { size.height = size.height * 400 / size.width; size.width = 400; }
            if (size.width > 800) { size.height = size.height * 800 / size.width; size.width = 800; }
            if (size.height > 600) { size.width = size.width * 600 / size.height; size.height = 600; }
            if (size.height < 100) size.height += 150;
            windows.img(app, `/img/${encodeURIComponent(argv.url)}`, size)
        } catch (err) {
            console.error(err);
        }
    })

    ipcMain.on('face-upload', (event, argv) => {
        try {
            dialog.showOpenDialog({
                title: '导出表情文件',
                buttonLabel: '保存',
                filters: [
                    { name: '表情文件', extensions: ['txt'] },
                ]
            }, result => {
                let filePath = result;
                if (!filePath) return;
                let data = fs.readFileSync(filePath[0]).toString();
                data = data.split('\n').filter(d => d.startsWith('http'));
                if(argv.callback) event.sender.send('face-upload-callback-' + argv.callback, { data })
            })
        } catch (err) {
            console.error(err)
        }
    })

    ipcMain.on('face-save', (event, argv) => {
        try {
            dialog.showSaveDialog({
                title: '导入表情文件',
                buttonLabel: '保存',
                filters: [
                    { name: '表情文件', extensions: ['txt'] },
                ]
            }, result => {
                let filePath = result;
                if (!filePath) return;
                fs.writeFileSync(filePath, argv);
            })
        } catch (err) {
            console.error(err)
        }
    })

    ipcMain.on('update-app', (event, argv) => {
        try
        {
            let savaPath = path.resolve(os.tmpdir(), argv.data.name);
            downloadFile(argv.data.url, savaPath, (state, pro, currPro, total) => {
                if (state == 'data') {
                    if(argv.callback) event.sender.send('update-app-callback-' + argv.callback, { state, pro, currPro, total })
                }
                else if(state == 'finish') {
                    if(argv.callback) event.sender.send('update-app-callback-' + argv.callback, { state })
                    updateApp(savaPath, (state) => {
                        event.sender.send('update-app-callback-' + argv.callback, { state })
                    });
                }
              })
        } catch (err) {
            console.error(err)
        }
    });
}

export default {
    create
}