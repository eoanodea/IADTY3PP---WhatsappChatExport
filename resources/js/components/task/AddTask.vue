<template>
    <div class="bx--grid" style="padding: 60px 250px;">
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
                        v-model="task.title"
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
                            v-model="task.description"
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
                        v-model="task.percent_done"
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
                        @click="validateTask"
                        :disabled="submitting">
                            Save
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import axios from 'axios';
    import Vue from 'vue';
    import router from './../../router'
    import 'carbon-components/css/carbon-components.css';
    import CarbonComponentsVue from '@carbon/vue/src/index';

    Vue.use(CarbonComponentsVue);

    export default {
        props: ['id', 'isActive'],
        data() {
            return {
                task: {
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
        methods: {
            validateTask: function() {
                const {task} = this
                if(
                    task.title
                    && task.description
                    && task.percent_done) {
                    this.submitTask()
                }

                this.errors = [];
                if(!task.title) {
                    this.errors.push({id: 0, message: 'Title required.'});
                }
                if(!task.description) {
                    this.errors.push({id: 1, message: 'Description required.'});
                }
                if(!task.percent_done) {
                    this.errors.push({id: 2, message: 'Percentage done is required.'});
                }
            },

            submitTask: function() {
                let {submitting, active} = this
                const id = this.$route.params.id
                submitting = true
                this.$store.dispatch('task/addTask', [this.task, active, id])
                .then(function(response) {
                    console.log('submit respons', response)
                    submitting = false
                    if(response) {
                        router.push({
                            path: `/admin/tasks/${active}/show/${response}`
                        })
                    }
                }).catch(function(error) {
                    console.log('error', error)
                    submitting = false
                })
            }
        }
    }
</script>
