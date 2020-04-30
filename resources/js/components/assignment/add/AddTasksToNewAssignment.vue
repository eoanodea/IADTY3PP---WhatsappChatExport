<template>
<div>
    <div v-if="saved" class="saved-container">
        <h2>Project tasks selected!</h2>
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
        <ListTask
            style="text-decoration; none;" 
            v-bind:parentId="serviceId" 
            v-bind:isActive="false" 
            v-bind:actionType="'add'" 
            v-on:selected-tasks="onSelect"
        />
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
        methods: {
            onSelect (items) {
                this.saved = true
                this.tasks = items
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
                this.$emit('selected-tasks', this.tasks)
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

<style lang="scss">
    .saved-container {
        text-align: center;
        & h2 {
            margin-bottom: 20px;
        }
        & button {
            margin: 20px;
        }
    }
</style>