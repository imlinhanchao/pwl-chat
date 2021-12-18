import fs from 'fs'
import windows from './windows'
import tray from './tray'
import events from './event'

let rootPath = process.env.NODE_ENV == 'development' ? 
    path.resolve(__dirname, '..', '..', '..') :
    process.resourcesPath

let create = (app) => {
    if (!fs.existsSync(path.resolve(rootPath, 'config.json'))) {
        fs.writeFileSync(path.resolve(rootPath, 'config.json'), `{
    "domain": "pwl.icu"
}`)
    }
    let win = windows.create(app)
    tray.create(app, windows)
    events.create(app, windows)
    return win;
}

export default {
    create,
    windows
}