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
        /**
         * Makes an API request to the 
         * server for a list of users
         * 
         * @param {commit} param0 
         * @param {page} page 
         */
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
        /**
         * Makes an API request to the 
         * server for a single user
         * 
         * @param {commit} param0 
         * @param {page} page 
         */
        async loadUser({commit}, id) {
            try {
                console.log('loading user', id)
                let response = await axios.get('/api/user/' + id) 
                
                commit('SET_USER', response.data.user)
            } catch(error) {
                console.log('Error getUser', error);
                commit('SET_ERROR', error) 
                
            }
        },
        /**
         * Create a new user
         * 
         * @param {commit} param0 
         * @param {page} page 
         */
        async addUser({commit}, user) {
            try {
                
                let response = await axios.post('/api/user/new', user) 
                console.log('response user', response)
                commit('SET_USER', response.data.user)
                return response.data.user.id
            } catch(error) {
                console.log('Error getUser', error);
                commit('SET_ERROR', error) 
                
            }
        },
        /**
         * Makes an API request to the 
         * server for a single user
         * 
         * @param {commit} param0 
         * @param {page} page 
         */
        async updateUser({commit}, id, user) {
            try {
                console.log('loading user', id)
                let response = await axios.put('/api/user/' + id, user) 
                
                commit('SET_USER', response.data.user)
            } catch(error) {
                console.log('Error getUser', error);
                commit('SET_ERROR', error) 
                
            }
        },
        /**
         * Delete a user 
         * from the database
         * 
         * @param {commit} param0 
         * @param {page} page 
         */
        async deleteUser({commit}, id) {
            try {
                console.log('loading user', id)
                let response = await axios.delete('/api/user/' + id) 
                
                commit('SET_USER', null)
            } catch(error) {
                console.log('Error getUser', null);
                commit('SET_ERROR', error) 
                
            }
        }
    }
}