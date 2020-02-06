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
    <!-- <div>
        <md-button class="md-secondary md-raised btnDanger" @click="showDialog = true">Delete Service</md-button>
        <md-dialog :md-active.sync="showDialog">
            <md-dialog-title>Are you sure you want to delete this service?</md-dialog-title>
            <md-dialog-content>This will also delete all tasks associated with it.</md-dialog-content>
            <md-dialog-actions>
                <md-button class="md-secondary md-raised backBtn" @click="showDialog = false">Back</md-button>
                <md-button class="md-primary md-raised btnDanger" @click="deleteService">Confirm</md-button>
            </md-dialog-actions>
        </md-dialog>
    </div> -->
</template>
<script>
    import Vue from 'vue'
    // import {MdDialog, MdButton} from 'vue-material/dist/components'
    import axios from 'axios'
    import router from './../../router'
    import 'carbon-components/css/carbon-components.css';
    import CarbonComponentsVue from '@carbon/vue/src/index';
    import { Modal } from 'carbon-components';
    import { CvModal } from '@carbon/vue/src';

    // Vue.use(MdDialog)
    // Vue.use(MdButton)

    export default {
        props: ['id'],
        data() {
            return {
                showDialog: false,
            }
        },
        methods: {
            actionPrimary: function() {
                axios.delete(`/api/service/${this.id}`)
                .then(response => {
                    if(response.data.status !== 'success') console.log("Error: ", response)
                    else router.push({name: 'services' })
                })
            }
        },
        components: {
            Modal,
            CvModal
        }
    }
</script>
<style>
    /* .backBtn {
      color: #fff !important;
      background-color: #24b6f7 !important;
    }

    .delBtn {
      color: #fff !important;
      background-color: #ee4444 !important;
    } */
</style>