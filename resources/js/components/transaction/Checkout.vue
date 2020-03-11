<template>
<div class="bx--grid">
  <div class="bx--row">
    <div class="bx--col-lg-12">
      <h1>Checkout</h1>
    </div>
  </div>

  <br/><br/>
  <hr/>

  <div class="bx--row">
    <div class="bx--col-lg-12">
      <p class="bx--inline-notification__title" style="font-size:34px;">Total: €{{ assignment.total_price }}</p>
    </div>
  </div>

  <br/><br/>

  <div class="bx--row">
    <div class="bx--col-lg-12">
      <p class="bx--inline-notification__subtitle tertiaryText" style="font-size:24px;">Discount: {{ assignment.discount }}%</p>
    </div>
  </div>

  <br/>

  <div class="bx--row">
    <div class="bx--col-lg-12">
      <p class="bx--inline-notification__subtitle tertiaryText" style="font-size:24px;">Amount Due €{{ checkoutPayload.amount }}</p>
    </div>
  </div>

  <br/>

  <div class="bx--row">
    <div class="bx--col-lg-12">
      <p class="bx--inline-notification__subtitle tertiaryText" style="font-size:24px;">Amount Paid: €{{ assignment.amount_paid }}</p>
    </div>
  </div>

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
</template>

<script>
  import Vue from 'vue'
  import axios from 'axios'
  import { mapGetters } from 'vuex'
  import PlaceOrder from './PlaceOrder'
  import 'carbon-components/css/carbon-components.css';
  import CarbonComponentsVue from '@carbon/vue/src/index';
  import { Notification } from 'carbon-components';
  import { Modal, DataTable, Loading } from 'carbon-components';

  Vue.use(CarbonComponentsVue);

  export default {
    data() {
      return {
        assignment: null,
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
      PlaceOrder
    },
    methods: {
      calculateDiscount(assignment) {
        return Math.round(((100 - assignment.discount)/100 * assignment.total_price) - assignment.amount_paid)
      }
    },
    mounted() {
      axios.get(`/api/assignment/${this.$route.params.id}`)
        .then(response => {
            if(response.data.status !== "success") {
                console.log("error ", response)
            } else {
              let { checkoutPayload } = this
              checkoutPayload.recurring = response.data.assignment.recurring_payment
              checkoutPayload.assignmentId = response.data.assignment.id
              checkoutPayload.amount = this.calculateDiscount(response.data.assignment)
              checkoutPayload.userId = this.user.id
              this.checkoutPayload = checkoutPayload
              this.assignment = response.data.assignment
            }
        })
    },
    computed: {
      ...mapGetters({
        user: 'auth/user'
      })
    }
  }
</script>
