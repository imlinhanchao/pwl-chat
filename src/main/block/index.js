import windows from './windows'
import tray from './tray'
import events from './event'

let create = (app) => {
    let win = windows.create(app)
    tray.create(app, windows)
    events.create(app, windows)
    return win;
}

export default {
    create,
    windows
}