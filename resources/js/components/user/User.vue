<template>
  <div class="fluid-container">
    <div class="row">
      <div class="col-6">
        <md-table-toolbar>
          <h1 class="md-title accent">Client Profile</h1>
        </md-table-toolbar>
        <div class="card">
          <div class="card-body background">
            <md-table class="table table-hover text">
              <md-table-row>
                <md-table-cell class="subject background">Client I.D</md-table-cell>
                <md-table-cell class="text background">{{ this.$route.params.id }}</md-table-cell>
              </md-table-row>
              <md-table-row>
                <md-table-cell class="subject background">First Name</md-table-cell>
                <md-table-cell class="text background">{{ user.first_name }}</md-table-cell>
              </md-table-row>
              <md-table-row>
                <md-table-cell class="subject background">Last Name</md-table-cell>
                <md-table-cell class="text background">{{ user.last_name }}</md-table-cell>
              </md-table-row>
              <md-table-row>
                <md-table-cell class="subject background">Email</md-table-cell>
                <md-table-cell class="text background">{{ user.email }}</md-table-cell>
              </md-table-row>
              <md-table-row>
                <md-table-cell class="subject background">Address</md-table-cell>
                <md-table-cell class="text background">{{ user.address }}</md-table-cell>
              </md-table-row>
              <md-table-row>
                <md-table-cell class="subject background">Phone Number</md-table-cell>
                <md-table-cell class="text background">{{ user.mobile_number }}</md-table-cell>
              </md-table-row>
            </md-table>
            <md-button
              class="md-raised float-left btnWarning"
              :to="'/admin/users/edit/' + user.id"
            >Edit</md-button>
            <DeleteUser class="float-left" v-bind:id="user.id" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import axios from "axios";
import DeleteUser from "./DeleteUser";
import { MdButton } from "vue-material/dist/components";

Vue.use(MdButton);

export default {
  data() {
    return {
      user: {
        first_name: "",
        last_name: "",
        email: "",
        mobile_number: "",
        address: ""
      }
    };
  },
  mounted() {
    axios.get(`/api/user/${this.$route.params.id}`).then(response => {
      if (response.data.status !== "success") {
        console.log("error ", response);
      } else {
        this.user = response.data.user;
      }
    });
  },
  components: {
    DeleteUser
  }
};
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
