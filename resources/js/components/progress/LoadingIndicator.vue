<template>
    <div>
        <p>Please wait while we load up your {{data ? data : 'data'}}.</p>
        <div data-loading class="bx--loading loading">
            <svg class="bx--loading__svg" viewBox="-75 -75 150 150">
                <title>Loading</title>
                <circle class="bx--loading__stroke" cx="0" cy="0" r="37.5" />
            </svg>
        </div>
    </div>
</template>

<script>
    import {Loading} from 'carbon-components'
    export default {
        props: ['data']
    }
</script>
<style lang="scss" scoped>
    .loading {
        margin: 10px auto;
    }
</style>