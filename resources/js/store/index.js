import Vue from 'vue'
import Vuex from 'vuex'
import auth from './auth'
import user from './user'
import service from './service'
import task from './task'


Vue.use(Vuex)

export default new Vuex.Store({
state: {
        //
    },

    mutations: {
        //
    },

    actions: {
        //
    },

    modules: {
        auth,
        user,
        service,
        task
    }
})