<template>
  <dynamic-table 
    v-bind:title="'clients'" 
    v-bind:data="services" 
    v-bind:fields="fields" 
    v-bind:showUrl="showUrl" 
    v-bind:addUrl="addUrl" 
    v-bind:error="error"
    v-bind:collection="'service'"
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
      fields: ['title', 'standard_price'],
      showUrl: '/admin/services/show/',
      addUrl: '/admin/services/new',
      error: null
    };
  },
  created() {
    if(this.services.length < 1) {
      this.$store.dispatch('service/loadServices')
    }
  },
  methods: {
    //
  },
  computed: {
    ...mapGetters({
      services: 'service/services',
      pagination: 'service/pagination'
    })
  },
  components: {
    DynamicTable
  }
};
</script>
