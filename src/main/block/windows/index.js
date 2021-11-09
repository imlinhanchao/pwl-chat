import Win from './window'
let windows = {

}

let create = (app) => {
    windows.main = new Win(app, {
        quitEvent(event) {
            app.quit()
        },
        show: true,
        frame: false,
        size: { width: 400, height: 600 }
    })

    //windows.main.window.maximize()
    return windows.main;
}

let show = () => {
    windows.main.show()
}

let hide = () => {
    windows.main.hide()
}

export default { 
    create, show, hide, windows
}