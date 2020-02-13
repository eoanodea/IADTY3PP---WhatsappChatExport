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

import 'carbon-components/css/carbon-components.css';
import CarbonComponentsVue from '@carbon/vue/src/index';

import Echo from "laravel-echo"
window.io = require('socket.io-client');

require('./store/subscriber')

window.Vue = Vue;

Vue.use(VueRouter);
Vue.use(CarbonComponentsVue);

const token = {
    access_token: localStorage.getItem('access_token'),
    token_type: localStorage.getItem('token_type')
}

if (typeof io !== 'undefined' && token.access_token) {
    window.Echo = new Echo({    
        broadcaster: 'socket.io',    
        host: window.location.hostname + ':6001',  
        auth: {
            headers:
                {
                    Authorization: `${token.token_typoe} ${token.access_token}`
                }
        }
    });
}

store.dispatch('auth/attempt', token).then(() => {
    new Vue({
        router,
        store,
        render: h => h(App)
    }).$mount('#app');
})
