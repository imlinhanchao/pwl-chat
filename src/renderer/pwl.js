import crypto from 'crypto'
import fs from 'fs';
import path from 'path';

let rootPath = process.env.NODE_ENV == 'development' ? 
    path.resolve(__dirname, '..', '..') :
    process.resourcesPath
let config = JSON.parse(fs.readFileSync(path.resolve(rootPath, 'config.json')))
config.domain = 'fishpi.cn'
class PWL {
    constructor(token) {
        if (!token) return;
        this.token = token;
    }

    async login(data) {
        try {
            let md5 = crypto.createHash('md5');
            let rsp = await this.request({
                url: 'api/getKey',
                method: 'post',
                data: {
                    nameOrEmail: data.username,
                    userPassword: md5.update(data.passwd).digest('hex'),
                    mfaCode: data.mfacode
                },
            });

            this.token = rsp.data.Key;

            return rsp.data;            
        } catch (e) {
            return { code: -1, msg: e.message };
        }
    }

    async info(token) {
        try {
            let rsp = await this.request({
                url: `api/user?apiKey=${token}`
            })

            if (rsp.data.code == 0) this.token = token;

            if (rsp.status == 401) return { code: 401, msg: '登录已失效，请重新登录！' };

            return rsp.data
        } catch (e) {
            return { code: -1, msg: e.message };
        }
    }

    async user(username) {
        try {
            let rsp = await this.request({
                url: `user/${username}?apiKey=${this.token}`
            })

            return rsp.data
        } catch (e) {
            return { code: -1, msg: e.message };
        }
    }

    async history(page=1) {
        try {
            let rsp = await this.request({
                url: `chat-room/more?page=${page}&apiKey=${this.token}`
            })

            if (rsp.status == 401) return { code: 401, msg: '登录已失效，请重新登录！' };

            return rsp.data;
        } catch (e) {
            return { code: -1, msg: e.message };
        }
    }

    async atlist(name) {
        let rsp;
        try {
            rsp = await this.request({
                url: `users/names`,
                method: 'post',
                data: {
                    name
                },
            });

            if (rsp.status == 401) return { code: 401, msg: '登录已失效，请重新登录！' };

            return rsp.data;            
        } catch (e) {
            return { code: -1, msg: e.message };
        }
    }

    async revoke(oId) {
        let rsp;
        try {
            rsp = await this.request({
                url: `chat-room/revoke/${oId}`,
                method: 'delete',
                data: {
                    apiKey: this.token
                },
            });

            if (rsp.status == 401) return { code: 401, msg: '登录已失效，请重新登录！' };

            return rsp.data;            
        } catch (e) {
            return { code: -1, msg: e.message };
        }
    }

    async push(msg) {
        let rsp;
        try {
            rsp = await this.request({
                url: `chat-room/send`,
                method: 'post',
                data: {
                    content: msg,
                    apiKey: this.token
                },
            });

            if (rsp.status == 401) return { code: 401, msg: '登录已失效，请重新登录！' };

            return rsp.data;            
        } catch (e) {
            return { code: -1, msg: e.message };
        }
    }

    async raw(oId) {
        let rsp;
        try {
            rsp = await this.request({
                url: `cr/raw/${oId}`,
            })

            return rsp.raw.replace(/<!--.*?-->/g, '')
        } catch (e) {
            return { code: -1, msg: e.message };
        }
    }

    async noticelist(type) {
        if (this.token == '') return;
        let rsp;
        try {
            rsp = await this.request({
                url: `api/getNotifications?apiKey=${this.token}&type=${type}`,
            });

            return rsp.data;
        } catch (e) {
            throw e;
        }
    }

    async makeRead(type) {
        let rsp;
        try {
            rsp = await this.request({
                url: `notifications/make-read/${type}?apiKey=${this.token}`,
            });

            return rsp.data;
        } catch (e) {
            throw e;
        }
    }

    async count() {
        if (this.token == '') return;
        let rsp;
        try {
            rsp = await this.request({
                url: `notifications/unread/count?apiKey=${this.token}`,
            });

            rsp.data.userNotifyStatus = rsp.data.userNotifyStatus != 0;
            return rsp.data;
        } catch (e) {
            throw e;
        }
    }

    async emoji() {
        let rsp;
        try {
            rsp = await this.request({
                url: `api/cloud/get`,
                method: 'post',
                data: {
                    gameId: 'emojis',
                    apiKey: this.token
                },
            });

            if (rsp.status == 401) return { code: 401, msg: '登录已失效，请重新登录！' };

            return JSON.parse(rsp.data.data);            
        } catch (e) {
            return { code: -1, msg: e.message };
        }
    }

    async syncEmoji(data)
    {
        let rsp;
        try {
            rsp = await this.request({
                url: `api/cloud/sync`,
                method: 'post',
                data: {
                    gameId: 'emojis',
                    data: JSON.stringify(data),
                    apiKey: this.token
                },
            });

            if (rsp.status == 401) return { code: 401, msg: '登录已失效，请重新登录！' };

            return rsp.data;            
        } catch (e) {
            return { code: -1, msg: e.message };
        }
    }

    async openRedpacket(oId) {
        let rsp;
        try {
            rsp = await this.request({
                url: `chat-room/red-packet/open`,
                method: 'post',
                data: {
                    oId,
                    apiKey: this.token
                },
            });

            if (rsp.status == 401) return { code: 401, msg: '登录已失效，请重新登录！' };

            return rsp.data;            
        } catch (e) {
            return { code: -1, msg: e.message };
        }
    }

    async upload(files) {
        let data = new FormData();
        files.forEach(f => data.append('file[]', f));

        let rsp;
        try {
            rsp = await this.request({
                url: `upload`,
                method: 'post',
                data,
            });

            if (rsp.status == 401) return { code: 401, msg: '登录已失效，请重新登录！' };

            return rsp.data;            
        } catch (e) {
            return { code: -1, msg: e.message };
        }
    }

    async liveness() {
        if (!this.token) return 0;
        try {
            let rsp = await this.request({
                url: `user/liveness?apiKey=${this.token}`
            })

            if (rsp.status == 401) return { code: 401, msg: '登录已失效，请重新登录！' };

            return rsp.data.liveness;
        } catch (e) {
            return { code: -1, msg: e.message };
        }
    }

    async request(opt) {
        let {
            url,
            method = 'get',
            headers = {},
            data = undefined
        } = opt;

        let body = data instanceof FormData ? data : data && JSON.stringify(data);
            
        let options = {
            method, headers, body,
        };
    
        let rsp;
        try {
            rsp = await fetch(`https://${config.domain}/${url}`, options);
            try{ rsp.data = await rsp.clone().json(); } catch(e) {}
            rsp.raw = await rsp.clone().text();
            return rsp;
        } catch (e) {
            console.error(e);
            if (e.response.status == 401) return e.response;
            throw(e)
        }
    }
}

export default PWL;