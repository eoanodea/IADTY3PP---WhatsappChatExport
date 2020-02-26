git<template>
  <span>
    <div class="cardContainer" v-if="payload">
      <div ref="card" class="cardElement">
      </div>
      <div v-if="intent">
        <br />
        <p v-if='error'>{{error}}</p>
        <button v-on:click="purchase" id="submit">Purchase</button>
        <br />
      </div>
      <p v-else>Loading transaction stuff</p>
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
  // let stripe = Stripe(process.env.MIX_STRIPE_PUBLISHABLE),
  //   elements = stripe.elements(),
  //   card = undefined;

  export default {
    props: ['payload', 'user'],
    data() {
      return {
        error: null,
        intent: null
      }
    },
    components: {
      //
    },
    methods: {
      purchase() {        
        // stripe.handleCardSetup(
        //   this.intent.client_secret, card, {
        //     payment_method_data: {
        //       billing_details: { name: `${this.user.first_name} ${this.user.last_name}` }
        //     }
        //   }
        //   ).then(result => {
        //     console.log(result)
        //   if(result.error) {
        //     this.error = result.error.message
        //     return
        //   }
        //   else if(result.setupIntent.status !== "succeeded") {
        //     console.log('error!', result)

        //     return
        //   }
        //   this.error = null
        //   this.payload.token = result.setupIntent.payment_method
        //   axios.post(`/api/transactions/new`, this.payload)
        //     .then(response => {
        //       if(response.data.status !== 'success') {
        //         console.log('error!', response.data.error)
        //         this.error = result.error.message
        //         return
        //       }
        //       console.log('success!', response.data.transaction.id)
        //       this.$router.push({
        //         path: `/transaction/${response.data.transaction.id}`
        //       })
        //     })
        // })
      }
    },
    mounted() {
      axios.get(`/api/customers/createIntent/${this.user.id}`)
        .then(response => {
          if(response.data.status !== 'success') {
            console.log('error!', response.data)
            return
          }
          this.intent = response.data.intent
            
          card = elements.create('card', style);
          card.mount(this.$refs.card);
        })
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