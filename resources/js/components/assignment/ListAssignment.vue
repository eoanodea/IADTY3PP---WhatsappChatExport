<template>
    <div class="fluid-container">
        <md-table-toolbar>
            <h1 class="md-title accent">Projects</h1>
            <md-button class="md-raised md-accent btnAccent" to="/admin/assignments/new">Add Project</md-button>
        </md-table-toolbar>
        <md-table class="background text" md-card v-if="assignments !== null">
            <md-table-row class="background subject">
                <!-- <md-table-head md-numeric>ID</md-table-head> -->
                <md-table-head class="subject">Title</md-table-head>
                <md-table-head class="subject">Standard Price</md-table-head>
                <md-table-head class="background"></md-table-head>
            </md-table-row>
            <md-table-row v-for="assignment in assignments" v-bind:key="assignment.id" class="item">
                <!-- <md-table-cell md-numeric>{{assignment.id}}</md-table-cell> -->
                <md-table-cell class="background text">{{ assignment.title }}</md-table-cell>
                <md-table-cell class="background text">{{assignment.standard_price}}</md-table-cell>
                <md-table-cell class="background text">
                    <md-button :to="'/admin/assignments/show/' + assignment.id" class="md-accent">View Project</md-button>
                    <!-- <md-button :to="'/admin/assignments/edit/' + assignment.id">Edit</md-button> -->
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
