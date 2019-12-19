<template>
    <div>Task ID: 
        {{ this.$route.params.id }}
        <div v-if="this.$route.params.active !== 'false'">
        <p>active</p>    
        </div>
        <p v-else>not active</p>   
        <h2>{{ task.title }}</h2>
        <h2>{{ task.description }}</h2>
        <p>Percent Done: {{task.percent_done}}%</p>
        
        <md-button :to="`/admin/tasks/${active}/edit/` + task.id">Edit</md-button>
        <DeleteTask v-bind:id="task.id" v-bind:isActive="active" />
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
                },
                active: this.$route.params.active
                    ? this.$route.params.active
                    : this.isActive
            }
        },
        mounted () {
            const url = this.active == 'false'
            ? 'task'
            : 'task/active'
            axios.get(`/api/${url}/${this.$route.params.id}`)
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