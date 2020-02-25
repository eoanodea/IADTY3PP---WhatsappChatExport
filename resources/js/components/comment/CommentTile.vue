<template>
    <div class="chat-container">
        <template v-if="expanded">
            <list-comment v-bind:parentId="id" v-bind:isAssignment="isAssignment" v-on:close="expand"/>
        </template>
        <button @click="expand" v-else class="bx--btn bx--btn--lg bx--btn--primary">Chat</button>
    </div>
</template>
<script>
import Vue from "vue";
import 'carbon-components/css/carbon-components.css';
import CarbonComponentsVue from '@carbon/vue/src/index';
import ListComment from './ListComment'


Vue.use(CarbonComponentsVue);

    export default {
        props: ['id', 'isAssignment'],
        data() {
            return {
                expanded: false
            }
        },
        methods: {
            expand(ev) {
                console.log('yes new change!!')
                this.expanded = !this.expanded
            }
        },
        components: {
            ListComment
        },
    }
</script>
<style lang="scss">
    .chat-container {
        position: fixed;
        bottom: 10px;
        right: 10px;
        transition: .2s ease;
    }
    .bx--accordion__title {
        background-color: #1546dc;
        color: #fff;
        padding: 20px;
    }
    .bx--accordion__arrow {
        position: absolute;
        right: 0;
        fill: #fff;
        z-index: 1;
        bottom: 25px;
    }
    .bx--accordion__item--active {
        fill: #fff;
    }
    .chat-container-expanded {
        background-color: #ffffff00;
    //     height: 80%;
    //     width: 60%;
    }
    .msg-page {
        background-color: #fff;
    }
    @media (max-width: 550px) {
        .chat-container-expanded {
            width: 100%;
        }
    }
    .chat-container li {
        border: none;
        display: flex;
        flex-direction: column-reverse;
    }
</style>