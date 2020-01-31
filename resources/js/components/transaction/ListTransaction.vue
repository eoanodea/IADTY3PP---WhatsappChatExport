<template>
    <div class="fluid-container">
        <md-table-toolbar>
            <h1 class="md-title accent">Transactions</h1>
        </md-table-toolbar>


        <md-table class="background text" md-card v-if="transactions !== null">
            <md-table-row class="background subject">
                <!-- <md-table-head md-numeric>ID</md-table-head> -->
                <md-table-head class="subject">Title</md-table-head>
                <md-table-head class="subject">Description</md-table-head>
                <md-table-head></md-table-head>
            </md-table-row>
            <md-table-row v-for="transaction in transactions" v-bind:key="transaction.id" class="item">
                <md-table-cell md-numeric>{{transaction.id}}</md-table-cell>
                <md-table-cell class="background text">{{ transaction.created_at }}</md-table-cell>
                <md-table-cell class="background text">{{transaction.amount}}</md-table-cell>
                <md-table-cell class="background text">
                    <md-button :to="`/transaction/` + transaction.id" class="md-accent">View transaction</md-button>
                    <!-- <md-button :to="`/admin/transactions/edit/` + transaction.id">Edit</md-button> -->
                </md-table-cell>
            </md-table-row>
        </md-table>
        <p v-else>There are no  Transactions.</p>
    </div>

</template>
<script>
    import axios from 'axios';

    export default {
        props: ['id'],
        data() {
            return {
                transactions: null,
                assignmentId: this.$route.params.id
                    ? this.$route.params.id
                    : this.id,
            }
        },
        //When the component mounts, check if the Transaction is active or default
        //Modify the fetch URL with result and fetch Transactions
        mounted () {
            axios.get(`/api/transactions/by/${this.assignmentId}`)
            .then(response => (this.transactions = response.data.transactions))
        },
        methods: {
            //
        }

    }
</script>
