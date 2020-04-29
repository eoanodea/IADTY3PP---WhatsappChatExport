<template>
<loading-indicator v-if="loading"/>
<div class="bx--gridresponsive-form formAlignment" v-else-if="updatedService">
    <!-- Message -->
    <div class="bx--row">
        <h3>Edit <span class="logoCol">Service</span></h3>
    </div><br/>

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
                        v-model="updatedService.title"
                        class="bx--text-input placeholderForms" 
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
                        v-model="updatedService.description"
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
                    <span class="price-prefix">€</span>
                    <input 
                    id="text-input-3" 
                    name="standard_price" 
                    type="number" 
                    autocomplete="given-standard_price" 
                    v-model="updatedService.standard_price"
                    class="bx--text-input placeholderForms price-input" 
                    placeholder="€Standard Price">
                </div>
            </div>
        </div>
    </div>

    <!-- Recurring Payment Checkbox -->
    <br/>
    <div class="bx--row">
        <div class="bx--col-lg-12">
            <cv-checkbox
                name="recurring_payment" 
                label="Recurring Payment"
                value="recurring_payment"
                v-model="updatedService.recurring_payment"
                >
            </cv-checkbox>
        </div>
    </div>

    <!-- Recurring Payment Checkbox -->
    <br/>
    <div class="bx--row">
        <div class="bx--col-lg-12">
            <cv-checkbox
                name="is_public" 
                label="Public Service"
                value="is_public"
                v-model="updatedService.is_public"
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
                    @click="submitService"
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
</div>
<data-error v-else v-bind:error="error" v-bind:collection="'service'" />
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
                updatedService: {
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
        created() {
            this.$store.dispatch('service/loadService', parseInt(this.$route.params.id))

            this.updatedService = this.service
        },
        methods: {
            submitService: function() {
                let {submitting} = this
                const id = this.$route.params.id
                submitting = true
                console.log('submitting', this.updatedService)
                this.$store.dispatch('service/updateService', [parseInt(id), this.updatedService])
                .then(function(response) {
                    submitting = false
                    router.push({
                        path: `/admin/services/show/${id}`
                    })
                }).catch(function(error) {
                    console.log('error', error)
                    submitting = false
                })
            }
        },
        watch: {
            service: function(newVal, oldVal) {
                this.updatedService = newVal
            }
        },
        computed: {
            ...mapGetters({
                service: 'service/service',
                loading: 'service/loading',
                error: 'service/error'
            })
        },
        components: {
            LoadingIndicator,
            DataError
        },
    }
</script>

<style lang="scss" scoped>
    .price-prefix {
        position: absolute;
        left: 5px;   
    }
    .price-input {
        padding: 0 1rem 0 1.5rem;
    }
</style>