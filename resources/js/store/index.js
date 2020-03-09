import Vue from 'vue'
import Vuex from 'vuex'
import auth from './auth'
import user from './user'
import service from './service'
import assignment from './assignment'
import task from './task'
import transaction from './transaction'

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
        assignment,
        task,
        transaction
    }
})