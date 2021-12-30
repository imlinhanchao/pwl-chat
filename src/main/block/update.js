import https from 'https'
import AdmZip from 'adm-zip'
import { spawn } from 'child_process'
import axios from 'axios'
import { rootPath } from 'electron-root-path';

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
  
async function checkUpdate() {
    let rsp = await axios.get('https://gitee.com/api/v5/repos/imlinhanchao/pwl-chat/releases/latest');
    return rsp.data;
}

function updateApp(file, cb) {
    try {
        let unzip = new AdmZip(file);
        let unzipPath = path.resolve(os.tmpdir(), path.basename(file).replace(/\.zip$/, ''));
        unzip.extractAllTo(unzipPath, true);
        cb('done');
        let isWin32 = process.platform == 'win32'
        let updateShell = path.resolve(os.tmpdir(), `pwl-update.${isWin32 ? 'bat' : 'sh'}`);
        let sleep = isWin32 ? 'timeout /T 3 /NOBREAK' : 'sleep 3s';
        let kill = isWin32 ? 'taskkill /im PWL.exe /F' : '';
        let copy = isWin32 ? `xcopy "${unzipPath}" "${rootPath}" /s /e /y` : `mv "${unzipPath}/*" "${rootPath}" -f`
        let lanuch = isWin32 ? `"${path.resolve(rootPath, 'PWL.exe')}"` : `open ${rootPath}`;
        fs.writeFileSync(updateShell, `${isWin32 ? '@echo off' : ''}
echo '更新中...'
${sleep}
${kill}
${copy}
${lanuch}
        `)
    
        spawn(updateShell, { detached: true, windowsHide: true });
        process.exit(0);
    } catch (error) {
        console.error(error);
        cb('fail');        
    }
}

function getDownload(update) {
    let data = update.assets.find(f => f.name == 'update-file.zip')
    if (data) return data;
    switch(process.platform) {
        case 'win32': {
            return update.assets.find(f => f.name.indexOf(`win32-${process.arch == 'x64' ? 'x64' : 'x86'}`))
        }
        case 'darwin': {
            return update.assets.find(f => f.name.indexOf(`darwin`))
        }
    }
}

function updateEvent(event, argv) {
    try
    {
        let data = getDownload(argv.data);
        let savePath = path.resolve(os.tmpdir(), data.name);
        downloadFile(data.url, savePath, (state, pro, currPro, total) => {
            if (state == 'data') {
                if(argv.callback) event.sender.send('update-app-callback-' + argv.callback, { state, pro, currPro, total })
            }
            else if(state == 'finish') {
                if(argv.callback) event.sender.send('update-app-callback-' + argv.callback, { state })
                Update.updateApp(savePath, (state) => {
                    event.sender.send('update-app-callback-' + argv.callback, { state })
                });
            }
        })
    } catch (err) {
        event.sender.send('update-app-callback-' + argv.callback, { state: 'fail' })
        console.error(err)
    }
}

export default {
    checkUpdate,
    updateApp,
    updateEvent
}