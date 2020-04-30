<template>
  <dynamic-table 
    v-bind:title="'Transactions'" 
    v-bind:data="transactions" 
    v-bind:fields="fields" 
    v-bind:showUrl="showUrl" 
    v-bind:loading="loading"
    v-bind:error="error"
    v-bind:collection="'transaction'"
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
      fields: ['id', 'created_at', 'amount'],
      showUrl: '/transaction/',
      addUrl: '#',
    };
  },
  created() {
    if(this.transactions.length < 1) {
      this.$store.dispatch('transaction/loadTransactions')
    }
  },
  methods: {
    //
  },
  computed: {
    ...mapGetters({
      transactions: 'transaction/transactions',
      pagination: 'transaction/pagination',
      loading: 'transaction/loading',
      error: 'transaction/error'
    })
  },
  components: {
    DynamicTable
  }
};
</script>
