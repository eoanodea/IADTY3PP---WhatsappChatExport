<template> 
    <div>
        <md-button class="md-secondary md-raised" @click="showDialog = true">Delete</md-button>
        <md-dialog :md-active.sync="showDialog">
            <md-dialog-title>Are you sure you want to delete this task?</md-dialog-title>
            <md-dialog-actions>
                <md-button class="md-secondary md-raised" @click="showDialog = false">Back</md-button>
                <md-button class="md-primary md-raised" @click="deleteTask">Confirm</md-button>
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
            deleteTask: function() {
                const url = this.active === false
                    ? 'task'
                    : 'task/active'
                axios.delete(`/api/${url}/${this.id}`)
                .then(response => {
                    if(!response.data) console.log("Error: ", response)
                    else {
                    console.log(response.data)
                    router.push({path: `/admin/tasks/${this.active}/${response.data.parentId}` })
                        
                    }
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