<template>
    <div class="fluid-container">
    <!-- Project Details -->
    <div class="md-layout">
      <div class="md-layout-item">
        <md-table-toolbar>
          <h1 class="md-title accent">Project Details</h1>
          <md-button class="btnWarning" :to="'/admin/assignments/edit/' + assignment.id">Edit Details</md-button>
        </md-table-toolbar>
      </div>
    </div>

    <div class="md-layout spacing">
        <div class="md-layout-item md-medium-size-100 md-small-size-100 md-xsmall-size-100">
            <md-card md-with-hover class="md-elevation-10 background">
                <md-ripple>
                    <div class="md-layout-item md-medium-size-100 md-small-size-100 md-xsmall-size-100">
                        
                    </div>
                </md-ripple>
            </md-card>
        </div>
    </div>

    <div>Assignment ID: 
        {{ this.$route.params.id }}
        <h2>{{ assignment.title }}</h2>
        
        <p>Deposit: {{assignment.deposit}}</p>
        <p>Price: {{assignment.total_price}}</p>
        <p>Date of completeion: {{assignment.date_of_completion}}</p>
        <p>Deadline: {{assignment.deadline}}</p>
        <p>Discount: {{assignment.discount}}</p>
        <p>Completed: {{assignment.completed}}</p>
        <md-button :to="'/admin/assignments/edit/' + assignment.id">Edit</md-button>
        <DeleteAssignment v-bind:id="assignment.id"/>
        <md-button :to="`/admin/tasks/${true}/` + assignment.id">Tasks</md-button>
        <ListTask v-bind:id="assignment.id" v-bind:isActive="true" />

    </div>
    </div>
</template>

<script>
    import Vue from 'vue'
    import axios from 'axios'
    import DeleteAssignment from './DeleteAssignment'
    import ListTask from './../task/ListTask'
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
            return {
                assignment: {
                    title: '',
                    total_price: 0.00,
                    deposit: 0.00,
                    date_of_completeion: null,
                    deadline: null,
                    completed: false,
                }
            }
        },
        mounted () {
            axios.get(`/api/assignment/${this.$route.params.id}`)
            .then(response => {
                if(response.data.status !== "success") {
                    console.log("error ", response)
                } else this.assignment = response.data.assignment
            })
        },
        components: {
            DeleteAssignment,
            ListTask
        }
    }
</script>