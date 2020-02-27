<template>
<loading-indicator v-if="loading"/>
<div class="bx--grid" style="padding: 60px 250px;" v-else-if="updatedUser">
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
                        v-model="updatedUser.first_name"
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
                        v-model="updatedUser.last_name"
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
                    v-model="updatedUser.email" 
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
                    v-model="updatedUser.mobile_number"
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
                    v-model="updatedUser.address"
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
                    v-bind:disabled="submitting"
                    @click="submitUser"
                    >
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
</div>
<data-error v-else v-bind:error="error" v-bind:collection="'user'" />
</template>
<script>
import axios from 'axios';
import Vue from 'vue';
import router from './../../router'
import { mapGetters } from 'vuex';
import LoadingIndicator from './../progress/LoadingIndicator'
import DataError from './../table/DataError'


export default {
    data() {
        return {
            updatedUser: {
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
    mounted() {
        this.$store.dispatch('user/loadUser', parseInt(this.$route.params.id))

        this.updatedUser = this.user
    },
    components: {
        LoadingIndicator,
        DataError
    },
    methods: {
       submitUser: function() {
            let {submitting} = this
            const id = this.$route.params.id
            submitting = true
            console.log('submitting', this.updatedUser)
            this.$store.dispatch('user/updateUser', [parseInt(id), this.updatedUser])
            .then(function(response) {
                submitting = false
                router.push({
                    path: `/admin/users/show/${id}`
                })
            }).catch(function(error) {
                console.log('error', error)
                submitting = false
            })
        }
    },
    watch: {
        user: function(newVal, oldVal) {
            this.updatedUser = newVal
        }
    },
    computed: {
        ...mapGetters({
            user: 'user/user',
            loading: 'user/loading',
            error: 'user/error'
        })
    }
}
</script>
