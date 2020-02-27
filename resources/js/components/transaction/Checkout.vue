<template>
<div class="bx--grid" style="padding: 40px 0px;">
  <div class="bx--row">
    <div class="bx--col">
      <!-- Checkout Details (Notification)-->
      <div data-notification class="bx--inline-notification bx--inline-notification--info" role="alert">
        <div class="bx--inline-notification__details">
          <svg focusable="false" preserveAspectRatio="xMidYMid meet" style="will-change: transform;" xmlns="http://www.w3.org/2000/svg" class="bx--inline-notification__icon" width="20" height="20" viewBox="0 0 32 32" aria-hidden="true"><path d="M16 2a14 14 0 1 0 14 14A14 14 0 0 0 16 2zm0 5a1.5 1.5 0 1 1-1.5 1.5A1.5 1.5 0 0 1 16 7zm4 17.12h-8v-2.24h2.88v-6.76H13v-2.24h4.13v9H20z"></path></svg>

          <!-- Checkout Details Contents -->
          <div class="bx--row">
            <div class="bx--inline-notification__text-wrapper">
              <div class="bx--col-lg-12">
                <p v-if="user" class="bx--inline-notification__title">{{ user.first_name }}</p>

                <div v-if="assignment">
                  <p class="bx--inline-notification__title">Total: €{{ assignment.total_price }}</p>
                  <p class="bx--inline-notification__title">Discount: {{ assignment.discount }}%</p>
                  <p class="bx--inline-notification__title">Amount Due €{{ checkoutPayload.amount }}</p>
                  <p class="bx--inline-notification__title">Amount Paid: €{{ assignment.amount_paid }}</p>
                </div>
                <p v-else>There is no assignment</p>
              </div>
            </div>
          </div>
        </div>
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
    </div>
  </div>
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
