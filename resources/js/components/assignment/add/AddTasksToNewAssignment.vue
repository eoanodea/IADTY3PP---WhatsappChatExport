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
        <div class="bx--data-table-container" data-table>
            <!-- Title -->
            <div class="bx--data-table-header">
                <h4 class="bx--data-table-header__title">Tasks</h4>
            </div>

            <!-- Toolbar Contents -->
            <section class="bx--table-toolbar">
                <!-- Persistent Search -->
                <div class="bx--toolbar-content">
                    Add Task<CreateNewTaskForAssignment v-on:new-task="newTask"/>
                </div>
            </section>

            <table v-if="tasks !== null" class="bx--data-table bx--data-table--sort">
                <!-- Headings -->
                <thead>
                    <tr>
                        <!-- Title -->
                        <th>
                            <button class="bx--table-sort" data-event="sort" title="title">
                                <span class="bx--table-header-label">Title</span>
                                <svg focusable="false" preserveAspectRatio="xMidYMid meet" style="will-change: transform;" xmlns="http://www.w3.org/2000/svg" class="bx--table-sort__icon" width="16" height="16" viewBox="0 0 16 16" aria-hidden="true"><path d="M12.3 9.3l-3.8 3.8V1h-1v12.1L3.7 9.3 3 10l5 5 5-5z"></path></svg>
                                <svg focusable="false" preserveAspectRatio="xMidYMid meet" style="will-change: transform;" xmlns="http://www.w3.org/2000/svg" class="bx--table-sort__icon-unsorted" width="16" height="16" viewBox="0 0 16 16" aria-hidden="true"><path d="M13.8 10.3L12 12.1V2h-1v10.1l-1.8-1.8-.7.7 3 3 3-3zM4.5 2l-3 3 .7.7L4 3.9V14h1V3.9l1.8 1.8.7-.7z"></path></svg>
                            </button>
                        </th>

                        <!-- Space for Add Task Buttons -->
                        <th></th>
                    </tr>
                </thead>

                <!-- Body -->
                <tbody v-for="task in tasks" v-bind:key="task.id">
                    <!-- Title -->
                    <td>
                        {{ task.title }}
                    </td>

                    <!-- Check Icon -->
                    <Checkmark />
                </tbody>
            </table>
            <p v-else>Select a Service</p>
        </div>
    </div>

    <!-- <div class="fluid-container">
        <div class="md-layout">
            <div class="md-layout-item">
                <md-table-toolbar>
                    <h1 class="md-title accent">Select Tasks</h1>
                </md-table-toolbar>
            </div>
        </div>

        <md-empty-state
            v-if="saved"
            class="md-accent"
            md-icon="done"
            md-label="Tasks Added"
            md-description="The tasks you selected have been added to this assignment">
            <md-button class="md-primary md-raised" @click="saved = false">Select Again</md-button>
            <md-button class="md-accent md-raised" @click="submitTasks">Complete Assignment</md-button>
        </md-empty-state>
        <div v-else>
            <md-table class="background text" v-if="tasks" v-model="tasks" md-card @md-selected="onSelect">
                <md-table-toolbar class="background text"> -->
                    <!-- <h1 class="md-title">Select tasks</h1> -->
                    <!-- <div class="md-toolbar-section-end background text">
                        <span class="subject">Add Task</span><CreateNewTaskForAssignment v-on:new-task="newTask"/>
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
            <p v-else>Select a Service</p>
        </div>

    </div> -->
</div>
</template>
<script>
    import Vue from 'vue'
    import axios from 'axios';
    import CreateNewTaskForAssignment from './CreateNewTaskForNewAssignment'
    import 'carbon-components/css/carbon-components.css';
    import CarbonComponentsVue from '@carbon/vue/src/index';
    import Checkmark from '@carbon/icons-vue/lib';
    import ListTask from './../../task/ListTask'
    import { DataTable, Loading } from 'carbon-components';

    Vue.use(CarbonComponentsVue);
    // import {MdEmptyState} from 'vue-material/dist/components'

    // Vue.use(MdEmptyState)

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