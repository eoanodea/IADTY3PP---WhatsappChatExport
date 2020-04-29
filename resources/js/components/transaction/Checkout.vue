<template>
<loading-indicator v-if="loading"/>
<div class="bx--grid invoiceSpace customCard" v-else-if="assignment && assignment.id">
  <div class="bx--row">
    <div class="bx--col-lg-12">
      <h1>Pay for PROJECT <span class="logoCol">{{ assignment.title }}</span></h1>
    </div>
  </div>

  <br/><br/>
  <hr/>
  <br/>

  <div class="bx--row">
    <div class="bx--col-lg-12">
      <p class="bx--inline-notification__title subtitle">Total: <span class="logoCol">€{{ assignment.total_price }}</span></p>
    </div>
  </div>

  <br/><br/>

  <div class="bx--row">
    <div class="bx--col-lg-12">
      <p class="bx--inline-notification__subtitle easyWhite">Discount: {{ assignment.discount }}%</p>
    </div>
  </div>

  <br/>

  <div class="bx--row">
    <div class="bx--col-lg-12">
      <p class="bx--inline-notification__subtitle easyWhite">Amount Due €{{ checkoutPayload.amount }}</p>
    </div>
  </div>

  <br/>

  <div class="bx--row">
    <div class="bx--col-lg-12">
      <p class="bx--inline-notification__subtitle easyWhite">Amount Paid: €{{ assignment.amount_paid }}</p>
    </div>
  </div>

  <br/>
  <hr/>

  <template v-if="checkoutPayload.amount > 0">
    <!-- Checkout Button -->
    <button @click="checkout = !checkout" data-notification-btn class="bx--btn bx--btn--lg bx--btn--primary">
      Checkout
    </button>
  </template>
  <p v-else>No payment due.</p>

  <place-order 
    v-if="checkout" 
    v-bind:payload="checkoutPayload" 
    v-bind:user="user"
    >
  </place-order>
</div>
<data-error v-else v-bind:error="error" v-bind:collection="'user'" />
</template>

<script>
  import Vue from 'vue'
  import axios from 'axios'
  import { mapGetters } from 'vuex'
  import PlaceOrder from './PlaceOrder'
  import LoadingIndicator from './../progress/LoadingIndicator'
  import DataError from './../table/DataError'


  export default {
    data() {
      return {
        checkout: false,
        checkoutPayload: {
          recurring: 0,
          amount: 0,
          assignmentId: null,
          userId: null,
        }
      }
    },
    components: {
      PlaceOrder,
      LoadingIndicator,
      DataError
    },
    created() {
        this.$store.dispatch('assignment/loadAssignment', parseInt(this.$route.params.id))
        .then(() => {
            let { checkoutPayload, assignment } = this
            checkoutPayload.recurring = assignment.recurring_payment
            checkoutPayload.assignmentId = assignment.id
            checkoutPayload.amount = this.calculateDiscount(assignment)
            checkoutPayload.userId = this.user.id
            this.checkoutPayload = checkoutPayload
        })
    },
    methods: {
      calculateDiscount(assignment) {
        return Math.round(((100 - assignment.discount)/100 * assignment.total_price) - assignment.amount_paid)
      }
    },
    computed: {
      ...mapGetters({
        user: 'auth/user',
        assignment: 'assignment/assignment',
        loading: 'assignment/loading',
        error: 'assignment/error'
      })
    }
  }
</script>

<style scoped>
    .invoiceSpace {
        margin-left: 23%;
        margin-right: 23%;
    }

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
