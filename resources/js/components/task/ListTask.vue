<template>
    <div class="bx--grid">
        <div class="bx--data-table-container" data-table>
            <!-- Title -->
            <div class="bx--data-table-header">
                <h4 class="bx--data-table-header__title">Default Tasks</h4>
            </div>

            <!-- Toolbar Contents -->
            <section class="bx--table-toolbar">
                <!-- Persistent Search -->
                <div class="bx--toolbar-content">
                    <cv-link :to="`/admin/tasks/${active}/` + serviceId + '/new'" style="text-decoration: none;">
                        <button class="bx--btn bx--btn--lg bx--btn--primary">
                            Add Default Task 
                            <svg focusable="false" preserveAspectRatio="xMidYMid meet" style="will-change: transform;" xmlns="http://www.w3.org/2000/svg" class="bx--btn__icon" width="20" height="20" viewBox="0 0 32 32" aria-hidden="true"><path d="M17 15V7h-2v8H7v2h8v8h2v-8h8v-2h-8z"></path></svg>
                        </button>
                    </cv-link>
                </div>
            </section>

            <!-- Table -->
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

                        <!-- Description -->
                        <th>
                            <button class="bx--table-sort" data-event="sort" title="description">
                                <span class="bx--table-header-label">Description</span>
                                <svg focusable="false" preserveAspectRatio="xMidYMid meet" style="will-change: transform;" xmlns="http://www.w3.org/2000/svg" class="bx--table-sort__icon" width="16" height="16" viewBox="0 0 16 16" aria-hidden="true"><path d="M12.3 9.3l-3.8 3.8V1h-1v12.1L3.7 9.3 3 10l5 5 5-5z"></path></svg>
                                <svg focusable="false" preserveAspectRatio="xMidYMid meet" style="will-change: transform;" xmlns="http://www.w3.org/2000/svg" class="bx--table-sort__icon-unsorted" width="16" height="16" viewBox="0 0 16 16" aria-hidden="true"><path d="M13.8 10.3L12 12.1V2h-1v10.1l-1.8-1.8-.7.7 3 3 3-3zM4.5 2l-3 3 .7.7L4 3.9V14h1V3.9l1.8 1.8.7-.7z"></path></svg>
                            </button>
                        </th>

                        <!-- Space for View Profile Buttons -->
                    	<th></th>
                    </tr>
                </thead>

                <!-- Body -->
                <tbody v-for="task in tasks" v-bind:key="task.id">
                    <!-- Title -->
                    <td>
                        {{ task.title }}
                    </td>

                    <!-- Description -->
                    <td>
                        {{task.description}}
                    </td>

                    <!-- View Task Button -->
                    <td>
                        <cv-link :to="`/admin/tasks/${active}/show/` + task.id" style="text-decoration: none;"> 
                            <button class="bx--btn bx--btn--lg bx--btn--tertiary" data-event="sort" title="default_task">
                                View Default Task
                            </button>
                        </cv-link>
                    </td>
                </tbody>
            </table>

            <!-- Loading/Error -->
            <div v-else>
            <p>Please wait while we load up your default tasks.</p>
                <div data-loading class="bx--loading">
                    <svg class="bx--loading__svg" viewBox="-75 -75 150 150">
                        <title>Loading</title>
                        <circle class="bx--loading__stroke" cx="0" cy="0" r="37.5" />
                    </svg>
                </div>
            </div>
        </div>









        <!-- <md-table-toolbar>
            <h1 class="md-title accent">Default Tasks</h1>
            <md-button class="md-raised md-accent btnAccent" :to="`/admin/tasks/${active}/` + serviceId + '/new'">Add Default Task</md-button>
        </md-table-toolbar>


        <md-table class="background text" md-card v-if="tasks !== null">
            <md-table-row class="background subject"> -->
                <!-- <md-table-head md-numeric>ID</md-table-head> -->
                <!-- <md-table-head class="subject">Title</md-table-head>
                <md-table-head class="subject">Description</md-table-head>
                <md-table-head></md-table-head>
            </md-table-row>
            <md-table-row v-for="task in tasks" v-bind:key="task.id" class="item"> -->
                <!-- <md-table-cell md-numeric>{{task.id}}</md-table-cell> -->
                <!-- <md-table-cell class="background text">{{ task.title }}</md-table-cell>
                <md-table-cell class="background text">{{task.description}}</md-table-cell>
                <md-table-cell class="background text">
                    <md-button :to="`/admin/tasks/${active}/show/` + task.id" class="md-accent">View Task</md-button> -->
                    <!-- <md-button :to="`/admin/tasks/${active}/edit/` + task.id">Edit</md-button> -->
                <!-- </md-table-cell>
            </md-table-row>
        </md-table>
        <p v-else>There are no Default Tasks.</p> -->
    </div>

</template>
<script>
import Vue from "vue";
import axios from 'axios';
import 'carbon-components/css/carbon-components.css';
import CarbonComponentsVue from '@carbon/vue/src/index';
import { DataTable, Loading } from 'carbon-components';

Vue.use(CarbonComponentsVue);

    export default {
        props: ['id', 'isActive'],
        data() {
            return {
                tasks: null,
                serviceId: this.$route.params.id
                    ? this.$route.params.id
                    : this.id,
                active: this.$route.params.active
                    ? (this.$route.params.active === 'true' ? true : false)
                    : this.isActive
            }
        },
        //When the component mounts, check if the task is active or default
        //Modify the fetch URL with result and fetch tasks
        mounted () {
            const url = this.active === false
            ? 'task'
            : 'task/active'
            
            axios.get(`/api/${url}/by/${this.serviceId}`)
            .then(response => (this.tasks = response.data.task))
        },
        methods: {
            //
        },
        components: {
            DataTable,
            Loading
        }
    }
</script>
