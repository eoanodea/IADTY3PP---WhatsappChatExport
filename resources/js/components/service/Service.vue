<template>
<div class="bx--grid" style="padding: 40px 0px;">
    <div class="bx--row">
        <div class="bx--col-lg-6">
            <!-- Service Details (Notification Card) -->
            <div data-notification class="bx--inline-notification bx--inline-notification--info" role="alert">
                <div class="bx--inline-notification__details">
                    <svg focusable="false" preserveAspectRatio="xMidYMid meet" style="will-change: transform;" xmlns="http://www.w3.org/2000/svg" class="bx--inline-notification__icon" width="20" height="20" viewBox="0 0 32 32" aria-hidden="true"><path d="M16 2a14 14 0 1 0 14 14A14 14 0 0 0 16 2zm0 5a1.5 1.5 0 1 1-1.5 1.5A1.5 1.5 0 0 1 16 7zm4 17.12h-8v-2.24h2.88v-6.76H13v-2.24h4.13v9H20z"></path></svg>

                    <!-- Client Details Contents -->
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
            <ListTask v-bind:id="service.id" v-bind:isActive="false" />
        </div>
    </div>






    <!-- Service Details -->
    <!-- <div class="md-layout">
      <div class="md-layout-item">
        <md-table-toolbar>
          <h1 class="md-title accent">Service Details</h1>
          <md-button class="btnWarning" :to="'/admin/services/edit/' + service.id">Edit Details</md-button>
        </md-table-toolbar>
      </div>
    </div>

    <div class="md-layout spacing">
        <div class="md-layout-item md-medium-size-100 md-small-size-100 md-xsmall-size-100">
            <md-card md-with-hover class="md-elevation-10 background">
                <md-ripple>
                    <div class="md-layout-item md-medium-size-100 md-small-size-100 md-xsmall-size-100">
                        <md-card-header class="accent md-display-3">{{ service.title }}</md-card-header>
                        <md-card-header class="text md-display-1">{{ service.description }}</md-card-header>
                        <md-card-header class="subject md-headline">
                            Standard Price: {{service.standard_price}}
                            <br/>
                            Recurring Payment? {{service.recurring_payment}}
                            <br/>
                            Public Service? {{service.is_public}}
                        </md-card-header>
                    </div>
                </md-ripple>
            </md-card>
        </div>
    </div> -->

    <!-- Default Tasks Details -->
    <!-- <div> -->
        <!-- <md-button :to="`/admin/tasks/${false}/` + service.id">Tasks</md-button> -->
        <!-- <ListTask v-bind:id="service.id" v-bind:isActive="false" /> -->
    <!-- </div> -->

    <!-- Delete Service Button -->
    <!-- <md-card-actions>
        <DeleteService v-bind:id="service.id"/>
    </md-card-actions> -->
    
</div>
</template>

<script>
    import Vue from 'vue'
    import axios from 'axios'
    import DeleteService from './DeleteService'
    import ListTask from './../task/ListTask'
    import 'carbon-components/css/carbon-components.css';
    import CarbonComponentsVue from '@carbon/vue/src/index';
    import { Notification } from 'carbon-components';
    import { Modal, DataTable, Loading } from 'carbon-components';

    Vue.use(CarbonComponentsVue);
//     import {
//     MdButton,
//     MdProgress,
//     MdAvatar,
//     MdCard,
//     MdContent,
//     MdElevation,
//     MdIcon,
//     MdImage,
//     MdLayout,
//     MdRipple,
//     MdToolbar
// } from "vue-material/dist/components";

    // Vue.use(MdButton);
    // Vue.use(MdProgress);
    // Vue.use(MdAvatar);
    // Vue.use(MdCard);
    // Vue.use(MdContent);
    // Vue.use(MdElevation);
    // Vue.use(MdIcon);
    // Vue.use(MdImage);
    // Vue.use(MdLayout);
    // Vue.use(MdRipple);
    // Vue.use(MdToolbar);

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
        mounted () {
            axios.get(`/api/service/${this.$route.params.id}`)
            .then(response => {
                if(response.data.status !== "success") {
                    console.log("error ", response)
                } else this.service = response.data.service
            })
        },
        components: {
            DeleteService,
            ListTask,
            Notification,
            Modal,
            DataTable, 
            Loading
        }
    }
</script>