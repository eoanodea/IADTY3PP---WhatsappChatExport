<!--
@Author: John Carlo M. Ramos
@Date:   2019-11-08T08:50:10+00:00
@Email:  !!!!!---CTRL + ALT + C = Colour Picker---!!!!!
@Last modified by:   John Carlo M. Ramos
@Last modified time: 2019-11-08T11:13:54+00:00
-->



<template>
    <div class="container">
        <md-table md-card v-if="tasks !== null">
            <md-table-toolbar>
                <h1 class="md-title">{{ active == true ? 'Active' : 'Default'}} Tasks</h1>
                <md-button class="md-raised md-primary" :to="`/admin/tasks/${active}/` + serviceId + '/new'">Add Task</md-button>
            </md-table-toolbar>
            <md-table-row>
                <md-table-head md-numeric>ID</md-table-head>
                <md-table-head>Name</md-table-head>
                <md-table-head>Description</md-table-head>
                <md-table-head></md-table-head>
            </md-table-row>
            
            <md-table-row v-for="task in tasks" v-bind:key="task.id" class="item">
                <md-table-cell md-numeric>{{task.id}}</md-table-cell>
                <md-table-cell>{{ task.title }}</md-table-cell>
                <md-table-cell>{{task.description}}</md-table-cell>
                <md-table-cell>
                    <md-button :to="`/admin/tasks/${active}/show/` + task.id" class="md-accent">View</md-button>
                    <md-button :to="`/admin/tasks/${active}/edit/` + task.id">Edit</md-button>
                </md-table-cell>
            </md-table-row>
        </md-table>
        <p v-else>There are no tasks</p>
    </div>

</template>
<script>
    import axios from 'axios';

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
        }

    }
</script>
<style>
    .item {
        background: none!important;
    }
</style>
