<template>
  <div class="bx--grid" style="padding: 40px 0px;" v-if="user">
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
    <Chart />




    <!-- Progression Indicator -->
    <!-- <br/>
    <label for="compose_message" class="bx--label">Project Completion with {{ user.first_name }} {{ user.last_name }}</label>
    <div class="bx--row">
      <div class="bx--col-lg-12">
        <progressIndicator v-bind:id="user.id"/>
      </div>
    </div>
  </div> -->
  <!-- <div v-else-if="error">
    <h2>Error!!</h2>
    {{error}}
  </div>
  <div v-else>
    <h1>strange error</h1> -->
  </div>
</template>

<script>
import Vue from "vue";
import axios from "axios";
import DeleteUser from "./DeleteUser";
import Chart from './components/Chart';
import 'carbon-components/css/carbon-components.css';
import CarbonComponentsVue from '@carbon/vue/src/index';
import { Notification } from 'carbon-components';
import { Modal } from 'carbon-components';
import { mapGetters } from 'vuex';

Vue.use(CarbonComponentsVue);

export default {
  data() {
    return {
      userId: this.$route.params.id,
      amount: 70
    };
  },
    created() {
    this.$store.dispatch('user/loadUser', parseInt(this.$route.params.id))
  },
  components: {
    DeleteUser,
    Chart,
    Notification,
    Modal
  },
  computed: {
    ...mapGetters({
      user: 'user/user',
      error: 'user/error'
    })
  }
};
</script>
