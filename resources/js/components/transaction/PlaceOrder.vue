<template>
  <span>
    <div class="cardContainer" v-if="payload">
      <div ref="card" class="cardElement">
      </div>
      <br />
      <button v-on:click="purchase">Purchase</button>
      <br />
      <p v-if='error'>{{error}}</p>
    </div>
    <p v-else>There was a problem loading the checkout details</p>
  </span>
</template>

<script>
  import Vue from 'vue'
  import axios from 'axios'

  let style = {
    base: {
      border: '1px solid #D8D8D8',
      borderRadius: '4px',
      // color: "#fff",
      color: "#424770",
      letterSpacing: "0.025em",
      "::placeholder": {
        color: "#aab7c4"
      },
    },

    invalid: {
      // All of the error styles go inside of here.
      color: "#9e2146"
    }

  };
  let stripe = Stripe(process.env.MIX_STRIPE_PUBLISHABLE),
    elements = stripe.elements(),
    card = undefined;

  export default {
    props: ['payload', 'user'],
    data() {
      return {
        error: null
      }
    },
    components: {
      //
    },
    methods: {
      purchase() {
        stripe.createPaymentMethod(
          'card', 
          card,
          { billing_details: {
            name: `${this.user.first_name} ${this.user.last_name}`
          } }
          ).then(result => {
          if(result.error) {
            this.error = result.error.message
            return
          }
          console.log('no error', result)
          this.error = null
          this.payload.token = result.paymentMethod.id
          axios.post(`/api/transactions/new`, this.payload)
            .then(response => {
              if(response.data.status !== 'success') {
                console.log('error!', response.data.error)
                return
              }
              console.log('success!!', response.data)
            })

        })
      }
    },
    mounted() {
      card = elements.create('card', style);
      card.mount(this.$refs.card);
    },
    beforeDestroy() {
      card.destroy(this.$refs.card)
      card = null
    }
  }
</script>
<style lang="scss" scoped>
  .cardContainer {
    padding: 50px; 
  }
  .cardElement {
    display: block;
    margin: 24px auto 10px auto;
    max-width: 408px;
    padding: 10px 14px;
    box-shadow:
      rgba(50, 50, 93, 0.14902) 0px 1px 3px, rgba(0, 0, 0, 0.0196078) 0px 1px 0px;
    border-radius: 4px;
    background: white
  }
</style>