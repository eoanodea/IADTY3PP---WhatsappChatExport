<template>
    <cv-accordion
        class="chat-container"
    >
        <cv-accordion-item>
            <template slot="title" class="accordion-title">Open chat</template>
            <template slot="content">
                <list-comment v-bind:id="id" v-bind:isAssignment="isAssignment" />
            </template>
        </cv-accordion-item>
    </cv-accordion>
     <!-- <cv-tile
            kind="expandable"
            :class="`chat-container ${expanded ? ' chat-container-expanded' : ' chat-container-hidden'}`"
            >
            <template v-if="expanded" slot="below">
                    <list-comment v-bind:id="id" v-bind:isAssignment="isAssignment" />
            </template>
            <template v-else>
                <h1 v-on:click="expand">Hello</h1><p>This is some tile content</p>
            </template>
            </cv-tile> -->
</template>
<script>
import Vue from "vue";
import CarbonComponentsVue from '@carbon/vue/src/index';
import ListComment from './ListComment'
import { CvTile } from '@carbon/vue/src/';


Vue.use(CarbonComponentsVue);

    export default {
        props: ['id', 'isAssignment'],
        data() {
            return {
                expanded: false
            }
        },
        methods: {
            expand() {
                this.expanded = !this.expanded
            }
        },
        components: {
            CvTile,
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
        width: 40%;
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