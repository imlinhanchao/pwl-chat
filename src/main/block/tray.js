import {
    Menu,
    Tray
} from 'electron'
import path from 'path'
import info from '../../../package.json'

var tray
let create = (app, win) => {
    // tray
    tray = new Tray(path.join(__static, 'icon', '/icon.png'))
    const contextMenu = Menu.buildFromTemplate([{
            label: 'Show',
            type: 'normal',
            click: () => {
                win.show()
            }
        },
        {
            label: 'Quit',
            type: 'normal',
            click: () => {
                app.quit()
            }
        }
    ])
    tray.setToolTip(info.description)
    tray.setContextMenu(contextMenu)
    tray.on('double-click',()=>{       
        win.show();
    })
}

export default { create }