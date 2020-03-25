<template>
<div class="bx--grid">

  <div class="bx--row">
    
    <!-- Client Details (Notification Card)-->
    <div class="bx--col-lg-6" style="padding-top: 140px;">

      <p class="title lineHeight">
        {{ user.first_name }} {{ user.last_name }}
      </p><br/><br/><br/>
      
      <p class="subtitle">
        {{ user.mobile_number }}
      </p><br/><br/>
      
      <p class="subtitle">
        {{ user.address }}
      </p><br/><br/>
      
      <p class="subtitle">
        {{ user.email }}
      </p><br/><br/>
      
      <div class="bx--row">
        <!-- Edit Button -->
        <div class="bx--col">
          <cv-link :to="'/admin/users/edit/' + user.id" style="text-decoration: none;">
            <button data-notification-btn class="bx--btn bx--btn--lg bx--btn--primary">
              Edit Client
            </button>
          </cv-link>
        </div>

        <!-- Delete Modal Button -->        
        <div class="bx--col">
          <DeleteUser style="text-decoration; none;" class="md-alignment-top-right" v-bind:id="user.id" />
        </div>
      </div>    
      
    </div> <!-- Close Client Details COLUMN -->

    <!-- Chart -->
    <div class="bx--col-lg-6">
      <div class="assignment-container" v-if="assignmentId">
        <Chart v-bind:parentId="assignmentId" style="padding-left:100px;"/>
      </div>
    </div> <!-- Close Chart COLUMN -->
    

    <!-- Comments -->
    <CommentTile v-bind:id="assignmentId" v-bind:isAssignment="true" />

  </div> <!-- Close ROW 1-->

  <div class="bx--row">

    <!-- Preparing for Project Page Implementation -->

  </div> <!-- Close ROW 2 -->

</div> <!-- Close GRID -->
</template>

<script>
import Vue from "vue";
import axios from "axios";
import DeleteUser from "./DeleteUser";
import Assignment from '../assignment/Assignment'
import Chart from './components/Chart'
import CommentTile from '../comment/CommentTile'


import LoadingIndicator from './../progress/LoadingIndicator'
import { mapGetters } from 'vuex';
import DataError from './../table/DataError'



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
    Assignment,
    Chart,
    CommentTile,
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

<style scope>
  .lineHeight {
    line-height: 1.1;
  }
</style>
