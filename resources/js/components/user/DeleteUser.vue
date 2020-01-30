<template>
<div class="bx--grid">
    <!-- Modal Button -->
    <button 
        class="bx--btn--sm bx--btn--danger" 
        type="button" 
        data-modal-target="#modal-ptxyfo5520i"
        @click="showDialog = true">
            Delete Client
    </button>

    <!-- Modal -->
    <div data-modal 
        id="modal-ptxyfo5520i" 
        class="bx--modal bx--modal--danger" 
        role="dialog" 
        aria-modal="true" 
        aria-labelledby="modal-ptxyfo5520i-label" 
        aria-describedby="modal-ptxyfo5520i-heading" 
        tabindex="-1"
        :md-active.sync="showDialog">

        <div class="bx--modal-container">
            <!-- Heading -->
            <div class="bx--modal-header">
                <p 
                class="bx--modal-header__heading bx--type-beta" 
                id="modal-ptxyfo5520i-heading">
                    WARNING</p>

                <!-- Close Modal Button (Top-right corner) -->
                <button 
                    class="bx--modal-close" 
                    type="button" 
                    data-modal-close aria-label="close modal">
                        <svg focusable="false" preserveAspectRatio="xMidYMid meet" style="will-change: transform;" xmlns="http://www.w3.org/2000/svg" class="bx--modal-close__icon" width="16" height="16" viewBox="0 0 16 16" aria-hidden="true"><path d="M12 4.7l-.7-.7L8 7.3 4.7 4l-.7.7L7.3 8 4 11.3l.7.7L8 8.7l3.3 3.3.7-.7L8.7 8z"></path></svg>
                </button>
            </div>

            <!-- Contents -->
            <div class="bx--modal-content">
                <p>Are you sure you want to delete this client?</p>
            </div>

            <!-- Buttons -->
            <div class="bx--modal-footer">
                <!-- Cancel -->
                <button 
                    @click="showDialog = false" 
                    class="bx--btn bx--btn--secondary" 
                    type="button" 
                    data-modal-close>
                        Cancel
                </button>
			    
                <!-- Delete -->
                <button 
                    @click="deleteUser" 
                    class="bx--btn bx--btn--danger" 
                    type="button" 
                    aria-label="Danger" 
                    data-modal-primary-focus>
                        Delete
                </button>
            </div>
        </div>
    </div>
</div>

    <!-- <div>
        <md-button class="md-secondary md-raised btnDanger" @click="showDialog = true">Delete Client</md-button>
        <md-dialog :md-active.sync="showDialog">
            <md-dialog-title>Are you sure you want to delete this client?</md-dialog-title>
            <md-dialog-actions>
                <md-button class="md-secondary md-raised backBtn" @click="showDialog = false">Back</md-button>
                <md-button class="md-primary md-raised btnDanger" @click="deleteUser">Confirm</md-button>
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
    // import { CvModal } from '@carbon/vue/src';


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
            deleteUser: function() {
                axios.delete(`/api/user/${this.id}`)
                .then(response => {
                    if(!response.data) console.log("Error: ", response)
                    else router.push({name: 'users' })
                })
            }
        },
        components: {
            Modal,
            // CvModal
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
