<template>
<loading-indicator v-if="loading"/>
<div class="bx--grid" style="padding: 40px 0px;" v-else-if="transaction && transaction.id">
    <div class="bx--row">
        <!-- Trans Details (Notfication Card) -->
        <div class="bx--col-lg-12">
            <div data-notification class="bx--inline-notification bx--inline-notification--info" role="alert">
                <div class="bx--inline-notification__details">
                    <svg focusable="false" preserveAspectRatio="xMidYMid meet" style="will-change: transform;" xmlns="http://www.w3.org/2000/svg" class="bx--inline-notification__icon" width="20" height="20" viewBox="0 0 32 32" aria-hidden="true"><path d="M16 2a14 14 0 1 0 14 14A14 14 0 0 0 16 2zm0 5a1.5 1.5 0 1 1-1.5 1.5A1.5 1.5 0 0 1 16 7zm4 17.12h-8v-2.24h2.88v-6.76H13v-2.24h4.13v9H20z"></path></svg>

                    <!-- Trans Detail Contents -->
                    <div class="bx--row">
                        <div class="bx--inline-notification__text-wrapper">
                            <div class="bx--col-lg-12">
                                <p class="bx--inline-notification__title">I.D: {{ transaction.id }}</p>
                                <p class="bx--inline-notification__title">Project {{ assignment.title }}</p>
                                <p class="bx--inline-notification__title">Transaction created at {{ transaction.created_at }}</p>
                                <p class="bx--inline-notification__title">Transaction updated at {{ transaction.updated_at }}</p>
                                <p class="bx--inline-notification__title">Amount €{{ transaction.amount }}</p>
                                <p class="bx--inline-notification__title">Stripe I.D: {{ transaction.stripe_id }}</p>
                            </div>
                        </div>
                    </div>
                </div>
                
                <!-- View Assignment Button -->
                <cv-link :to="'/admin/assignments/show/' + transaction.assignment_id" style="text-decoration: none;">
                    <button data-notification-btn class="bx--btn bx--btn--lg bx--btn--primary">
                        View Project
                    </button>
                </cv-link>
            </div>
        </div>
    </div>
</div>
<data-error v-else v-bind:error="error" v-bind:collection="'user'" />
</template>

<script>
import Vue from "vue";
import axios from 'axios'
import 'carbon-components/css/carbon-components.css';
import CarbonComponentsVue from '@carbon/vue/src/index';
import { Notification } from 'carbon-components';
import { Modal } from 'carbon-components';
import { mapGetters } from 'vuex';
import LoadingIndicator from './../progress/LoadingIndicator'
import DataError from './../table/DataError'

Vue.use(CarbonComponentsVue);

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
            Notification,
            Modal,
            LoadingIndicator,
            DataError,
        },   
    }
</script>