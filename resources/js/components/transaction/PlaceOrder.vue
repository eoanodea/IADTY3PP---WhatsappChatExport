<!--
@Author: John Carlo M. Ramos
@Date:   2019-11-03T22:20:18+00:00
@Email:  !!!!!---CTRL + ALT + C = Colour Picker---!!!!!
@Last modified by:   John Carlo M. Ramos
@Last modified time: 2019-11-08T08:54:53+00:00
-->

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
    props: ['payload'],
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
        stripe.createToken(card).then(result => {
          if(result.error) {
            this.error = result.error.message
            return
          }
          


        })
      }
    },
    mounted() {
      card = elements.create('card', style);
      card.mount(this.$refs.card);
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