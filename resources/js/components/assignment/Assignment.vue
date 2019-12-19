<template>
    <div>Assignment ID: 
        {{ this.$route.params.id }}
        <h2>{{ assignment.title }}</h2>
        <h2>{{ assignment.description }}</h2>
        <p>Recurring Payment: {{assignment.recurring_payment}}</p>
        <p>Price: {{assignment.standard_price}}</p>
        <p>Public: {{assignment.is_public}}</p>
        <md-button :to="'/admin/assignments/edit/' + assignment.id">Edit</md-button>
        <DeleteAssignment v-bind:id="assignment.id"/>
        <md-button :to="`/admin/tasks/${true}/` + assignment.id">Tasks</md-button>
        <ListTask v-bind:id="assignment.id" v-bind:isActive="true" />

    </div>
</template>

<script>
    import Vue from 'vue'
    import axios from 'axios'
    import DeleteAssignment from './DeleteAssignment'
    import ListTask from './../task/ListTask'
    import {MdButton} from 'vue-material/dist/components'

    Vue.use(MdButton);

    export default {
        data() {
            return {
                assignment: {
                    title: '',
                    description: '',
                    recurring_payment: false,
                    standard_price: 0,
                    is_public: false
                }
            }
        },
        mounted () {
            axios.get(`/api/assignment/${this.$route.params.id}`)
            .then(response => {
                if(response.data.status !== "success") {
                    console.log("error ", response)
                } else this.assignment = response.data.assignment
            })
        },
        components: {
            DeleteAssignment,
            ListTask
        }
    }
</script>