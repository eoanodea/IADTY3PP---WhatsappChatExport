<template>
<div class="bx--grid" style="padding: 60px 250px;" v-if="updatedService">
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
                    <span>€</span>
                    <input 
                    id="text-input-3" 
                    name="standard_price" 
                    type="number" 
                    autocomplete="given-standard_price" 
                    v-model="updatedService.standard_price"
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
                v-model="updatedService.recurring_payment"
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
                v-model="updatedService.is_public"
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
                    v-bind:disabled="submitting"
                    @click="submitService"
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
</template>

<script>
    import axios from 'axios';
    import Vue from 'vue';
    import router from './../../router'
    import { mapGetters } from 'vuex';

    export default {
        data() {
            return {
                updatedService: null,
                errors: [],
                submitting: false
            }
        },
        mounted() {
            this.$store.dispatch('user/loadService', parseInt(this.$route.params.id))
            this.updatedService = this.service
        },
        methods: {
            submitService: function() {
                let {submitting} = this
                submitting = true
                this.$store.dispatch(
                    'service/updateService', 
                    parseInt(this.$route.params.id), 
                    this.newService)
                .then(function(response) {
                    submitting = false
                    router.push({
                        path: `/admin/services/show/${response}`
                    })
                }).catch(function(error) {
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
                service: 'service/service'
        })
        }
    }
</script>