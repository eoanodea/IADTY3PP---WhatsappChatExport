import axios from 'axios'

export default {
    namespaced: true,

    state: {
        transactions: [],
        transaction: {},
        pagination: {},
        loading: false,
        error: null
    },

    getters: {
        transactions(state) {
            return state.transactions
        },

        transaction(state) {
            return state.transaction
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
        SET_TRANSACTIONS(state, transactions) {
            state.transactions = transactions
        },

        SET_TRANSACTION(state, transaction) {
            state.transaction = transaction
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

        REMOVE_TRANSACTION(state, id) {
            state.transactions = state.transactions.filter(dat => dat.id !== id)
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
         * server for a list of transactions
         * 
         * @param {commit} param0 
         * @param {page} page 
         */
        async loadTransactions({commit}, param) {
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
                let response = await axios.get('/api/transactions/' + dataLimit + '?page=' + currPage) 

                commit('SET_TRANSACTIONS', response.data.data)
                commit('SET_PAGINATE', response.data) 
                commit('SET_LOADING', false)
            } catch (error) {
                console.log('Error loadTransactions!', error)
                commit('SET_ERROR', error) 
                commit('SET_LOADING', false)
            }
        },
        /**
         * Makes an API request to the 
         * server for a single transaction
         * 
         * @param {commit} param0 
         * @param {page} page 
         */
        async loadTransaction({commit}, id) {
            commit('SET_LOADING', true)
            if(id) {
                try {
                    let response = await axios.get('/api/transaction/' + id) 
                    
                    commit('SET_TRANSACTION', response.data.transaction)
                    commit('SET_LOADING', false)
                } catch(error) {
                    console.log('Error getTransaction', error);
                    commit('SET_ERROR', error) 
                    commit('SET_LOADING', false)
                    throw error
                }
            } else {
                commit('SET_TRANSACTION', null)
                commit('SET_LOADING', false)
            }
        },
        /**
         * Create a new transaction
         * 
         * @param {commit} param0 
         * @param {page} page 
         */
        async addTransaction({commit}, transaction) {
            commit('SET_LOADING', true)
            try {
                
                let response = await axios.post('/api/transaction/new', transaction) 
                commit('SET_TRANSACTION', response.data.transaction)
                commit('SET_LOADING', false)
                return response.data.transaction.id
            } catch(error) {
                console.log('Error getTransaction', error);
                commit('SET_ERROR', error) 
                commit('SET_LOADING', false)
            }
        },
        /**
         * Makes an API request to the 
         * server for a single transaction
         * 
         * @param {commit} param0 
         * @param {page} page 
         */
        async updateTransaction({commit}, param) {
            commit('SET_LOADING', true)
            try {
                let response = await axios.put('/api/transaction/' + param[0], param[1]) 
                
                commit('SET_TRANSACTION', response.data.transaction)
                commit('SET_LOADING', false)
                return response.data.transaction.id
            } catch(error) {
                console.log('Error getTransaction', error);
                commit('SET_ERROR', error) 
                commit('SET_LOADING', false)
            }
        },
        /**
         * Delete a transaction 
         * from the database
         * 
         * @param {commit} param
         * @param {page} page 
         */
        async deleteTransaction({commit}, id) {
            commit('SET_LOADING', true)
            try {
                let response = await axios.delete('/api/transaction/' + id) 
                if(response.status === 'success') {
                    console.log('response good!')
                    this.loadTransactions({commit})
                }
                commit('SET_TRANSACTION', null)
                commit('SET_LOADING', false)
            } catch(error) {
                console.log('Error getTransaction', null);
                commit('SET_ERROR', error) 
                commit('SET_LOADING', false)
            }
        }
    }
}