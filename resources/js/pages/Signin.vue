<template>
<div class="bx--grid">
    <div class="bx--row">
        <div class="bx--form-item">
            <label for="text-input-3" class="bx--label">Email</label>
            <input 
                id="text-input-3" 
                name="email" 
                type="email" 
                v-model="user.email" 
                class="bx--text-input" 
                placeholder="Email">
        </div>
    </div>

    <div class="bx--row">
        <div class="bx--form-item">
            <label for="text-input-2" class="bx--label">Password</label>
            <input 
                id="text-input-2" 
                name="password" 
                type="password" 
                v-model="user.password" 
                class="bx--text-input" 
                placeholder="Password">
        </div>
    </div>

    <div class="bx--row">
        <div class="bx--form-item">
            <button 
                class="bx--btn bx--btn--primary" 
                type="submit"
                :tip-text="Submit"
                :disabled="submitting" 
                @click="validateSignin">
                    Submit
            </button>
        </div>
    </div>
</div>

        <!-- <article class="bx--card overlayBg" tabindex="0" aria-labelledby="card-title-2">
            <div class="bx--card__card-overview">
                <section class="bx--card-overview__about">
                            <header class="bx--about__title">
                                <p id="card-title-2" class="bx--about__title--name bx--type-gamma primaryText" title="Sign In">Sign In</p>
                            </header>
                            <article class="bx--card-overview">
                                <p v-if="errors.length">
                                    <b class="error dangerText">Please correct the following error(s):</b>
                                        <ul>
                                            <li v-for="error in errors" v-bind:key="error.id" class="dangerText">
                                                {{ error.message }}
                                            </li>
                                        </ul>
                                </p>
                            </article> -->

</template>

<script>
import Vue from 'vue'
import { mapActions } from 'vuex'
import 'carbon-components/css/carbon-components.css';
// import CarbonComponentsVue from '@carbon/vue/src/index';
// Vue.use(CarbonComponentsVue);
// import { 
//     CvForm,  
//     CvButton,
//     CvTextInput,
//     CvButtonSet } from '@carbon/vue/src';

// Vue.use(CvForm);
// Vue.use(CvButton);
// Vue.use(CvTextInput);
// Vue.use(CvButtonSet);

  export default {
    data() {
      return {
        user: {
            email: '',
            password: ''
        },
        errors: [],
        submitting: false
      }
    },
    methods: {
        validateSignin(e) {
            e.preventDefault();
            const {user} = this;
            if(user.email && user.password) {
                this.submitting = true;
                this.signIn(this.user).then(() => {
                    this.$router.replace({
                        name: 'home'
                    }).catch(() => {
                        this.errors.push({message: "Login failed"})
                        this.submitting = false
                    })
                })
            }
            this.errors = []
            if(!user.email) this.errors.push({message: "Email is required"})
            if(!user.password) this.errors.push({message: "Password is required"})
        },
        ...mapActions({
            signIn: 'auth/signIn'
        })
    },
    components: {
        //
    }
  }
</script>
