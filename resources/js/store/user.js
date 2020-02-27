import axios from 'axios'

export default {
    namespaced: true,

    state: {
        users: [],
        user: {},
        pagination: {},
        loading: true,
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

        loading(state) {
            return state.loading
        },

        error(state) {
            return state.error
        },
    },

    mutations: {
        SET_USERS(state, users) {
            state.users = users
        },

        SET_USER(state, user) {
            state.user = user
        },

        SET_PAGINATE(state, data) {
            let pagination = {}
            pagination.current = data.current_page
            pagination.last = data.last_page
            pagination.to = data.to
            pagination.from = data.from
            pagination.total = data.total
            state.pagination = pagination
        },

        SET_LOADING(state, loading) {
            if(loading == true) this.error = null
            state.loading = loading
        },

        SET_ERROR(state, error) {
            state.user = null
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
        async loadUsers({commit}, param) {
            commit('SET_LOADING', true)
            let dataLimit = 5, currPage = 1
            if(param) {
                param.length >= 0
                ? (
                    param.map((dat, i) => i === 0 ? currPage = dat : dataLimit = dat)
                )
                : currPage = param
            }
            
            try {
                let response = await axios.get('/api/user/all/' + dataLimit + '?page=' + currPage) 

                commit('SET_USERS', response.data.data)
                commit('SET_PAGINATE', response.data) 
                commit('SET_LOADING', false)
            } catch (error) {
                console.log('Error loadUsers!', error)
                commit('SET_ERROR', error) 
                commit('SET_LOADING', false)
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
            commit('SET_LOADING', true)
            if(id) {
                try {
                    console.log('loading user', id)
                    let response = await axios.get('/api/user/' + id) 
                    
                    commit('SET_USER', response.data.user)
                    commit('SET_LOADING', false)
                } catch(error) {
                    console.log('Error getUser', error);
                    commit('SET_ERROR', error) 
                    commit('SET_LOADING', false)
                    throw error
                }
            } else {
                commit('SET_USER', null)
                commit('SET_LOADING', false)
            }
        },
        /**
         * Create a new user
         * 
         * @param {commit} param0 
         * @param {page} page 
         */
        async addUser({commit}, user) {
            commit('SET_LOADING', true)
            try {
                
                let response = await axios.post('/api/user/new', user) 
                console.log('response user', response)
                commit('SET_USER', response.data.user)
                commit('SET_LOADING', false)
                return response.data.user.id
            } catch(error) {
                console.log('Error getUser', error);
                commit('SET_ERROR', error) 
                commit('SET_LOADING', false)
            }
        },
        /**
         * Makes an API request to the 
         * server for a single user
         * 
         * @param {commit} param0 
         * @param {page} page 
         */
        async updateUser({commit}, param) {
            commit('SET_LOADING', true)
            try {
                console.log('loading user', param)
                let response = await axios.put('/api/user/' + param[0], param[1]) 
                
                commit('SET_USER', response.data.user)
                commit('SET_LOADING', false)
                return response.data.user.id
            } catch(error) {
                console.log('Error getUser', error);
                commit('SET_ERROR', error) 
                commit('SET_LOADING', false)
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
            commit('SET_LOADING', true)
            try {
                console.log('loading user', id)
                let response = await axios.delete('/api/user/' + id) 
                
                commit('SET_USER', null)
                commit('SET_LOADING', false)
            } catch(error) {
                console.log('Error getUser', null);
                commit('SET_ERROR', error) 
                commit('SET_LOADING', false)
            }
        }
    }
}