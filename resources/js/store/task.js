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
            state.tasks = state.tasks.filter(dat => dat.id !== id)
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
         * @param {commit} param0 
         * @param {page} page 
         */
        async loadTasks({commit}, param) {
            commit('SET_LOADING', true)

            // let parentId, isActive = false, dataLimit = 5, currPage = 1
        
            let paramsArr = [0, false, 5, 1]

            console.log('loading task', param)
            if(param) {
                param.length >= 0
                && (
                    param.map((dat, i) => paramsArr[i] = dat)
                )
            }

            console.log('running!', paramsArr)
            
            try {
                let response = await axios.get(`/api/task/${paramsArr[1] ? '/active/' : ''}by/${paramsArr[0]}/` + paramsArr[2] + '?page=' + paramsArr[3]) 

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
        async loadTask({commit}, id) {
            commit('SET_LOADING', true)
            if(id) {
                try {
                    let response = await axios.get('/api/task/' + id) 
                    
                    commit('SET_TASK', response.data.task)
                    commit('SET_LOADING', false)
                } catch(error) {
                    console.log('Error getTask', error);
                    commit('SET_ERROR', error) 
                    commit('SET_LOADING', false)
                    throw error
                }
            } else {
                commit('SET_TASK', null)
                commit('SET_LOADING', false)
            }
        },
        /**
         * Create a new task
         * 
         * @param {commit} param0 
         * @param {page} page 
         */
        async addTask({commit}, task) {
            commit('SET_LOADING', true)
            try {
                
                let response = await axios.post('/api/task/new', task) 
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
        async deleteTask({commit}, id) {
            commit('SET_LOADING', true)
            try {
                let response = await axios.delete('/api/task/' + id) 
                if(response.status === 'success') {
                    console.log('response good!')
                    this.loadTasks({commit})
                }
                commit('SET_TASK', null)
                commit('SET_LOADING', false)
            } catch(error) {
                console.log('Error getTask', null);
                commit('SET_ERROR', error) 
                commit('SET_LOADING', false)
            }
        }
    }
}