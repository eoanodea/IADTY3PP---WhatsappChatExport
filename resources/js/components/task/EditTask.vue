<template>
    <div class="fluid-container">
        <div class="md-layout">
            <div class="md-layout-item">
                <md-table-toolbar>
                    <h1 class="md-title accent">Edit Default Task</h1>
                </md-table-toolbar>
            </div>
        </div>

        <form novalidate class="md-layout" method="PUT" @submit.stop.prevent="submitTask">
            <md-card class="md-layout-item background">
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
                        <label class="accent" for="title">Title</label>
                        <md-input name="title" type="text" class="form-control" placeholder="Title" v-model="task.title" /> <br />
                    </md-field>
                    <md-field>
                        <label class="accent" for="description">Description</label>
                        <md-input name="description" type="text" class="form-control" placeholder="Description" v-model="task.description" /> <br />
                    </md-field>
                    <md-field>
                        <label class="accent" for="percent_done">Percent Done</label>
                        <span class="md-prefix">%</span>
                        <md-input name="percent_done" type="number" class="form-control" placeholder="Percent Done" v-model="task.percent_done" /> <br />
                    </md-field>
 
                </md-card-content>
                <md-card-actions>
                    <md-button type="submit" :disabled="submitting" class="md-primary md-raised btnAccent">Save</md-button>
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
        mounted() {
            const url = this.active === false
                ? 'task'
                : 'task/active'
            axios.get(`/api/${url}/${this.$route.params.id}`)
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
                const url = this.active === false
                    ? 'task'
                    : 'task/active'
                const payload = this.task
               axios.put(`/api/${url}/${this.task.id}`, payload)
                .then(response => {
                    if(!response.data) {
                        console.log("Error!", response)
                        this.errors.push({id: 0, message: JSON.stringify(response.message)})
                        this.submitting = false
                    } else router.push({path: `/admin/tasks/${this.active}/show/${response.data.task.id}`})
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