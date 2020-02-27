<template>
<div class="bx--grid" style="padding: 40px 0px;" v-if="transaction">
    <div class="bx--row">
        <!-- Trans Details (Notfication Card) -->
        <div class="bx--col-lg-6">
            <div data-notification class="bx--inline-notification bx--inline-notification--info" role="alert">
                <div class="bx--inline-notification__details">
                    <svg focusable="false" preserveAspectRatio="xMidYMid meet" style="will-change: transform;" xmlns="http://www.w3.org/2000/svg" class="bx--inline-notification__icon" width="20" height="20" viewBox="0 0 32 32" aria-hidden="true"><path d="M16 2a14 14 0 1 0 14 14A14 14 0 0 0 16 2zm0 5a1.5 1.5 0 1 1-1.5 1.5A1.5 1.5 0 0 1 16 7zm4 17.12h-8v-2.24h2.88v-6.76H13v-2.24h4.13v9H20z"></path></svg>

                    <!-- Trans Detail Contents -->
                    <div class="bx--row">
                        <div class="bx--inline-notification__text-wrapper">
                            <div class="bx--col-lg-12">
                                <p class="bx--inline-notification__title">I.D: {{ transaction.id }}</p>
                                <p class="bx--inline-notification__title">Project {{ assignment.title }}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>






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
import Vue from "vue";
import axios from 'axios'
import 'carbon-components/css/carbon-components.css';
import CarbonComponentsVue from '@carbon/vue/src/index';
import { Notification } from 'carbon-components';
import { Modal } from 'carbon-components';
import { mapGetters } from 'vuex';

Vue.use(CarbonComponentsVue);

    export default {
        data() {
            return {
                error: null,
                transaction: null,
                assignment: {
                    title: ''
                }
            }
        },
        mounted() {
            this.fetchTransaction(),
            this.fetchAssignment()
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
            fetchAssignment() {
                axios.get(`/api/assignment/${this.$route.params.id}`)
                .then(response => {
                    if(response.data.status !== "success") {
                        console.log("error ", response)
                    } else this.assignment = response.data.assignment
                })
            }
        },
        components: {
            Notification,
            Modal
        },   
    }
</script>