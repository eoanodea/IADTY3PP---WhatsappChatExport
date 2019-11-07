import VueRouter from 'vue-router';
import Home from './pages/Home';
import About from './pages/About';
import ListUsers from './components/user/ListUsers'

const routes = [
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
    {
        path: '/admin/users',
        name: 'users',
        component: ListUsers

    }
]

const router = new VueRouter({
    history: true,
    mode: 'history',
    routes,
})

export default router