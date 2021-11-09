import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
    routes: [{
            path: '/',
            name: 'home',
            component: require('@/view/index').default,
            children: [{
                    path: '',
                    meta: {
                        title: '登录'
                    },
                    component: () => import('../view/login')
                },{
                    path: 'chat',
                    meta: {
                        title: '聊天室'
                    },
                    component: () => import('../view/chat')
                }
            ],
        },
        {
            path: '*',
            redirect: '/'
        }
    ]
})