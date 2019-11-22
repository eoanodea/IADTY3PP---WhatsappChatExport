<template>
    <div>User
        {{ this.$route.params.id }}
        {{ user }}
    </div>
</template>

<script>
    import axios from 'axios'
    export default {
        data() {
            return {
                user: null
            }
        },
        mounted () {
            axios.get(`http://localhost:8000/api/user/${this.$route.params.id}`)
            .then(response => {
                if(response.data.status !== "success") {
                    console.log("error ", response)
                } else this.user = response.data.user
            })
        }
    }
</script>