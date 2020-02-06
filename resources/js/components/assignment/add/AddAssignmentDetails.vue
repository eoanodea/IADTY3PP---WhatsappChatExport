<template>
<div>
    <form novalidate method="POST" @submit.stop.prevent="validateAssignment">
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

        <!-- Deadline -->
        <br/>
        <div class="bx--row">
            <div class="bx--col-lg-12">
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
        </div>

        <!-- Save Button -->
        <br/>
        <cv-link :disabled="!serviceId || !clientId" @click="returnData" style="text-decoration: none;">
            <button :disabled="!serviceId || !clientId" @click="returnData" class="bx--btn bx--btn--lg bx--btn--primary">
                Save
            </button>
        </cv-link>
    </form>



        <!-- <div class="md-layout">
            <div class="md-layout-item">
                <md-table-toolbar>
                    <h1 class="md-title accent">Add a Project</h1>
                </md-table-toolbar>
            </div>
        </div>

        <form novalidate class="md-layout" method="POST" @submit.stop.prevent="validateAssignment">
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
                        <span class="md-prefix">€</span>
                        <label class="accent" for="price">Price</label>
                        <md-input name="price" type="number" class="form-control" placeholder="Price" v-model="assignment.total_price" /> <br />
                    </md-field>
                    <md-field>
                        <label class="accent" for="discount">Discount</label>
                        <md-input name="discount" type="number" min="0" max="100" class="form-control" placeholder="Discount" v-model="assignment.discount" /> <br />
                        <span class="md-suffix">%</span> <br />
                    </md-field>
                    <md-field>
                        <label class="accent" for="deposit">Deposit</label>
                        <md-input name="deposit" type="number" min="0" max="100" class="form-control" placeholder="Deposit" v-model="assignment.deposit" />
                        <span class="md-suffix">%</span> <br />
                    </md-field>
                    <md-checkbox name="recurring_payment" v-model="assignment.recurring_payment">Recuring Payment</md-checkbox> <br />
                    <md-datepicker name="deadline" class="md-field-clear" placeholder="Deadline" v-model="assignment.deadline">
                        <label class="accent" for="deadline">Deadline</label>
                    </md-datepicker> <br />
                </md-card-content>
                <md-card-actions>
                    <md-button type="submit" :disabled="submitting" class="md-primary md-raised btnAccent">Save</md-button>
                </md-card-actions>
            </md-card>
        </form> -->
</div>
</template>
<script>
    import Vue from 'vue';
    import format from 'date-fns/format'
    import 'carbon-components/css/carbon-components.css';
    import CarbonComponentsVue from '@carbon/vue/src/index';
    import { CvCheckbox, CvDatePicker } from '@carbon/vue/src'

    Vue.use(CarbonComponentsVue);

    export default {
        data() {
            let dateFormat = this.$material.locale.dateFormat || 'yyyy-MM-dd'
            let now = new Date();

            return {
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
            }
        },
        mounted() {
            //
        },
        methods: {
            validateAssignment: function() {
                const {assignment} = this
                if(
                    assignment.title
                    && assignment.total_price
                    && (assignment.deposit >= 0 && assignment.deposit <= 100)
                    && (assignment.discount >= 0 && assignment.discount <= 100 )
                    && assignment.deadline) {
                    this.$emit('selected-assignment', assignment)
                }

                this.errors = [];
                if(!assignment.title) {
                     this.errors.push({id: 0, message: 'Title required.'});
                }
                if(!assignment.total_price) {
                     this.errors.push({id: 1, message: 'Price required.'});
                }
                if(assignment.deposit < 0 || assignment.deposit > 100) {
                     this.errors.push({id: 2, message: 'Deposit required, must be between 0 and 100'});
                }
                if(!assignment.deadline) {
                     this.errors.push({id: 3, message: 'Deadline required.'});
                }
                if(assignment.discount < 0 || assignment.discount > 100) {
                    this.errors.push({id: 4, message: 'Discount required, must be between 0 and 100'});
                }
                if(this.errors.length > 0) this.$emit('selected-assignment', null, 'Error adding assignment details')
            },
            addTasksToAssignment(tasks) {
                this.assignment.tasks = tasks
            },
        },
        components: {
            CvCheckbox,
            CvDatePicker
        }
    }
</script>
