<template>
<div class="bx--grid" style="padding: 60px 250px;">
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
                    v-model="assignment.title"
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
                    v-model="assignment.deposit"
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
                    v-model="assignment.discount"
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
                    v-model="assignment.total_price"
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
                    v-model="assignment.deadline"
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
                    v-model="assignment.date_of_completion"
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
                v-model="assignment.completed"
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
                    <h1 class="md-title accent">Edit Project Details</h1>
                </md-table-toolbar>
            </div>
        </div>

        <form novalidate class="md-layout" method="PUT" @submit.stop.prevent="submitAssignment">
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
                        <md-input name="title" type="text" class="form-control" placeholder="Title" v-model="assignment.title" /> <br />
                    </md-field>
                    <md-field>
                        <label class="accent" for="price">Price</label>
                        <md-input name="price" type="number" class="form-control" placeholder="Price" v-model="assignment.total_price" /> <br />
                    </md-field>
                    <md-field>
                        <label class="accent" for="deposit">Deposit</label>
                        <md-input name="deposit" type="numer" class="form-control" placeholder="Price" v-model="assignment.deposit" /> <br />
                    </md-field>
                    <md-datepicker name="deadline" class="md-field-clear accent" placeholder="Deadline" v-model="assignment.deadline">
                        <label class="accent" for="deadline">Deadline</label>
                    </md-datepicker> <br />
                    <md-datepicker name="date_of_completeion" class="md-field-clear accent" placeholder="Deadline" v-model="assignment.date_of_completeion">
                        <label class="accent" for="date_of_completeion">Date of completeion</label>    
                    </md-datepicker> <br />
                    <md-checkbox name="completed" v-model="assignment.completed">Completed</md-checkbox> <br />
                    
                </md-card-content>
                <md-card-actions>
                    <md-button type="submit" :disabled="submitting" class="md-primary md-raised">Save</md-button>
                </md-card-actions>
            </md-card>
        </form> -->
</div>
</template>

<script>
    import axios from 'axios';
    import Vue from 'vue';
    import router from './../../router'
    // import {MdDatepicker} from 'vue-material/dist/components'
    import format from 'date-fns/format'
    import 'carbon-components/css/carbon-components.css';
    import CarbonComponentsVue from '@carbon/vue/src/index';
    import { CvCheckbox, CvDatePicker } from '@carbon/vue/src'

    Vue.use(CarbonComponentsVue);

    // Vue.use(MdDatepicker)
    

    export default {
        data() {
            let dateFormat = this.$material.locale.dateFormat || 'yyyy-MM-dd'
            let now = new Date();

            return {
                assignment: {
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
        mounted() {
            axios.get(`/api/assignment/${this.$route.params.id}`)
            .then(response => {
                if(!response.data) {
                    console.log("Error getting assignment", response)
                } else {
                    let assignmentObj = response.data.assignment
                    assignmentObj.recurring_payment == 1 ? assignmentObj.recurring_payment = true : assignmentObj.recurring_payment = false
                    assignmentObj.is_public == 1 ? assignmentObj.is_public = true : assignmentObj.is_public = false
                    this.assignment = assignmentObj
                }
            })
        },
        methods: {
            submitAssignment: function() {
                this.submitting = true
                const payload = this.assignment
               axios.put(`/api/assignment/${this.assignment.id}`, payload)
                .then(response => {
                    if(!response.data) {
                        console.log("Error!", response)
                        this.errors.push({id: 0, message: JSON.stringify(response.message)})
                        this.submitting = false
                    } else router.push({path: `/admin/assignments/show/${response.data.assignment.id}`})
                })
            }
        },
        components: {
            CvCheckbox,
            CvDatePicker
        }
    }
</script>