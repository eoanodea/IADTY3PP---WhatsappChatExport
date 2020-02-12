<template>
<div class="bx--grid" style="padding: 230px;">

    <!-- Email -->
    <div class="bx--row">
        <div class="bx--form-item bx--text-input-wrapper">
            <label for="text-input-3" class="bx--label">Email</label>
            <div class="bx--text-input__field-wrapper">
                <input 
                id="text-input-3" 
                name="email" 
                type="email" 
                v-model="user.email" 
                class="bx--text-input" 
                placeholder="Email">
            </div>
                <p v-if="errors.length">
                    <ul>
                        <li v-for="error in errors" v-bind:key="error.id" class="bx--form-requirement">
                            {{ error.emailError }}
                        </li>
                        <br/>
                    </ul>
                </p>
        </div>
    </div>
    
    <!-- Password -->
    <br/>
    <div class="bx--row">
        <div class="bx--form-item bx--text-input-wrapper">
            <label for="text-input-2" class="bx--label">Password</label>
            <div class="bx--text-input__field-wrapper">
                <input 
                id="text-input-2" 
                name="password" 
                type="password" 
                v-model="user.password" 
                class="bx--text-input" 
                placeholder="Password">
            </div>
                <p v-if="errors.length">
                    <ul>
                        <li v-for="error in errors" v-bind:key="error.id" class="bx--form-requirement">
                            {{ error.passwordError }}
                        </li>
                        <br/>
                    </ul>
                </p>
        </div>
    </div>

    <!-- Button -->
    <br/>
    <div class="bx--row">
        <div class="bx--form-item">
            <button 
                class="bx--btn bx--btn--primary" 
                type="submit"
                :disabled="submitting" 
                @click="validateSignin">
                    Submit
            </button>
        </div>
    </div>
</div>
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
            if(!user.email) this.errors.push({emailError: "Email is required"})
            if(!user.password) this.errors.push({passwordError: "Password is required"})
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
