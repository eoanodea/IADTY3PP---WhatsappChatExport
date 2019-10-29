<template>
    <div class="container">
        <h1>Users</h1>
        <hr />
        
        <div id="fetchData" class="userContainer">
            <div v-for="user in users" v-bind:key="user.id" class="item">
                <h2>{{ user.name }}</h2>
                <p>Email: {{user.email}}</p>
            </div>
        </div>
    </div>

</template>
<script>
    import axios from 'axios';

    export default {
        data() {
            return {
                users: null
            }
        },
        mounted () {
            axios.get('http://localhost:8000/api/user/all')
            .then(response => (this.users = response.data))

        }
        
    }
</script>
<style>
    .container {
       width: 100%;
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
