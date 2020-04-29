import axios from 'axios'

export default {
    namespaced: true,

    state: {
        assignments: [],
        assignment: {},
        pagination: {},
        loading: false,
        error: null
    },

    getters: {
        assignments(state) {
            return state.assignments
        },

        assignment(state) {
            return state.assignment
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
        SET_ASSIGNMENTS(state, assignments) {
            state.assignments = assignments
        },

        SET_ASSIGNMENT(state, assignment) {
            state.assignment = assignment
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

        REMOVE_ASSIGNMENT(state, id) {
            state.assignments = state.assignments.filter(dat => dat.id !== id)
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
         * server for a list of assignments
         * 
         * @param {commit} param0 
         * @param {page} page 
         */
        async loadAssignments({commit}, param) {
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
                let response = await axios.get('/api/assignment/all/' + dataLimit + '?page=' + currPage) 

                commit('SET_ASSIGNMENTS', response.data.data)
                commit('SET_PAGINATE', response.data) 
                commit('SET_LOADING', false)
            } catch (error) {
                console.log('Error loadAssignments!', error)
                commit('SET_ERROR', error) 
                commit('SET_LOADING', false)
            }
        },
        /**
         * Makes an API request to the 
         * server for a list of assignments
         * by a client
         * 
         * @param {commit} param0 
         * @param {page} page 
         */
        async loadAssignmentsByClient({commit}, param) {
            commit('SET_LOADING', true)
            let dataLimit = 5, currPage = 1, clientId = 0
            if(param) {
                typeof param === "object" && param.length >= 0
                ? (
                    param.map((dat, i) => {
                        switch(i) {
                            case 0: clientId = dat; break;
                            case 1: currPage = dat; break; 
                            case 2: dataLimit = dat; break;
                        }
                    })
                )
                : clientId = param
            }
            
            try {
                let response = await axios.get('/api/assignment/by/' + clientId + '/' + dataLimit + '?page=' + currPage) 

                commit('SET_ASSIGNMENTS', response.data.data)
                commit('SET_PAGINATE', response.data) 
                commit('SET_LOADING', false)
            } catch (error) {
                console.log('Error loadAssignments!', error)
                commit('SET_ERROR', error) 
                commit('SET_LOADING', false)
            }
        },
        /**
         * Makes an API request to the 
         * server for a single assignment
         * 
         * @param {commit} param0 
         * @param {page} page 
         */
        async loadAssignment({commit}, id) {
            commit('SET_LOADING', true)
            if(id) {
                try {
                    let response = await axios.get('/api/assignment/' + id) 
                    
                    commit('SET_ASSIGNMENT', response.data.assignment)
                    commit('SET_LOADING', false)
                } catch(error) {
                    console.log('Error getAssignment', error);
                    commit('SET_ERROR', error) 
                    commit('SET_LOADING', false)
                    throw error
                }
            } else {
                commit('SET_ASSIGNMENT', null)
                commit('SET_LOADING', false)
            }
        },
        /**
         * Create a new assignment
         * 
         * @param {commit} param0 
         * @param {page} page 
         */
        async addAssignment({commit}, assignment) {
            commit('SET_LOADING', true)
            try {
                
                let response = await axios.post('/api/assignment/new', assignment) 
                commit('SET_ASSIGNMENT', response.data.assignment)
                commit('SET_LOADING', false)
                return response.data.assignment.id
            } catch(error) {
                console.log('Error getAssignment', error);
                commit('SET_ERROR', error) 
                commit('SET_LOADING', false)
            }
        },
        /**
         * Makes an API request to the 
         * server for a single assignment
         * 
         * @param {commit} param0 
         * @param {page} page 
         */
        async updateAssignment({commit}, param) {
            commit('SET_LOADING', true)
            try {
                let response = await axios.put('/api/assignment/' + param[0], param[1]) 
                
                commit('SET_ASSIGNMENT', response.data.assignment)
                commit('SET_LOADING', false)
                return response.data.assignment.id
            } catch(error) {
                console.log('Error getAssignment', error);
                commit('SET_ERROR', error) 
                commit('SET_LOADING', false)
            }
        },
        /**
         * Delete a assignment 
         * from the database
         * 
         * @param {commit} param
         * @param {page} page 
         */
        async deleteAssignment({commit}, id) {
            commit('SET_LOADING', true)
            try {
                let response = await axios.delete('/api/assignment/' + id) 
                if(response.status === 'success') {
                    console.log('response good!')
                    this.loadAssignments({commit})
                }
                commit('SET_ASSIGNMENT', null)
                commit('SET_LOADING', false)
            } catch(error) {
                console.log('Error getAssignment', null);
                commit('SET_ERROR', error) 
                commit('SET_LOADING', false)
            }
        }
    }
}