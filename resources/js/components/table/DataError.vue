<template>
    <div class="error-container">
        <h2>Error</h2>
        <p>{{error}}</p>
    </div>
</template>

<script>
    export default {
        props: ['error']   
    }
</script>

<style lang="scss" scoped>
    .error-container {
        width: 80%;
        margin: 20px auto;
        text-align: center;
    }
</style>