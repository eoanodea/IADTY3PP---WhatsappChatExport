<template>
<!-- <div class="bx--grid"> -->
    <!-- <div class="bx--row"> -->
        <article class="bx--card overlayBg" tabindex="0" aria-labelledby="card-title-2">
            <div class="bx--card__card-overview">
                <section class="bx--card-overview__about">
                    <!-- <div class="bx--row"> -->
                        <!-- <div class="bx--col-lg-16"> -->
                            <header class="bx--about__title">
                                <p id="card-title-2" class="bx--about__title--name bx--type-gamma primaryText" title="Sign In">Sign In</p>
                            </header>
                        <!-- </div> -->
                    <!-- </div> -->

                    <!-- <div class="bx--row"> -->
                        <!-- <div class="bx--col-lg-16"> -->
                            <article class="bx--card-overview">
                                <p v-if="errors.length">
                                    <b class="error dangerText">Please correct the following error(s):</b>
                                        <ul>
                                            <li v-for="error in errors" v-bind:key="error.id" class="dangerText">
                                                {{ error.message }}
                                            </li>
                                        </ul>
                                </p>
                            </article>
                        <!-- </div> -->
                    <!-- </div> -->
                    
                    <cv-form>
                        <!-- <div class="bx--row"> -->
                            <cv-text-input 
                                name="email" 
                                type="email" 
                                class=""
                                v-model="user.email"
                                placeholder="Email Address">
                            </cv-text-input>
                        <!-- </div> -->

                        <!-- <div class="bx--row"> -->
                            <cv-text-input
                                name="password" 
                                type="password" 
                                class=""
                                v-model="user.password" 
                                placeholder="Password">
                            </cv-text-input>
                        <!-- </div> -->

                        <!-- <div class="bx--row"> -->
                            <!-- <div class="bx--col-lg-16"> -->
                                <cv-button-set>
                                        <cv-button 
                                            kind="primary" 
                                            :tip-text="Submit"
                                            :tip-position="right"
                                            :tip-alignment="center"
                                            class="" 
                                            type="submit" 
                                            :disabled="submitting" 
                                            @click="validateSignin">
                                                Submit
                                        </cv-button>
                                </cv-button-set>
                            <!-- </div> -->
                        <!-- </div> -->
                    </cv-form>
                </section>
            </div>
        </article>
    <!-- </div> -->
<!-- </div> -->

    <!-- <md-card class="background">
        <md-card-header>
            <div class="md-title accent">Sign in</div>
        </md-card-header>
        <md-card-content>
            <p v-if="errors.length">
                <b class="error">Please correct the following error(s):</b>
                <ul>
                    <li v-for="error in errors" v-bind:key="error.id" class="error">
                        {{ error.message }}
                    </li>
                </ul>
            </p>
            <md-field>
                <label class="accent" for="email">Email Address</label>
                <md-input name="email" type="email" class="form-control" placeholder="Email Address" v-model="user.email" />
            </md-field>
            <md-field>
                <label class="accent" for="password">Password</label>
                <md-input name="password" type="password" class="form-control" placeholder="Password" v-model="user.password" />
            </md-field>
        </md-card-content>
        <md-card-actions>
            <md-button type="submit" :disabled="submitting" @click="validateSignin" class="md-primary md-raised btnAccent">Submit</md-button>
        </md-card-actions>
    </md-card> -->
</template>

<script>
import Vue from 'vue'
import { mapActions } from 'vuex'
import 'carbon-components/css/carbon-components.css';
import CarbonComponentsVue from '@carbon/vue/src/index';
Vue.use(CarbonComponentsVue);
import { 
    CvForm,  
    CvButton,
    CvTextInput,
    CvButtonSet } from '@carbon/vue/src';

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
