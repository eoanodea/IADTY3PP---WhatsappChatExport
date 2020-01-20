<template>
<div class="md-layout">
    <md-card-actions class="progessSpinner">
        <input type="range" v-model.number="amount" />
        {{ amount }}%
        <h1 class="progressSpinner spinnerColor">{{ amount }}%</h1>
    </md-card-actions>
    <md-progress-spinner
        class="md-accent"
        md-mode="determinate"
        :md-value="amount"
        :md-diameter="600"
        :md-stroke="30"
    ></md-progress-spinner>
</div>
</template>

<script>
import Vue from "vue";
import {
    MdButton,
    MdProgress,
    MdAvatar,
    MdCard,
    MdContent,
    MdElevation,
    MdIcon,
    MdImage,
    MdLayout,
    MdRipple,
    MdToolbar
} from "vue-material/dist/components";

Vue.use(MdButton);
Vue.use(MdProgress);
Vue.use(MdAvatar);
Vue.use(MdCard);
Vue.use(MdContent);
Vue.use(MdElevation);
Vue.use(MdIcon);
Vue.use(MdImage);
Vue.use(MdLayout);
Vue.use(MdRipple);
Vue.use(MdToolbar);

export default {
    data() {
        amount: 70
    }
};
</script>

<style scoped>
.md-progress-spinner {
    top: 50%;
    left: 50%;
    display: block;
    position: absolute;
    width: 100%;
    height: auto;
    margin-left: -375px;
}

.progressSpinner {
    top: 50%;
    left: 50%;
    display: block;
    position: relative;
    width: 100%;
    height: auto;
    margin-left: -375px;
}

.spinnerColor {
    color: #24b6f7 !important;
}
</style>