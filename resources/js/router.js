/*
 * File: router.js
 * Project: IADTY3PPClientMangementSystem
 * Version: 1.0.0
 * File Created: Thursday, 6th February 2020 6:22:47 pm
 * Author: Eoan O'Dea - eoan@wspace.ie
 * ---------------
 * File Description:
 * Last Modified: Friday, 7th February 2020 10:46:32 am
 * Modified By: Eoan O'Dea - eoan@wspace.ie
 * ---------------
 * Copyright 2020 - WebSpace
 */


import VueRouter from 'vue-router';
import Signin from './pages/Signin';
import AdminHome from './pages/admin/Home';
import Home from './pages/user/Home';
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

    /**
     * Authentication
     */
    {
        path: '/',
        name: 'signin',
        component: Signin
    },    

    /**
     * Main Pages
     *  @Page Admin Home
     *  @Page User Home
     *  @Page About
     */
    {
        path: '/admin/home',
        name: 'Adminhome',
        component: AdminHome,
        beforeEnter: (to, from, next) => beforeEnter(to, from, next)
    },
    {
        path: '/home',
        name: 'home',
        component: Home,
        beforeEnter: (to, from, next) => beforeEnter(to, from, next)
    },
    {
        path: '/about',
        name: 'about',
        component: About
    },

    /**
     * User CRUD Pages
     *  @Page ListUsers
     * 
     *  @Page User
     *  @Param User ID
     * 
     *  @Page EditUser
     *  @Param User ID
     * 
     *  @Page AddUser
     */
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
    
    /**
     * Service CRUD Pages
     * 
     *  @Page ListServices
     * 
     *  @Page Service
     *  @Param Service ID
     * 
     *  @Page EditService
     *  @Param Service ID
     * 
     *  @Page AddService
     */
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

    /**
     * Task CRUD Pages
     * - takes either true or false, if true will display active task
     * 
     *  @Param active
     * 
     *  @Page ListTasks
     *  @Page Task
     *  @Page EditTask
     *  @Page AddTask
     */
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
    
    /**
     * Assignment CRUD Pages
     * 
     *  @Page ListAssignments
     * 
     *  @Page Assignment
     *  @Param ID
     * 
     *  @Page EditAssignment
     *  @Param ID
     * 
     *  @Page AddAssignment
     */
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

    /**
     * Checkout
     *
     *  @Param assignmentId
     *  @Page Checkout
     */
    {
        path: '/checkout/:id',
        name: 'checkout',
        component: Checkout,
        beforeEnter: (to, from, next) => beforeEnter(to, from, next)
    },

    /**
     * Transaction
     * 
     * @Page ListTransactions
     * 
     * @Page ListTransaction By Assignment
     * @Param Assignment ID
     * 
     * @Page Transaction
     * @Param Transaction ID
     */
    {
        path: '/admin/transactions',
        name: 'transactions',
        component: ListTransaction,
        beforeEnter: (to, from, next) => beforeEnter(to, from, next)
    },
    {
        path: '/transactions/by/:id',
        name: 'transactionsByAssignment',
        component: ListTransaction,
        beforeEnter: (to, from, next) => beforeEnter(to, from, next)
    },
    {
        path: '/transaction/:id',
        name: 'transaction',
        component: Transaction,
        beforeEnter: (to, from, next) => beforeEnter(to, from, next)
    },

    /**
     * Comment CRUD Pages
     * - takes either true or false, if true will display a comment of a assignment,
     * - if not, displays a task
     * 
     *  @Param isAssignment
     *  @Param Assignment / Task ID
     * 
     *  @Page ListComments
     *  @Page Comment
     *  @Page EditComment
     *  @Page AddComment
     */
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
