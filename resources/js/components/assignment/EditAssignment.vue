<template>
    <div>
        <form novalidate class="md-layout" method="PUT" @submit.stop.prevent="submitAssignment">
            <md-card class="md-layout-item md-size-50 md-small-size-100">
                <md-card-header>
                    <div class="md-title">Edit Assignment</div>
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
                        <label for="description">Description</label>
                        <md-input name="description" type="text" class="form-control" placeholder="Description" v-model="assignment.description" /> <br />
                    </md-field>
                    
                    <md-checkbox name="recurring_payment" v-model="assignment.recurring_payment">Recuring Payment</md-checkbox> <br />
                    <md-checkbox name="is_public" v-model="assignment.is_public">Public Assignment</md-checkbox>
                    <md-field>
                        <label for="standard_price">Standard Price</label>
                        <md-input name="standard_price" type="number" class="form-control" placeholder="Standard Price" v-model="assignment.standard_price" /> <br />
                    </md-field>
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
    import {MdButton, MdField, MdCard, MdCheckbox} from 'vue-material/dist/components'

    Vue.use(MdButton)
    Vue.use(MdField)
    Vue.use(MdCard)
    Vue.use(MdCheckbox)
    

    export default {
        data() {
            return {
                assignment: {
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
<style lang="scss" scoped>
    .md-field {
        flex-direction: column; 
    }
    .md-input, .md-textarea {
        color: #fff;
    }
</style>