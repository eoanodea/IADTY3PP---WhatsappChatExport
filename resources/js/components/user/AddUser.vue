<template>
<div class="bx--grid" style="padding: 60px 250px;">
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
                        v-model="newUser.first_name"
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
                        v-model="newUser.last_name"
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
                    v-model="newUser.email" 
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
                    v-model="newUser.mobile_number"
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
                    v-model="newUser.address"
                    class="bx--text-area"
                    rows="4" 
                    cols="50" 
                    placeholder="Address"></textarea>
                </div>
            </div>
        </div>
    </div>

    <!-- Password -->
    <br/>
    <div class="bx--row">
        <div class="bx--col-lg-12">
            <div class="bx--form-item bx--text-input-wrapper">
                <label for="password" class="bx--label">Password</label>
                <div class="bx--text-input__field-wrapper">
                <input 
                    id="text-input-3" 
                    name="password" 
                    type="password" 
                    v-model="newUser.password"
                    class="bx--text-input" 
                    placeholder="Password">
                </div>
            </div>
        </div>
    </div>

    <!-- Confirm Password -->
    <br/>
    <div class="bx--row">
        <div class="bx--col-lg-12">
            <div class="bx--form-item bx--text-input-wrapper">
                <label for="confirm_password" class="bx--label">Confirm Password</label>
                <div class="bx--text-input__field-wrapper">
                <input 
                    id="text-input-3" 
                    name="confirm_password" 
                    type="password" 
                    v-model="newUser.confirm_password"
                    class="bx--text-input" 
                    placeholder="Confirm Password">
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
                    @click="validateUser"
                    :disabled="submitting">
                        Save
                </button>
            </div>
        </div>
    </div>

    <!-- Error -->
    <br/>
    <data-error v-if="error" v-bind:error="error" />
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
</div>


</template>
<script>
import axios from 'axios';
import Vue from 'vue';
import router from './../../router'
import DataError from './../table/DataError'
import { mapGetters } from 'vuex';


export default {
    data() {
        return {
            newUser: {
                first_name: null,
                last_name: null,
                email: null,
                mobile_number: null,
                address: null,
                password: null,
                confirm_password: null,
            },
            errors: [],
            submitting: false
        }
    },
    methods: {
        validateUser: function() {
            const {
                newUser
            } = this
            if (
                newUser.first_name &&
                newUser.last_name &&
                newUser.email &&
                newUser.mobile_number &&
                newUser.address &&
                newUser.password &&
                newUser.password === newUser.confirm_password) {
                this.submitUser()
            }

            this.errors = [];
            // Object.entries(newUser)[1].map((dat, i) => {
            //     console.log('loop', dat, i)
            //     if(!dat) this.errors.push({message:'1 yeehaw 4 u'}
            //     )
            // })

            if (!newUser.first_name) {
                this.errors.push({
                    id: 0,
                    message: 'First name required.'
                });
            }
            if (!newUser.last_name) {
                this.errors.push({
                    id: 1,
                    message: 'Last name required.'
                });
            }
            if (!newUser.email) {
                this.errors.push({
                    id: 2,
                    message: 'Email required.'
                });
            }
            if (!newUser.mobile_number) {
                this.errors.push({
                    id: 3,
                    message: 'Mobile required.'
                });
            }
            if (!newUser.address) {
                this.errors.push({
                    id: 4,
                    message: 'Address required.'
                });
            }
            if (!newUser.password) {
                this.errors.push({
                    id: 5,
                    message: 'Password required.'
                });
            }
            if (newUser.password !== newUser.confirm_password) {
                this.errors.push({
                    id: 6,
                    message: 'Password doesnt match.'
                });
            }
        },
        submitUser: function() {
            let {submitting} = this
            submitting = true
            this.$store.dispatch('user/addUser', this.newUser)
            .then(function(response) {
                console.log('submit respons', response)
                submitting = false
                router.push({
                    path: `/admin/users/show/${response}`
                })
            }).catch(function(error) {
                console.log('error', error)
                submitting = false
            })
        }

    },
    components: {
        DataError
    },
    computed: {
        ...mapGetters({
            error: 'user/error',
            user: 'user/user'
        })
    }
}
</script>
<style lang="scss" scoped>
    .bx--form-requirement {
        margin: 1.2rem 0;
    }

</style>
