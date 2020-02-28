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