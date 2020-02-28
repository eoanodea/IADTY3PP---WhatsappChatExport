<template>
    <loading-indicator v-if="submitting"/>
    <div class="bx--grid" style="padding: 60px 250px;" v-else>
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
                        v-model="newService.title"
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
                            v-model="newService.description"
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
                        v-model="newService.standard_price"
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
                    >
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
                    >
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
                        @click="validateService"
                        :disabled="submitting">
                            Save
                    </button>
                </div>
            </div>
        </div>

        <!-- Error -->
        <data-error v-if="error" v-bind:error="error" />
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
</template>

<script>
    import axios from 'axios';
    import Vue from 'vue';
    import router from './../../router'
    import DataError from './../table/DataError'
    import 'carbon-components/css/carbon-components.css';
    import CarbonComponentsVue from '@carbon/vue/src/index';
    import { CvCheckbox } from '@carbon/vue/src'
    import { mapGetters } from 'vuex';
    import LoadingIndicator from './../progress/LoadingIndicator'

    Vue.use(CarbonComponentsVue);


    export default {
        data() {
            return {
                newService: {
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
                const {newService} = this
                if(
                    newService.title &&
                    newService.description &&
                    newService.recurring_payment &&
                    newService.standard_price &&
                    newService.is_public) {
                    this.submitService()
                }

                this.errors = [];
                if(!newService.title) {
                    this.errors.push({
                        id: 0, 
                        message: 'Title required.'
                        });
                }
                if(!newService.description) {
                    this.errors.push({
                        id: 1, message: 'Description required.'
                        });
                }
                if(!newService.recurring_payment) {
                    this.errors.push({
                        id: 2, message: 'Input required.'
                        });
                }
                if(!newService.standard_price) {
                    this.errors.push({
                        id: 3, message: 'Standard Price required.'
                        });
                }
                if(!newService.is_public) {
                    this.errors.push({
                        id: 4, message: 'Input required.'
                        });
                }
            },
            submitService: function() {
                let {submitting} = this
                submitting = true
                this.$store.dispatch('service/addService', this.service)
                .then(function(response) {
                    console.log('submit respons', response)
                    submitting = false
                    if(response) {
                        router.push({
                            path: `/admin/services/show/${response}`
                        })
                    }
                }).catch(function(error) {
                    console.log('error', error)
                    submitting = false
                })
                // this.submitting = true
                // const payload = this.service
                // axios.post('/api/service/new', payload)
                // .then(response => {
                //     if(!response.data) {
                //         console.log("Error!", response)
                //         this.errors.push({id: 0, message: JSON.stringify(response.message)})
                //         this.submitting = false
                //     } else router.push({path: `/admin/services/show/${response.data.service.id}`})
                // })
            }
        },
        components: {
            DataError,
            LoadingIndicator,
            CvCheckbox
        },
        computed: {
            ...mapGetters({
                error: 'service/error',
            })
        }
    }
</script>
