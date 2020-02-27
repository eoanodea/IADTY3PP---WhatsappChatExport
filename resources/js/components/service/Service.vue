<template>
<div class="bx--grid" style="padding: 40px 0px;" v-if="service">
    <div class="bx--row">
        <div class="bx--col-lg-6">
            <!-- Service Details (Notification Card) -->
            <div data-notification class="bx--inline-notification bx--inline-notification--info" role="alert">
                <div class="bx--inline-notification__details">
                    <svg focusable="false" preserveAspectRatio="xMidYMid meet" style="will-change: transform;" xmlns="http://www.w3.org/2000/svg" class="bx--inline-notification__icon" width="20" height="20" viewBox="0 0 32 32" aria-hidden="true"><path d="M16 2a14 14 0 1 0 14 14A14 14 0 0 0 16 2zm0 5a1.5 1.5 0 1 1-1.5 1.5A1.5 1.5 0 0 1 16 7zm4 17.12h-8v-2.24h2.88v-6.76H13v-2.24h4.13v9H20z"></path></svg>

                    <!-- Serivce Details Contents -->
                    <div class="bx--row">
                        <div class="bx--inline-notification__text-wrapper">
                            <div class="bx--col-lg-12">
                                <p class="bx--inline-notification__title">{{ service.title }}</p>
                                <p class="bx--inline-notification__title">{{ service.description }}</p>
                                <p class="bx--inline-notification__title">Standard Price: {{service.standard_price}}</p>
                                <p class="bx--inline-notification__title">Recurring Payment? {{service.recurring_payment}}</p>
                                <p class="bx--inline-notification__title">Public Service? {{service.is_public}}</p>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Edit Button -->
                <cv-link :to="'/admin/services/edit/' + service.id" style="text-decoration: none;">
                    <button data-notification-btn class="bx--btn bx--btn--lg bx--btn--primary">
                        Edit Service
                    </button>
                </cv-link>
                <DeleteService v-bind:id="service.id"/>
            </div>
        </div>

        <!-- Default Tasks Table -->
        <br/>
        <div class="bx--col-lg-6">
            <ListTask v-bind:parentId="service.id" v-bind:isActive="false" />
        </div>
    </div>
</div>
</template>

<script>
    import Vue from 'vue';
    import axios from 'axios';
    import DeleteService from './DeleteService';
    import ListTask from './../task/ListTask';
    import 'carbon-components/css/carbon-components.css';
    import CarbonComponentsVue from '@carbon/vue/src/index';
    import { Notification } from 'carbon-components';
    import { Modal, DataTable, Loading } from 'carbon-components';
    import { mapGetters } from 'vuex';

    Vue.use(CarbonComponentsVue);

    export default {
        data() {
            return {
                service: {
                    title: '',
                    description: '',
                    recurring_payment: false,
                    standard_price: 0,
                    is_public: false
                }
            }
        },
        created() {
            this.$store.dispatch('service/loadService', parseInt(this.$route.params.id))
        },
        // mounted () {
        //     axios.get(`/api/service/${this.$route.params.id}`)
        //     .then(response => {
        //         if(response.data.status !== "success") {
        //             console.log("error ", response)
        //         } else this.service = response.data.service
        //     })
        // },
        components: {
            DeleteService,
            ListTask,
            Notification,
            Modal,
            DataTable, 
            Loading
        },
        computed: {
            ...mapGetters({
            service: 'service/service',
            error: 'service/error'
            })
        }
    }
</script>