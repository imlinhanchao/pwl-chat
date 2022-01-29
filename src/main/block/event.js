import {
    ipcMain, dialog, Notification, shell
} from 'electron'
import windows from './windows'
import fs from 'fs'
import path from 'path'
import info from '../../../package.json'
import Update from './update'

let rootPath = process.env.NODE_ENV == 'development' ? 
    path.resolve(__dirname, '..', '..', '..') :
    process.resourcesPath

let create = (app, win, setting) => {
    ipcMain.on('win-setting-change', (event, argv) => {
        win.windows.main.win.webContents.send('setting-change', argv);
        setting().webContents.send('setting-change', argv);
    })

    ipcMain.on('win-update', async (event, argv) => {
        let data = await Update.checkUpdate();
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
        win.windows.main.win.setOpacity(arg.enable ? arg.value / 100 : 1)
    })

    ipcMain.on('win-setting', (event, arg) => {
        setting.show();
    })

    ipcMain.on('win-notice', (event, arg) => {
        let notice = new Notification(arg)
        notice.on('click', () => {
            if(!arg.url) win.show()
            else shell.openExternal(arg.url)
            if(arg.callback) event.sender.send('win-notice-callback-' + arg.callback)
        })
        notice.show();
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

    ipcMain.on('update-app', Update.updateEvent);
}

export default {
    create
}