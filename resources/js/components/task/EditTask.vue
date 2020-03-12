<template>
    <loading-indicator v-if="loading"/>
    <div class="bx--gridresponsive-form" v-else-if="updatedTask">
        <!-- Title -->
        <div class="bx--row">
            <div class="bx--col-lg-12">
                <div class="bx--form-item bx--text-input-wrapper">
                    <label for="title" class="bx--label">Title</label>
                    <div class="bx--text-input__field-wrapper">
                        <input 
                        id="text-input-3" 
                        name="title" 
                        type="text" 
                        autocomplete="given-title" 
                        v-model="updatedTask.title"
                        class="bx--text-input" 
                        placeholder="Title">
                    </div>
                </div>
            </div>
        </div>

        <!-- Description -->
        <br/>
        <div class="bx--row">
            <div class="bx--col-lg-12">
                <div class="bx--form-item bx--text-input-wrapper">
                    <label for="description" class="bx--label">Description</label>
                    <div class="bx--text-input__field-wrapper">
                        <textarea 
                            id="text-area-2" 
                            name="description" 
                            type="description" 
                            autocomplete="description" 
                            v-model="updatedTask.description"
                            class="bx--text-area"
                            rows="4" 
                            cols="50" 
                            placeholder="Description"></textarea>
                    </div>
                </div>
            </div>
        </div>

        <!-- Percentage Done -->
        <br/>
        <div class="bx--row">
            <div class="bx--col-lg-12">
                <div class="bx--form-item bx--text-input-wrapper">
                    <label for="percent_done" class="bx--label">Percentage Done</label>
                    <div class="bx--text-input__field-wrapper">
                        <input 
                        id="text-input-3" 
                        name="percent_done" 
                        type="number" 
                        autocomplete="given-percent_done" 
                        v-model="updatedTask.percent_done"
                        class="bx--text-input" 
                        placeholder="Percentage Done">
                        <span>%</span>
                    </div>
                </div>
            </div>
        </div>

        <!-- Button -->
        <br/>
        <div class="bx--row">
            <div class="bx--col-lg-12">
                <div class="bx--form-item">
                    <button 
                        class="bx--btn bx--btn--primary" 
                        type="submit"
                        @click="submitTask"
                        :disabled="submitting">
                            Save
                    </button>
                </div>
            </div>
        </div>
    </div>
    <data-error v-else v-bind:error="error" v-bind:collection="'task'" />
</template>

<script>
    import axios from 'axios';
    import Vue from 'vue';
    import router from './../../router'
    
    import CarbonComponentsVue from '@carbon/vue/src/index';
    import { mapGetters } from 'vuex';
    import LoadingIndicator from './../progress/LoadingIndicator'
    import DataError from './../table/DataError'
    
    Vue.use(CarbonComponentsVue);

    export default {
        props: ['id', 'isActive'],
        data() {
            return {
                updatedTask: {
                    title: '',
                    description: '',
                    percent_done: ''
                },
                errors: [],
                submitting: false,
                active: this.$route.params.active
                    ? (this.$route.params.active === 'true' ? true : false)
                    : this.isActive
            }
        },
        created() {
            this.$store.dispatch('task/loadTask', parseInt(this.$route.params.id))

            this.updatedTask = this.task
        },
        methods: {
            submitTask: function() {
                let {submitting, active} = this
                const id = this.$route.params.id
                submitting = true
                console.log('submitting', this.updatedTask)
                this.$store.dispatch('task/updateTask', [parseInt(id), this.updatedTask])
                .then(function(response) {
                    submitting = false
                    router.push({
                        path: `/admin/tasks/${active}/show/${id}`
                    })
                }).catch(function(error) {
                    console.log('error', error)
                    submitting = false
                })
            }
        },
        watch: {
            task: function(newVal, oldVal) {
                this.updatedTask = newVal
            }
        },
        computed: {
            ...mapGetters({
                task: 'task/task',
                loading: 'task/loading',
                error: 'task/error'
            })
        },
        components: {
            LoadingIndicator,
            DataError
        },
    }
</script>