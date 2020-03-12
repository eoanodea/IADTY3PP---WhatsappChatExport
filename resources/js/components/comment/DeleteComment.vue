<template> 
<div>
    <!-- Modal Button -->
    <button
        class="bx--btn bx--btn--lg bx--btn--danger" 
        type="button" 
        data-modal-target="#modal-ptxyfo5520i"
        @click="showDialog = true">
            Delete Default Comment
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
        <template slot="content"><p>Are you sure you want to delete this default comment?</p></template>
    
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
            actionPrimary: function() {
                const url = this.active === false
                    ? 'comment'
                    : 'comment/active'
                axios.delete(`/api/${url}/${this.id}`)
                .then(response => {
                    if(!response.data) console.log("Error: ", response)
                    else router.push({path: `/admin/comments/${this.active}/${response.data.parentId}` })
                })
            }
        },
        components: {
            //
        }
    }
</script>