/**
 * @Author: John Carlo M. Ramos
 * @Date:   2019-11-07T18:25:17+00:00
 * @Email:  !!!!!---CTRL + ALT + C = Colour Picker---!!!!!
 * @Last modified by:   John Carlo M. Ramos
 * @Last modified time: 2019-11-07T18:35:04+00:00
 */



import VueRouter from 'vue-router';
import Signin from './pages/Signin';
import Home from './pages/Home';
import About from './pages/About';
import Checkout from './components/transaction/Checkout';
import ListUsers from './components/user/ListUsers'
import AddUser from './components/user/AddUser'
import EditUser from './components/user/EditUser'
import User from './components/user/User'
import ListServices from './components/service/ListServices'
import AddService from './components/service/AddService'
import EditService from './components/service/EditService'
import Service from './components/service/Service'
import ListTask from './components/task/ListTask'
import AddTask from './components/task/AddTask'
import EditTask from './components/task/EditTask'
import Task from './components/task/Task'
import ListAssignment from './components/assignment/ListAssignment'
import AddAssignmentStepper from './components/assignment/add/AddAssignmentStepper'
import EditAssignment from './components/assignment/EditAssignment'
import Assignment from './components/assignment/Assignment'
import store from './store/index'
import ListTransaction from './components/transaction/ListTransaction'
import Transaction from './components/transaction/Transaction'
import ListComment from './components/comment/ListComment'
import AddComment from './components/comment/AddComment'
import EditComment from './components/comment/EditComment'
import Comment from './components/comment/Comment'

/*
 * Checks if the user is authenticated in the store
 * if not redirect to signin
 */
function beforeEnter(to, from, next) {
    if(!store.getters['auth/authenticated']) {
        return next({
            name: 'signin'
        })
    }
    next()
}

const routes = [
    //Authentication
    {
        path: '/',
        name: 'signin',
        component: Signin
    },    
    //Main Pages
    {
        path: '/admin/home',
        name: 'home',
        component: Home,
        beforeEnter: (to, from, next) => beforeEnter(to, from, next)
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
        component: ListUsers,
        beforeEnter: (to, from, next) => beforeEnter(to, from, next)
    },
    {
        path: '/admin/users/show/:id',
        name: 'user',
        component: User,
        beforeEnter: (to, from, next) => beforeEnter(to, from, next)
    },
    {
        path: '/admin/users/edit/:id',
        name: 'editUser',
        component: EditUser,
        beforeEnter: (to, from, next) => beforeEnter(to, from, next)
    },
    {
        path: '/admin/users/new',
        name: 'addUser',
        component: AddUser,
        beforeEnter: (to, from, next) => beforeEnter(to, from, next)
    },
    //Service Admin view
    {
        path: '/admin/services',
        name: 'services',
        component: ListServices,
        beforeEnter: (to, from, next) => beforeEnter(to, from, next)
    },
    {
        path: '/admin/services/show/:id',
        name: 'service',
        component: Service,
        beforeEnter: (to, from, next) => beforeEnter(to, from, next)
    },
    {
        path: '/admin/services/edit/:id',
        name: 'editService',
        component: EditService,
        beforeEnter: (to, from, next) => beforeEnter(to, from, next)
    },
    {
        path: '/admin/services/new',
        name: 'addService',
        component: AddService,
        beforeEnter: (to, from, next) => beforeEnter(to, from, next)
    },
    //Task view
    //:active parameter 
    //- takes either true or false, if true will display active task
    {
        path: '/admin/tasks/:active/:id',
        name: 'tasks',
        component: ListTask,
        beforeEnter: (to, from, next) => beforeEnter(to, from, next)
    },
    {
        path: '/admin/tasks/:active/show/:id',
        name: 'task',
        component: Task,
        beforeEnter: (to, from, next) => beforeEnter(to, from, next)
    },
    {
        path: '/admin/tasks/:active/edit/:id',
        name: 'editTask',
        component: EditTask,
        beforeEnter: (to, from, next) => beforeEnter(to, from, next)
    },
    {
        path: '/admin/tasks/:active/:id/new',
        name: 'addTask',
        component: AddTask,
        beforeEnter: (to, from, next) => beforeEnter(to, from, next)
    },
    //Assignment Admin view
    {
        path: '/admin/assignments',
        name: 'assignments',
        component: ListAssignment,
        beforeEnter: (to, from, next) => beforeEnter(to, from, next)
    },
    {
        path: '/admin/assignments/show/:id',
        name: 'assignment',
        component: Assignment,
        beforeEnter: (to, from, next) => beforeEnter(to, from, next)
    },
    {
        path: '/admin/assignments/edit/:id',
        name: 'editAssignment',
        component: EditAssignment,
        beforeEnter: (to, from, next) => beforeEnter(to, from, next)
    },
    {
        path: '/admin/assignments/new',
        name: 'addAssignment',
        component: AddAssignmentStepper,
        beforeEnter: (to, from, next) => beforeEnter(to, from, next)
    },
    //Checkout
    //Param - Assignment ID
    {
        path: '/checkout/:id',
        name: 'assignments',
        component: Checkout,
        beforeEnter: (to, from, next) => beforeEnter(to, from, next)
    },
    //Transaction
    {
        path: '/transactions/:id',
        name: 'transactions',
        component: ListTransaction,
        beforeEnter: (to, from, next) => beforeEnter(to, from, next)
    },
    {
        path: '/transaction/:id',
        name: 'transaction',
        component: Transaction,
        beforeEnter: (to, from, next) => beforeEnter(to, from, next)
    },
    //Comment
    //:active parameter 
    //- takes either true or false, if true will display active task
    {
        path: '/admin/comments/:isAssignment/:id',
        name: 'comments',
        component: ListComment,
        beforeEnter: (to, from, next) => beforeEnter(to, from, next)
    },
    {
        path: '/admin/comment/show/:id',
        name: 'comment',
        component: Comment,
        beforeEnter: (to, from, next) => beforeEnter(to, from, next)
    },
    {
        path: '/admin/comments/:isAssignment/edit/:id',
        name: 'editComment',
        component: EditComment,
        beforeEnter: (to, from, next) => beforeEnter(to, from, next)
    },
    {
        path: '/admin/comments/:isAssignment/:id/new',
        name: 'addComment',
        component: AddComment,
        beforeEnter: (to, from, next) => beforeEnter(to, from, next)
    }
]

const router = new VueRouter({
    history: true,
    mode: 'history',
    routes,
})

export default router
