<template>
<div class="bx--grid invoiceSpace customCard">
    <!-- Label -->
    <div class="bx--row">
        <div class="bx--col-lg-6">
            <h1 class="logoCol">Transaction</h1>
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
    <br/>

    <div class="bx--row">
        <!-- Project -->
        <div class="bx--col-lg-12">
            <p class="bx--inline-notification__title subtitle lineHeight">Project <span class="logoCol">{{ assignment.title }}</span></p>
        </div>
    </div>

    <br/><br/>

    <div class="bx--row">
        <!-- Created At -->
        <div class="bx--col-lg-12">
            <p class="bx--inline-notification__subtitle easyWhite">Transaction created at {{ transaction.created_at }}</p>
        </div>
    </div>

    <br/>

    <div class="bx--row">
        <!-- Updated At -->
        <div class="bx--col-lg-12">
            <p class="bx--inline-notification__subtitle easyWhite">Transaction updated at {{ transaction.updated_at }}</p>
        </div>
    </div>

    <br/>
    <hr/>

    <div class="bx--row">
        <!-- Amount -->
        <div class="bx--col-lg-6">
            <p class="bx--inline-notification__title" style="font-size:24px;">Amount: <span class="logoCol">€{{ transaction.amount }}</span></p>
        </div>

        <!-- Stripe ID -->
        <div class="bx--col-lg-6">
            <p class="bx--inline-notification__title" style="font-size:24px;text-align:right;">Stripe I.D: <span class="accentLogo">{{ transaction.stripe_id }}</span></p>
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

<style scoped>
    .invoiceSpace {
        margin-left: 23%;
        margin-right: 23%;
    }

    .customCard {
        background: #181E31; 
        padding-top: 3%; 
        padding-bottom: 3%;
    }
    
    .easyWhite {
        font-size: 24px;
        color: #b3b4b8;
    }
</style>