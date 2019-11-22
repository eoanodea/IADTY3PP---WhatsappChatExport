<template>
    <div>User ID: 
        {{ this.$route.params.id }}
        <h2>{{ user.first_name }}</h2>
        <h2>{{ user.last_name }}</h2>
        <p>Email: {{user.email}}</p>
        <p>Address: {{user.address}}</p>
        <p>Mobile: {{user.mobile_number}}</p>
        <md-button :to="'/admin/users/edit/' + user.id">Edit</md-button>
        <DeleteUser v-bind:id="user.id"/>
    </div>
</template>

<script>
    import Vue from 'vue'
    import axios from 'axios'
    import DeleteUser from './DeleteUser'
    import {MdButton} from 'vue-material/dist/components'

    Vue.use(MdButton);

    export default {
        data() {
            return {
                user: null
            }
        },
        mounted () {
            axios.get(`http://localhost:8000/api/user/${this.$route.params.id}`)
            .then(response => {
                if(response.data.status !== "success") {
                    console.log("error ", response)
                } else this.user = response.data.user
            })
        },
        components: {
            DeleteUser
        }
    }
</script>