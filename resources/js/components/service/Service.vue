<template>
    <div>Service ID: 
        {{ this.$route.params.id }}
        <h2>{{ service.title }}</h2>
        <h2>{{ service.description }}</h2>
        <p>Recurring Payment: {{service.recurring_payment}}</p>
        <p>Price: {{service.standard_price}}</p>
        <p>Public: {{service.is_public}}</p>
        <md-button :to="'/admin/services/edit/' + service.id">Edit</md-button>
        <DeleteService v-bind:id="service.id"/>
        <md-button :to="'/admin/tasks/' + service.id">Tasks</md-button>

    </div>
</template>

<script>
    import Vue from 'vue'
    import axios from 'axios'
    import DeleteService from './DeleteService'
    import Task from './../task/Task'
    import {MdButton} from 'vue-material/dist/components'

    Vue.use(MdButton);

    export default {
        data() {
            return {
                service: null
            }
        },
        mounted () {
            axios.get(`http://localhost:8000/api/service/${this.$route.params.id}`)
            .then(response => {
                if(response.data.status !== "success") {
                    console.log("error ", response)
                } else this.service = response.data.service
            })
        },
        components: {
            DeleteService,
            Task
        }
    }
</script>