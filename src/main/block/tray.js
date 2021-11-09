import {
    Menu,
    Tray
} from 'electron'
import path from 'path'

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
    tray.setToolTip('GPIO Translation Tool')
    tray.setContextMenu(contextMenu)
}

export default { create }