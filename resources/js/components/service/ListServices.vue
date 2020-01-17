<template>
    <div class="fluid-container">
        <md-table-toolbar>
            <h1 class="md-title accent">Services</h1>
            <md-button class="md-raised md-accent btnAccent" to="/admin/services/new">Add Service</md-button>
        </md-table-toolbar>

        <md-table class="background text" md-card v-if="services !== null">
            <!-- <md-table-row>
                <md-table-head md-numeric>ID</md-table-head>
                <md-table-head>Name</md-table-head>
                <md-table-head>Standard Price</md-table-head>
                <md-table-head></md-table-head>
            </md-table-row> -->
            <md-table-row v-for="service in services" v-bind:key="service.id" class="item background">
                <!-- <md-table-cell md-numeric>{{service.id}}</md-table-cell> -->
                <md-table-cell class="background text">{{ service.title }}</md-table-cell>
                <md-table-cell class="background text"><span class="subject">Standard Price:</span> {{service.standard_price}}</md-table-cell>
                <md-table-cell class="background text">
                    <md-button :to="'/admin/services/show/' + service.id" class="accentLight">View Service Details</md-button>
                    <!-- <md-button :to="'/admin/services/edit/' + service.id">Edit</md-button> -->
                </md-table-cell>
            </md-table-row>
        </md-table>
        <p v-else>There are no motivat-I mean Services.</p>
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
