<template>
    <div class="fluid-container">

      <md-table-toolbar>
        <h1 class="md-title accent">Client Profile</h1>
      </md-table-toolbar>

      <div class="row">
        <div class="col-6">
          <div class="card background">
            <div class="card-body">
              <table class="table table-hover text">
                <tbody>
                  <tr>
                    <td class="subject">Client I.D</td>
                    <td class="text">{{ this.$route.params.id }}</td>
                  </tr>
                  <tr>
                    <td class="subject">First Name</td>
                    <td class="text">{{ user.first_name }}</td>
                  </tr>
                  <tr>
                    <td class="subject">Last Name</td>
                    <td class="text">{{ user.last_name }}</td>
                  </tr>
                  <tr>
                    <td class="subject">Email</td>
                    <td class="text">{{ user.email }}</td>
                  </tr>
                  <tr>
                    <td class="subject">Address</td>
                    <td class="text">{{ user.address }}</td>
                  </tr>
                  <tr>
                    <td class="subject">Phone Number</td>
                    <td class="text">{{ user.mobile_number }}</td>
                  </tr>
            <!-- <div v-if="client !== null">
                <p>Client info:</p>
                <p>{{client.user_id}}</p>
            </div> -->
            <md-button class="md-raised float-left btnWarning" :to="'/admin/users/edit/' + user.id">Edit</md-button>
            <DeleteUser class="float-left" v-bind:id="user.id"/>
          </tbody>
          </table>
          </div>
          </div>
        </div>
      </div>
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
                user: {
                    first_name: '',
                    last_name: '',
                    email: '',
                    mobile_number: '',
                    address: '',
                },
                client: {}
            }
        },
        mounted () {
            axios.get(`/api/user/${this.$route.params.id}`)
            .then(response => {
                if(response.data.status !== "success") {
                    console.log("error ", response)
                } else {
                    this.user = response.data.user
                    response.data.client ? this.client = response.data.client : null
                }
            })
        },
        components: {
            DeleteUser
        }
    }
</script>
<style>
    .background {
      background-color: #3b3b3b !important;
      font-size: 18px !important;
      padding: 10px;
    }

    .editBtn {
      color: #fff !important;
      background-color: #ffcc66 !important;
    }

    .delBtn {
      color: #fff !important;
      background-color: #ee4444 !important;
    }

    .accent {
      color: #00cc83 !important;
    }

    .subject {
      color: #818181 !important;
    }

    .text {
      color: #fff !important;
    }
</style>
