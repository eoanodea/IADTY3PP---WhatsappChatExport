<!--
@Author: John Carlo M. Ramos
@Date:   2019-11-08T10:11:14+00:00
@Email:  !!!!!---CTRL + ALT + C = Colour Picker---!!!!!
@Last modified by:   John Carlo M. Ramos
@Last modified time: 2019-11-08T10:45:20+00:00
-->
<template>
    <div>
        <form novalidate class="md-layout" method="POST" @submit.stop.prevent="validateAssignment">
            <md-card class="md-layout-item md-size-50 md-small-size-100">
                <md-card-header>
                    <div class="md-title">Add a Assignment</div>
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
                        <label for="service">Select a service</label>
                        <md-select name="service" id="service" palceholder="Select a service" v-model="serviceId">
                            <md-option v-for="service in services" v-bind:key="service.id" :value="service.id">{{service.title}}</md-option>
                        </md-select>
                    </md-field>
                    <md-field>
                        <label for="client">Select a client</label>
                        <md-select name="client" id="client" palceholder="Select a client" v-model="clientId"> 
                            <md-option v-for="client in clients" v-bind:key="client.id" :value="client.id">{{client.first_name + ' ' + client.last_name}}</md-option>
                        </md-select>
                    </md-field>
                    <md-field>
                        <label for="title">Title</label>
                        <md-input name="title" type="text" class="form-control" placeholder="Title" v-model="assignment.title" /> <br />
                    </md-field>
                    <md-field>
                        <span class="md-prefix">€</span>
                        <label for="price">Price</label>
                        <md-input name="price" type="number" class="form-control" placeholder="Price" v-model="assignment.total_price" /> <br />
                    </md-field>
                    <md-field>
                        <label for="discount">Discount</label>
                        <md-input name="discount" type="number" class="form-control" placeholder="Discount" v-model="assignment.discount" /> <br />
                        <span class="md-suffix">%</span> <br />
                    </md-field>
                    <md-field>
                        <label for="deposit">Deposit</label>
                        <md-input name="deposit" type="numer" min="0" max="100" class="form-control" placeholder="Deposit" v-model="assignment.deposit" />
                        <span class="md-suffix">%</span> <br />
                    </md-field>
                    <md-datepicker name="deadline" class="md-field-clear" placeholder="Deadline" v-model="assignment.deadline">
                        <label for="deadline">Deadline</label>
                    </md-datepicker> <br />

                </md-card-content>
                <md-card-actions>
                    <md-button class="md-secondary md-raised">Back</md-button>
                    <md-button type="submit" :disabled="submitting" class="md-primary md-raised">Save</md-button>
                </md-card-actions>
            </md-card>
        </form>
    </div>
</template>
<script>
    import axios from 'axios';
    import Vue from 'vue';
    import router from './../../router'
    import {MdMenu} from 'vue-material/dist/components'
    import format from 'date-fns/format'

    Vue.use(MdMenu);

    export default {
        data() {
            let dateFormat = this.$material.locale.dateFormat || 'yyyy-MM-dd'
            let now = new Date();

            return {
                serviceId: null,
                clientId: null,
                assignment: {
                    title: '',
                    description: '',
                    recurring_payment: false,
                    standard_price: 0,
                    discount: 0,
                    deposit: 0,
                    deadline: format(now, dateFormat)
                },
                errors: [],
                submitting: false,
                clients: [],
                services: []
            }
        },
        mounted() {
            axios.get('/api/service/all')
            .then(response => {
                if(!response.data) {
                    console.log('Error no services', response)
                } else {
                    axios.get('/api/user/all')
                    .then(userResponse => {
                        this.services = response.data
                        this.clients = userResponse.data
                    })
                }

            })
            
        },
        methods: {
            validateAssignment: function() {
                const {assignment} = this
                if(
                    assignment.title
                    && assignment.total_price
                    && assignment.deposit
                    && assignment.deadline
                    && assignment.discount
                    && this.serviceId
                    && this.clientId) {
                    this.submitAssignment()
                }

                this.errors = [];
                if(!assignment.title) {
                     this.errors.push({id: 0, message: 'Title required.'});
                }
                if(!assignment.total_price) {
                     this.errors.push({id: 1, message: 'Price required.'});
                }
                if(!assignment.deposit) {
                     this.errors.push({id: 2, message: 'Deposit required.'});
                }
                if(!assignment.deadline) {
                     this.errors.push({id: 3, message: 'Deadline required.'});
                }
                if(!assignment.discount) {
                    this.errors.push({id: 4, message: 'Discount required.'});
                }
                if(!this.serviceId) {
                    this.errors.push({id: 5, message: 'Service required.'});
                }
                if(!this.clientId) {
                    this.errors.push({id: 6, message: 'Client required.'});
                }
            },
            submitAssignment: function() {
                this.submitting = true
                const payload = this.assignment
               axios.post(`/api/assignment/${this.serviceId}/${this.clientId}`, payload)
                .then(response => {
                    if(!response.data) {
                        console.log("Error!", response)
                        this.errors.push({id: 0, message: JSON.stringify(response.message)})
                        this.submitting = false
                    } else router.push({path: `/admin/assignments/show/${response.data.assignment.id}`})
                })
            }

        }
    }
</script>
