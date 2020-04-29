<template>
    <loading-indicator v-if="loading"/>
    <div class="bx--grid" v-else-if="service && service.id">
        <div class="bx--row">

            <!-- Service Details (Notification Card)-->
            <div class="bx--col-lg-6" style="padding-top: 100px;">
                
                <p class="title logoCol">
                    {{ service.title }}
                </p><br/><br/><br/>
                
                <p class="subtitle lineHeight">
                    {{ service.description }}
                </p><br/><br/>
                
                <p class="subtitle subCon">
                    Standard Price: €{{service.standard_price}}
                </p><br/><br/>
                
                <p class="subtitle subCon">
                    Recurring Payment: {{ handleBoolean(service.recurring_payment) }}
                </p><br/><br/>
                
                <p class="subtitle subCon">
                    Public Service: {{ handleBoolean(service.is_public) }}
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
        methods: {
            handleBoolean(bool) {
                return bool === 0 ? 'No' : 'Yes'
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