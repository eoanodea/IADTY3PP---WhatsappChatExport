<template>
<div class="fluid-container">

    <md-card-toolbar>
        <div class="md-title accent">Add a Client</div>
    </md-card-toolbar>

    <div class="row">
        <div class="col-6">
            <form novalidate class="md-layout" method="POST" @submit.stop.prevent="validateUser">
                <md-card class="md-layout-item background">
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
                        </md-field>
                        <md-field>
                            <label class="accent" for="password">Password</label>
                            <md-input type="password" name="password" class="form-control" placeholder="Password" v-model="user.password" /> <br />
                        </md-field>
                        <md-field>
                            <label class="accent" for="confirm_password">Confirm Password</label>
                            <md-input type="password" name="confirm_password" class="form-control" placeholder="Password Confirmation" v-model="user.confirm_password" /> <br />
                        </md-field>
                    </md-card-content>
                    <md-card-actions>
                        <md-button type="submit" :disabled="submitting" class="md-primary md-raised saveBtn">Save</md-button>
                    </md-card-actions>
                </md-card>
            </form>
        </div>
    </div>
</div>
</template>
<script>
import axios from 'axios';
import Vue from 'vue';
import router from './../../router'
import {
    MdButton,
    MdField,
    MdCard
} from 'vue-material/dist/components'

Vue.use(MdButton)
Vue.use(MdField)
Vue.use(MdCard)


export default {
    data() {
        return {
            user: {
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
                user
            } = this
            if (
                user.first_name &&
                user.last_name &&
                user.email &&
                user.mobile_number &&
                user.address &&
                user.password &&
                user.password === user.confirm_password) {
                this.submitUser()
            }

            this.errors = [];
            if (!user.first_name) {
                this.errors.push({
                    id: 0,
                    message: 'First name required.'
                });
            }
            if (!user.last_name) {
                this.errors.push({
                    id: 1,
                    message: 'Last name required.'
                });
            }
            if (!user.email) {
                this.errors.push({
                    id: 2,
                    message: 'Email required.'
                });
            }
            if (!user.mobile_number) {
                this.errors.push({
                    id: 3,
                    message: 'Mobile required.'
                });
            }
            if (!user.address) {
                this.errors.push({
                    id: 4,
                    message: 'Address required.'
                });
            }
            if (!user.password) {
                this.errors.push({
                    id: 5,
                    message: 'Password required.'
                });
            }
            if (user.password !== user.confirm_password) {
                this.errors.push({
                    id: 6,
                    message: 'Password doesnt match.'
                });
            }
        },
        submitUser: function() {
            this.submitting = true
            const payload = this.user
            axios.post('/api/user/new', payload)
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
<style lang="scss" scoped>
.md-field {
    flex-direction: column;
}
.md-input,
.md-textarea {
    color: #fff;
}

.row {
    display: flex;
    justify-content: center;
}

.md-title {
    text-shadow: 1px 1px 2px #000 !important;
}

.background {
    background-color: #3b3b3b !important;
    font-size: 18px !important;
    padding: 10px;
}

.saveBtn {
    color: #fff !important;
    background-color: #00cc83 !important;
}

.accent {
    color: #00cc83 !important;
}

.subject {
    color: #818181 !important;
}

.text {
    color: #fff !important;
}
</style>
