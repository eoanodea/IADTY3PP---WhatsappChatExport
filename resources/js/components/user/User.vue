<template>
  <div class="bx--grid">
    <!-- Client Details (Notification Card)-->
    <div data-notification class="bx--inline-notification bx--inline-notification--info" role="alert">
      <div class="bx--inline-notification__details">
        <svg focusable="false" preserveAspectRatio="xMidYMid meet" style="will-change: transform;" xmlns="http://www.w3.org/2000/svg" class="bx--inline-notification__icon" width="20" height="20" viewBox="0 0 32 32" aria-hidden="true"><path d="M16 2a14 14 0 1 0 14 14A14 14 0 0 0 16 2zm0 5a1.5 1.5 0 1 1-1.5 1.5A1.5 1.5 0 0 1 16 7zm4 17.12h-8v-2.24h2.88v-6.76H13v-2.24h4.13v9H20z"></path></svg>
        
        <!-- Client Details Contents -->
        <div class="bx--row">
          <div class="bx--inline-notification__text-wrapper">
            <div class="bx--col-lg-16">
              <p class="bx--inline-notification__title">{{ user.first_name }} {{ user.last_name }}</p>
              <p class="bx--inline-notification__subtitle">{{ user.email }}</p>
              <p class="bx--inline-notification__subtitle">{{ user.mobile_number }}</p>
              <p class="bx--inline-notification__subtitle">{{ user.address }}</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Edit Button -->
        <div class="bx--row">
          <cv-link :to="'/admin/users/edit/' + user.id">
            <button data-notification-btn class="bx--btn bx--btn--sm bx--btn--primary">
              Edit Client
            </button>
          </cv-link>
        </div>
    </div>

    <!-- Send Message -->
    <div class="bx--row">
      <div class="bx--col-lg-12">
          <div class="bx--form-item bx--text-input-wrapper">
              <label for="compose_message" class="bx--label">Send a message to {{ user.first_name }} {{ user.last_name }}</label>
              <div class="bx--text-input__field-wrapper">
              <textarea 
                  id="text-area-2" 
                  name="compose_message" 
                  type="text" 
                  class="bx--text-area"
                  rows="4" 
                  cols="50"
                  placeholder="Compose Message"></textarea>
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

    <!-- Delete Client Button -->
    <div class="bx--row">
      <div class="bx--col-lg-12">
        <!-- <cv-link> -->
          <!-- <button data-notification-btn class="bx--btn bx--btn--sm bx--btn--danger"> -->
            <DeleteUser class="md-alignment-top-right" v-bind:id="user.id" />
          <!-- </button> -->
        <!-- </cv-link> -->
      </div>
    </div>

    <!-- Client Profile -->
    <!-- <div class="md-layout"> -->
      <!-- <div class="md-layout-item"> -->
        <!-- <md-table-toolbar> -->
          <!-- <h1 class="md-title accent">Client Profile</h1> -->
          <!-- <md-button class="btnWarning" :to="'/admin/users/edit/' + user.id">Edit Details</md-button> -->
        <!-- </md-table-toolbar> -->
      <!-- </div> -->
    <!-- </div> -->

    <!-- <md-card-header class="md-layout spacing">
      <md-card-header class="md-layout-item md-medium-size-100 md-small-size-100 md-xsmall-size-100">
        <md-card class="background">
          <md-avatar class="md-avatar-icon md-large md-elevation-5 md-accent"></md-avatar>
          <md-card-header class="md-layout-item md-medium-size-100 md-small-size-100 md-xsmall-size-100">
            <md-card-header class="accent md-display-3">{{ user.first_name }} {{ user.last_name }}</md-card-header>
            <md-card-header class="text md-display-1">{{ user.email }}</md-card-header>
            <md-card-header class="subject md-headline">
              {{ user.address }}
              <br />
              {{ user.mobile_number }}
            </md-card-header>
          </md-card-header>
        </md-card>
      </md-card-header>
    </md-card-header> -->

    <!-- Send Message -->
    <!-- <div class="md-layout"> -->
      <!-- <div class="md-layout-item"> -->
        <!-- <md-table-toolbar> -->
          <!-- <h1 class="md-title accent">Send Message</h1> -->
        <!-- </md-table-toolbar> -->
      <!-- </div>
    </div> -->

    <!-- <md-field>
      <label class="accent" for="compose_message">Compose Message</label>
      <md-input
        name="Compose Message"
        type="text"
        class="form-control"
        placeholder="Compose Message"
        autocomplete="given-name"
      />
    </md-field>

    <md-card-actions>
      <md-button type="submit" :disabled="submitting" class="md-primary md-raised btnAccent">Send</md-button>
    </md-card-actions> -->

    <!-- Project Completion -->
    <div class="md-layout">
      <div class="md-layout-item">
        <!-- <md-table-toolbar> -->
          <h1 class="md-title accent">Project Completion</h1>
        <!-- </md-table-tool  bar> -->
      </div>
    </div>

    <!-- <div class="md-layout">
      <md-card-actions class="progessSpinner">
        <input type="range" v-model.number="amount" />
        {{ amount }}%
        <h1 class="progressSpinner spinnerColor">{{ amount }}%</h1>
      </md-card-actions>
      <md-progress-spinner
        class="md-accent"
        md-mode="determinate"
        :md-value="amount"
        :md-diameter="600"
        :md-stroke="30"
      ></md-progress-spinner>
    </div> -->

    <progressSpinner/>

    <!-- Delete Client Button -->
    <md-card-actions>
      <DeleteUser class="md-alignment-top-right" v-bind:id="user.id" />
    </md-card-actions>
  </div>
</template>

<script>
import Vue from "vue";
import axios from "axios";
import DeleteUser from "./DeleteUser";
import progressSpinner from "./components/progressSpinner";
import {
  MdButton,
  MdAvatar,
  MdCard,
  MdContent,
  MdElevation,
  MdIcon,
  MdImage,
  MdLayout,
  MdToolbar
} from "vue-material/dist/components";
import 'carbon-components/css/carbon-components.css';
import CarbonComponentsVue from '@carbon/vue/src/index';
import { Notification } from 'carbon-components';
import { Modal } from 'carbon-components';
// import { CvModal } from '@carbon/vue/src';

Vue.use(CarbonComponentsVue);

Vue.use(MdButton);
Vue.use(MdAvatar);
Vue.use(MdCard);
Vue.use(MdContent);
Vue.use(MdElevation);
Vue.use(MdIcon);
Vue.use(MdImage);
Vue.use(MdLayout);
Vue.use(MdToolbar);

export default {
  data() {
    return {
      user: {
        first_name: "",
        last_name: "",
        email: "",
        mobile_number: "",
        address: ""
      },
      amount: 70
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
    DeleteUser,
    progressSpinner,
    Notification,
    Modal
    // CvModal
  }
};
</script>

<style>
/* .background {
  background-color: #003153 !important;
  font-size: 18px !important;
  padding: 10px;
}

.text {
  color: #fff !important;
} */

/* .md-progress-spinner {
  /* top: 50%;
  left: 50%; */
  /* display: block; */
  /* position: relative; */
  /* width: 100%; */
  /* height: auto; */
  /* margin-left: -375px; */
/* } */

/* .progressSpinner {
  /* top: 50%; */
  /* left: 145%; */
  /* display: block; */
  /* position: relative; */
  /* width: 100%; */
  /* height: auto; */
  /* margin-left: -375px; */
/* }  */

/* .spinnerColor {
  color: #24b6f7 !important;
} */ 
</style>
