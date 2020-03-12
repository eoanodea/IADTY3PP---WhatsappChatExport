<template>
<loading-indicator v-if="loading"/>
<div class="bx--grid" style="padding: 60px 250px;" v-else-if="updatedAssignment">
    <!-- Project -->
    <div class="bx--row">
        <div class="bx--col-lg-12">
            <div class="bx--form-item bx--text-input-wrapper">
                <label for="title" class="bx--label">Project</label>
                
                <div class="bx--text-input__field-wrapper">
                    <input 
                    id="text-input-3" 
                    name="title" 
                    type="text" 
                    autocomplete="given-title" 
                    v-model="updatedAssignment.title"
                    class="bx--text-input" 
                    placeholder="Project">
                </div>
            </div>
        </div>
    </div>

    <!-- Percentages Data -->
    <br/>
    <div class="bx--row">
        <!-- Deposit -->
        <div class="bx--col-lg-6">
            <div class="bx--form-item bx--text-input-wrapper">
                <label for="deposit" class="bx--label">Deposit</label>
                <div class="bx--text-input__field-wrapper">
                    <input 
                    id="text-input-3" 
                    name="deposit" 
                    type="number" 
                    autocomplete="given-deposit" 
                    v-model="updatedAssignment.deposit"
                    class="bx--text-input" 
                    placeholder="Deposit %">
                    <span>%</span>
                </div>
            </div>
        </div>

        <!-- Discount -->
        <div class="bx--col-lg-6">
            <div class="bx--form-item bx--text-input-wrapper">
                <label for="discount" class="bx--label">Discount</label>
                <div class="bx--text-input__field-wrapper">
                    <input 
                    id="text-input-3" 
                    name="discount" 
                    type="number" 
                    autocomplete="given-discount" 
                    v-model="updatedAssignment.discount"
                    class="bx--text-input" 
                    placeholder="Discount">
                    <span>%</span>
                </div>
            </div>
        </div>
    </div>

    <!-- Total Price -->
    <br/>
    <div class="bx--row">
        <div class="bx--col-lg-12">
            <div class="bx--form-item bx--text-input-wrapper">
                <label for="total_price" class="bx--label">Total Price</label>
                <div class="bx--text-input__field-wrapper">
                    <span>€</span>
                    <input 
                    id="text-input-3" 
                    name="total_price" 
                    type="number" 
                    autocomplete="given-total_price" 
                    v-model="updatedAssignment.total_price"
                    class="bx--text-input" 
                    placeholder="Total Price">
                </div>
            </div>
        </div>
    </div>

    <!-- Dates -->
    <br/>
    <div class="bx--row">
        <!-- Deadline -->
        <div class="bx--col-lg-6">
            <div class="bx--form-item bx--text-input-wrapper">
                <cv-date-picker
                    date-label="Deadline"
                    kind="single"
                    :cal-options="calOptions"
                    autocomplete="given-deadline"
                    v-model="updatedAssignment.deadline"
                    placeholder="Day/Month/Year">

                </cv-date-picker>
            </div>
        </div>

        <!-- Date of Completion -->
        <div class="bx--col-lg-6">
            <div class="bx--form-item bx--text-input-wrapper">
                <cv-date-picker
                    date-label="Date of Completion"
                    kind="single"
                    :cal-options="calOptions"
                    autocomplete="given-date_of_completion"
                    v-model="updatedAssignment.date_of_completion"
                    placeholder="Day/Month/Year">

                </cv-date-picker>
            </div>
        </div>
    </div>

    <!-- Completed Checkbox -->
    <br/>
    <div class="bx--row">
        <div class="bx--col-lg-12">
            <label for="completed" class="bx--label">Project Completed</label>
            <cv-checkbox
                name="completed" 
                v-model="updatedAssignment.completed"
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
                    @click="submitAssignment"
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
<data-error v-else v-bind:error="error" v-bind:collection="'assignment'" />
</template>

<script>
    import axios from 'axios';
    import Vue from 'vue';
    import router from './../../router'
    import format from 'date-fns/format'
    
    import CarbonComponentsVue from '@carbon/vue/src/index';
    import { CvCheckbox, CvDatePicker } from '@carbon/vue/src'
    import { mapGetters } from 'vuex';
    import LoadingIndicator from './../progress/LoadingIndicator'
    import DataError from './../table/DataError'

    Vue.use(CarbonComponentsVue);

    export default {
        data() {
            let dateFormat = this.$material.locale.dateFormat || 'yyyy-MM-dd'
            let now = new Date();

            return {
                updatedAssignment: {
                    title: '',
                    total_price: 0.00,
                    deposit: 0.00,
                    date_of_completeion: format(now, dateFormat),
                    deadline: format(now, dateFormat),
                    completed: false,
                },
                errors: [],
                submitting: false,
                "calOptions": {
                "dateFormat": "d/m/Y"
                },
                // "dateLabel": "Deadline"
            }
        },
        created() {
            this.$store.dispatch('assignment/loadAssignment', parseInt(this.$route.params.id))

            this.updatedAssignment = this.assignment
            console.log('running', this.assignment, this.updatedAssignment)
        },
        methods: {
            // submitAssignment: function() {
            //     this.submitting = true
            //     const payload = this.assignment
            //    axios.put(`/api/assignment/${this.updatedAssignment.id}`, payload)
            //     .then(response => {
            //         if(!response.data) {
            //             console.log("Error!", response)
            //             this.errors.push({id: 0, message: JSON.stringify(response.message)})
            //             this.submitting = false
            //         } else router.push({path: `/admin/assignments/show/${response.data.updatedAssignment.id}`})
            //     })
            // }
            submitAssignment: function() {
                let {submitting} = this
                const id = this.$route.params.id
                submitting = true
                console.log('submitting', this.updatedAssignment)
                this.$store.dispatch('assignment/updateAssignment', [parseInt(id), this.updatedAssignment])
                .then(function(response) {
                    submitting = false
                    router.push({
                        path: `/admin/assignments/show/${id}`
                    })
                }).catch(function(error) {
                    console.log('error', error)
                    submitting = false
                })
            }
        },
        watch: {
            assignment: function(newVal, oldVal) {
                this.updatedAssignment = newVal
            }
        },
        computed: {
            ...mapGetters({
                assignment: 'assignment/assignment',
                loading: 'assignment/loading',
                error: 'assignment/error'
            })
        },
        components: {
            CvCheckbox,
            CvDatePicker,
            LoadingIndicator,
            DataError
        }
    }
</script>