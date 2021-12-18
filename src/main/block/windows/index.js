import Win from './window'
let windows = {

}

let _app = null;

let create = (app) => {
    windows.main = new Win(app, {
        quitEvent(event) {
            app.quit()
        },
        show: true,
        frame: false,
        size: { width: 400, height: 600 }
    })

    _app = app
    //windows.main.window.maximize()
    return windows.main.windows;
}

let show = () => {
    windows.main.show()
}

let hide = () => {
    windows.main.hide()
}

let isVisable = () => {
    return windows.main.win.isVisible();
}

let isFocused = () => {
    return windows.main.win.isFocused();
}

let img = (app, url, size) => {
    let imgWin = new Win(app, {
        quitEvent(event) {
            //_app.quit()
            imgWin = null;
            return false;
        },
        show: true,
        frame: false,
        size,
        url
    })

    return imgWin.windows
}

let setting = (app, url, size) => {
    let settingWin = new Win(app, {
        quitEvent(event) {
            //_app.quit()
            settingWin = null;
            return false;
        },
        show: true,
        frame: false,
        size,
        url: '/setting'
    })

    return settingWin.windows
}

export default { 
    create, show, hide, isVisable, isFocused, img, windows, get main () {
        return windows.main.win;
    }
}