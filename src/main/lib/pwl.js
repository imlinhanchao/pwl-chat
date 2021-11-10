import axios from 'axios';
import SparkMD5 from 'spark-md5'
import http from 'http'
import https from 'https'


class PWL {
    constructor(token) {
        this.axios = axios.create({
            baseURL: 'https://pwl.icu/',
            timeout: 20000,
        })
        this.cookies = {}
        if (!token) return;
        this.token = token;
    }

    async login(data) {
        try {
            let rsp = await this.request({
                url: 'api/getKey',
                method: 'post',
                data: {
                    nameOrEmail: data.username,
                    userPassword: SparkMD5.hash(data.passwd)
                },
            });

            this.token = rsp.data.Key;

            return rsp.data;            
        } catch (e) {
            throw(e)
        }
    }

    async info(token) {
        try {
            let rsp = await this.request({
                url: `api/user?apiKey=${token}`
            })

            if (rsp.data.code == 0) this.token = token;

            if (rsp.status == 401) return { code: '-1', msg: '登录已失效，请重新登录！' };

            return rsp.data
        } catch (e) {
            throw(e)
        }
    }

    async history(page=1) {
        try {
            let rsp = await this.request({
                url: `chat-room/more?page=${page}&apiKey=${this.token}`
            })

            if (rsp.status == 401) return { code: '-1', msg: '登录已失效，请重新登录！' };

            return rsp.data;
        } catch (e) {
            throw(e)
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

            if (rsp.status == 401) return { code: '-1', msg: '登录已失效，请重新登录！' };

            return rsp.data;            
        } catch (e) {
            throw(e)
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

            if (rsp.status == 401) return { code: '-1', msg: '登录已失效，请重新登录！' };

            return rsp.data;            
        } catch (e) {
            throw(e)
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

            if (rsp.status == 401) return { code: '-1', msg: '登录已失效，请重新登录！' };

            return rsp.data;            
        } catch (e) {
            throw(e)
        }
    }

    async request(opt) {
        let {
            url,
            method = 'get',
            headers = {},
            cookies = this.cookies,
            data = null
        } = opt;
    
        headers['User-Agent'] =
            'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/69.0.3497.100 Safari/537.36';
        headers['Referer'] = 'https://pwl.icu/';
    
        if (typeof cookies === 'object') {
            headers['Cookie'] = Object.keys(cookies)
                .map((k) => encodeURIComponent(k) + '=' + encodeURIComponent(cookies[k]))
                .join('; ');
        } else if (typeof cookies === 'string') {
            headers['Cookie'] = cookies;
        }
    
        let options = {
            url, method, headers, data,
            httpAgent: new http.Agent({
                keepAlive: true
            }),
            httpsAgent: new https.Agent({
                keepAlive: true,
                rejectUnauthorized: false,
            }),
        };
    
        let rsp;
        try {
            rsp = await this.axios.request(options);
    
            return rsp;
        } catch (e) {
            if (e.response.status == 401) return e.response;
            console.error(e);
            throw(e)
        }
    }
}

export default PWL;