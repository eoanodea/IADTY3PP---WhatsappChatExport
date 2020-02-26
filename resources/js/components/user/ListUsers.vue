<template>
  <dynamic-table 
    v-bind:title="'clients'" 
    v-bind:data="users" 
    v-bind:fields="fields" 
    v-bind:showUrl="showUrl" 
    v-bind:addUrl="addUrl" 
    v-bind:error="error" 
  />
</template>

<script>
import Vue from "vue";
import axios from "axios";
import DynamicTable from './../table/DynamicTable'
// import 'carbon-components/css/carbon-components.css';
// import CarbonComponentsVue from '@carbon/vue/src/index';
// import { DataTable, Loading } from 'carbon-components';

// Vue.use(CarbonComponentsVue);

export default {
  data() {
    return {
      users: null,
      fields: ['first_name', 'last_name', 'email'],
      showUrl: '/admin/users/show/',
      addUrl: '/admin/users/new',
      error: null
    };
  },
  mounted() {
    axios.get("/api/user/all")
    .then(response => (
      this.users = response.data
      )
    .catch(error => (
      this.error = error
    )));
  },
  methods: {
    //
  },
  components: {
    DynamicTable,
    // Loading
  }
};
</script>
