/**
 * @Author: John Carlo M. Ramos
 * @Date:   2019-11-07T18:25:17+00:00
 * @Email:  !!!!!---CTRL + ALT + C = Colour Picker---!!!!!
 * @Last modified by:   John Carlo M. Ramos
 * @Last modified time: 2019-11-07T18:35:04+00:00
 */



import VueRouter from 'vue-router';
import Home from './pages/Home';
import About from './pages/About';
import ListUsers from './components/user/ListUsers'
import AddUser from './components/user/AddUser'
import EditUser from './components/user/EditUser'
import User from './components/user/User'
import ListServices from './components/service/ListServices'
import AddService from './components/service/AddService'
import EditService from './components/service/EditService'
import Service from './components/service/Service'

const routes = [
    //Main Pages
    {
        path: '/admin/home',
        name: 'home',
        component: Home
    },
    {
        path: '/admin/about',
        name: 'about',
        component: About
    },
    //User Admin View
    {
        path: '/admin/users',
        name: 'users',
        component: ListUsers
    },
    {
        path: '/admin/users/show/:id',
        name: 'user',
        component: User
    },
    {
        path: '/admin/users/edit/:id',
        name: 'editUser',
        component: EditUser
    },
    {
        path: '/admin/users/new',
        name: 'addUser',
        component: AddUser
    },
    //Service Admin view
    {
        path: '/admin/services',
        name: 'services',
        component: ListServices
    },
    {
        path: '/admin/services/show/:id',
        name: 'service',
        component: Service
    },
    {
        path: '/admin/services/edit/:id',
        name: 'editService',
        component: EditService
    },
    {
        path: '/admin/services/new',
        name: 'addService',
        component: AddService
    },
]

const router = new VueRouter({
    history: true,
    mode: 'history',
    routes,
})

export default router
