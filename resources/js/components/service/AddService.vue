<!--
@Author: John Carlo M. Ramos
@Date:   2019-11-08T10:11:14+00:00
@Email:  !!!!!---CTRL + ALT + C = Colour Picker---!!!!!
@Last modified by:   John Carlo M. Ramos
@Last modified time: 2019-11-08T10:45:20+00:00
-->
<template>
    <div>
        <form novalidate class="md-layout" method="POST" @submit.stop.prevent="validateService">
            <md-card class="md-layout-item md-size-50 md-small-size-100">
                <md-card-header>
                    <div class="md-title">Add a Service</div>
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
                        <label for="title">Title</label>
                        <md-input name="title" type="text" class="form-control" placeholder="Title" v-model="service.title" /> <br />
                    </md-field>
                    <md-field>
                        <label for="description">Description</label>
                        <md-input name="description" type="text" class="form-control" placeholder="Description" v-model="service.description" /> <br />
                    </md-field>
                    
                    <md-checkbox name="recurring_payment" v-model="service.recurring_payment">Recuring Payment</md-checkbox> <br />
                    <md-checkbox name="is_public" v-model="service.is_public">Public Service</md-checkbox>
                    <md-field>
                        <label for="standard_price">Standard Price</label>
                        <md-input name="standard_price" type="number" class="form-control" placeholder="Standard Price" v-model="service.standard_price" /> <br />
                    </md-field>

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
    import {MdButton, MdField, MdCard, MdCheckbox} from 'vue-material/dist/components'

    Vue.use(MdButton)
    Vue.use(MdField)
    Vue.use(MdCard)
    Vue.use(MdCheckbox)

    export default {
        data() {
            return {
                service: {
                    title: '',
                    description: '',
                    recurring_payment: false,
                    standard_price: 0,
                    is_public: false
                },
                errors: [],
                submitting: false
            }
        },
        methods: {
            validateService: function() {
                const {service} = this
                if(
                    service.title
                    && service.description
                    && service.recurring_payment
                    && service.standard_price
                    && service.is_public) {
                    this.submitService()
                }

                this.errors = [];
                if(!service.title) {
                     this.errors.push({id: 0, message: 'Title required.'});
                }
                if(!service.description) {
                     this.errors.push({id: 1, message: 'Description required.'});
                }
                if(!service.recurring_payment) {
                     this.errors.push({id: 2, message: 'Input required.'});
                }
                if(!service.standard_price) {
                     this.errors.push({id: 3, message: 'Standard Price required.'});
                }
                if(!service.is_public) {
                     this.errors.push({id: 4, message: 'Input required.'});
                }
            },
            submitService: function() {
                this.submitting = true
                const payload = this.service
               axios.post('http://localhost:8000/api/service/new', payload)
                .then(response => {
                    if(!response.data) {
                        console.log("Error!", response)
                        this.errors.push({id: 0, message: JSON.stringify(response.message)})
                        this.submitting = false
                    } else router.push({path: `/admin/services/show/${response.data.service.id}`})
                })
            }

        }
    }
</script>
