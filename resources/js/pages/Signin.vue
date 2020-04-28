<template>
<div class="bx--row">
    <div class="bx--col-lg-6">
        <img src="./assets/Logo.png" class="logo">
        <br/>
        <p class="introMessage">Your very own <span class="logoCol">All-in-One</span> Client Management System</p>
    </div>

    <div class="bx--col-lg-6 customCard">
        <!-- Message -->
        <div class="bx--row">
            <p class="message">Please use your <span class="logoCol">provided credentials</span>.</p>
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
                    class="bx--text-input placeholder" 
                    placeholder="Email">
                </div>
                    <p v-if="errors.length" class="alignment">
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
                    class="bx--text-input placeholder"
                    placeholder="Password">
                </div>
                    <p v-if="errors.length" class="alignment">
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
                    class="bx--btn bx--btn--primary alignment"
                    type="submit"
                    :disabled="submitting" 
                    @click="validateSignin">
                        SUBMIT
                </button>
            </div>
        </div>
    </div>
</div>
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

<style scoped>
    .logo {
        width: 75%;
        margin-left:12%;
        padding-top: 3%; 
        padding-bottom: 3%;
    }

    .introMessage {
        color: #c5c5c5;
        text-align: center;
    }

    .customCard {
        background: #181E31; 
        padding-top: 10%; 
        padding-bottom: 10%;
    }

    .message {
        color: #c5c5c5;
        padding-bottom: 10px; 
        font-size: 20px; 
        margin-left: 20%;
    }

    .placeholder {
        width: 60%; 
        height: 65px; 
        margin: auto;
    }

    .alignment {
        margin-left: 20%;
    }
</style>