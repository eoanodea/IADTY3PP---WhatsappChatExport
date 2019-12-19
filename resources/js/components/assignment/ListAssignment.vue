<!--
@Author: John Carlo M. Ramos
@Date:   2019-11-08T08:50:10+00:00
@Email:  !!!!!---CTRL + ALT + C = Colour Picker---!!!!!
@Last modified by:   John Carlo M. Ramos
@Last modified time: 2019-11-08T11:13:54+00:00
-->



<template>
    <div class="container">
        <md-table md-card v-if="assignments !== null">
            <md-table-toolbar>
                <h1 class="md-title">Assignments</h1>
                <md-button class="md-raised md-primary" to="/admin/assignments/new">Add Assignment</md-button>
            </md-table-toolbar>
            
            <md-table-row>
                <md-table-head md-numeric>ID</md-table-head>
                <md-table-head>Name</md-table-head>
                <md-table-head>Standard Price</md-table-head>
                <md-table-head></md-table-head>
            </md-table-row>
            <md-table-row v-for="assignment in assignments" v-bind:key="assignment.id" class="item">
                <md-table-cell md-numeric>{{assignment.id}}</md-table-cell>
                <md-table-cell>{{ assignment.title }}</md-table-cell>
                <md-table-cell>{{assignment.standard_price}}</md-table-cell>
                <md-table-cell>
                    <md-button :to="'/admin/assignments/show/' + assignment.id" class="md-accent">View</md-button>
                    <md-button :to="'/admin/assignments/edit/' + assignment.id">Edit</md-button>
                </md-table-cell>
            </md-table-row>
        </md-table>
        <p v-else>There are no assignments</p>
    </div>

</template>
<script>
    import axios from 'axios';

    export default {
        data() {
            return {
                assignments: null
            }
        },
        mounted () {
            axios.get('/api/assignment/all')
            .then(response => (this.assignments = response.data))
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
