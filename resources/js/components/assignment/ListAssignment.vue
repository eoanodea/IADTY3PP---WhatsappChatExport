<template>
  <dynamic-table 
    v-bind:title="'Assignments'" 
    v-bind:data="assignments" 
    v-bind:fields="fields" 
    v-bind:showUrl="showUrl" 
    v-bind:addUrl="addUrl" 
    v-bind:loading="loading"
    v-bind:error="error"
    v-bind:collection="'assignment'"
  />
</template>

<script>
import Vue from "vue";
import axios from "axios";
import DynamicTable from './../table/DynamicTable'
import { mapGetters } from 'vuex';

export default {
  data() {
    return {
      fields: ['title', 'deadline'],
      showUrl: '/admin/assignments/show/',
      addUrl: '/admin/assignments/new',
    };
  },
  created() {
    if(this.assignments.length < 1) {
      this.$store.dispatch('assignment/loadAssignments')
    }
  },
  methods: {
    //
  },
  computed: {
    ...mapGetters({
      assignments: 'assignment/assignments',
      pagination: 'assignment/pagination',
      loading: 'assignment/loading',
      error: 'assignment/error'
    })
  },
  components: {
    DynamicTable
  }
};
</script>
