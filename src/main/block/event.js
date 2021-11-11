import {
    ipcMain,
} from 'electron'
import PWL from '../lib/pwl'
import windows from './windows'

let create = (app, win) => {
    let openfile = null;
    let index = process.argv.indexOf('-f');
    if (index > 0) openfile = process.argv[index + 1]
    let pwl = new PWL();

    ipcMain.on('win-close', (event, arg) => {
        app.quit()
    })

    ipcMain.on('win-min', (event, arg) => {
        win.hide()
    })

    ipcMain.on('win-top', (event, arg) => {
        win.windows.main.win.setAlwaysOnTop(arg, 'screen')
    })

    ipcMain.on('win-opacity', (event, arg) => {
        win.windows.main.win.setOpacity(arg ? .6 : 1)
    })

    ipcMain.on('pwl-token', (event, arg) => {
        pwl = new PWL(arg.data);
    })

    ipcMain.on('pwl-login', async (event, argv) => {
        let data, error;
        try {
            data = await pwl.login(argv.data);
        } catch (err) {
            error = err;
        }
        if(argv.callback) event.sender.send('pwl-login-callback-' + argv.callback, { data, argv: argv.data, error })
    })

    ipcMain.on('pwl-revoke', async (event, argv) => {
        let data, error;
        try {
            data = await pwl.revoke(argv.data);
        } catch (err) {
            error = err;
        }
        if(argv.callback) event.sender.send('pwl-revoke-callback-' + argv.callback, { data, argv: argv.data, error })
    })

    ipcMain.on('pwl-push', async (event, argv) => {
        let data, error;
        try {
            data = await pwl.push(argv.data);
        } catch (err) {
            error = err;
        }
        if(argv.callback) event.sender.send('pwl-push-callback-' + argv.callback, { data, argv: argv.data, error })
    })

    ipcMain.on('pwl-at', async (event, argv) => {
        let data, error;
        try {
            data = await pwl.atlist(argv.data);
        } catch (err) {
            error = err;
        }
        if(argv.callback) event.sender.send('pwl-at-callback-' + argv.callback, { data, argv: argv.data, error })
    })

    ipcMain.on('pwl-info', async (event, argv) => {
        let data, error;
        try {
            data = await pwl.info(argv.data);
        } catch (err) {
            error = err;
        }
        if(argv.callback) event.sender.send('pwl-info-callback-' + argv.callback, { data, argv: argv.data, error })
    })

    ipcMain.on('pwl-history', async (event, argv) => {
        let data, error;
        try {
            data = await pwl.history(argv.data);
        } catch (err) {
            error = err;
        }
        if(argv.callback) event.sender.send('pwl-history-callback-' + argv.callback, { data, argv: argv.data, error })
    })

    ipcMain.on('pwl-img', (event, argv) => {
        try {
            let size = argv.size;
            if (size.width < 400) { size.height = size.height * 400 / size.width; size.width = 400; }
            if (size.width > 800) { size.height = size.height * 800 / size.width; size.width = 800; }
            if (size.height > 600) { size.width = size.width * 600 / size.height; size.height = 600; }
            windows.img(app, `/img/${encodeURIComponent(argv.url)}`, size)
        } catch (err) {
            console.error(err);
        }
    })

}

export default {
    create
}