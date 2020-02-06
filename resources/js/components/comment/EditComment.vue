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
                        v-model="comment.title"
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
                            v-model="comment.description"
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
                        v-model="comment.percent_done"
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
                        :disabled="submitting">
                            Save
                    </button>
                </div>
            </div>
        </div>



        <!-- <div class="md-layout">
            <div class="md-layout-item">
                <md-table-toolbar>
                    <h1 class="md-title accent">Edit Default Comment</h1>
                </md-table-toolbar>
            </div>
        </div>

        <form novalidate class="md-layout" method="PUT" @submit.stop.prevent="submitComment">
            <md-card class="md-layout-item background">
                <md-card-content>
                <p v-if="errors.length">
                        <b class="error">Please correct the following error(s):</b>
                        <ul>
                        <li v-for="error in errors" v-bind:key="error.id" class="error">
                            {{ error.message }}
                            </li>
                        </ul>
                    </p>
                     <md-field>
                        <label class="accent" for="title">Title</label>
                        <md-input name="title" type="text" class="form-control" placeholder="Title" v-model="comment.title" /> <br />
                    </md-field>
                    <md-field>
                        <label class="accent" for="description">Description</label>
                        <md-input name="description" type="text" class="form-control" placeholder="Description" v-model="comment.description" /> <br />
                    </md-field>
                    <md-field>
                        <label class="accent" for="percent_done">Percent Done</label>
                        <span class="md-prefix">%</span>
                        <md-input name="percent_done" type="number" class="form-control" placeholder="Percent Done" v-model="comment.percent_done" /> <br />
                    </md-field>
 
                </md-card-content>
                <md-card-actions>
                    <md-button type="submit" :disabled="submitting" class="md-primary md-raised btnAccent">Save</md-button>
                </md-card-actions>
            </md-card>
        </form> -->
    </div>
</template>
<script>
    import axios from 'axios';
    import Vue from 'vue';
    import router from './../../router'
    import 'carbon-components/css/carbon-components.css';
    import CarbonComponentsVue from '@carbon/vue/src/index';
    // import {MdButton, MdField, MdCard, MdCheckbox} from 'vue-material/dist/components'

    // Vue.use(MdButton)
    // Vue.use(MdField)
    // Vue.use(MdCard)
    // Vue.use(MdCheckbox)
    
    Vue.use(CarbonComponentsVue);

    export default {
        props: ['id', 'isActive'],
        data() {
            return {
                comment: {
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
                ? 'comment'
                : 'comment/active'
            axios.get(`/api/${url}/${this.$route.params.id}`)
            .then(response => {
                if(!response.data) {
                    console.log("Error getting comment", response)
                } else {
                    let commentObj = response.data.comment
                    commentObj.recurring_payment == 1 ? commentObj.recurring_payment = true : commentObj.recurring_payment = false
                    commentObj.is_public == 1 ? commentObj.is_public = true : commentObj.is_public = false
                    this.comment = commentObj
                }
            })
        },
        methods: {
            submitComment: function() {
                this.submitting = true
                const url = this.active === false
                    ? 'comment'
                    : 'comment/active'
                const payload = this.comment
               axios.put(`/api/${url}/${this.comment.id}`, payload)
                .then(response => {
                    if(!response.data) {
                        console.log("Error!", response)
                        this.errors.push({id: 0, message: JSON.stringify(response.message)})
                        this.submitting = false
                    } else router.push({path: `/admin/comments/${this.active}/show/${response.data.comment.id}`})
                })
            }

        }
    }
</script>