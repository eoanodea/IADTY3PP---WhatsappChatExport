<template> 
<div>
    <!-- Modal Button -->
    <button
        class="bx--btn bx--btn--lg bx--btn--danger" 
        type="button" 
        data-modal-target="#modal-ptxyfo5520i"
        @click="showDialog = true">
            Delete Project
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

        <template slot="title"><span class="warning">WARNING</span></template>
        <template slot="content"><p>Are you sure you want to delete this <span class="logoCol">Project</span>?</p></template>

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
        props: ['id'],
        data() {
            return {
                showDialog: false,
            }
        },
        methods: {
            actionPrimary: function() {
                axios.delete(`/api/assignment/${this.id}`)
                .then(response => {
                    if(!response.data) console.log("Error: ", response)
                    else router.push({name: 'assignments' })
                })
            }
        },
        components: {

        }
    }
</script>