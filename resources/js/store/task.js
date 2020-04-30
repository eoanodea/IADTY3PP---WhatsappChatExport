import axios from 'axios'

export default {
    namespaced: true,

    state: {
        tasks: [],
        task: {},
        pagination: {},
        loading: false,
        error: null
    },

    getters: {
        tasks(state) {
            return state.tasks
        },

        task(state) {
            return state.task
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
        SET_TASKS(state, tasks) {
            state.tasks = tasks
        },

        SET_TASK(state, task) {
            state.task = task
        },

        SET_PAGINATE(state, data) {
            let pagination = {}
            pagination.selectedLimit = (data.to - data.from + 1)
            pagination.current = data.current_page
            pagination.last = data.last_page
            pagination.to = data.to
            pagination.from = data.from
            pagination.total = data.total
            state.pagination = pagination
        },

        REMOVE_TASK(state, id) {
            console.log('REMOVING',id, state.tasks, state.tasks.filter(dat => dat.id != id))
            state.tasks = state.tasks.filter(dat => dat.id != id)
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
         * server for a list of tasks
         * 
         * @param {commit} commit 
         * @param {param} param 
         */
        async loadTasks({commit}, param) {
            commit('SET_LOADING', true)        
            let paramsArr = [0, false, 5, 1]

            if(param) {
                param.length >= 0
                ? (
                    param.map((dat, i) => paramsArr[i] = dat)
                )
                : paramsArr[0] = param
            }
            
            try {
                let response = await axios.get(`/api/task/${paramsArr[1] ? 'active/' : ''}by/${paramsArr[0]}/` + paramsArr[2] + '?page=' + paramsArr[3]) 

                commit('SET_TASKS', response.data.data)
                commit('SET_PAGINATE', response.data) 
                commit('SET_LOADING', false)
            } catch (error) {
                console.log('Error loadTasks!', error)
                commit('SET_ERROR', error) 
                commit('SET_LOADING', false)
            }
        },
        /**
         * Makes an API request to the 
         * server for a single task
         * 
         * @param {commit} param0 
         * @param {page} page 
         */
        async loadTask({commit}, param) {
            commit('SET_LOADING', true)
            if(param) {
                let paramsArr = []
                param.length >= 0
                ? (
                    param.map(dat => paramsArr.push(dat))
                )
                : paramsArr[0] = param

                try {
                    let response = await axios.get(`/api/task/${paramsArr[0] ? 'active/' : ''}${paramsArr[1]}`) 
                    
                    commit('SET_TASK', response.data.task)
                    commit('SET_LOADING', false)
                } catch(error) {
                    console.log('Error getTask', error);
                    commit('SET_ERROR', error) 
                    commit('SET_LOADING', false)
                    throw error
                }
            }
        },
        /**
         * Create a new task
         * 
         * @param {commit} param0 
         * @param {page} page 
         */
        async addTask({commit}, params) {
            commit('SET_LOADING', true)
            try {
                
                let response = await axios.post(`/api/task/${params[1] ? 'active' : ''}${params[2]}/new`, params[0]) 
                commit('SET_TASK', response.data.task)
                commit('SET_LOADING', false)
                return response.data.task.id
            } catch(error) {
                console.log('Error getTask', error);
                commit('SET_ERROR', error) 
                commit('SET_LOADING', false)
            }
        },
        /**
         * Makes an API request to the 
         * server for a single task
         * 
         * @param {commit} param0 
         * @param {page} page 
         */
        async updateTask({commit}, param) {
            commit('SET_LOADING', true)
            try {
                let response = await axios.put('/api/task/' + param[0], param[1]) 
                
                commit('SET_TASK', response.data.task)
                commit('SET_LOADING', false)
                return response.data.task.id
            } catch(error) {
                console.log('Error getTask', error);
                commit('SET_ERROR', error) 
                commit('SET_LOADING', false)
            }
        },
        /**
         * Delete a task 
         * from the database
         * 
         * @param {commit} param
         * @param {page} page 
         */
        async deleteTask({commit}, params) {
            commit('SET_LOADING', true)
            try {
                let response = await axios.delete(`/api/task/${params[0]}`) 
                if(response.data.status === 'success') {
                    console.log('response good!')
                    this.loadTasks({commit})
                }
                commit('SET_TASK', null)
                commit('SET_LOADING', false)
            } catch(error) {
                console.log('Error getTask', error);
                commit('SET_ERROR', error) 
                commit('SET_LOADING', false)
            }
        },
        /**
         * Delete multiple tasks
         * from the database
         * 
         * @param {commit} param
         * @param {page} page 
         */
        async batchDeleteTasks({commit}, params) {
            commit('SET_LOADING', true)
            const isActive = params[0] === 'true' ? 'active' : ''
            let ids = params
            ids.shift()

            try {
                let response = await axios.post(`/api/task/${isActive}/batchRemove`, ids) 
                console.log('done!', response.status, response.data.status === 'success')
                if(response.data.status === 'success') {
                    console.log('response good!')
                    ids.map(dat => {
                        console.log('removing ', dat)
                        commit('REMOVE_TASK', dat)
                    })
                    // this.loadTasks({commit})
                }

                commit('SET_LOADING', false)
            } catch(error) {
                console.log('Error getTask', error);
                commit('SET_ERROR', error) 
                commit('SET_LOADING', false)
            }
        }
    }
}