/*
 * --------------------
 * Author Name: Eoan O'Dea
 * Author Email: eoan@wspace.ie
 * Date Created: Friday January 10th 2020 4:31:23 pm
 * --------------------
 * Project Name: IADTY3PPClientMangementSystem
 * Version: 1.0.0
 * --------------------
 * File Name: Signin.vue
 * Last Modified: Friday January 10th 2020 5:05:32 pm
 * --------------------
 * Copyright (c) 2020 WebSpace
 * --------------------
 */


<template>
    <md-card>
        <md-card-header>
            <div class="md-title">Sign in</div>
        </md-card-header>
        <md-card-content>
            <p v-if="errors.length">
                <b>Please correct the following error(s):</b>
                <ul>
                    <li v-for="error in errors" v-bind:key="error.id">
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
            <md-button type="submit" :disabled="submitting" @click="validateSignin" class="md-primary md-raised">Submit</md-button>
        </md-card-actions>
    </md-card>
</template>

<script>
  import axios from 'axios';

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
        validateSignin() {
            const {user} = this;
            if(user.email && user.password) {
                this.signIn()
            }
            if(!user.email) this.errors.push({message: "Email is required"})
            if(!user.password) this.errors.push({message: "Password is required"})
        },
        async signIn() {
            this.submitting = true;

            const payload = this.user
            axios.post('/api/auth/login', payload)
                .then(response => {
                    if(response.access_token) {
                        console.log('yes!')
                    } else console.log('nah!')
                })
        }
    },
    components: {
        //
    }
  }
</script>
