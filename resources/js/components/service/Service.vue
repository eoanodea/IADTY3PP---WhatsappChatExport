<template>
    <loading-indicator v-if="loading"/>
    <div class="bx--grid" v-else-if="service && service.id">
        <div class="bx--row">

            <!-- Service Details (Notification Card)-->
            <div class="bx--col-lg-6" style="padding-top: 140px;">
                
                <p class="bx--inline-notification__title">
                    {{ service.title }}
                </p><br/><br/><br/>
                
                <p class="bx--inline-notification__subtitle desc">
                    {{ service.description }}
                </p><br/><br/>
                
                <p class="bx--inline-notification__subtitle">
                    <span class="subCon">Standard Price:</span> €{{service.standard_price}}
                </p><br/><br/>
                
                <p class="bx--inline-notification__subtitle">
                    <span class="subCon">Recurring Payment?</span> {{service.recurring_payment}}
                </p><br/><br/>
                
                <p class="bx--inline-notification__subtitle">
                    <span class="subCon">Public Service?</span> {{service.is_public}}
                </p><br/><br/>

                <div class="bx--row">
                    <div class="bx--col">
                    <!-- Edit Button -->
                        <cv-link :to="'/admin/services/edit/' + service.id" style="text-decoration: none;">
                            <button data-notification-btn class="bx--btn bx--btn--lg bx--btn--primary">
                                Edit Service
                            </button>
                        </cv-link>
                    </div>

                    <!-- Delete Modal -->
                    <div class="bx--col">
                        <DeleteService style="text-decoration; none;" v-bind:id="service.id"/>
                    </div>
                </div>
                
            </div> <!-- Close Service Details -->
        
            <!-- Default Task Table -->
            <div class="bx--col-lg-6">
                <ListTask v-bind:parentId="service.id" v-bind:isActive="false" />
            </div>

        </div> <!-- Close ROW -->

    </div>
    <data-error v-else v-bind:error="error" v-bind:collection="'user'" />
</template>

<script>
    import Vue from 'vue';
    import axios from 'axios';
    import DeleteService from './DeleteService';
    import ListTask from './../task/ListTask';
    
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
            this.$store.dispatch('service/loadService', parseInt(this.$route.params.id))
        },
        computed: {
            ...mapGetters({
                service: 'service/service',
                loading: 'service/loading',
                error: 'service/error'
            })
        },
        components: {
            DeleteService,
            ListTask,
            LoadingIndicator,
            DataError,
        }
    }
</script>

<style scoped>
    .desc {
        line-height: 1.1;
    }
</style>