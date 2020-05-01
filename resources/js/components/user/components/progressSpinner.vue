<template>
<div class="spinner-container">
    <md-progress-spinner
        class="md-accent"
        md-mode="determinate"
        :md-value="amount"
        :md-diameter="600"
        :md-stroke="30"
    ></md-progress-spinner>
    <h1 class="spinner-percentage">{{amount}}%</h1>
</div>
</template>

<script>
import Vue from "vue";

export default {
    data() {
        return {
            amount: 70
        }
    }
};
</script>

<style scoped>
.spinner-container {
    display: block;
    position: relative;
    width: 80%;
    margin: 20px auto;
    text-align: center;
}

.spinner-percentage {
    left: 50%;
    top: 50%;
    position: absolute;
    transform: translate(-50%, -50%);
}

.spinnerColor {
    color: #24b6f7 !important;
}
</style>