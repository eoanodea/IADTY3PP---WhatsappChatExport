<!--
@Author: John Carlo M. Ramos
@Date:   2019-11-03T22:20:18+00:00
@Email:  !!!!!---CTRL + ALT + C = Colour Picker---!!!!!
@Last modified by:   John Carlo M. Ramos
@Last modified time: 2019-11-08T08:54:53+00:00
-->

<template>
<div class="bx--grid" style="padding: 40px 0px;">
      <!-- Dashboard: <p v-if="user">{{msg}}, {{ user.first_name }}</p> -->
  <div class="bx--row">
    <!-- Client Details (Notification Card)-->
    <div class="bx--col-lg-6">
      <div data-notification class="bx--inline-notification bx--inline-notification--info" role="alert">
        <div class="bx--inline-notification__details">
          <svg focusable="false" preserveAspectRatio="xMidYMid meet" style="will-change: transform;" xmlns="http://www.w3.org/2000/svg" class="bx--inline-notification__icon" width="20" height="20" viewBox="0 0 32 32" aria-hidden="true"><path d="M16 2a14 14 0 1 0 14 14A14 14 0 0 0 16 2zm0 5a1.5 1.5 0 1 1-1.5 1.5A1.5 1.5 0 0 1 16 7zm4 17.12h-8v-2.24h2.88v-6.76H13v-2.24h4.13v9H20z"></path></svg>
          
          <!-- Client Details Contents -->
          <div class="bx--row">
            <div class="bx--inline-notification__text-wrapper">
              <div class="bx--col-lg-12">
                <p class="bx--inline-notification__title">{{ user.first_name }} {{ user.last_name }}</p>
                <p class="bx--inline-notification__subtitle">{{ user.email }}</p>
                <p class="bx--inline-notification__subtitle">{{ user.mobile_number }}</p>
                <p class="bx--inline-notification__subtitle">{{ user.address }}</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Edit and Delete Button -->
        <cv-link :to="'/admin/users/edit/' + user.id" style="text-decoration: none;">
          <button data-notification-btn class="bx--btn bx--btn--lg bx--btn--primary">
            Edit Client
          </button>
        </cv-link>
        <DeleteUser style="text-decoration; none;" class="md-alignment-top-right" v-bind:id="user.id" />
      </div>
    </div>
  </div>
</div>
</template>

<script>
  import Vue from 'vue'
  import axios from 'axios'
  import { mapGetters } from 'vuex'
  import User from './../components/user/User'
  import Service from './../components/service/Service'
  import ListTask from './../components/task/ListTask'
  import 'carbon-components/css/carbon-components.css';
  import CarbonComponentsVue from '@carbon/vue/src/index';
  import { Modal, DataTable, Loading } from 'carbon-components';

  Vue.use(CarbonComponentsVue);

  export default {
    data() {
      return {
        // msg: 'Welcome',
        
        // user: {
        // first_name: "",
        // last_name: "",
        // email: "",
        // mobile_number: "",
        // address: ""
        // },
      };
    },
    // mounted() {
    //   axios.get(`/api/user/${this.$route.params.id}`).then(response => {
    //     if (response.data.status !== "success") {
    //       console.log("error ", response);
    //     } else {
    //       this.user = response.data.user;
    //     }
    //   });
    // },
    components: {
      User,
      Service,
      ListTask,
      Notification,
      Modal,
      DataTable, 
      Loading
    },
    computed: {
      ...mapGetters({
        user: 'auth/user'
      })
    },
  }
</script>
