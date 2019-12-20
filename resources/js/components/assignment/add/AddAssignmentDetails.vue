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
                        <md-input name="discount" type="number" min="0" max="100" class="form-control" placeholder="Discount" v-model="assignment.discount" /> <br />
                        <span class="md-suffix">%</span> <br />
                    </md-field>
                    <md-field>
                        <label for="deposit">Deposit</label>
                        <md-input name="deposit" type="number" min="0" max="100" class="form-control" placeholder="Deposit" v-model="assignment.deposit" />
                        <span class="md-suffix">%</span> <br />
                    </md-field>
                    <md-datepicker name="deadline" class="md-field-clear" placeholder="Deadline" v-model="assignment.deadline">
                        <label for="deadline">Deadline</label>
                    </md-datepicker> <br />
                </md-card-content>
                <md-card-actions>
                    <md-button type="submit" :disabled="submitting" class="md-primary md-raised">Save</md-button>
                </md-card-actions>
            </md-card>
        </form>
    </div>
</template>
<script>
    import Vue from 'vue';
    import format from 'date-fns/format'

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
        }
    }
</script>
