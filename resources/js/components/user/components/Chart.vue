<template>
    <ccv-donut-chart v-if="!loading" :data="data" :options="options"></ccv-donut-chart>   
    <loading-indicator v-else />
</template>

<script>
import Vue from "vue";
import axios from "axios";
import "@carbon/charts/styles.css";
import chartsVue from "@carbon/charts-vue";
import LoadingIndicator from './../../progress/LoadingIndicator'
import { mapGetters } from 'vuex';
Vue.use(chartsVue);

export default {
    props: ['parentId'],
    name: "Chart",
    components: {
        LoadingIndicator
    },
    
    data() {
        return {
            fetched: false,
            serviceId: this.parentId,
            data: {
                labels :[
                    // 
                ],
                datasets: [
                    {
                        label: "",
                        data: [
                            1
                        ] // percent_done
                        
                    }
                ]
            },
            options: {
                title: "Project Completion",
                resizable: true,
                donut: {
                    center: {
                        label: "%"
                    }
                },
                height: "550px"
            }
        };
    },
    mounted() {
           if(this.serviceId && this.tasks.length < 1) {
               this.$store.dispatch('task/loadTasks', [this.serviceId, true])
               .then(() => this.structureTasks())
           } else this.structureTasks()
    },
    methods: {
        structureTasks() {
                const {tasks} = this
                if(tasks.length > 0) {
                    tasks.map(task => {
                        this.data.datasets[0].data.push(task.percent_done)
                        this.data.labels.push(task.title)
                        this.fetched = true
                    })
                }
            }
    },
    computed: {
            ...mapGetters({
                tasks: 'task/tasks',
                loading: 'task/loading'
            })
    },
    watch: {
            //Watch the serviceId Prop for changes, on change 
            //fetch new data
            parentId: function(newVal, oldVal) {
                this.data.datasets[0].data = []
                this.data.labels = []

                this.serviceId = newVal
                this.$store.dispatch('task/loadTasks', [this.serviceId, true])
                .then(() => this.structureTasks())
            }
        },
};
</script>
<style lang="scss">
    svg.bx--cc--chart-svg text, text.title {
        fill: #fff!important;
    }
    .bx--chart-holder {
        background: none;
    }
</style>