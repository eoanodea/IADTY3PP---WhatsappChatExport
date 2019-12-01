<template>
    <div>
        <form novalidate class="md-layout" method="PUT" @submit.stop.prevent="submitTask">
            <md-card class="md-layout-item md-size-50 md-small-size-100">
                <md-card-header>
                    <div class="md-title">Edit Task</div>
                </md-card-header>

                <md-card-content>
                <p v-if="errors.length">
                        <b>Please correct the following error(s):</b>
                        <ul>
                        <li v-for="error in errors" v-bind:key="error.id">
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
 
                </md-card-content>
                <md-card-actions>
                    <md-button type="submit" :disabled="submitting" class="md-primary md-raised">Save</md-button>
                </md-card-actions>
            </md-card>
        </form>
    </div>
</template>
<script>
    import axios from 'axios';
    import Vue from 'vue';
    import router from './../../router'
    import {MdButton, MdField, MdCard, MdCheckbox} from 'vue-material/dist/components'

    Vue.use(MdButton)
    Vue.use(MdField)
    Vue.use(MdCard)
    Vue.use(MdCheckbox)
    

    export default {
        data() {
            return {
                task: {
                    title: '',
                    description: '',
                    percent_done: ''
                },
                errors: [],
                submitting: false
            }
        },
        mounted() {
            axios.get(`http://localhost:8000/api/task/${this.$route.params.id}`)
            .then(response => {
                if(!response.data) {
                    console.log("Error getting task", response)
                } else {
                    let taskObj = response.data.task
                    taskObj.recurring_payment == 1 ? taskObj.recurring_payment = true : taskObj.recurring_payment = false
                    taskObj.is_public == 1 ? taskObj.is_public = true : taskObj.is_public = false
                    this.task = taskObj
                }
            })
        },
        methods: {
            submitTask: function() {
                this.submitting = true
                const payload = this.task
               axios.put(`http://localhost:8000/api/task/${this.task.id}`, payload)
                .then(response => {
                    if(!response.data) {
                        console.log("Error!", response)
                        this.errors.push({id: 0, message: JSON.stringify(response.message)})
                        this.submitting = false
                    } else router.push({path: `/admin/tasks/show/${response.data.task.id}`})
                })
            }

        }
    }
</script>
<style lang="scss" scoped>
    .md-field {
        flex-direction: column; 
    }
    .md-input, .md-textarea {
        color: #fff;
    }
</style>