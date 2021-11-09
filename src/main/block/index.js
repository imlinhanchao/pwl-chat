import windows from './windows'
import tray from './tray'
import events from './event'

let create = (app) => {
    windows.create(app)
    tray.create(app, windows)
    events.create(app, windows)
}

export default {
    create,
    windows
}