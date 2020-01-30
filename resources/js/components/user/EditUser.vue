<template>
<div class="bx--grid">
    <!-- Name -->
    <div class="bx--row">
        <!-- First Name -->
        <div class="bx--col-lg-6 bx--col-md-4 bx--col-sm-2">
            <div class="bx--form-item bx--text-input-wrapper">
                <label for="first_name" class="bx--label">First Name</label>
                <div class="bx--text-input__field-wrapper">
                    <input 
                        id="text-input-3" 
                        name="first_name" 
                        type="text" 
                        autocomplete="given-name" 
                        v-model="user.first_name"
                        class="bx--text-input" 
                        placeholder="First Name">
                </div>
            </div>
        </div>

        <!-- Surname -->
        <div class="bx--col-lg-6 bx--col-md-4 bx--col-sm-2">
            <div class="bx--form-item bx--text-input-wrapper">
                <label for="last_name" class="bx--label">Surname</label>
                <div class="bx--text-input__field-wrapper">
                    <input 
                        id="text-input-3" 
                        name="last_name" 
                        type="text" 
                        autocomplete="given-name" 
                        v-model="user.last_name"
                        class="bx--text-input" 
                        placeholder="Surname">
                </div>
            </div>
        </div>
    </div>

    <!-- Email -->
    <br/>
    <div class="bx--row">
        <div class="bx--col-lg-12">
            <div class="bx--form-item bx--text-input-wrapper">
                <label for="email" class="bx--label">Email</label>
                <div class="bx--text-input__field-wrapper">
                <input 
                    id="text-input-3" 
                    name="email" 
                    type="email" 
                    autocomplete="email"
                    v-model="user.email" 
                    class="bx--text-input" 
                    placeholder="Email">
                </div>
            </div>
        </div>
    </div>

    <!-- Phone Number -->
    <br/>
    <div class="bx--row">
        <div class="bx--col-lg-12">
            <div class="bx--form-item bx--text-input-wrapper">
                <label for="mobile" class="bx--label">Phone Number</label>
                <div class="bx--text-input__field-wrapper">
                <input 
                    id="text-input-3" 
                    name="mobile" 
                    type="mobile" 
                    autocomplete="mobile" 
                    v-model="user.mobile_number"
                    class="bx--text-input" 
                    placeholder="Phone Number">
                </div>
            </div>
        </div>
    </div>

    <!-- Address -->
    <br/>
    <div class="bx--row">
        <div class="bx--col-lg-12">
            <div class="bx--form-item bx--text-input-wrapper">
                <label for="address" class="bx--label">Address</label>
                <div class="bx--text-input__field-wrapper">
                <textarea 
                    id="text-area-2" 
                    name="address" 
                    type="address" 
                    autocomplete="address" 
                    v-model="user.address"
                    class="bx--text-area"
                    rows="4" 
                    cols="50" 
                    placeholder="Address"></textarea>
                </div>
            </div>
        </div>
    </div>

    <!-- Button -->
    <br/>
    <div class="bx--row">
        <div class="bx--col-lg-12">
            <div class="bx--form-item">
                <button 
                    class="bx--btn bx--btn--primary" 
                    type="submit"
                    :disabled="submitting">
                        Save
                </button>
            </div>
        </div>
    </div>

    <!-- Error -->
    <br/>
    <div class="bx--row">
        <p v-if="errors.length">
        <b class="bx--form-requirement">Please correct the following error(s):</b>
            <ul>
                <li v-for="error in errors" v-bind:key="error.id" class="bx--form-requirement">
                    {{ error.message }}
                </li>
            </ul>
        </p>
    </div>

    <!-- <div class="md-layout">
      <div class="md-layout-item">
        <md-table-toolbar>
          <h1 class="md-title accent">Edit Client</h1>
        </md-table-toolbar>
      </div>
    </div>

    <form novalidate class="md-layout" method="PUT" @submit.stop.prevent="submitUser">
        <md-card class="md-layout-item background">
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
                    <label class="accent" for="first_name">First Name</label>
                    <md-input name="first_name" type="text" class="form-control" placeholder="First Name" autocomplete="given-name" v-model="user.first_name" />
                </md-field>
                <md-field>
                    <label class="accent" for="last_name">Last Name</label>
                    <md-input name="last_name" type="text" class="form-control" placeholder="Last Name" autocomplete="family-name" v-model="user.last_name" />
                </md-field>
                <md-field>
                    <label class="accent" for="email">Email</label>
                    <md-input name="email" type="email" class="form-control" placeholder="Email" autocomplete="email" v-model="user.email" /> <br />
                </md-field>
                <md-field>
                    <label class="accent" for="mobile">Mobile Number</label>
                    <md-input name="mobile" type="text" class="form-control" placeholder="Mobile Number" autocomplete="mobile" v-model="user.mobile_number" /> <br />
                </md-field>
                <md-field>
                    <label class="accent" for="address">Address</label>
                    <md-textarea name="address" type="text" class="form-control" placeholder="Address" autocomplete="address" v-model="user.address" /> <br />
                </md-field> -->
                <!-- <md-field>
                    <label class="accent" for="password">Password</label>
                    <md-input type="password" name="password" class="form-control" placeholder="Password" v-model="user.password" /> <br />
                </md-field>
                <md-field>
                    <label class="accent" for="confirm_password">Confirm Password</label>
                    <md-input type="password" name="confirm_password" class="form-control" placeholder="Password Confirmation" v-model="user.confirm_password" /> <br />
                </md-field> -->
            <!-- </md-card-content>
            <md-card-actions>
                <md-button type="submit" :disabled="submitting" class="md-primary md-raised btnAccent">Save</md-button>
            </md-card-actions>
        </md-card>
    </form> -->
</div>
</template>
<script>
import axios from 'axios';
import Vue from 'vue';
import router from './../../router'
// import {
//     MdButton,
//     MdField,
//     MdCard
// } from 'vue-material/dist/components'

// Vue.use(MdButton)
// Vue.use(MdField)
// Vue.use(MdCard)


export default {
    data() {
        return {
            user: {
                first_name: '',
                last_name: '',
                email: '',
                mobile_number: '',
                address: '',
                password: '',
                confirm_password: '',
            },
            errors: [],
            submitting: false
        }
    },
    mounted() {
        axios.get(`/api/user/${this.$route.params.id}`)
            .then(response => {
                if (!response.data) {
                    console.log("Error getting user", response)
                } else this.user = response.data.user
            })
    },
    methods: {
        submitUser: function() {
            this.submitting = true
            const payload = this.user
            axios.put(`/api/user/${this.user.id}`, payload)
                .then(response => {
                    if (!response.data) {
                        console.log("Error!", response)
                        this.errors.push({
                            id: 0,
                            message: JSON.stringify(response.message)
                        })
                        this.submitting = false
                    } else router.push({
                        path: `/admin/users/show/${response.data.user.id}`
                    })
                })
        }

    }
}
</script>
