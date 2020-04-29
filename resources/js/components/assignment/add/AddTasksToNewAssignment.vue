<template>
<div>
    <div v-if="saved">
        <button 
            @click="saved = false" 
            class="bx--btn bx--btn--lg bx--btn--primary"
            >
                Select Again
        </button>

        <button
            @click="submitTasks"
            class="bx--btn bx--btn--lg bx--btn--primary"
        >
            Complete Project
        </button>
    </div>

    <div v-else>
        <ListTask style="text-decoration; none;" v-bind:parentId="assignment.id" v-bind:isActive="true" />
    </div>
</div>
</template>

<script>
    import Vue from 'vue'
    import axios from 'axios';
    import CreateNewTaskForAssignment from './CreateNewTaskForNewAssignment'
    
    
    import Checkmark from '@carbon/icons-vue/lib';
    import ListTask from './../../task/ListTask'
    import { DataTable, Loading } from 'carbon-components';

    

    export default {
        //This component will only work 
        //when it is given a serviceId as a prop
        props: ['serviceId'],
        data() {
            return {
                tasks: null,
                selected: [],
                submitted: false,
                saved: false
            }
        },
        created() {
            this.fetchData()
        },
        watch: { 
            //Watch the serviceId Prop for changes, on change 
            //fetch new data
            serviceId: function(newVal, oldVal) {
                this.fetchData()
            }
        },
        methods: {
            fetchData() {
                axios.get(`/api/task/by/${this.serviceId}`)
                .then(response => {
                    if(response.data.status !== 'success') console.log('error', response.data)
                    else {
                        this.tasks = response.data.task
                    }
                })
            },
            onSelect (items) {
                this.selected = items
            },
            getAlternateLabel (count) {
                let plural = ''

                if (count > 1) {
                    plural = 's'
                }

                return `${count} task${plural} selected`
            },
            newTask(task) {
                const lastTaskId = this.tasks[this.tasks.length - 1].id
                let newTask = task
                newTask.id = lastTaskId + 1
                newTask.saved = false
                this.tasks.push(task)
            },
            submitTasks() {
                this.submitted = true
                const {selected} = this
                this.$emit('selected-tasks', selected)
            }
        },
        components: {
            CreateNewTaskForAssignment,
            Checkmark,
            DataTable, 
            Loading,
            ListTask
        }
    }
</script>