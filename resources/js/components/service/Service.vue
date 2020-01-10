<template>
    <div class="fluid-container">
    <!-- Service Details -->
    <div class="md-layout">
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
    </div>

    <div>Service ID: 
        {{ this.$route.params.id }}
        <h2>{{ service.title }}</h2>
        <h2>{{ service.description }}</h2>
        <p>Recurring Payment: {{service.recurring_payment}}</p>
        <p>Price: {{service.standard_price}}</p>
        <p>Public: {{service.is_public}}</p>
        <!-- <md-button :to="'/admin/services/edit/' + service.id">Edit</md-button> -->
        <DeleteService v-bind:id="service.id"/>
        <md-button :to="`/admin/tasks/${false}/` + service.id">Tasks</md-button>
        <ListTask v-bind:id="service.id" v-bind:isActive="false" />
    </div>
    </div>

    
</template>

<script>
    import Vue from 'vue'
    import axios from 'axios'
    import DeleteService from './DeleteService'
    import ListTask from './../task/ListTask'
    import {
    MdButton,
    MdProgress,
    MdAvatar,
    MdCard,
    MdContent,
    MdElevation,
    MdIcon,
    MdImage,
    MdLayout,
    MdRipple,
    MdToolbar
} from "vue-material/dist/components";

    Vue.use(MdButton);
    Vue.use(MdProgress);
    Vue.use(MdAvatar);
    Vue.use(MdCard);
    Vue.use(MdContent);
    Vue.use(MdElevation);
    Vue.use(MdIcon);
    Vue.use(MdImage);
    Vue.use(MdLayout);
    Vue.use(MdRipple);
    Vue.use(MdToolbar);

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
            ListTask
        }
    }
</script>