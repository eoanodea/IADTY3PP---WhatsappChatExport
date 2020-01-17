<template>
    <div fluid-container>
        <div class="md-layout">
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
        </form>
    </div>
</template>
<script>
    import axios from 'axios';
    import Vue from 'vue';
    import router from './../../router'
    import {MdDatepicker} from 'vue-material/dist/components'
    import format from 'date-fns/format'

    Vue.use(MdDatepicker)
    

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
                submitting: false
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

        }
    }
</script>