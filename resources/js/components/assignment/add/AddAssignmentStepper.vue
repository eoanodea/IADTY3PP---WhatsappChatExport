/*
 * --------------------
 * Author Name: Eoan O'Dea
 * Author Email: eoan@wspace.ie
 * Date Created: Friday December 20th 2019 6:48:47 pm
 * --------------------
 * Project Name: IADTY3PPClientMangementSystem
 * Version: 1.0.0
 * --------------------
 * File Name: Stepper.vue
 * Last Modified: Friday December 20th 2019 9:08:28 pm
 * --------------------
 * Copyright (c) 2019 WebSpace
 * --------------------
 */


<template>
    <div>
        <md-steppers :md-active-step.sync="active" md-linear>
            <md-step id="first" md-label="Client & Service" md-description="Choose a client and Service for your new assignment" :md-done.sync="first">
                <AddClientAndService v-on:selected-service-client="handleServiceAndClientId"/>
            </md-step>
            <md-step id="second" md-label="Project Details" md-description="Enter details on the assignment" :md-done.sync="second" :md-error="secondStepError">
                <AddAssignmentDetails v-on:selected-assignment="handleAssignmentDetails"/>
            </md-step>
            <md-step id="third" md-label="Add Tasks" md-description="Add tasks to the new assignment" :md-done.sync="third">
                <AddTasksToNewAssignment v-if="serviceId" v-bind:serviceId="serviceId" v-on:selected-tasks="addTasksToAssignment"/>
            </md-step>
        </md-steppers>
    </div>
</template>
<script>
    import axios from 'axios';
    import Vue from 'vue';
    import router from './../../../router'
    import {MdSteppers} from 'vue-material/dist/components'
    import AddClientAndService from './AddClientAndService.vue';
    import AddAssignmentDetails from './AddAssignmentDetails'
    import AddTasksToNewAssignment from './AddTasksToNewAssignment';

    Vue.use(MdSteppers)

    export default {
        data() {
            return {
                active: 'first',
                first: false,
                second: false,
                third: false,
                secondStepError: null,
                serviceId: null,
                clientId: null,
                assignment: null
            }
        },
        methods: {
            handleServiceAndClientId(serviceId, clientId) {
                this.serviceId = serviceId
                this.clientId = clientId
                this.setDone('first', 'second')
            },
            handleAssignmentDetails(assignment, error) {
                if(assignment == null) this.setError(error)
                else {
                    this.assignment = assignment
                    this.setDone('second', 'third')
                }
            },
            addTasksToAssignment(tasks) {
                this.assignment.tasks = tasks
                this.setDone('third')
                this.submitAssignment()
            },
            setDone (id, index) {
                this[id] = true

                this.secondStepError = null

                if (index) {
                    this.active = index
                }
            },
            setError (msg) {
                this.secondStepError = `Error: ${msg}`
            },
            submitAssignment() {
                const payload = this.assignment
                axios.post(`/api/assignment/${this.serviceId}/${this.clientId}`, payload)
                    .then(response => {
                        if(!response.data) {
                            console.log("Error!", response)
                        } else router.push({path: `/admin/assignments/show/${response.data.assignment.id}`})
                    })
            }
        },
        components: {
            AddClientAndService,
            AddAssignmentDetails,
            AddTasksToNewAssignment
        }
    }
</script>
