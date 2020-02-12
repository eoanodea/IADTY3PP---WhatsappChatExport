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

        <!-- Dropdown to choose Project -->
        <cv-dropdown :value="value" name="assignment" id="assignment" v-model="assignmentId" class="cv-dropdown" placeholder="Select a Project">
            <cv-dropdown-item v-for="assignment in assignments" v-bind:key="assignment.id" :value="assignment.id">
                {{assignment.title}}
            </cv-dropdown-item>
        </cv-dropdown>
      </div>
    </div>

    <!-- Active Task Datatable -->
    <div class="bx--col-lg-6">
      <ListTask v-bind:id="user.id" v-bind:isActive="false" />
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
  import Assignment from './../components/assignment/Assignment'
  import ListTask from './../components/task/ListTask'
  import 'carbon-components/css/carbon-components.css';
  import CarbonComponentsVue from '@carbon/vue/src/index';
  import { Modal, DataTable, Loading } from 'carbon-components';
  import { CvDropdown, CvDropdownItem, CvDropdownSkeleton } from '@carbon/vue/src'

  Vue.use(CarbonComponentsVue);

  export default {
    data() {
      return {
        assignmentId: null,
        assignments: [],
        
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
    mounted() {
      this.fetchAssignments()
    //   axios.get(`/api/user/${this.$route.params.id}`).then(response => {
    //     if (response.data.status !== "success") {
    //       console.log("error ", response);
    //     } else {
    //       this.user = response.data.user;
    //     }
    //   });
    },
    methods: {
      fetchAssignments() {
      axios.get('/api/assignment/all')
        .then(response => {
          if(!response.data) {
            console.log('Error no projects', response)
          } else {
            this.assignments = response.data
          }
        })
      },
      returnData() {
        this.$emit('selected-assignment', this.assignmentId)
      }
    },
    components: {
      User,
      Service,
      Assignment,
      ListTask,
      Notification,
      Modal,
      DataTable, 
      Loading,
      CvDropdown, 
      CvDropdownItem, 
      CvDropdownSkeleton
    },
    computed: {
      ...mapGetters({
        user: 'auth/user'
      })
    },
  }
</script>
