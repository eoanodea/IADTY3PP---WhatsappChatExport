<!--
@Author: John Carlo M. Ramos
@Date:   2019-11-08T08:50:10+00:00
@Email:  !!!!!---CTRL + ALT + C = Colour Picker---!!!!!
@Last modified by:   John Carlo M. Ramos
@Last modified time: 2019-11-08T11:13:54+00:00
-->



<template>
    <div class="container">
        <md-table md-card v-if="services !== null">
            <md-table-toolbar>
                <h1 class="md-title">Services</h1>
                <md-button class="md-raised md-primary" to="/admin/services/new">Add Service</md-button>
            </md-table-toolbar>
            
            <md-table-row>
                <md-table-head md-numeric>ID</md-table-head>
                <md-table-head>Name</md-table-head>
                <md-table-head>Standard Price</md-table-head>
                <md-table-head></md-table-head>
            </md-table-row>
            <md-table-row v-for="service in services" v-bind:key="service.id" class="item">
                <md-table-cell md-numeric>{{service.id}}</md-table-cell>
                <md-table-cell>{{ service.title }}</md-table-cell>
                <md-table-cell>{{service.standard_price}}</md-table-cell>
                <md-table-cell>
                    <md-button :to="'/admin/services/show/' + service.id" class="md-accent">View</md-button>
                    <md-button :to="'/admin/services/edit/' + service.id">Edit</md-button>
                </md-table-cell>
            </md-table-row>
        </md-table>
        <p v-else>There are no services</p>
    </div>

</template>
<script>
    import axios from 'axios';

    export default {
        data() {
            return {
                services: null
            }
        },
        mounted () {
            axios.get('/api/service/all')
            .then(response => (this.services = response.data))
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
