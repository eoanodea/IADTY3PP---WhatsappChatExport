<template>
    <div class="chat-container">

        <template v-if="expanded">
            <list-comment 
                v-bind:parentId="id" 
                v-bind:isAssignment="isAssignment" 
                v-bind:loading="loadingMessages"
                v-bind:comments="comments"
                v-bind:user="user"
                v-on:close="expand"
                v-on:comment-added="addComment"
            />
        </template>
        <button 
            @click="expand" 
            v-else 
            class="bx--btn bx--btn--lg bx--btn--primary"
        >
            Chat 
            <Chat32 class="bx--btn__icon" />
            <div class="notification-container" v-if="messages > 0">
                <p class="notification-text">{{messages}}</p>
            </div>
        </button>
    </div>
</template>
<script>
    import Vue from "vue";
    import ListComment from './ListComment'
    import Chat32 from '@carbon/icons-vue/es/chat/32'
    import { mapGetters } from 'vuex'
    import axios from 'axios';
    import juntos from './../../../assets/sound/juntos.mp3'

    export default {
        props: ['id', 'isAssignment'],
        data() {
            return {
                expanded: false,
                comments: null,
                loadingMessages: true,
                messages: 0,
                audio: new Audio(juntos)
            }
        },
        mounted () {
            this.fetchComments()
        },
        methods: {
            expand(ev) {
                this.messages = 0
                this.expanded = !this.expanded
            },
                /**
                * When the component mounts, check if the comment is assignment or not 
                * Modify the fetch URL with result and fetch comments
                */
            fetchComments() {
                this.loadingMessages = true
                const url = this.isAssignment
                ? 'comments/assignment'
                : 'comments/task'
                
                axios.get(`/api/${url}/${this.id}`)
                .then(response => {
                if(response.data.status !== "success") {
                    console.log('error!')
                    this.error = response.data.error
                } else {
                    this.comments = response.data.comment
                }
                this.loadingMessages = false
                }).catch(function(e) {
                    console.log('error!', e)
                    this.error = e
                }).finally(() => {
                    this.listenForBroadcast()
                })
            },
            addComment(data) {
                let newComment = data.comment
                newComment.first_name = data.user.first_name
                this.messages++;
                this.audio.play()
                this.comments.push(newComment);
            },
            /**
             * Connect to Laravel Echo 
             * for live updates
             */
            listenForBroadcast() {
                Echo.channel((this.isAssignment ? 'assignment.' : 'task.') + this.id)
                .listen("MessagePushed", (e) => {
                    this.addComment(e)
                });
            },
        },
        watch: {
            //Watch the serviceId Prop for changes, on change 
            //fetch new data
            id: function(newVal, oldVal) {
                this.fetchComments()
            },
        },
        computed: {
            ...mapGetters({
                user: 'auth/user',
                token: 'auth/token',
            })
        },
        components: {
            ListComment,
            Chat32
        }
    }
</script>
<style lang="scss">
    .notification-container {
        position: absolute;
        right: -10px;
        top: -15px;
        background-color: red;
        border-radius: 100%;
        width: 2em;
        height: 2em;
        text-align: center;
    }
    .notification-text {
        font-weight: 800;
        font-size: 1em;
    }
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
    }
    .msg-page {
        background-color: #262626;
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