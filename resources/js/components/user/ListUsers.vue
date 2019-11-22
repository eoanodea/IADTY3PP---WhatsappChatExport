<template>
    <div class="container">
        <div class="header">
            <h1>Users</h1>
            <!-- <button v-on:click="addUser()">Add User</button>     -->
            
            <md-button class="md-raised md-primary" to="/admin/users/new">Add User</md-button>

        </div>
        
        <hr />
        
        <div id="fetchData" class="userContainer">
            <div v-for="user in users" v-bind:key="user.id" class="item">
                <h2>{{ user.first_name }}</h2>
                <h2>{{ user.last_name }}</h2>
                <p>Email: {{user.email}}</p>
                <p>Address: {{user.address}}</p>
                <md-button :to="'/admin/users/show/' + user.id">Profile</md-button>
            </div>
        </div>
    </div>

</template>
<script>
    import axios from 'axios';
    import {MdButton} from 'vue-material/dist/components'

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
            addUser: function() {
                console.log("hello")
            }
        },
        components: {
            //
        }
        
    }
</script>
<style>
    .header {
        display: flex;
        justify-content: space-between;
    }
    .userContainer {
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
