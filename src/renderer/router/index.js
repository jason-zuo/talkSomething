import Vue from 'vue'
import Router from 'vue-router'

const mainContainer = r => require.ensure([], () => r(require('../pages/mainContainer.vue')), 'mainContainer.vue') // 容器
const chooseRoom = r => require.ensure([], () => r(require('../pages/webrtc/chooseRoom.vue')), 'chooseRoom.vue') // 选择房间昵称
const pdf = r => require.ensure([], () => r(require('../pages/file/pdf.vue')), 'pdf.vue') // pdf转换
const practise = r => require.ensure([], () => r(require('../pages/practise/practise.vue')), 'practise.vue')
const list = r => require.ensure([], () => r(require('../pages/list/list.vue')), 'list.vue')
const todoList = r => require.ensure([], () => r(require('../pages/todoList/todoList.vue')), 'todoList.vue')

Vue.use(Router);

export const mainRoute = [
    {
        path: '/funny/home',
        name: 'home',
        leftBar: true,
        icon: 'el-icon-edit',
        component: mainContainer,
        children: [
            {
                path: '/funny/chooseRoom',
                name: 'chooseRoom',
                component: chooseRoom
            }
        ]
    },
    {
        path: '/practise',
        component: mainContainer,
        leftBar: true,
        children: [
            {
                path: 'comp',
                component: practise
            }
        ]
    },
    {
        path: '/list',
        component: mainContainer,
        leftBar: true,
        children: [
            {
                path: 'main',
                component: list
            }
        ]
    },
    {
        path: '/todo',
        component: mainContainer,
        leftBar: true,
        children: [
            {
                path: 'list',
                component: todoList
            }
        ]
    },
    {
        path: '/file',
        component: mainContainer,
        leftBar: true,
        children: [
            {
                path: 'pdf',
                component: pdf
            }
        ]
    }
];
/**
 *@Description
 * leftBar展示项目作为主体，
 * 其他内容作为children嵌套
 */
export default new Router({
    routes: [
        {
            path: '',
            redirect: '/funny/chooseRoom'
        }
    ].concat(mainRoute)
})
