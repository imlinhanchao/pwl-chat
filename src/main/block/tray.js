import {
    Menu,
    Tray,
    ipcMain,
    nativeImage
} from 'electron'
import path from 'path'
import info from '../../../package.json'
import music from 'sound-play'

var tray
let create = (app, win) => {
    // tray
    let timer = null, tick = 0, count = 0;
    let icon = path.join(__static, 'icon', 'icon.png')
    let sound = path.join(__dirname, '..', '..', '..', 'audio', 'shake.wav')
    tray = new Tray(icon)
    const contextMenu = Menu.buildFromTemplate([{
            label: 'Developer Tool',
            type: 'normal',
            click: () => {
                win.main.webContents.openDevTools({mode:'detach'})
            }
        },{
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
    tray.on('double-click', () => {
        win.show();
    })
    ipcMain.on('sys-msg', (event, arg) => {
        if (win.isVisable() && (win.isFocused() || win.main.isAlwaysOnTop())) return;

        music.play(sound)
        count ++;
        tray.setToolTip(`摸鱼派聊天室-你有${count}条新消息`)
        win.main.flashFrame(true);
        
        if (timer != null) return;

        timer = setInterval(() => {
            tick += 1
            if (tick % 2 === 0) {
                tray.setImage(icon)
            } else {
                tray.setImage(nativeImage.createEmpty())
            }
        }, 500)
    })
    function clearMsg() {
        if (count <= 0) return;
        tray.setToolTip(info.description)
        tray.setImage(icon)
        clearInterval(timer)
        timer = null
        tick = 0
        count = 0        
    }
    tray.on('click', () => {
        if (count <= 0) return;
        win.show()
    })
    win.main.on('focus', () => {
        clearMsg()
    })
    win.main.on('restore', () => {
        clearMsg()
    })
}

export default {
    create
}