<template> 
<div>
    <!-- Modal Button -->
    <button 
        class="bx--btn bx--btn--lg bx--btn--danger" 
        type="button" 
        data-modal-target="#modal-ptxyfo5520i"
        @click="showDialog = true">
            Delete Service
    </button>

    <!-- Modal -->
    <cv-modal
            kind="danger"
            :visible="showDialog"
            @modal-shown="showDialog = true"
            @modal-hidden="showDialog = false"
            @modal-hide-request="showDialog = false"
            @secondary-click="actionSecondary"
            @primary-click="actionPrimary"
        >
        <!-- <template slot="label">Label of modal</template> -->
        <template slot="title">WARNING</template>
        <template slot="content"><p>Are you sure you want to delete this service?</p></template>

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
        props: ['id'],
        data() {
            return {
                showDialog: false,
                submitting: false
            }
        },
        methods: {
            actionPrimary() {
                let {submitting, showDialog} = this
                submitting = true
                this.$store.dispatch('service/deleteService', this.id)
                .then(function(response) {
                    showDialog = false
                    submitting = false
                    router.push({
                        path: `/admin/services`
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