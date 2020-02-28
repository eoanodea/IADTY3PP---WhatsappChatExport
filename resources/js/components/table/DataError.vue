<template>
    <div class="error-container">
        <h2>Something went wrong</h2>
        <p>{{error}}</p>
        <br />
        <button class="bx--btn bx--btn--lg bx--btn--primary" @click="retry">
                Retry
        </button>
    </div>
</template>

<script>
    export default {
        props: ['error', 'collection'],
        methods: {
            retry() {
                const upper = this.collection.charAt(0).toUpperCase() + this.collection.substring(1) + 's'
                if(this.$route.params.id) {
                    this.$store.dispatch(this.collection + '/load' + upper, parseInt(this.$route.params.id))
                } else this.$store.dispatch(this.collection + '/load' + upper)
            }
        }
    }
</script>

<style lang="scss" scoped>
    .error-container {
        width: 80%;
        margin: 80px auto;
        text-align: center;
    }
</style>