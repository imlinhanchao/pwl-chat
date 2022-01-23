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
            path: '/img/:imgpath',
            name: 'image',
            component: require('@/view/img').default,
        },
        {
            path: '/setting',
            name: 'setting',
            meta: {
                title: '设置'
            },
            component: require('@/view/setting').default,
        },
        {
            path: '*',
            redirect: '/'
        }
    ]
})