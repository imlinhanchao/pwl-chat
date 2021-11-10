import ipc from './ipc'

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
import { ipcRenderer } from 'electron';

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
    token: ''
  },
  methods: {
    sendipc: ipc.sendipc,
    sendipcSync: ipc.sendipcSync
  },
  computed: {
    title() {
        return document.title;
    },
  }
}).$mount('#app')
