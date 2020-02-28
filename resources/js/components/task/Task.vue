<template>
<div class="bx--grid" style="padding: 40px 0px;">
  <div class="bx--row">
    <div class="bx--col-lg-12">
      <!-- Default Task Details (Notification) -->
      <div data-notification class="bx--inline-notification bx--inline-notification--info" role="alert">
        <div class="bx--inline-notification__details">
          <svg focusable="false" preserveAspectRatio="xMidYMid meet" style="will-change: transform;" xmlns="http://www.w3.org/2000/svg" class="bx--inline-notification__icon" width="20" height="20" viewBox="0 0 32 32" aria-hidden="true"><path d="M16 2a14 14 0 1 0 14 14A14 14 0 0 0 16 2zm0 5a1.5 1.5 0 1 1-1.5 1.5A1.5 1.5 0 0 1 16 7zm4 17.12h-8v-2.24h2.88v-6.76H13v-2.24h4.13v9H20z"></path></svg>

          <!-- Default Task Details Contents -->
          <div class="bx--row">
            <div class="bx--inline-notification__text-wrapper">
              <div class="bx--col-lg-12">
                <p class="bx--inline-notification__title">I.D: {{ this.$route.params.id }}</p>
                <p class="bx--inline-notification__title">{{ task.title }}</p>
                <p class="bx--inline-notification__title">{{ task.description }}</p>
                <p class="bx--inline-notification__title">Completeion: %{{ task.percent_done }}</p>
                
                <p v-if="this.$route.params.active !== 'false'" class="bx--inline-notification__title">Task Active</p>
                <p v-else class="bx--inline-notification__title">Task Not Active</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Edit Button -->
        <cv-link :to="`/admin/tasks/${active}/edit/` + task.id" style="text-decoration: none;">
          <button data-notification-btn class="bx--btn bx--btn--lg bx--btn--primary">
              Edit Default Task
          </button>
        </cv-link>
        <DeleteTask v-bind:id="task.id" v-bind:isActive="active" />
      </div>
    </div>
  </div>
</div>
</template>

<script>
import Vue from "vue";
import axios from "axios";
import DeleteTask from "./DeleteTask";
import 'carbon-components/css/carbon-components.css';
    import CarbonComponentsVue from '@carbon/vue/src/index';
    import { Notification } from 'carbon-components';
    import { Modal } from 'carbon-components';

export default {
  data() {
    return {
      task: {
        title: "",
        description: "",
        percent_done: 0
      },
      active: this.$route.params.active
        ? this.$route.params.active === "true"
          ? true
          : false
        : this.isActive,
      parentId: null
    };
  },
  mounted() {
    const url = this.active === false ? "task" : "task/active";
    console.log("going ", url);
    axios.get(`/api/${url}/${this.$route.params.id}`).then(response => {
      if (response.data.status !== "success") {
        console.log("error ", response);
      } else {
        this.task = response.data.task;
        this.parentId =
          this.active === false
            ? response.data.task.service_id
            : response.data.task.assignment_id;
      }
    });
  },
  components: {
    DeleteTask,
    Notification,
    Modal
  }
};
</script>