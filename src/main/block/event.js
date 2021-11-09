import {
    ipcMain,
} from 'electron'
import PWL from '../lib/pwl'

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

    ipcMain.on('pwl-push', async (event, argv) => {
        let data, error;
        try {
            data = await pwl.push(argv.data);
        } catch (err) {
            error = err;
        }
        if(argv.callback) event.sender.send('pwl-push-callback-' + argv.callback, { data, argv: argv.data, error })
    })

    ipcMain.on('pwl-info', async (event, argv) => {
        let data, error;
        try {
            data = await pwl.info();
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

  
}

export default {
    create
}