<template>
<div class="bx--grid" style="padding: 40px 0px;">
  <div class="bx--row">
    <div class="bx--col-lg-12">
      <!-- Default Comment Details (Notification) -->
      <div data-notification class="bx--inline-notification bx--inline-notification--info" role="alert">
        <div class="bx--inline-notification__details">
          <svg focusable="false" preserveAspectRatio="xMidYMid meet" style="will-change: transform;" xmlns="http://www.w3.org/2000/svg" class="bx--inline-notification__icon" width="20" height="20" viewBox="0 0 32 32" aria-hidden="true"><path d="M16 2a14 14 0 1 0 14 14A14 14 0 0 0 16 2zm0 5a1.5 1.5 0 1 1-1.5 1.5A1.5 1.5 0 0 1 16 7zm4 17.12h-8v-2.24h2.88v-6.76H13v-2.24h4.13v9H20z"></path></svg>

          <!-- Default Comment Details Contents -->
          <div class="bx--row">
            <div class="bx--inline-notification__text-wrapper">
              <div class="bx--col-lg-12">
                <p class="bx--inline-notification__title">I.D: {{ this.$route.params.id }}</p>
                <p class="bx--inline-notification__title">{{ comment.title }}</p>
                <p class="bx--inline-notification__title">{{ comment.description }}</p>
                <p class="bx--inline-notification__title">Completeion: %{{ comment.percent_done }}</p>
                
                <p v-if="this.$route.params.active !== 'false'" class="bx--inline-notification__title">Comment Active</p>
                <p v-else class="bx--inline-notification__title">Comment Not Active</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Edit Button -->
        <cv-link :to="`/admin/comments/${active}/edit/` + comment.id" style="text-decoration: none;">
          <button data-notification-btn class="bx--btn bx--btn--lg bx--btn--primary">
              Edit Default Comment
          </button>
        </cv-link>
        <DeleteComment v-bind:id="comment.id" v-bind:isActive="active" />
      </div>
    </div>
  </div>





    <!-- Default Comment Details -->
    <!-- <div class="md-layout">
      <div class="md-layout-item">
        <md-table-toolbar>
          <h1 class="md-title accent">Default Comment Details</h1>
          <md-button
            class="btnWarning"
            :to="`/admin/comments/${active}/edit/` + comment.id"
          >Edit Default Comment</md-button>
        </md-table-toolbar>
      </div>
    </div>

    <div class="md-layout spacing">
      <div class="md-layout-item md-medium-size-100 md-small-size-100 md-xsmall-size-100">
        <md-card md-with-hover class="md-elevation-10 background">
          <md-ripple>
            <div class="md-layout-item md-medium-size-100 md-small-size-100 md-xsmall-size-100">
              <md-card-header class="accent md-display-3">{{ comment.title }}</md-card-header>
              <md-card-header class="text md-display-1">{{ comment.description }}</md-card-header>
              <md-card-header class="subject md-headline">
                Percentage Done: {{comment.percent_done}}%
                <br />
                Comment ID:
                {{ this.$route.params.id }}
                <div v-if="this.$route.params.active !== 'false'">
                  <p>active</p>
                </div>
                <p v-else>not active</p>
              </md-card-header>
            </div>
          </md-ripple>
        </md-card>
      </div>
    </div> -->
    
    <!-- Delete Default Comment Button -->
    <!-- <md-card-actions>
        <DeleteComment v-bind:id="comment.id" v-bind:isActive="active" /> -->
        <!-- <md-button :to="`/admin/comments/${active}/${parentId}`" class="btnAccent">Back</md-button> -->
    <!-- </md-card-actions> -->
</div>
</template>

<script>
import Vue from "vue";
import axios from "axios";
import DeleteComment from "./DeleteComment";
import 'carbon-components/css/carbon-components.css';
    import CarbonComponentsVue from '@carbon/vue/src/index';
    import { Notification } from 'carbon-components';
    import { Modal } from 'carbon-components';
// import {
//   MdButton,
//   MdProgress,
//   MdAvatar,
//   MdCard,
//   MdContent,
//   MdElevation,
//   MdIcon,
//   MdImage,
//   MdLayout,
//   MdRipple,
//   MdToolbar
// } from "vue-material/dist/components";

// Vue.use(MdButton);
// Vue.use(MdProgress);
// Vue.use(MdAvatar);
// Vue.use(MdCard);
// Vue.use(MdContent);
// Vue.use(MdElevation);
// Vue.use(MdIcon);
// Vue.use(MdImage);
// Vue.use(MdLayout);
// Vue.use(MdRipple);
// Vue.use(MdToolbar);

export default {
  data() {
    return {
      comment: {
        title: "",
        description: "",
        percent_done: 0
      },
      isTask: this.$route.params.active
        ? this.$route.params.active === "true"
          ? true
          : false
        : this.isActive,
      parentId: null
    };
  },
  mounted() {
    const url = this.isTask ? "comments/assignment" : "comments/task";
    console.log("going ", url);
    axios.get(`/api/${url}/${this.$route.params.id}`).then(response => {
      if (response.data.status !== "success") {
        console.log("error ", response);
      } else {
        this.comment = response.data.comment;
        this.parentId =
          this.isTask
            ? response.data.comment.task_id
            : response.data.comment.assignment_id;
      }
    });
  },
  components: {
    DeleteComment,
    Notification,
    Modal
  }
};
</script>