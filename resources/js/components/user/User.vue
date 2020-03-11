<template>
  <loading-indicator v-if="loading"/>
  <div class="bx--grid" style="padding: 40px 0px;" v-else-if="user && user.id">
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

      <!-- Send Message -->
      <div class="bx--col-lg-6">
        <div class="bx--row">
          <div class="bx--col-lg-12">
              <div class="bx--form-item bx--text-input-wrapper">
                  <label for="compose_message" class="bx--label"></label>
                  <div class="bx--text-input__field-wrapper">
                  <textarea 
                      id="text-area-2" 
                      name="compose_message" 
                      type="text" 
                      class="bx--text-area" 
                      placeholder="Send a message"></textarea>
                  </div>
              </div>
          </div>
        </div>

        <!-- Send Message Button -->
        <div class="bx--row">
          <div class="bx--col-lg-12">
            <!-- <cv-link> -->
              <button class="bx--btn bx--btn--lg bx--btn--primary">
                Send
              </button>
            <!-- </cv-link> -->
          </div>
        </div>
      </div>
    </div>

    <!-- Progression Chart -->
    <div class="assignment-container" v-if="assignmentId">
      <!-- Progression Donut -->
      <label 
        for="compose_message" 
        class="bx--label"
        >Project Completion with {{ user.first_name }} {{ user.last_name }}
      </label>

      <Chart v-bind:parentId="assignmentId" style="padding-left:100px;"/>
    </div>
  </div> 
  <data-error v-else v-bind:error="error" v-bind:collection="'user'" />
</template>

<script>
import Vue from "vue";
import axios from "axios";
import DeleteUser from "./DeleteUser";
import Chart from './components/Chart'
import Assignment from '../assignment/Assignment'
import 'carbon-components/css/carbon-components.css';
import CarbonComponentsVue from '@carbon/vue/src/index';
import LoadingIndicator from './../progress/LoadingIndicator'
import { Notification } from 'carbon-components';
import { Modal } from 'carbon-components';
import { mapGetters } from 'vuex';
import DataError from './../table/DataError'

Vue.use(CarbonComponentsVue);

export default {
  data() {
    return {
      userId: this.$route.params.id,
      assignmentId: "1"
    };
  },
    created() {
    this.$store.dispatch('user/loadUser', parseInt(this.$route.params.id))

    if(this.assignments.length < 1) {
      this.$store.dispatch('assignment/loadAssignments')
    }
  },
  methods: {
    returnData() {
      this.$emit('selected-assignment', this.assignmentId)
    }
  },
  components: {
    DeleteUser,
    Notification,
    Modal,
    Chart,
    Assignment,
    LoadingIndicator,
    DataError
  },
  computed: {
    ...mapGetters({
      user: 'user/user',
      loading: 'user/loading',
      error: 'user/error',
      assignments: 'assignment/assignments'
    })
  }
};
</script>
