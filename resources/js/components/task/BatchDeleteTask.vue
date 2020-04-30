<template> 
<div>
    <!-- Modal -->
    <cv-modal
        kind="danger"
        :visible="showDialog"
        @modal-shown="showDialog = true"
        @modal-hidden="showDialog = false"
        @modal-hide-request="showDialog = false"
        @secondary-click="actionSecondary"
        @primary-click="actionPrimary"
        :primary-button-disabled="submitting"
    >

        <template slot="title"><span class="warning">WARNING</span></template>
        <template slot="content"><p>Are you sure you want to delete {{ids.length}} <span class="logoCol">Task{{ids.length > 1 ? 's' : ''}}</span>?</p></template>
    
        <!-- Buttons -->
        <template slot="secondary-button">No</template>
        <template slot="primary-button">Yes</template>
    </cv-modal>
</div>
</template>

<script>
    import Vue from 'vue'
    import axios from 'axios'
    import router from './../../router'

    export default {
        props: ['ids', 'isActive', 'showDialog'],
        data() {
            return {
                active: this.$route.params.active
                    ? (this.$route.params.active === 'true' ? true : false)
                    : this.isActive,
                submitting: false
            }
        },
        methods: {
            actionPrimary() {
                let {submitting, showDialog, isActive, ids} = this
                submitting = true
                let idsArr = ids, app = this
                idsArr.unshift(isActive.toString())
                this.$store.dispatch('task/batchDeleteTasks', idsArr)
                .then(function(response) {
                    submitting = false
                    console.log('done!', this)
                    app.$emit('handle-success')
                }).catch(function(error) {
                    console.log('error', error)
                    submitting = false
                })
            },
            actionSecondary() {
                this.$emit('handle-dialog')
            },
        },
        components: {
            //
        }
    }
</script>