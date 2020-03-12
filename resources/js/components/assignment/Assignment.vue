<template>
<loading-indicator v-if="loading"/>
<div class="bx--grid" style="padding: 40px 0px;" v-else-if="assignment && assignment.id">
    <div class="bx--row">
        <div class="bx--col-lg-6">
            <!-- Project Detailes (Notification) -->
            <div data-notification class="bx--inline-notification bx--inline-notification--info" role="alert">
                <div class="bx--inline-notification__details">
                    <svg focusable="false" preserveAspectRatio="xMidYMid meet" style="will-change: transform;" xmlns="http://www.w3.org/2000/svg" class="bx--inline-notification__icon" width="20" height="20" viewBox="0 0 32 32" aria-hidden="true"><path d="M16 2a14 14 0 1 0 14 14A14 14 0 0 0 16 2zm0 5a1.5 1.5 0 1 1-1.5 1.5A1.5 1.5 0 0 1 16 7zm4 17.12h-8v-2.24h2.88v-6.76H13v-2.24h4.13v9H20z"></path></svg>

                    <!-- Project Details Contents -->
                    <div class="bx--row">
                        <div class="bx--inline-notification__text-wrapper">
                            <div class="bx--col-lg-12">
                                <p class="bx--inline-notification__title">Project: {{ assignment.title }}</p>
                                <p class="bx--inline-notification__title">Deposit: {{ assignment.deposit }}%</p>
                                <p class="bx--inline-notification__title">Discount: {{ assignment.discount }}%</p>
                                <p class="bx--inline-notification__title">Total Price: €{{ assignment.total_price }}</p>
                                <p class="bx--inline-notification__title">Deadline: {{ assignment.deadline }}</p>
                                <p class="bx--inline-notification__title">Completed? {{ assignment.completed }}</p>
                                <p class="bx--inline-notification__title">Date of Completion: {{ assignment.date_of_completion }}</p>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div class="bx--row">
                    <div class="bx--col-lg-6">
                        <!-- View Checkout Button -->
                        <cv-link :to="'/checkout/' + assignment.id" style="text-decoration: none;">
                            <button data-notification-btn class="bx--btn bx--btn--lg bx--btn--tertiary">
                                Checkout
                            </button>
                        </cv-link>
                    </div>

                    <div class="bx--col-lg-6">
                    <!-- View Transaction Button -->
                    <cv-link :to="'/transaction/' + assignment.id" style="text-decoration: none;">
                        <button data-notification-btn class="bx--btn bx--btn--lg bx--btn--tertiary">
                            View Transaction
                        </button>
                    </cv-link>
                    </div>
                </div>

                <!-- Edit Button -->
                <cv-link :to="'/admin/assignments/edit/' + assignment.id" style="text-decoration: none;">
                    <button data-notification-btn class="bx--btn bx--btn--lg bx--btn--primary">
                        Edit Project
                    </button>
                </cv-link>

                <!-- Delete Modal -->
                <DeleteAssignment v-bind:id="assignment.id"/>
            </div>
        </div>

        <!-- Default Tasks Table -->
        <br/>
        <div class="bx--col-lg-6">
            <ListTask v-bind:parentId="assignment.id" v-bind:isActive="true" />
        </div>

        <!-- Comments Section -->
        <br/>
        <div class="bx--col-lg-6">
            <CommentTile v-bind:id="assignment.id" v-bind:isAssignment="true" />
        </div>
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
    
    
    import { Notification } from 'carbon-components';
    import CommentTile from './../comment/CommentTile'
    import { mapGetters } from 'vuex'
    import LoadingIndicator from './../progress/LoadingIndicator'
    import DataError from './../table/DataError'

    

    export default {
        data() {
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
            paymentDue() {
                const { assignment } = this
                const amount = Math.round(((100 - assignment.discount)/100 * assignment.total_price) - assignment.amount_paid)
                
                return amount
            }
        }
    }
</script>