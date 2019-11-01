import VueRouter from 'vue-router';
import Home from './pages/Home';
import About from './pages/About';

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

    }
]

const router = new VueRouter({
    history: true,
    mode: 'history',
    routes,
})

export default router