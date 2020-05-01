<template>
<loading-indicator v-if="loading"/>
<div class="bx--grid invoiceSpace customCard" v-else-if="task && task.id">
  <!-- Label and Buttons -->
  <div class="bx--row">
    <div class="bx--col-lg-12">
      <h1 class="logoCol">{{ task.title }}</h1>
    </div>
  </div>

  <br/><br/>
  <hr/>
  <br/>
  
  <!-- Decription -->
  <div class="bx--row">
    <div class="bx--col-lg-12">
      <p class="bx--inline-notification__title easyWhite lineHeight" style="color:#D1D2D8">{{ task.description }}</p>
    </div>
  </div>

  <br/>

  <!-- Completion -->
  <div class="bx--row">
    <div class="bx--col-lg-12">
      <p class="bx--inline-notification__subtitle easyWhite lineHeight">Completion: {{ task.percent_done }}%</p>
    </div>
  </div>

  <!-- If Task is Active or Not -->
  <div class="bx--row">
    <div class="bx--col-lg-12">
      <p  v-if="this.$route.params.active !== 'false'" class="bx--inline-notification__subtitle easyWhite lineHeight"><span class="accentCol">Active</span> Task</p>

      <p  v-else class="bx--inline-notification__subtitle easyWhite lineHeight"><span class="accentCol">Default</span> Task</p>
    </div>

   </div>

  <br/>
  <hr/>

  <div class="bx--row">
    <div class="bx--col-sm-2 bx--col-lg-8">
      <cv-link :to="`/admin/tasks/${active}/edit/` + task.id" style="text-decoration: none;">
        <button data-notification-btn class="bx--btn bx--btn--lg bx--btn--primary">
            Edit Task
        </button>
      </cv-link>
    </div>
    
    <div class="bx--col-sm-2 bx--col-lg-4">
      <DeleteTask v-bind:id="task.id" v-bind:isActive="active" />
    </div>
  </div>
  <CommentTile v-bind:id="task.id" v-bind:isAssignment="false" />

</div>
<data-error v-else v-bind:error="error" v-bind:collection="'user'" />
</template>

<script>
  import Vue from "vue";
  import axios from "axios";
  import DeleteTask from "./DeleteTask";
  
  import { mapGetters } from 'vuex'
  import LoadingIndicator from './../progress/LoadingIndicator'
  import DataError from './../table/DataError'

  import CommentTile from './../comment/CommentTile'


  export default {
    data() {
      return {
        active: this.$route.params.active
          ? this.$route.params.active === "true"
            ? true
            : false
          : this.isActive,
        parentId: null
      };
    },
    created() {
        this.$store.dispatch('task/loadTask', [this.active, this.$route.params.id])
    },
    computed: {
        ...mapGetters({
            task: 'task/task',
            loading: 'task/loading',
            error: 'task/error'
        })
    },
    components: {
      DeleteTask,
      LoadingIndicator,
      DataError,
      CommentTile
    }
  };
</script>

<style scoped>
    .customCard {
        background: #181E31; 
        padding-top: 3%; 
        padding-bottom: 3%;
    }
    
    .easyWhite {
        font-size: 24px;
        color: #b3b4b8;
    }
</style>