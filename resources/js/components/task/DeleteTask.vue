<template> 
<div>
    <!-- Modal Button -->
    <button
        class="bx--btn bx--btn--lg bx--btn--danger" 
        type="button" 
        data-modal-target="#modal-ptxyfo5520i"
        @click="showDialog = true">
            Delete Default Task
    </button>

    <!-- Modal -->
    <cv-modal
        kind="danger"
        :visible="showDialog"
        @modal-shown="showDialog = true"
        @modal-hidden="showDialog = false"
        @modal-hide-request="showDialog = false"
        @secondary-click="actionSecondary"
        @primary-click="actionPrimary">

        <template slot="title">WARNING</template>
        <template slot="content"><p>Are you sure you want to delete this default task?</p></template>
    
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
    import 'carbon-components/css/carbon-components.css';
    import CarbonComponentsVue from '@carbon/vue/src/index';
    import { Modal } from 'carbon-components';
    import { CvModal } from '@carbon/vue/src';

    export default {
        props: ['id', 'isActive'],
        data() {
            return {
                showDialog: false,
                active: this.$route.params.active
                    ? (this.$route.params.active === 'true' ? true : false)
                    : this.isActive
            }
        },
        methods: {
            actionPrimary() {
                let {submitting, showDialog, isActive, id} = this
                submitting = true
                this.$store.dispatch('task/deleteTask', [id, isActive])
                .then(function(response) {
                    showDialog = false
                    submitting = false
                    router.push({
                        path: `/admin/tasks/${isActive}`
                    })
                }).catch(function(error) {
                    console.log('error', error)
                    submitting = false
                })
            },
            actionSecondary() {
                this.showDialog = false
            }
        },
        components: {
            Modal,
            CvModal
        }
    }
</script>