import axios from 'axios'

export default {
    namespaced: true,

    state: {
        services: [],
        service: {},
        pagination: {},
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

        error(state) {
            return state.error
        },
    },

    mutations: {
        SET_SERVICES(state, services) {
            state.error = null
            state.services = services
        },

        SET_SERVICE(state, service) {
            state.error = null
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

        SET_ERROR(state, error) {
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

            } catch (error) {
                console.log('Error loadServices!', error)
                commit('SET_ERROR', error) 
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
            try {
                console.log('loading service', id)
                let response = await axios.get('/api/service/' + id) 
                
                commit('SET_SERVICE', response.data.service)
            } catch(error) {
                console.log('Error getService', error);
                commit('SET_ERROR', error) 
                
            }
        },
        /**
         * Create a new service
         * 
         * @param {commit} param0 
         * @param {page} page 
         */
        async addService({commit}, service) {
            try {
                
                let response = await axios.post('/api/service/new', service) 
                console.log('response service', response)
                commit('SET_SERVICE', response.data.service)
                return response.data.service.id
            } catch(error) {
                console.log('Error getService', error);
                commit('SET_ERROR', error) 
                
            }
        },
        /**
         * Makes an API request to the 
         * server for a single service
         * 
         * @param {commit} param0 
         * @param {page} page 
         */
        async updateService({commit}, id, service) {
            try {
                console.log('loading service', id)
                let response = await axios.put('/api/service/' + id, service) 
                
                commit('SET_SERVICE', response.data.service)
            } catch(error) {
                console.log('Error getService', error);
                commit('SET_ERROR', error) 
                
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
            try {
                console.log('loading service', id)
                let response = await axios.delete('/api/service/' + id) 
                
                commit('SET_SERVICE', null)
            } catch(error) {
                console.log('Error getService', null);
                commit('SET_ERROR', error) 
                
            }
        }
    }
}