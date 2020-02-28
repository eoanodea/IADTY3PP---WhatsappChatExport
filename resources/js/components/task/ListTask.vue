<template>
  <dynamic-table 
    v-bind:title="'Tasks'" 
    v-bind:data="tasks" 
    v-bind:fields="fields" 
    v-bind:showUrl="showUrl" 
    v-bind:addUrl="addUrl" 
    v-bind:loading="loading"
    v-bind:error="error"
    v-bind:active="isActive"
    v-bind:collection="'task'"
  />

</template>

<script>
import Vue from "vue";
import axios from 'axios';
import DynamicTable from './../table/DynamicTable'
import { mapGetters } from 'vuex';
// import 'carbon-components/css/carbon-components.css';
// import CarbonComponentsVue from '@carbon/vue/src/index';
// import { DataTable, Loading } from 'carbon-components';

// Vue.use(CarbonComponentsVue);

    export default {
        props: ['parentId', 'isActive'],
        data() {
            return {
                // tasks: null,
                taskId: this.parentId
                    ? this.parentId 
                    : this.$route.params.id,
                active: this.isActive
                    ? this.isActive
                    : (this.$route.params.active === 'true' ? true : false),
                running: true,
                fields: ['title', 'description'],
                showUrl: `/admin/tasks${this.isActive ? '/true' : '/false'}/show/`,
                addUrl: `/admin/tasks${this.isActive ? '/true' : '/false'}/${this.parentId}/new`,
            }
        },
        created() {
            if(this.tasks.length < 1) {
                this.$store.dispatch('task/loadTasks', [this.taskId, this.isActive])
            }
        },
        methods: {
            //
        },
        watch: {
            //Watch the taskId Prop for changes, on change 
            //fetch new data
            parentId: function(newVal, oldVal) {
                this.taskId = newVal
                console.log('running!', oldVal, newVal)
                this.$store.dispatch('task/loadTasks', [this.taskId, this.isActive])
            }
        },
        computed: {
            ...mapGetters({
                tasks: 'task/tasks',
                pagination: 'task/pagination',
                loading: 'task/loading',
                error: 'task/error'
            })
        },
        components: {
            DynamicTable
        }
    }
</script>
