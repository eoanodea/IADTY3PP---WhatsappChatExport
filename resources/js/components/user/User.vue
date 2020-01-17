<template>
  <div class="fluid-container">
    <!-- Client Profile -->
    <div class="md-layout">
      <div class="md-layout-item">
        <md-table-toolbar>
          <h1 class="md-title accent">Client Profile</h1>
          <md-button class="btnWarning" :to="'/admin/users/edit/' + user.id">Edit Details</md-button>
        </md-table-toolbar>
      </div>
    </div>

    <div class="md-layout spacing">
      <div class="md-layout-item md-medium-size-100 md-small-size-100 md-xsmall-size-100">
        <md-card md-with-hover class="background">
          <md-avatar class="md-avatar-icon md-large md-elevation-5 md-accent"></md-avatar>
          <div class="md-layout-item md-medium-size-100 md-small-size-100 md-xsmall-size-100">
            <md-card-header class="accent md-display-3">{{ user.first_name }} {{ user.last_name }}</md-card-header>
            <md-card-header class="text md-display-1">{{ user.email }}</md-card-header>
            <md-card-header class="subject md-headline">
              {{ user.address }}
              <br />
              {{ user.mobile_number }}
            </md-card-header>
          </div>
        </md-card>
      </div>
    </div>

    <!-- Send Message -->
    <div class="md-layout">
      <div class="md-layout-item">
        <md-table-toolbar>
          <h1 class="md-title accent">Send Message</h1>
        </md-table-toolbar>
      </div>
    </div>

    <md-field>
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
    </md-card-actions>

    <!-- Project Completion -->
    <div class="md-layout">
      <div class="md-layout-item">
        <md-table-toolbar>
          <h1 class="md-title accent">Project Completion</h1>
        </md-table-toolbar>
      </div>
    </div>

    <div class="md-layout">
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
    </div>

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
import {
  MdButton,
  MdProgress,
  MdAvatar,
  MdCard,
  MdContent,
  MdElevation,
  MdIcon,
  MdImage,
  MdLayout,
  MdRipple,
  MdToolbar
} from "vue-material/dist/components";

Vue.use(MdButton);
Vue.use(MdProgress);
Vue.use(MdAvatar);
Vue.use(MdCard);
Vue.use(MdContent);
Vue.use(MdElevation);
Vue.use(MdIcon);
Vue.use(MdImage);
Vue.use(MdLayout);
Vue.use(MdRipple);
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
    DeleteUser
  }
};
</script>

<style>
.background {
  background-color: #003153 !important;
  font-size: 18px !important;
  padding: 10px;
}

.text {
  color: #fff !important;
}

.md-progress-spinner {
  top: 50%;
  left: 50%;
  display: block;
  position: absolute;
  width: 100%;
  height: auto;
  margin-left: -375px;
}

.progressSpinner {
  top: 50%;
  left: 50%;
  display: block;
  position: relative;
  width: 100%;
  height: auto;
  margin-left: -375px;
}

.spinnerColor {
  color: #24b6f7 !important;
}
</style>
