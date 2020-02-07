<template>
    <div class="bx--grid" style="padding: 60px 250px;">
        <!-- Comment -->
        <br/>
        <p v-if="errors.length">
            <b class="error">Please correct the following error(s):</b>
            <ul>
            <li v-for="error in errors" v-bind:key="error.id" class="error">
                {{ error.message }}
                </li>
            </ul>
        </p>
        <div class="bx--row">
            <div class="bx--col-lg-12">
                <div class="bx--form-item bx--text-input-wrapper">
                    <label for="comment" class="bx--label">Comment</label>
                    <div class="bx--text-input__field-wrapper">
                        <textarea 
                            id="text-area-2" 
                            name="comment" 
                            type="text" 
                            autocomplete="comment" 
                            v-model="comment.comment"
                            class="bx--text-area"
                            rows="4" 
                            cols="50" 
                            placeholder="Comment"></textarea>
                    </div>
                </div>
            </div>
        </div>

        <!-- Percentage Done -->
        <br/>
        <div class="bx--row">
            <div class="bx--col-lg-12">
                <div class="bx--form-item bx--text-input-wrapper">
                    <label for="progress" class="bx--label">Percentage Done</label>
                    <div class="bx--text-input__field-wrapper">
                        <input 
                        id="text-input-3" 
                        name="progress" 
                        type="number" 
                        autocomplete="given-progress" 
                        v-model="comment.progress"
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
                        v-on:click="validateComment"
                        :disabled="submitting">
                            Save
                    </button>
                </div>
            </div>
        </div>



        <!-- <div class="md-layout">
            <div class="md-layout-item">
                <md-table-toolbar>
                    <h1 class="md-title accent">Add Default Comment</h1>
                </md-table-toolbar>
            </div>
        </div>
        <form novalidate class="md-layout" method="POST" @submit.stop.prevent="validateComment">
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
                        <label class="accent" for="progress">Percent Done</label>
                        <span class="md-prefix">%</span>
                        <md-input name="progress" type="number" class="form-control" placeholder="Percent Done" v-model="comment.progress" /> <br />
                    </md-field>

                </md-card-content>
                <md-card-actions> -->
                    <!-- <md-button class="md-secondary md-raised">Back</md-button> -->
                    <!-- <md-button type="submit" :disabled="submitting" class="md-primary md-raised btnAccent">Save</md-button>
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
    import { mapGetters } from 'vuex'

    Vue.use(CarbonComponentsVue);

    export default {
        props: ['id', 'isAssignment'],
        data() {
            return {
                comment: {
                    comment: '',
                    progress: '',
                    user_id: null
                },
                errors: [],
                submitting: false,
                assignment: this.$route.params.isAssignment
                    ? (this.$route.params.isAssignment === 'true' ? true : false)
                    : this.isAssignment
            }
        },
        methods: {
            validateComment: function() {
                const {comment, user, submitComment} = this

                if(
                    comment.comment
                    && comment.progress
                    && user) submitComment()

                this.errors = [];
                if(!comment.comment) {
                     this.errors.push({id: 0, message: 'Comment required.'});
                }
                if(!comment.progress) {
                     this.errors.push({id: 1, message: 'Percentage done is required.'});
                }
                if(!user) {
                    this.errors.push({id: 2, message: 'There was a problem submitting your request. Please re-authenticate yourself.'});
                }
            },
            submitComment: function() {
                this.submitting = true

                let {comment} = this
                comment.user_id = this.user.id

                const url = this.assignment
                ? 'comments/assignment'
                : 'comments/task'

                const payload = this.comment

                axios.post(`/api/${url}/${this.$route.params.id}/new`, payload)
                .then(response => {
                    if(!response.data) {
                        console.log("Error!", response)
                        this.errors.push({id: 0, message: JSON.stringify(response.message)})
                        this.submitting = false
                    } else router.push({path: `/admin/comment/show/${response.data.comment.id}`})
                })
            }
        },
        computed: {
            ...mapGetters({
                user: 'auth/user'
            })
        }
    }
</script>
