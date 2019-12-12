<template>
    <div class="fluid-container">

            <md-table-toolbar>
                <h1 class="md-title accent">Clients</h1>
                <md-button class="md-raised md-accent text" to="/admin/users/new">Add Client</md-button>
            </md-table-toolbar>

          <md-table class="background" md-card v-if="users !== null">
            <!-- <md-table-row class="background">
                <md-table-head md-numeric>ID</md-table-head>
                <md-table-head>Name</md-table-head>
                <md-table-head>Email</md-table-head>
                <md-table-head></md-table-head>
            </md-table-row> -->
            <md-table-row v-for="user in users" v-bind:key="user.id" class="item background">
                <!-- <md-table-cell class="background" md-numeric>{{user.id}}</md-table-cell> -->
                <md-table-cell class="background">{{ user.first_name + " " + user.last_name }}</md-table-cell>
                <md-table-cell class="background">{{ user.email }}</md-table-cell>
                <md-table-cell class="background">
                    <md-button :to="'/admin/users/show/' + user.id" class="md-accent">View Profile</md-button>
                    <!-- <md-button :to="'/admin/users/edit/' + user.id">Edit</md-button> -->
                    <!-- <DeleteUser v-bind:id="user.id"/> -->
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
        background: none !important;
    }

    .md-title {
      text-shadow: 1px 1px 2px #000 !important;
    }

    .background {
      background-color: #3b3b3b !important;
      font-size: 18px !important;
      padding: 10px;
    }

    .accent {
      color: #00cc83 !important;
    }

    .text {
      color: #fff !important;
    }
</style>
