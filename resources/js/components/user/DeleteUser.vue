<template>
    <div>
        <md-button class="md-secondary md-raised delBtn" @click="showDialog = true">Delete</md-button>
        <md-dialog :md-active.sync="showDialog">
            <md-dialog-title>Are you sure you want to delete this client?</md-dialog-title>
            <md-dialog-actions>
                <md-button class="md-secondary md-raised backBtn" @click="showDialog = false">Back</md-button>
                <md-button class="md-primary md-raised delBtn" @click="deleteUser">Confirm</md-button>
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
            deleteUser: function() {
                axios.delete(`http://localhost:8000/api/user/${this.id}`)
                .then(response => {
                    if(!response.data) console.log("Error: ", response)
                    else router.push({name: 'users' })
                })
            }
        },
    }
</script>
<style>
    .md-overlay {
        background: none!important;
    }

    .backBtn {
      color: #fff !important;
      background-color: #24b6f7 !important;
    }

    .delBtn {
      color: #fff !important;
      background-color: #ee4444 !important;
    }
</style>
