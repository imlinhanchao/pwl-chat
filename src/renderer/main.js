import ipc from './ipc'
import PWL from './pwl'
import Setting from './setting'
import fs from 'fs';
import path from 'path';

import Vue from 'vue'
import axios from 'axios'
import VueWorker from 'vue-worker'

import App from './App'
import router from './router'
import store from './store'

import iView from 'iview'
import 'iview/dist/styles/iview.css'
import './theme/index.css'
import './theme/font-awesome.css'
import './theme/highlight.css'
import { ipcRenderer, Notification } from 'electron';

let rootPath = process.env.NODE_ENV == 'development' ? 
    path.resolve(__dirname, '..', '..') :
    process.resourcesPath
let config = JSON.parse(fs.readFileSync(path.resolve(rootPath, 'config.json')))
config.domain = 'fishpi.cn'

Vue.use(iView)
Vue.use(VueWorker)
Vue.locale = () => {};

if (!process.env.IS_WEB) Vue.use(require('vue-electron'))
Vue.http = Vue.prototype.$http = axios
Vue.config.productionTip = false
Vue.config.devtools = true;

router.beforeEach((to, from, next) => {
  if(!to.meta.notitle) document.title = '摸鱼派 - ' + to.meta.title;
  next();
});

/* eslint-disable no-new */
new Vue({
  components: { App },
  router,
  store,
  template: '<App/>',
  mounted() {
    document.addEventListener('click', (ev) => {
      let img = ev.target;
      if (img.nodeName.toLowerCase() != 'img' || img.className == 'emoji' || img.dataset.action != 'preview') return;
      let size = {
          width: img.naturalWidth,
          height: img.naturalHeight,
      }
      ipcRenderer.send('pwl-img', { url: img.src, size });
    });
  },
  data: {
    host: '',
    token: '',
    pwl: new PWL(),
    setting: new Setting(),
    config,
    ipc,
  },
  methods: {
    sendipc: ipc.sendipc,
    sendipcSync: ipc.sendipcSync,
    makePWL(token) {
      this.pwl = new PWL(token);
    },
    notice(title, body) {
      this.ipc.send('win-notice', { title, body })
    },
    async relogin() {
      let login = {
        username: localStorage.getItem('username'),
        passwd: localStorage.getItem('passwd')
      };
      let rsp = await await this.$root.pwl.login(login);
      if (!rsp) return false;
      if (rsp.code != 0) {
          this.$Message.error(rsp.msg);
          return false;
      }
      localStorage.setItem('token', rsp.Key);
      this.token = rsp.Key;
      return true;
    }
  },
  computed: {
    title() {
        return document.title;
    },
  },
  watch: {
    token(val) {
      this.makePWL(val)
    }
  }
}).$mount('#app')
