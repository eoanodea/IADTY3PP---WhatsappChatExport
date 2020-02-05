<template>
<div class="bx--grid" style="padding: 60px 250px;">
    <!-- Indicator Container -->
    <ul data-progress data-progress-current class="bx--progress ">
        <!-- Client and Service -->
        <li id="first" class="bx--progress-step bx--progress-step--current">
            <svg><path d="M 7, 7 m -7, 0 a 7,7 0 1,0 14,0 a 7,7 0 1,0 -14,0" ></path></svg>
            <p tabindex="0" class="bx--progress-label" aria-describedby="label-tooltipfvsw9xwdq7">
                Client & Service
            </p>
            <div id="label-tooltip" role="tooltip" data-floating-menu-direction="bottom" class="bx--tooltip" data-avoid-focus-on-open>
                <span class="bx--tooltip__caret"></span>
                <p class="bx--tooltip__text">Client & Service</p>
            </div>
            <p class="bx--progress-optional">Choose a Client and Service for your new Project.</p>
		    <span class="bx--progress-line"></span>
            
            <!-- <AddClientAndService v-on:selected-service-client="handleServiceAndClientId"/> -->
        </li>

        <!-- Assignment Details -->
        <li id="second" class="bx--progress-step bx--progress-step--incomplete">
            <svg><path d="M8 1C4.1 1 1 4.1 1 8s3.1 7 7 7 7-3.1 7-7-3.1-7-7-7zm0 13c-3.3 0-6-2.7-6-6s2.7-6 6-6 6 2.7 6 6-2.7 6-6 6z"></path></svg>
            <p tabindex="0" class="bx--progress-label" aria-describedby="label-tooltipd88ssqwl1mc">
                Project Details
            </p>
            <div id="label-tooltipd88ssqwl1mc" role="tooltip" data-floating-menu-direction="bottom" class="bx--tooltip" data-avoid-focus-on-open>
                <span class="bx--tooltip__caret"></span>
			    <p class="bx--tooltip__text">Project Details</p>
            </div>
            <p class="bx--progress-optional">Enter Details about the Project.</p>
		    <span class="bx--progress-line"></span>

            <!-- <AddAssignmentDetails v-on:selected-assignment="handleAssignmentDetails"/> -->
        </li>
    </ul>




        <!-- <md-steppers :md-active-step.sync="active" md-linear>
            <md-step id="first" md-label="Client & Service" md-description="Choose a Client and Service for your new Project." :md-done.sync="first">
                <AddClientAndService v-on:selected-service-client="handleServiceAndClientId"/>
            </md-step>
            <md-step id="second" md-label="Project Details" md-description="Enter details on the Project." :md-done.sync="second" :md-error="secondStepError">
                <AddAssignmentDetails v-on:selected-assignment="handleAssignmentDetails"/>
            </md-step>
            <md-step id="third" md-label="Add Tasks" md-description="Add Tasks to the new Project" :md-done.sync="third">
                <AddTasksToNewAssignment v-if="serviceId" v-bind:serviceId="serviceId" v-on:selected-tasks="addTasksToAssignment"/>
            </md-step>
        </md-steppers> -->
</div>
</template>

<script>
    import axios from 'axios';
    import Vue from 'vue';
    import router from './../../../router'
    // import {MdSteppers} from 'vue-material/dist/components'
    import AddClientAndService from './AddClientAndService.vue';
    import AddAssignmentDetails from './AddAssignmentDetails'
    import AddTasksToNewAssignment from './AddTasksToNewAssignment';
    import 'carbon-components/css/carbon-components.css';
    import CarbonComponentsVue from '@carbon/vue/src/index';
    import { ProgressIndicator } from 'carbon-components';
    import { CvProgress, CvProgressStep } from '@carbon/vue/src'

    Vue.use(CarbonComponentsVue);
    // Vue.use(MdSteppers)

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
            AddTasksToNewAssignment,
            ProgressIndicator,
            CvProgress, 
            CvProgressStep
        }
    }
</script>

<style>
.bx--progress-line {
	width: 100%;
}
</style>
