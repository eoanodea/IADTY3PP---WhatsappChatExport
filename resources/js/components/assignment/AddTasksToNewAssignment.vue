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
 * Last Modified: Thursday December 19th 2019 11:53:35 pm
 * --------------------
 * Copyright (c) 2019 WebSpace
 * --------------------
 */



<template>
    <div>
    <md-table v-if="tasks" v-model="tasks" md-card @md-selected="onSelect">
        <md-table-toolbar>
            <h1 class="md-title">Select tasks</h1>
        </md-table-toolbar>
        <md-table-toolbar slot="md-table-alternate-header" slot-scope="{ count }">
        <div class="md-toolbar-section-start">{{ getAlternateLabel(count) }}</div>

        <div class="md-toolbar-section-end">
          <md-button class="md-icon-button">
            <md-icon>delete</md-icon>
          </md-button>
        </div>
        </md-table-toolbar>
        <md-table-row slot="md-table-row" slot-scope="{ item }" md-selectable="multiple" md-auto-select>
            <md-table-cell md-label="Title" md-sort-by="title">{{item.title}}</md-table-cell>
            <md-table-cell md-label="Percent Complete" md-sort-by="percent_done">{{item.percent_done}}</md-table-cell>
        </md-table-row>
      
    </md-table>
    <p v-else>Select a service</p>
    </div>
</template>
<script>
    import axios from 'axios';

    export default {
        props: ['serviceId'],
        data() {
            return {
                tasks: null,
                selected: []
            }
        },
        mounted() {
            axios.get(`/api/task/by/${this.serviceId}`)
            .then(response => {
                if(response.data.status !== 'success') console.log('error', response.data)
                else {
                    this.tasks = response.data.task
                }
            })
        },
        methods: {
            onSelect (items) {
                this.selected = items
            },
            getAlternateLabel (count) {
                let plural = ''

                if (count > 1) {
                plural = 's'
                }

                return `${count} user${plural} selected`
            }
        }
    }
</script>