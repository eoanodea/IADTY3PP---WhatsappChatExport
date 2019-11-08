<!--
@Author: John Carlo M. Ramos
@Date:   2019-11-08T08:50:10+00:00
@Email:  !!!!!---CTRL + ALT + C = Colour Picker---!!!!!
@Last modified by:   John Carlo M. Ramos
@Last modified time: 2019-11-08T09:11:06+00:00
-->



<template>
    <div class="container">
        <div class="header">
            <h1>Services</h1>
            <!-- <button v-on:click="addService()">Add Service</button>     -->
            <add-service></add-service>
        </div>

        <hr />

        <div id="fetchData" class="serviceContainer">
            <div v-for="service in services" v-bind:key="service.id" class="item">
                <h2>{{ service.title }}</h2>
                <p>Description: {{service.description}}</p>
            </div>
        </div>
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
            axios.get('http://localhost:8000/api/service/all')
            .then(response => (this.services = response.data))
        },
        methods: {
            addService: function() {
                console.log("HEYYOOOO")
            }
        }

    }
</script>
<style>
    .header {
        display: flex;
        justify-content: space-between;
    }
    .serviceContainer {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        margin-bottom: 20px;
    }
    .item {
        width: 100%;
    }
    .item:nth-child(even) {
        background-color: #e6e6e67d;
    }
</style>
