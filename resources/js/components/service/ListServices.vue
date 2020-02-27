<template>
  <dynamic-table 
    v-bind:title="'Services'" 
    v-bind:data="services" 
    v-bind:fields="fields" 
    v-bind:showUrl="showUrl" 
    v-bind:addUrl="addUrl" 
    v-bind:loading="loading"
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
      pagination: 'service/pagination',
      loading: 'service/loading',
      error: 'service/error'
    })
  },
  components: {
    DynamicTable
  }
};
</script>
