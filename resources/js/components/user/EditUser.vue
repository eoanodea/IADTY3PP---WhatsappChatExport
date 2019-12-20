<template>
<div class="fluid-container">
    <div class="row">
        <div class="col-6">
            <form novalidate class="md-layout" method="PUT" @submit.stop.prevent="submitUser">
                <md-card class="md-layout-item background">
                    <md-card-header>
                        <div class="md-title accent">Edit Client</div>
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
