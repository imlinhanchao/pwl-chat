import {
    BrowserWindow,
    session
} from 'electron'


class Windows {
    constructor(app, {
        parent=null, frame=true, resizable=true, transparent=false,
        size={}, skipbar=false, url='', quitEvent, show=false
    }) {
        session.defaultSession.webRequest.onBeforeSendHeaders({
            urls: ['*.pwl.stackoverflow.wiki/*']
          }, (details, cb) => {
            details.requestHeaders['referer'] = 'https://pwl.icu/'
            let data = { requestHeaders: details.requestHeaders }
            cb(data)
        })
        
        this.window = new BrowserWindow({
            parent: parent,
            width: size.width,
            height: size.height,
            minWidth: size.width * .7,
            minHeight: size.height * .7,
            transparent: transparent,
            frame: frame,
            resizable: resizable,
            skipTaskbar: skipbar,
            webPreferences: {
                nodeIntegration: true,
                webSecurity: false
            },
        })

        this.window.setMenu(null);

        this.size = size

        const winURL = process.env.NODE_ENV === 'development' ?
            `http://localhost:9080/#${url}` :
            `file://${__dirname}/index.html#${url}`

        this.window.loadURL(winURL, {
            httpReferrer:"https://pwl.icu/"
        })

        if (process.argv.slice(1).filter(a => a.indexOf('--dev') >= 0).length > 0) {
            this.window.openDevTools()
        }

        this.window.on('closed', (event) => {
            this.window = null;
            quitEvent && quitEvent(event)
        })
    
        this.window.on('enter-html-full-screen', () => {
    
        })
    
        this.window.on('leave-html-full-screen', () => {
    
        })
    
        this.isShow = show

        show ? this.window.show() : this.window.hide()
    }

    get win() {
        return this.window
    }

    show() {
        this.window.show()
    }
    
    hide() {
        this.window.hide()
    }
}

export default Windows