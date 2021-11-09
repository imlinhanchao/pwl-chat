import {
    ipcRenderer
} from 'electron'

export default {
    sendipc(event, {
        argv,
        fn
    }) {
        let callback = fn ? parseInt(Math.random() * 10000).toString() : undefined;
        if (fn) ipcRenderer.on(`${event}-callback-${callback}`, fn);
        ipcRenderer.send(event, {
            data: argv,
            callback
        });
    },
    sendipcSync(event, argv) {
        return new Promise((resolve, reject) => {
            try {
                let callback = parseInt(Math.random() * 10000).toString();
                ipcRenderer.on(`${event}-callback-${callback}`, (event, data) => {
                    resolve(data)
                });
                ipcRenderer.send(event, {
                    data: argv,
                    callback
                });
            } catch (error) {
                reject(error);
            }
        })
    }
};