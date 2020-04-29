<template>
    <div class="formAlignment">
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
                            class="bx--text-input placeholderForms" 
                            placeholder="Name your Project">
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
                            class="bx--text-input placeholderForms" 
                            placeholder="Deposit %">
                            <span class="percent-prefix">%</span>
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
                            class="bx--text-input placeholderForms" 
                            placeholder="Discount">
                            <span class="percent-prefix">%</span>
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
                            <span class="price-prefix">€</span>
                            <input 
                            id="text-input-3" 
                            name="total_price" 
                            type="number" 
                            autocomplete="given-total_price" 
                            v-model="assignment.total_price"
                            class="bx--text-input placeholderForms price-input" 
                            placeholder="e.g. 300.00">
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
                            class="placeholderForms"
                            placeholder="Day/Month/Year">
                        </cv-date-picker>
                    </div>
                </div>
            </div>

            <!-- Error -->
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

            <!-- Save Button -->
            <br/>
            <button @click="validateAssignment" class="bx--btn bx--btn--lg bx--btn--primary">
                Save
            </button>
        </form>
    </div>
</template>

<script>
    import Vue from 'vue';
    import format from 'date-fns/format'

    export default {
        data() {
            let dateFormat = 'd/m/y'
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
                calOptions: {
                    dateFormat
                },
                errors: [],
                submitting: false,
            }
        },
        mounted() {
            //
        },
        methods: {
            validateAssignment() {
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
                // if(this.errors.length > 0) this.$emit('selected-assignment', null, 'Error adding assignment details')
            },
            addTasksToAssignment(tasks) {
                this.assignment.tasks = tasks
            },
        },
        components: {
            //
        }
    }
</script>
