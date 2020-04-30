<template>
    <!-- Loading -->
    <loading-indicator v-if="loading"/>
    <!-- Table -->
    <task-table 
        v-bind:title="'Tasks'" 
        v-else-if="tasks !== null && tasks.length > 0"
        v-bind:data="tasks" 
        v-bind:fields="fields" 
        v-bind:showUrl="showUrl" 
        v-bind:addUrl="addUrl" 
        v-bind:loading="loading"
        v-bind:error="error"
        v-bind:active="active"
        v-bind:collection="'task'"
    />
    <!-- Error -->
    <data-error v-else v-bind:error="error" v-bind:collection="collection"/>
</template>

<script>
    import Vue from "vue";
    import axios from 'axios';
    import LoadingIndicator from './../progress/LoadingIndicator'
    import DataError from './../table/DataError'
    import TaskTable from './TaskTable'
    import { mapGetters } from 'vuex';


    export default {
        props: ['parentId', 'isActive'],
        data() {
            return {
                taskId: this.parentId
                    ? this.parentId 
                    : this.$route.params.id,
                active: this.isActive
                    ? this.isActive
                    : (this.$route.params.active === 'true' ? true : false),
                running: true,
                fields: ['title', 'description', 'percent_done'],
                showUrl: `/admin/tasks${this.isActive ? '/true' : '/false'}/show/`,
                addUrl: `/admin/tasks${this.isActive ? '/true' : '/false'}/${this.parentId}/new`,
            }
        },
        created() {
            if(this.tasks.length < 1) {
                this.$store.dispatch('task/loadTasks', [this.taskId, this.isActive])
            }
        },
        methods: {
            //
        },
        watch: {
            //Watch the taskId Prop for changes, on change 
            //fetch new data
            parentId: function(newVal, oldVal) {
                this.taskId = newVal
                this.$store.dispatch('task/loadTasks', [this.taskId, this.isActive])
            }
        },
        computed: {
            ...mapGetters({
                tasks: 'task/tasks',
                pagination: 'task/pagination',
                loading: 'task/loading',
                error: 'task/error'
            })
        },
        components: {
            DataError,
            TaskTable,
            LoadingIndicator
        }
    }
</script>
