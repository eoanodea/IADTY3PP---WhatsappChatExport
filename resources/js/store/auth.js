
import axios from 'axios'

export default {
    namespaced: true,

    state: {
        token: null,
        token_type: null,
        user: null
    },

    getters: {
        authenticated (state) {
            return state.token && state.user
        },

        user (state) {
            return state.user
        },

        token (state) {
            return state.token ? `${state.token_type && state.token}` : false
        }
    },

    mutations: {
        SET_TOKEN (state, token) {
            if(!token) {
                state.token = null
                state.token_type = null
                window.axios.defaults.headers.common['Authorization'] = ''
            } else {
                state.token = token.access_token
                state.token_type = token.token_type
                window.axios.defaults.headers.common['Authorization'] = `${token.token_type} ${token.access_token}`
            }
        },
        SET_USER (state, data) {
            state.user = data
        }
    },

    actions: {
        async signIn({ dispatch }, credentials) {
            try {
                let response = await axios.post('/api/auth/login', credentials)

                
                return dispatch('attempt', response.data)
            } catch(error) {
                console.log("error store", error)
                return error
            }
            

        },

        async attempt ({ commit }, token) {
            if(token) {
                commit('SET_TOKEN', token)
            }
            
            try {
                let response = await axios.get('/api/auth/get')

                commit('SET_USER', response.data)
            } catch(e) {
                commit('SET_TOKEN', null)
                commit('SET_USER', null)
            }
        
        },

        signOut ({ commit }) {
            return axios.post('/api/auth/logout').then(() => {
                commit('SET_TOKEN', null)
                commit('SET_USER', null)
            })
        }
    },
}