<template>
  <dynamic-table 
    v-bind:title="'clients'" 
    v-bind:data="users" 
    v-bind:fields="fields" 
    v-bind:showUrl="showUrl" 
    v-bind:addUrl="addUrl" 
    v-bind:loading="loading"
    v-bind:error="error"
    v-bind:collection="'user'"
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
      fields: ['first_name', 'email'],
      showUrl: '/admin/users/show/',
      addUrl: '/admin/users/new',
    };
  },
  created() {
    if(this.users.length < 1) {
      this.$store.dispatch('user/loadUsers')
    }
  },
  methods: {
    //
  },
  computed: {
    ...mapGetters({
      users: 'user/users',
      pagination: 'user/pagination',
      loading: 'user/loading',
      error: 'user/error'
    })
  },
  components: {
    DynamicTable
  }
};
</script>
