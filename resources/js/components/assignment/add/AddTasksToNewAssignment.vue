/*
 * --------------------
 * Author Name: Eoan O'Dea
 * Author Email: eoan@wspace.ie
 * Date Created: Thursday December 19th 2019 11:24:54 pm
 * --------------------
 * Project Name: IADTY3PPClientMangementSystem
 * Version: 1.0.0
 * --------------------
 * File Name: AddTasksToNewAssignment.vue
 * Last Modified: Friday December 20th 2019 9:21:14 pm
 * --------------------
 * Copyright (c) 2019 WebSpace
 * --------------------
 */



<template>
    <div>
        <md-empty-state
            v-if="saved"
            class="md-accent"
            md-icon="done"
            md-label="Tasks Added"
            md-description="The tasks you selected have been added to this assignment">
            <md-button class="md-primary md-raised" @click="submitted = false">Select Again</md-button>
            <md-button class="md-accent md-raised" @click="submitTasks">Complete Assignment</md-button>
        </md-empty-state>
        <div v-else>
            <md-table v-if="tasks" v-model="tasks" md-card @md-selected="onSelect">
                <md-table-toolbar>
                    <h1 class="md-title">Select tasks</h1>
                    <div class="md-toolbar-section-end">
                        <CreateNewTaskForAssignment v-on:new-task="newTask"/>
                    </div>
                </md-table-toolbar>
                <md-table-toolbar slot="md-table-alternate-header" slot-scope="{ count }">
                    <div class="md-toolbar-section-start">{{ getAlternateLabel(count) }}</div>
                    <div class="md-toolbar-section-end">
                        <md-button class="md-icon-button md-accent md-raised" @click="saved = true" :disabled="saved">
                            <md-icon>check</md-icon>
                        </md-button>
                    </div>
                </md-table-toolbar>
                <md-table-row slot="md-table-row" slot-scope="{ item }" md-selectable="multiple" md-auto-select :disabled="submitted">
                    <md-table-cell md-label="Title" md-sort-by="title">{{item.title + (item.saved === false ? '(Not saved)' : '')}}</md-table-cell>
                    <md-table-cell md-label="Percent Complete" md-sort-by="percent_done">{{item.percent_done}}</md-table-cell>
                </md-table-row>
            </md-table>
            <p v-else>Select a service</p>
        </div>

    </div>
</template>
<script>
    import Vue from 'vue'
    import axios from 'axios';
    import CreateNewTaskForAssignment from './CreateNewTaskForNewAssignment'
    import {MdEmptyState} from 'vue-material/dist/components'

    Vue.use(MdEmptyState)

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
            CreateNewTaskForAssignment
        }
    }
</script>