<!--
@Author: John Carlo M. Ramos
@Date:   2019-11-08T08:50:10+00:00
@Email:  !!!!!---CTRL + ALT + C = Colour Picker---!!!!!
@Last modified by:   John Carlo M. Ramos
@Last modified time: 2019-11-08T11:13:54+00:00
-->



<template>
    <div class="container">
        <md-table md-card>
            <md-table-toolbar>
                <h1 class="md-title">Tasks</h1>
                <md-button class="md-raised md-primary" to="/admin/tasks/new">Add Task</md-button>
            </md-table-toolbar>
            
            <md-table-row>
                <md-table-head md-numeric>ID</md-table-head>
                <md-table-head>Name</md-table-head>
                <md-table-head>Standard Price</md-table-head>
                <md-table-head></md-table-head>
            </md-table-row>
            <md-table-row v-for="task in tasks" v-bind:key="task.id" class="item">
                <md-table-cell md-numeric>{{task.id}}</md-table-cell>
                <md-table-cell>{{ task.title }}</md-table-cell>
                <md-table-cell>{{task.description}}</md-table-cell>
                <md-table-cell>
                    <md-button :to="'/admin/tasks/show/' + task.id" class="md-accent">View</md-button>
                    <md-button :to="'/admin/tasks/edit/' + task.id">Edit</md-button>
                </md-table-cell>
            </md-table-row>
        </md-table>
    </div>

</template>
<script>
    import axios from 'axios';

    export default {
        data() {
            return {
                tasks: null
            }
        },
        mounted () {
            axios.get(`http://localhost:8000/api/task/by/${this.$route.params.id}`)
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
