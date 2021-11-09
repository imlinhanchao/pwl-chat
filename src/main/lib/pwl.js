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
        this.cookies['sym-ce'] = this.token;
    }

    async login(data) {
        try {
            let rsp = await this.request({
                url: 'login',
                method: 'post',
                data: {
                    nameOrEmail: data.username,
                    rememberLogin: true,
                    userPassword: SparkMD5.hash(data.passwd)
                },
            });

            console.log(rsp.data);
            this.token = rsp.data.token;
            this.cookies['sym-ce'] = this.token;

            return rsp.data;            
        } catch (e) {
            throw(e)
        }
    }

    async info() {
        try {
            let rsp = await this.request({
                url: ''
            })
            let mat = rsp.data.match(/currentUserName: '([^']*?)'/);
            let username = mat ? mat[1] : '';
            if (!username) return { code: 0, data: { username } };
            rsp = await this.request({
                url: `user/${username}`
            })
            return rsp.data
        } catch (e) {
            throw(e)
        }
    }

    async history(page=1) {
        try {
            let rsp = await this.request({
                url: `chat-room/more?page=${page}`
            })

            return rsp.data;
        } catch (e) {
            throw(e)
        }
    }

    async push(msg) {
        try {
            let rsp = await this.request({
                url: 'chat-room/send',
                method: 'post',
                data: {
                    content: msg,
                },
            });

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
    
        try {
            let res = await this.axios.request(options);
    
            return res;
        } catch (e) {
            console.error(e);
            throw(e)
        }
    }
}

export default PWL;