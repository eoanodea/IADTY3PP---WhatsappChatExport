<template>
    <div>
      Checkout: <p v-if="user">{{ user.first_name }}</p>
      <div v-if="assignment">
        <p>Total: {{assignment.total_price}}</p>
        <p>Discount: {{assignment.discount}}</p>
        <p>Amount Paid: {{assignment.amount_paid}}</p>

        Amount Due €{{checkoutPayload.amount}}
        <button @click="checkout = !checkout">Checkout</button>

        
        <place-order v-if="checkout" v-bind:payload="checkoutPayload"></place-order>
          

      </div>
      <p v-else>There is no assignment</p>
    </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import Vue from 'vue'
  import axios from 'axios'
  import PlaceOrder from './PlaceOrder'

  export default {
    data() {
      return {
        assignment: null,
        checkout: false,
        checkoutPayload: {
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
        return (((100 - assignment.discount)/100 * assignment.total_price) - assignment.amount_paid)
      }
    },
    mounted() {
      axios.get(`/api/assignment/${this.$route.params.id}`)
        .then(response => {
            if(response.data.status !== "success") {
                console.log("error ", response)
            } else {
              let { checkoutPayload } = this
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
