<template>
    <div class="bx--grid">
        <!-- Title -->
        <div class="bx--row">
            <div class="bx--col-lg-12">
                <div class="bx--form-item bx--text-input-wrapper">
                    <label for="title" class="bx--label">Title</label>
                    <div class="bx--text-input__field-wrapper">
                        <input 
                        id="text-input-3" 
                        name="title" 
                        type="text" 
                        autocomplete="given-title" 
                        v-model="service.title"
                        class="bx--text-input" 
                        placeholder="Title">
                    </div>
                </div>
            </div>
        </div>

        <!-- Description -->
        <br/>
        <div class="bx--row">
            <div class="bx--col-lg-12">
                <div class="bx--form-item bx--text-input-wrapper">
                    <label for="description" class="bx--label">Description</label>
                    <div class="bx--text-input__field-wrapper">
                        <textarea 
                            id="text-area-2" 
                            name="description" 
                            type="description" 
                            autocomplete="description" 
                            v-model="service.description"
                            class="bx--text-area"
                            rows="4" 
                            cols="50" 
                            placeholder="Description"></textarea>
                    </div>
                </div>
            </div>
        </div>

        <!-- Standard Price -->
        <br/>
        <div class="bx--row">
            <div class="bx--col-lg-12">
                <div class="bx--form-item bx--text-input-wrapper">
                    <label for="standard_price" class="bx--label">Standard Price</label>
                    <div class="bx--text-input__field-wrapper">
                        <span>€</span>
                        <input 
                        id="text-input-3" 
                        name="standard_price" 
                        type="number" 
                        autocomplete="given-standard_price" 
                        v-model="service.standard_price"
                        class="bx--text-input" 
                        placeholder="€Standard Price">
                    </div>
                </div>
            </div>
        </div>

        <!-- Recurring Payment Checkbox -->
        <br/>
        <div class="bx--row">
            <div class="bx--col-lg-12">
                <label for="recurring_payment" class="bx--label">Recurring Payment</label>
                <cv-checkbox
                    name="recurring_payment" 
                    v-model="service.recurring_payment"
                    :disabled="disabled">
                </cv-checkbox>
            </div>
        </div>

        <!-- Recurring Payment Checkbox -->
        <br/>
        <div class="bx--row">
            <div class="bx--col-lg-12">
                <label for="is_public" class="bx--label">Public Service</label>
                <cv-checkbox
                    name="is_public" 
                    v-model="service.is_public"
                    :disabled="disabled">
                </cv-checkbox>
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
                    <h1 class="md-title accent">Add Service</h1>
                </md-table-toolbar>
            </div>
        </div>

        <form novalidate class="md-layout" method="POST" @submit.stop.prevent="validateService">
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
                        <label class="accent" for="title">Title</label>
                        <md-input name="title" type="text" class="form-control" placeholder="Title" v-model="service.title" /> <br />
                    </md-field>
                    <md-field>
                        <label class="accent" for="description">Description</label>
                        <md-input name="description" type="text" class="form-control" placeholder="Description" v-model="service.description" /> <br />
                    </md-field>
                    <md-field>
                        <span class="md-prefix">€</span>
                        <label class="accent" for="standard_price">Standard Price</label>
                        <md-input name="standard_price" type="number" class="form-control" placeholder="Standard Price" v-model="service.standard_price" /> <br />
                    </md-field>
                    <md-checkbox name="recurring_payment" v-model="service.recurring_payment">Recuring Payment</md-checkbox> <br />
                    <md-checkbox name="is_public" v-model="service.is_public">Public Service</md-checkbox>
                </md-card-content>
                <md-card-actions> -->
                    <!-- <md-button class="md-secondary md-raised">Back</md-button> -->
                    <!-- <md-button type="submit" :disabled="submitting" class="md-primary md-raised btnAccent">Save</md-button>
                </md-card-actions>
            </md-card>
        </form> -->
    </div>
</template>
<script>
    import axios from 'axios';
    import Vue from 'vue';
    import router from './../../router'
    import 'carbon-components/css/carbon-components.css';
    import CarbonComponentsVue from '@carbon/vue/src/index';
    import { CvCheckbox } from '@carbon/vue/src'
    // import {MdButton, MdField, MdCard, MdCheckbox} from 'vue-material/dist/components'

    Vue.use(CarbonComponentsVue);

    // Vue.use(MdButton)
    // Vue.use(MdField)
    // Vue.use(MdCard)
    // Vue.use(MdCheckbox)

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
               axios.post('/api/service/new', payload)
                .then(response => {
                    if(!response.data) {
                        console.log("Error!", response)
                        this.errors.push({id: 0, message: JSON.stringify(response.message)})
                        this.submitting = false
                    } else router.push({path: `/admin/services/show/${response.data.service.id}`})
                })
            }

        },
        components: {
            CvCheckbox
        }
    }
</script>
