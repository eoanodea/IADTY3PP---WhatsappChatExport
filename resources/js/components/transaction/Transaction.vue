<template>
    <div>
        <div v-if="transaction">
            <h1>Transaction</h1>
            <p color="#fff">
            {{transaction}}
            </p>
            <router-link :to="'/admin/assignments/show/' + transaction.assignment_id">View assignment</router-link>
        </div>
        <p v-else-if="error">{{error}}</p>
    </div>
</template>

<script>
    import axios from 'axios'

    export default {
        data() {
            return {
                error: null,
                transaction: null
            }
        },
        mounted() {
            this.fetchTransaction()
        },
        methods: {
            fetchTransaction() {
                axios.get(`/api/transactions/${this.$route.params.id}`)
                .then(response => {
                    if(response.data.status !== "success") {
                        this.error = response.data.error
                    } else {
                        this.transaction = response.data.transaction
                    }
                })
            }
        }   
    }
</script>