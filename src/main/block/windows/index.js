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
    return windows.main.win;
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
        parent: windows.main.win,
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

    return imgWin.window
}

let setting = (app, size, quit) => {
    let settingWin = new Win(app, {
        quitEvent(event) {
            //_app.quit()
            if(quit) quit();
            return false;
        },
        show: false,
        frame: false,
        size,
        url: '/setting'
    })

    return settingWin.window
}

export default { 
    create, show, hide, isVisable, isFocused, img, setting, windows, get main () {
        return windows.main.win;
    }
}