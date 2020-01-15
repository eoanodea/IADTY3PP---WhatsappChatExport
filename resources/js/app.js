/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */


import Vue from 'vue';
import App from './App.vue';
import VueRouter from 'vue-router';
import router from './router';
import store from './store/index'
import 'vue-material/dist/vue-material.min.css'

require('./store/subscriber')

window.Vue = Vue;

Vue.use(VueRouter);

if(localStorage.getItem('access_token')) {
    const token = {
        access_token: localStorage.getItem('access_token'),
        token_type: localStorage.getItem('token_type')
    }
    store.dispatch('auth/attempt', token)
}

/**
 * Next, we will create a fresh Vue application instance and attach it to
 * the page. Then, you may begin adding components to this application
 * or customize the JavaScript scaffolding to fit your unique needs.
 */

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app');