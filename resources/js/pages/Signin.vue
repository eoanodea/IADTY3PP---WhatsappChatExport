<template>
<!-- <div class="bx--grid responsive-form"> -->

    <div class="bx--row">
        <div class="bx--col-lg-6" style="background:black;">

        </div>

        <div class="bx--col-lg-6">
            <!-- Message -->
            <div class="bx--row">
                <p class="subCon" style="padding-bottom:50px; font-size:24px; margin:auto;">Please use your provided credentials.</p>
            </div>

            <!-- Email -->
            <div class="bx--row">
                <div class="bx--form-item bx--text-input-wrapper">
                    <div class="bx--text-input__field-wrapper">
                        <input 
                        id="text-input-3" 
                        name="email" 
                        type="email" 
                        v-model="user.email" 
                        class="bx--text-input" 
                        style="width:60%; height:60px; margin: auto;"
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
                    <div class="bx--text-input__field-wrapper">
                        <input 
                        id="text-input-2" 
                        name="password" 
                        type="password" 
                        v-model="user.password" 
                        class="bx--text-input"
                        style="width:60%; height:60px; margin: auto;" 
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
                        style="margin:auto;"
                        type="submit"
                        :disabled="submitting" 
                        @click="validateSignin">
                            SUBMIT
                    </button>
                </div>
            </div>
        </div>

    </div>
<!-- </div> -->
</template>

<script>
import Vue from 'vue'
import { mapActions } from 'vuex'

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
            let {submitting, errors} = this;

            if(user.email && user.password) {
                submitting = true;
                this.signIn(this.user).then(() => {
                    this.$router.replace({
                        name: 'home'
                    }).catch(function(error) {
                        console.log("error!", error)
                        errors.push({authError: "Login failed"})
                        submitting = false
                        return
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
