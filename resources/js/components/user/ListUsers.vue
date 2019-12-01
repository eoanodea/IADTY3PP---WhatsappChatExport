<template>
    <div class="container">
        <md-table md-card v-if="users !== null">
            <md-table-toolbar>
                <h1 class="md-title">Users</h1>
                <md-button class="md-raised md-primary" to="/admin/users/new">Add User</md-button>
            </md-table-toolbar>
            
            <md-table-row>
                <md-table-head md-numeric>ID</md-table-head>
                <md-table-head>Name</md-table-head>
                <md-table-head>Email</md-table-head>
                <md-table-head></md-table-head>
            </md-table-row>
            <md-table-row v-for="user in users" v-bind:key="user.id" class="item">
                <md-table-cell md-numeric>{{user.id}}</md-table-cell>
                <md-table-cell>{{ user.first_name + " " + user.last_name }}</md-table-cell>
                <md-table-cell>{{ user.email }}</md-table-cell>
                <md-table-cell>
                    <md-button :to="'/admin/users/show/' + user.id" class="md-accent">Profile</md-button>
                    <md-button :to="'/admin/users/edit/' + user.id">Edit</md-button>
                    <DeleteUser v-bind:id="user.id"/> 
                </md-table-cell>
            </md-table-row>
        </md-table>
        <p v-else>There are no users</p>
    </div>

</template>
<script>
    import Vue from 'vue'
    import axios from 'axios';
    import {MdButton, MdTable, MdRipple} from 'vue-material/dist/components'
    import DeleteUser from './DeleteUser'

    Vue.use(MdTable)
    Vue.use(MdRipple)
    export default {
        data() {
            return {
                users: null
            }
        },
        mounted () {
            axios.get('http://localhost:8000/api/user/all')
            .then(response => (this.users = response.data))
        },
        methods: {
            //
        },
        components: {
            DeleteUser
        }
        
    }
</script>
<style>
    .item {
        background: none!important;
    }
</style>
