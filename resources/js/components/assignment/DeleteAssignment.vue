<template> 
    <div>
        <md-button class="md-secondary md-raised" @click="showDialog = true">Delete</md-button>
        <md-dialog :md-active.sync="showDialog">
            <md-dialog-title>Are you sure you want to delete this assignment?</md-dialog-title>
            <md-dialog-actions>
                <md-button class="md-secondary md-raised" @click="showDialog = false">Back</md-button>
                <md-button class="md-primary md-raised" @click="deleteAssignment">Confirm</md-button>
            </md-dialog-actions>
        </md-dialog>
    </div>
</template>
<script>
    import Vue from 'vue'
    import {MdDialog, MdButton} from 'vue-material/dist/components'
    import axios from 'axios'
    import router from './../../router'

    Vue.use(MdDialog)
    Vue.use(MdButton)

    export default {
        props: ['id'],
        data() {
            return {
                showDialog: false,
            }
        },
        methods: {
            deleteAssignment: function() {
                axios.delete(`http://localhost:8000/api/assignment/${this.id}`)
                .then(response => {
                    if(!response.data) console.log("Error: ", response)
                    else router.push({name: 'assignments' })
                })
            }
        },
    }
</script>
<style lang="scss" scopred>
    .md-overlay {
        background: none!important;
    }
</style>