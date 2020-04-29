<template>
<div class="bx--gridresponsive-form">
    <!-- Switcher Buttons -->
    <cv-content-switcher>
        <!-- Client and Services Button -->
        <cv-content-switcher-button :active="first" owner-id="csb-1" id="first" :selected="isSelected(0)">
            <AddFilled16 />
            Client & Service
        </cv-content-switcher-button>

        <!-- Project Details Button -->
        <cv-content-switcher-button owner-id="csb-2" id="second" :selected="isSelected(1)">
            <AddFilled16 />
            Project Details
        </cv-content-switcher-button>

        <!-- Add Tasks Button -->
        <cv-content-switcher-button owner-id="csb-3" id="third" :selected="isSelected(2)">
            <AddFilled16 />
            Add Tasks
        </cv-content-switcher-button>
    </cv-content-switcher>

    <!-- Switcher Contents -->
    <section style="margin: 10px 0;">
        <!-- Client and Service Form -->
        <cv-content-switcher-content owner-id="csb-1" id="first">
            <AddClientAndService v-on:selected-service-client="handleServiceAndClientId"/>
        </cv-content-switcher-content>

        <!-- Project Details Form -->
        <cv-content-switcher-content owner-id="csb-2" id="second">
            <AddAssignmentDetails v-on:selected-assignment="handleAssignmentDetails"/>
        </cv-content-switcher-content>

        <!-- Add Tasks Form -->
        <cv-content-switcher-content owner-id="csb-2" id="second">
            <!-- <AddTasksToNewAssignment v-if="serviceId" v-bind:serviceId="serviceId" v-on:selected-tasks="addTasksToAssignment"/> -->
        </cv-content-switcher-content>
    </section>
</div>
</template>

<script>
    import axios from 'axios';
    import Vue from 'vue';
    import router from './../../../router'
    import AddClientAndService from './AddClientAndService.vue';
    import AddAssignmentDetails from './AddAssignmentDetails'
    import AddTasksToNewAssignment from './AddTasksToNewAssignment';
    
    import AddFilled16 from '@carbon/icons-vue/es/add--filled/16';

    

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
                assignment: null,
                "initialSelected": 0
            }
        },
        methods: {
            handleServiceAndClientId(serviceId, clientId) {
                this.serviceId = serviceId
                this.clientId = clientId
                console.log('running!')
                this.initialSelected = 1
            },
            handleAssignmentDetails(assignment, error) {
                if(assignment == null) this.setError(error)
                else {
                    this.assignment = assignment
                    // this.setDone('second', 'third')
                }
            },
            addTasksToAssignment(tasks) {
                this.assignment.tasks = tasks
                // this.setDone('third')
                this.submitAssignment()
            },
            // setDone (id, index) {


            //     this[id] = true


            //     if (index) {
            //         this.active = index
            //     }
            // },
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
            AddTasksToNewAssignment,
            AddFilled16
        },
        computed: {
            isSelected() {
                return index => this.initialSelected === index;
            },
        }
    }
</script>

<style>
.bx--progress-line {
	width: 100%;
}
</style>
