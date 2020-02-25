<template>
<div>
    <!-- Modal Button -->
    <button 
        class="bx--btn bx--btn--lg bx--btn--primary" 
        type="button" 
        data-modal-target="#modal-ptxyfo5520i"
        @click="showDialog = true">
            Add Task
    </button>

    <!-- Modal -->
    <cv-modal
        kind="primary"
        :visible="showDialog"
        @modal-shown="showDialog = true"
        @modal-hidden="showDialog = false"
        @modal-hide-request="showDialog = false"
    >

        <!-- <template slot="title">
            
        </template> -->

        <template slot="content">
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
        </template>

        <!-- Buttons -->
        <template slot="secondary-button">Back</template>
        <template slot="primary-button">Save</template>
    </cv-modal>

    <!-- Title -->
    <!-- <div class="bx--row">
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
    </div> -->

    <!-- Description -->
    <!-- <br/>
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
    </div> -->

    <!-- Percentage Done -->
    <!-- <br/>
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
    </div> -->

    <!-- Button -->
    <!-- <br/>
    <div class="bx--row">
        <div class="bx--col-lg-12">
            <div class="bx--form-item">
                <button 
                    class="bx--btn bx--btn--primary" 
                    type="submit"
                    :disabled="submitting">
                        Save
                </button>
            </div>
        </div>
    </div> -->





        <!-- <md-button class="md-icon-button" @click="showDialog = true">
            <md-icon>add</md-icon>
        </md-button>
        <md-dialog :md-active.sync="showDialog">
            <md-dialog-title>Add a new Task</md-dialog-title>
            <md-dialog-content>
                <p v-if="errors.length">
                    <b class="error">Please correct the following error(s):</b>
                    <ul>
                    <li v-for="error in errors" v-bind:key="error.id" class="error">
                        {{ error.message }}
                        </li>
                    </ul>
                </p>
                <md-field>
                    <label for="title">Title</label>
                    <md-input name="title" type="text" class="form-control" placeholder="Title" v-model="task.title" /> <br />
                </md-field>
                <md-field>
                    <label for="description">Description</label>
                    <md-input name="description" type="text" class="form-control" placeholder="Description" v-model="task.description" /> <br />
                </md-field>
                <md-field>
                    <label for="percent_done">Percent Done</label>
                    <md-input name="percent_done" type="number" class="form-control" placeholder="Percent Done" v-model="task.percent_done" /> <br />
                </md-field>

            </md-dialog-content>

            <md-dialog-actions>
                <md-button class="md-primary md-raised" @click="showDialog = false">Back</md-button>
                <md-button class="md-accent md-raised" @click="validateTask" :disabled="submitting">Save</md-button>
            </md-dialog-actions>
        </md-dialog> -->
</div>
</template>
<script>
import Vue from 'vue'
import axios from 'axios'
import 'carbon-components/css/carbon-components.css'
import CarbonComponentsVue from '@carbon/vue/src/index'
    import { Modal } from 'carbon-components';
    import { CvModal } from '@carbon/vue/src';

Vue.use(CarbonComponentsVue);

export default {
    data() {
        return {
            task: {
                title: '',
                description: '',
                percent_done: 0
            },
            showDialog: false,
            errors: [],
            submitting: false
        }
    },
    methods: {
        validateTask: function() {
            const {task} = this
            if(
                task.title
                && task.description
                && task.percent_done) {
                this.returnTask(task)
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
        returnTask: function(task) {
            this.$emit('new-task', task)
            this.showDialog = false
        },
        resetComponent() {
            this.showDialog = false
            this.task.title = ''
            this.task.description = ''
            this.task.percent_done = 0
            this.errors = []
        },
    },
    components: {
        Modal,
        CvModal
    }
    
}
</script>
