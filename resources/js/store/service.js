import axios from 'axios'

export default {
    namespaced: true,

    state: {
        services: [],
        service: {},
        pagination: {},
        loading: false,
        error: null
    },

    getters: {
        services(state) {
            return state.services
        },

        service(state) {
            return state.service
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
        SET_SERVICES(state, services) {
            state.services = services
        },

        SET_SERVICE(state, service) {
            state.service = service
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

        REMOVE_SERVICE(state, id) {
            state.services = state.services.filter(dat => dat.id !== id)
        },

        SET_LOADING(state, loading) {
            console.log('set loading', loading)
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
         * server for a list of services
         * 
         * @param {commit} param0 
         * @param {page} page 
         */
        async loadServices({commit}, param) {
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
                let response = await axios.get('/api/service/all/' + dataLimit + '?page=' + currPage) 

                commit('SET_SERVICES', response.data.data)
                commit('SET_PAGINATE', response.data) 
                commit('SET_LOADING', false)
            } catch (error) {
                console.log('Error loadServices!', error)
                commit('SET_ERROR', error) 
                commit('SET_LOADING', false)
            }
        },
        /**
         * Makes an API request to the 
         * server for a single service
         * 
         * @param {commit} param0 
         * @param {page} page 
         */
        async loadService({commit}, id) {
            commit('SET_LOADING', true)
            if(id) {
                try {
                    console.log('loading service', id)
                    let response = await axios.get('/api/service/' + id) 
                    
                    commit('SET_SERVICE', response.data.service)
                    commit('SET_LOADING', false)
                } catch(error) {
                    console.log('Error getService', error);
                    commit('SET_ERROR', error) 
                    commit('SET_LOADING', false)
                    throw error
                }
            } else {
                commit('SET_SERVICE', null)
                commit('SET_LOADING', false)
            }
        },
        /**
         * Create a new service
         * 
         * @param {commit} param0 
         * @param {page} page 
         */
        async addService({commit}, service) {
            commit('SET_LOADING', true)
            try {
                
                let response = await axios.post('/api/service/new', service) 
                console.log('response service', response)
                commit('SET_SERVICE', response.data.service)
                commit('SET_LOADING', false)
                return response.data.service.id
            } catch(error) {
                console.log('Error getService', error);
                commit('SET_ERROR', error) 
                commit('SET_LOADING', false)
            }
        },
        /**
         * Makes an API request to the 
         * server for a single service
         * 
         * @param {commit} param0 
         * @param {page} page 
         */
        async updateService({commit}, param) {
            commit('SET_LOADING', true)
            try {
                console.log('loading service', param)
                let response = await axios.put('/api/service/' + param[0], param[1]) 
                
                commit('SET_SERVICE', response.data.service)
                commit('SET_LOADING', false)
                return response.data.service.id
            } catch(error) {
                console.log('Error getService', error);
                commit('SET_ERROR', error) 
                commit('SET_LOADING', false)
            }
        },
        /**
         * Delete a service 
         * from the database
         * 
         * @param {commit} param0 
         * @param {page} page 
         */
        async deleteService({commit}, id) {
            commit('SET_LOADING', true)
            try {
                console.log('loading service', id)
                let response = await axios.delete('/api/service/' + id) 
                if(response.status === 'success') {
                    console.log('response good!')
                    this.loadServices({commit})
                }
                commit('SET_SERVICE', null)
                commit('SET_LOADING', false)
            } catch(error) {
                console.log('Error getService', null);
                commit('SET_ERROR', error) 
                commit('SET_LOADING', false)
            }
        }
    }
}