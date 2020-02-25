<template>
    <span>
            <!-- Chat app -->
        <div class="chat">
            <div class="container">
                <div class="msg-header">
                    <div class="active">
                        <h5>Comments</h5>
                    </div>
                    <div>
                        <button class="bx--btn bx--btn--lg bx--btn--secondary" @click="closePanel">Close</button>
                    </div>
                </div>

                <div class="chat-page">
                    <div class="msg-inbox">
                        <div class="chats" id="chats">
                            <div class="msg-page" id="msg-page">

                                <div
                                    v-if="loadingMessages"
                                    class="loading-messages-container"
                                >
                                    <span class="loading-text">
                                        Loading Messages
                                    </span>
                                    <loading-indicator />
                                </div>
                                <div class="text-center img-fluid empty-chat" v-else-if="!comments.length" >
                                    <div class="empty-chat-holder">
                                        <!-- <img src="../../assets/empty-state.svg" class="img-res" alt="empty chat image"> -->
                                        <p>Empty chat</p>
                                    </div>

                                    <div>
                                        <h2> No new message? </h2>
                                        <h6 class="empty-chat-sub-title">
                                            Send your first message below.
                                        </h6>
                                    </div>
                                </div>

                                <div v-else>
                                    <div v-for="message in comments" v-bind:key="message.id">
                                        <div class="received-chats" v-if="message.user_id !== user.id">
                                            <div class="received-msg">
                                                <div class="received-msg-inbox">
                                                    <cv-link :to="`/admin/comments/${assignment}/` + commentId + '/new'" style="text-decoration: none;">
                                                    
                                                    </cv-link>
                                                    <p><cv-link :to="`/admin/users/show/${message.user_id}/`">{{ message.first_name ? message.first_name : message.user.first_name }}</cv-link><br>{{ message.comment }}</p>
                                                </div>
                                            </div>
                                        </div>


                                        <div class="outgoing-chats" v-else>
                                            <div class="outgoing-chats-msg">
                                                <p>{{ message.comment }}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="msg-bottom">
                        <add-comment v-bind:id="commentId" v-on:comment-added="addComment" v-bind:isAssignment="assignment"></add-comment>
                    </div>
                </div>
            </div>
        </div>
    </span>

</template>
<script>
    import Vue from "vue";
    import axios from 'axios';
    import LoadingIndicator from './../progress/LoadingIndicator'
    import CarbonComponentsVue from '@carbon/vue/src/index';
    
    import { mapGetters } from 'vuex'
    import AddComment from './AddComment'

    Vue.use(CarbonComponentsVue);

    export default {
        props: ['parentId', 'isAssignment'],
        data() {
            return {
                comments: null,
                loadingMessages: true,
                commentId: this.$route.params.id
                    ? this.$route.params.id
                    : this.parentId,
                assignment: this.$route.params.isAssignment
                    ? (this.$route.params.isAssignment === 'true' ? true : false)
                    : this.isAssignment,
                error: null,
                msgContainer: null,
                scroll: 0,
                expanded: false
            }
        },
        /**
         * When the component mounts, check if the comment is assignment or not 
         * Modify the fetch URL with result and fetch comments
         */
        mounted () {
            this.fetchComments()
        },
        methods: {
            fetchComments() {
                this.loadingMessages = true
                const url = this.assignment
                ? 'comments/assignment'
                : 'comments/task'
                
                axios.get(`/api/${url}/${this.commentId}`)
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
                    this.msgContainer = this.$el.querySelector("#msg-page");
                    this.scrollToBottom()

                    this.listenForBroadcast()
                })
            },
            addComment(data) {
                let newComment = data.comment
                newComment.first_name = data.user.first_name

                this.comments.push(newComment);
                this.scrollToBottom()
            },
            scrollToBottom: function() {    
                this.$nextTick(() => {
                
                    this.msgContainer.scrollTop = this.msgContainer.scrollHeight;
                })
            },
            closePanel() {
                this.$emit('close')
            },
            /**
             * Connect to Laravel Echo 
             * for live updates
             */
            listenForBroadcast() {
                Echo.channel((this.assignment ? 'assignment.' : 'task.') + this.commentId)
                .listen("MessagePushed", (e) => {
                    this.addComment(e)
                });
            },
        },
        components: {
            AddComment,
            LoadingIndicator
        },
        computed: {
            ...mapGetters({
                user: 'auth/user',
                token: 'auth/token',
            })
        },
        watch: {
            //Watch the serviceId Prop for changes, on change 
            //fetch new data
            parentId: function(newVal, oldVal) {
                this.commentId = parseInt(newVal)
                console.log('running!', oldVal, newVal)
                this.fetchComments()
            }
        },
    }
</script>

<style lang="scss" scoped>
    
    .chat {
        flex: 1;
        width: 350px;
        background-color: #f8f9fb;
    }
    .empty-chat-holder {
        width: 100%;
        height: 250px;
        margin-top: 70px;
    }

    .empty-chat {
        position: relative;
        margin: auto;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        width: 100%;
    }

    .empty-chat h2 {
        color: #1546dc;
        padding: 0;
        font-size: 2rem;
        margin: 25px auto 15px;
    }

    .container {
        margin: auto;
        width: 100%;
        height: 588px;
        letter-spacing: 0.5px;
        background: #f8f9fb;
        padding: 0 !important;
        box-shadow: 0 0 50px rgba(0, 0, 0, 0.2);
        border-radius: 7px;
        box-sizing: border-box;
        border: 1px solid #BFCDD8;
    }

    .msg-header {
        width: 100%;
        height: 70px;
        border-bottom: none;
        display: inline-block;
        background-color: #fff;
        border-radius: 7px 7px 0 0;
        padding: 0 20px;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .active {
        width: 120px;
        float: left;
    }

    .active h5 {
        padding: 10px;
        color: #444;
        font-size: 18px;
        font-weight: 500;
        margin: 0;
    }

    .active h6 {
        font-size: 10px;
        line-height: 2px;
        color: #fff;
    }

    .msg-page {
        height: 516px;
        overflow-y: auto;
        padding-bottom: 100px;
    }

    .received-chats {
        padding: 20px;
        display: flex;
        justify-content: flex-start;
    }

    .received-chats-img {
        display: inline-block;
        display: flex;
        align-items: center;
    }

    .received-msg {
        display: inline-block;
        padding: 0;
        vertical-align: top;
    }

    .received-msg-inbox {
        width: 57%;
    }

    .received-msg-inbox p {
        background: #ffffff none repeat scroll 0 0;
        border-radius: 7px;
        color: #646464;
        font-size: 16px;
        margin: 0;
        padding: 12px;
        position: relative;
        width: 253px;
        min-height: 61px;
        left: 30px;
        box-shadow: 0 2px 2px rgba(0, 0, 0, 0.1);
    }

    .received-msg-inbox p span {
        color: #6889fd;
        text-transform: capitalize;
        font-weight: bold;
        font-size: 14px;
    }

    .received-msg-inbox p:after {
        content: '';
        position: absolute;
        left: 0;
        top: 50%;
        width: 0;
        height: 0;
        border: 10px solid transparent;
        border-right-color: #ffffff;
        border-left: 0;
        margin-top: -10px;
        margin-left: -10px;
        transform: skew(0, 30deg);
    }

    #triangle-right {
        width: 0;
        height: 0;
        border-top: 50px solid transparent;
        border-left: 100px solid red;
        border-bottom: 50px solid transparent;
    }

    .time {
        color: #777;
        display: block;
        font-size: 12px;
        margin: 8px 0 0;
    }

    .outgoing-chats {
        overflow: hidden;
        margin: 26px 20px;
        display: flex;
        justify-content: flex-end;
    }

    .outgoing-chats-msg p {
        background: #1546dc none repeat scroll 0 0;
        color: #fff;
        font-size: 16px;
        margin: 0;
        color: #fff;
        padding: 12px;
        width: 253px;
        min-height: 61px;
        position: relative;
        border-radius: 7px;
        display: flex;
        align-items: center;
        line-height: 1.2;
    }

    .outgoing-chats-msg p::before {
        content: '';
        position: absolute;
        right: 0;
        top: 50%;
        width: 0;
        height: 0;
        border: 10px solid transparent;
        border-left-color: #1546dc;
        border-right: 0;
        margin-top: -10px;
        margin-right: -10px;
        transform: skew(0, -30deg);
    }

    .outgoing-chats-img {
        display: flex;
        align-items: center;
        padding-top: 10px;
        margin-left: 20px;
    }

    .msg-bottom {
        position: relative;
        height: 40px;
        background-color: #0e62fe;
        border-radius: 100px 100px 0 0;
    }

    .input-group {
        margin-right: 20px;
        border-top: 1px solid #DEE6EB;
        width: 100% !important;
        background-color: #fff;
        height: 100%;
        border-radius: 0 0 7px 7px
    }

    .input-group input {
        height: 100%;
        background: #fff;
    }

    .input-group ::placeholder {
        color: #C0C0C0 !important;
    }

    .form-control {
        border: none !important;
        border-radius: 20px !important;
    }

    .input-group-text {
        background: transparent !important;
        border: none !important;
    }

    .input-group .fa {
        color: #007bff;
        float: right;
    }

    .bottom-icons {
        float: left;
        margin-top: 17px;
        width: 30% !important;
        margin-left: 22px;
    }

    .bottom-icons .fa {
        color: #fff;
        padding: 5px;
    }

    .form-control:focus {
        border-color: none !important;
        box-shadow: none !important;
        border-radius: 20px;
    }

    .msg-bottom {
        border-radius: 0px 0px 10px 10px;
        position: absolute;
        z-index: 10;
        left: 0;
        bottom: 0;
        width: 100%;
    }

    .message-form {
        height: 100%;
    }

    .chat-page {
        position: relative;
    }
    .sending-message-spinner {
        margin-right: 20px;
    }

    .message-input {
        padding: 6px 20px;
    }

    .empty-chat-sub-title {
        text-align: center;
        color: #555;
        font-size: 18px;
    }

    .loading-messages-container {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        margin-top: 150px;
    }

    .loading-text {
        color: #1546dc;
        font-size: 25px;
        margin-top: 20px;
    }

    .loading-messages-container .spinner svg {
        stroke: #CCD7F0;
    }

    @media (max-width: 450px) {
        .login-container {
            padding: 40px;
        }
        .outgoing-chats-img {
            display: none;
        }
        .received-chats-img {
            display: none;
        }
        .received-msg-inbox p {
            left: 0;
            width: 100%;
        }
        .received-msg-inbox p:after {
            display: none;
        }
        .received-msg-inbox {
            width: 100%;
        }
        .received-msg {
            width: 100%;
        }
        .outgoing-chats-msg {
            width: 100%;
        }
        .outgoing-chats-msg p {
            width: 100%;
        }
        .outgoing-chats-msg p::before {
            display: none;
        }
        .welcome-message {
            display: none;
        }
    }
</style>