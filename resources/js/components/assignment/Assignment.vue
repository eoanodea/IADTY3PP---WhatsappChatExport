<template>
<loading-indicator v-if="loading"/>
<div class="bx--grid" v-else-if="assignment && assignment.id">
    <div class="bx--row">

        <!-- Project Details (Notification Card)-->
        <div class="bx--col-lg-6">
            <!-- View Checkout Button -->
            <cv-link :to="'/checkout/' + assignment.id" style="text-decoration: none;">
                <button data-notification-btn class="bx--btn bx--btn--lg bx--btn--primary payBtn">
                    Pay
                </button>
            </cv-link>

            <!-- View Transaction Button -->
            <cv-link :to="'/transaction/' + assignment.id" style="text-decoration: none;">
                <button data-notification-btn class="bx--btn bx--btn--lg bx--btn--tertiary logoCol">
                    View Transaction
                </button>
            </cv-link><br/><br/>
            
            <p class="title lineHeight">
                Project <span class="logoCol">{{ assignment.title }}</span>
            </p><br/><br/><br/>

            <p class="subtitle subCon">
                Deposit: {{ assignment.deposit }}%
            </p><br/><br/>

            <p class="subtitle subCon">
                Discount: {{ assignment.discount }}%
            </p><br/><br/>

            <p class="subtitle subCon">
                Total Price: €{{ assignment.total_price }}
            </p><br/><br/>

            <p class="subtitle subCon">
                Deadline: {{ assignment.deadline }}
            </p><br/><br/>

            <p class="subtitle subCon">
                Completed: {{ handleBoolean(assignment.completed) }}
            </p><br/><br/>

            <p class="subtitle subCon">
                Date of Completion: {{ assignment.date_of_completion }}
            </p><br/><br/>

            <!-- Buttons -->
            <div class="bx--row">
                <div class="bx--col">
                    <!-- Edit Button -->
                    <cv-link :to="'/admin/assignments/edit/' + assignment.id" style="text-decoration: none;">
                        <button data-notification-btn class="bx--btn bx--btn--lg bx--btn--primary">
                            Edit Project
                        </button>
                    </cv-link>
                </div>

                <!-- Delete Modal -->
                <div class="bx--col">
                    <DeleteAssignment style="text-decoration; none;" v-bind:id="assignment.id"/>
                </div>
            </div>  

        </div> <!-- Close Project Details -->

        <!-- Active Tasks Table -->
        <div class="bx--col">
            <ListTask style="text-decoration; none;" v-bind:parentId="assignment.id" v-bind:isActive="true" />
        </div>

    </div> <!-- Close ROW -->

    <div class="bx--col-lg-6">
        <CommentTile v-bind:id="assignment.id" v-bind:isAssignment="true" />
    </div>
</div>
<data-error v-else v-bind:error="error" v-bind:collection="'user'" />
</template>

<script>
    import Vue from 'vue'
    import axios from 'axios'
    import DeleteAssignment from './DeleteAssignment'
    import ListTransaction from './../transaction/ListTransaction'
    import ListTask from './../task/ListTask'
    
    import CommentTile from './../comment/CommentTile'
    import { mapGetters } from 'vuex'
    import LoadingIndicator from './../progress/LoadingIndicator'
    import DataError from './../table/DataError'

    export default {
        data: () => {
            return {
                //
            }
        },
        created() {
            this.$store.dispatch('assignment/loadAssignment', parseInt(this.$route.params.id))
        },
        computed: {
            ...mapGetters({
                assignment: 'assignment/assignment',
                loading: 'assignment/loading',
                error: 'assignment/error'
            })
        },
        components: {
            DeleteAssignment,
            ListTask,
            ListTransaction,
            CommentTile,
            LoadingIndicator,
            DataError,
        },
        methods: {
            handleBoolean(bool) {
                return bool === 0 ? 'No' : 'Yes'
            },
            paymentDue() {
                const { assignment } = this
                const amount = Math.round(((100 - assignment.discount)/100 * assignment.total_price) - assignment.amount_paid)
                
                return amount
            }
        }
    }
</script>

<style scoped>
    .payBtn {
        color: black;
        font-weight: 600;
        background-color: #0bb5ff;
    }
</style>