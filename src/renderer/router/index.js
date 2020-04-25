import Vue from 'vue'
import Router from 'vue-router'

const mainContainer = r => require.ensure([], () => r(require('../pages/mainContainer.vue')), 'mainContainer.vue') // 容器

Vue.use(Router)

export default new Router({
    routes: [
        {
            path: '',
            redirect: '/funny/home'
        },
        {
            path: '/funny/home',
            name: 'home',
            component: mainContainer,
            children: [
                // {
                //     path: '/funny/main',
                //     name: 'main',
                //     component: home
                // }
            ]
        },
    ]
})
