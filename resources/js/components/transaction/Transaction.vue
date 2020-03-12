<template>
<div class="bx--grid">
    <!-- Label -->
    <div class="bx--row">
        <div class="bx--col-lg-6">
            <h1>Transaction</h1>
        </div>

        <div class="bx--col-lg-6" style="text-align:right;">
            <cv-link :to="'/admin/assignments/show/' + transaction.assignment_id" style="text-decoration: none;">
                <button data-notification-btn class="bx--btn bx--btn--lg bx--btn--primary">
                    View Project
                </button>
            </cv-link>
        </div>
    </div>

    <br/><br/>
    <hr/>

    <div class="bx--row">
        <!-- Project -->
        <div class="bx--col-lg-6">
            <p class="bx--inline-notification__title" style="font-size:34px;">Project {{ assignment.title }}</p>
        </div>
        
        <!-- ID -->
        <div class="bx--col-lg-6">
            <p class="bx--inline-notification__title tertiaryText" style="font-size:24px;text-align:right;">I.D: {{ transaction.id }}</p>
        </div>
    </div>

    <br/><br/>

    <div class="bx--row">
        <!-- Created At -->
        <div class="bx--col-lg-6">
            <p class="bx--inline-notification__subtitle tertiaryText" style="font-size:24px;">Transaction created at {{ transaction.created_at }}</p>
        </div>

        <!-- Updated At -->
        <div class="bx--col-lg-6">
            <p class="bx--inline-notification__subtitle tertiaryText" style="font-size:24px;text-align:right;">Transaction updated at {{ transaction.updated_at }}</p>
        </div>
    </div>

    <hr/>

    <div class="bx--row">
        <!-- Amount -->
        <div class="bx--col-lg-6">
            <p class="bx--inline-notification__title" style="font-size:24px;">Amount €{{ transaction.amount }}</p>
        </div>

        <!-- Stripe ID -->
        <div class="bx--col-lg-6">
            <p class="bx--inline-notification__title" style="font-size:24px;text-align:right;">Stripe I.D: {{ transaction.stripe_id }}</p>
        </div>
    </div>
</div>
</template>

<script>
    import Vue from "vue";
    import axios from 'axios'

    import { mapGetters } from 'vuex';
    import LoadingIndicator from './../progress/LoadingIndicator'
    import DataError from './../table/DataError'



    export default {
        data() {
            return {
                //
            }
        },
        created() {
            const {$store} = this
            $store.dispatch('transaction/loadTransaction', parseInt(this.$route.params.id))
            
        },
        computed: {
            ...mapGetters({
                transaction: 'transaction/transaction',
                assignment: 'assignment/assignment',
                loading: 'transaction/loading',
                error: 'transaction/error'
            })
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
            },
        },
        components: {
            LoadingIndicator,
            DataError,
        },   
    }
</script>