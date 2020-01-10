<template>
  <div class="fluid-container">
    <!-- Default Task Details -->
    <div class="md-layout">
      <div class="md-layout-item">
        <md-table-toolbar>
          <h1 class="md-title accent">Default Task Details</h1>
          <md-button
            class="btnWarning"
            :to="`/admin/tasks/${active}/edit/` + task.id"
          >Edit Default Task</md-button>
        </md-table-toolbar>
      </div>
    </div>

    <div class="md-layout spacing">
      <div class="md-layout-item md-medium-size-100 md-small-size-100 md-xsmall-size-100">
        <md-card md-with-hover class="md-elevation-10 background">
          <md-ripple>
            <div class="md-layout-item md-medium-size-100 md-small-size-100 md-xsmall-size-100">
              <md-card-header class="accent md-display-3">{{ task.title }}</md-card-header>
              <md-card-header class="text md-display-1">{{ task.description }}</md-card-header>
              <md-card-header class="subject md-headline">
                Percentage Done: {{task.percent_done}}%
                <br />
                Task ID:
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
    </div>
    
    <!-- Delete Default Task Button -->
    <md-card-actions>
        <DeleteTask v-bind:id="task.id" v-bind:isActive="active" />
        <!-- <md-button :to="`/admin/tasks/${active}/${parentId}`" class="btnAccent">Back</md-button> -->
    </md-card-actions>
  </div>
</template>

<script>
import Vue from "vue";
import axios from "axios";
import DeleteTask from "./DeleteTask";
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
    DeleteTask
  }
};
</script>