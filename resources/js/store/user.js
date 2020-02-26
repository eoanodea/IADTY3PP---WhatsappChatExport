import axios from 'axios'

export default {
    namespaced: true,

    state: {
        users: [],
        user: {},
        pagination: {},
        error: null
    },

    getters: {
        users(state) {
            return state.users
        },

        user(state) {
            return state.user
        },

        pagination(state) {
            return state.pagination
        },

        error(state) {
            return state.error
        },
    },

    mutations: {
        SET_USERS(state, users) {
            state.error = null
            state.users = users
        },

        SET_USER(state, user) {
            state.error = null
            state.user = user
        },

        SET_PAGINATE(state, data) {
            let pagination = {}
            pagination.current = data.current_page
            pagination.last = data.last_page
            state.pagination = pagination
        },

        SET_ERROR(state, error) {
            state.error = error
        },

    },

    actions: {
        async loadUsers({commit}, page) {
            try {
                let response = await axios.get('/api/user/all?page=' + page) 

                commit('SET_USERS', response.data.data)
                commit('SET_PAGINATE', response.data) 

            } catch (error) {
                console.log('Error loadUsers!', error)
                commit('SET_ERROR', error) 
            }
        },
        async loadUser({commit}, id) {
            try {
                console.log('loading user', id)
                let response = await axios.get('/api/user/' + id) 
                
                commit('SET_USER', response.data.user)
            } catch(error) {
                console.log('Error getUser', error);
                commit('SET_ERROR', error) 
                
            }
        }
    }
}