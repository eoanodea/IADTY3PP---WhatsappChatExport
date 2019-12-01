<template>
    <div>Task ID: 
        {{ this.$route.params.id }}
        <h2>{{ task.title }}</h2>
        <h2>{{ task.description }}</h2>
        <p>Percent Done: {{task.percent_done}}%</p>
        
        <md-button :to="'/admin/tasks/edit/' + task.id">Edit</md-button>
        <DeleteTask v-bind:id="task.id"/>
    </div>
</template>

<script>
    import Vue from 'vue'
    import axios from 'axios'
    import DeleteTask from './DeleteTask'
    import {MdButton} from 'vue-material/dist/components'

    Vue.use(MdButton);

    export default {
        data() {
            return {
                task: {
                    title: '',
                    description: '',
                    percent_done: 0
                }
            }
        },
        mounted () {
            axios.get(`http://localhost:8000/api/task/${this.$route.params.id}`)
            .then(response => {
                if(response.data.status !== "success") {
                    console.log("error ", response)
                } else this.task = response.data.task
            })
        },
        components: {
            DeleteTask
        }
    }
</script>