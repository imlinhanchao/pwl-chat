import path from 'path'
import fs from 'fs'
import windows from './windows'
import tray from './tray'
import events from './event'

let rootPath = process.env.NODE_ENV == 'development' ? 
    path.resolve(__dirname, '..', '..', '..') :
    process.resourcesPath
let setting;
let create = (app) => {
    if (!fs.existsSync(path.resolve(rootPath, 'config.json'))) {
        fs.writeFileSync(path.resolve(rootPath, 'config.json'), `{
    "domain": "fishpi.cn"
}`)
    }
    let win = windows.create(app)
    function createSetting() {
        let win = windows.setting(app, {
            width: 400, height: 500
        }, () => {
            setting = null;
        })
        return win;
    }
    setting = createSetting();

    tray.create(app, windows, () => (setting || (setting = createSetting())))
    events.create(app, windows, () => (setting || (setting = createSetting())))
    return win;
}

export default {
    create,
    windows
}