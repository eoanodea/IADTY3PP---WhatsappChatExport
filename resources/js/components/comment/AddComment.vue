<template>
    <div class="add-comment-container">
        <!-- Comment -->
        <div class="bx--text-input__field-wrapper">
            <textarea 
                id="text-area-2" 
                name="comment" 
                type="text" 
                autocomplete="comment" 
                v-model="comment.comment"
                class="bx--text-area comment-textarea"
                placeholder="Comment"
                v-on:keydown.enter="validateComment"
                ></textarea>
                <p v-if="errors.length" class="form-error bx--form-requirement">
                    <b class="error">Please correct the following error(s):</b>
                    <ul>
                    <li v-for="error in errors" v-bind:key="error.id" class="error">
                        {{ error.message }}
                        </li>
                    </ul>
                </p>
        </div>


        <!-- Percentage Done
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
        </div> -->

        <!-- Button -->
        <button 
            class="bx--btn bx--btn--primary" 
            type="submit"
            v-on:click="validateComment"
            :disabled="submitting ? true : false">
                Save
        </button>
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
                    progress: 20,
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
                     this.errors.push({id: 0, message: 'Message is required.'});
                }
                if(!comment.progress) {
                     this.errors.push({id: 1, message: 'Percentage done is required.'});
                }
                if(!user) {
                    this.errors.push({id: 2, message: 'There was a problem submitting your request. Please sign out and login again.'});
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
                    if(response.data.status !== "success") {
                        console.log("Error!", response)
                        this.errors.push({id: 0, message: JSON.stringify(response.data.error)})
                    } else {
                        this.$emit('comment-added', response.data.comment[0])
                        this.comment.comment = ""   
                    }
                    this.submitting = false
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
<style lang="scss">
    .add-comment-container {
        display: flex;
    }
    .comment-textarea {
        height: 3rem;
    }
    .form-error {
        position: absolute;
        top: -6vh;
        transition: .2s ease;
    }
</style>
