<template>
    <div>Assignment ID: 
        {{ this.$route.params.id }}
        <h2>{{ assignment.title }}</h2>
        
        <p>Deposit: {{assignment.deposit}}</p>
        <p>Price: {{assignment.total_price}}</p>
        <p>Date of completeion: {{assignment.date_of_completeion}}</p>
        <p>Deadline: {{assignment.deadline}}</p>
        <p>Discount: {{assignment.discount}}</p>
        <p>Completed: {{assignment.completed}}</p>
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
                    total_price: 0.00,
                    deposit: 0.00,
                    date_of_completeion: null,
                    deadline: null,
                    completed: false,
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