<template>
    <ccv-donut-chart v-if="fetched" :data="data" :options="options"></ccv-donut-chart>   
    <loading-indicator v-else />
</template>

<script>
import Vue from "vue";
import axios from "axios";
import "@carbon/charts/styles.css";
import chartsVue from "@carbon/charts-vue";
import LoadingIndicator from './../../progress/LoadingIndicator'
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
                    ''
                ],
                datasets: [
                    {
                        label: "",
                        data: [
                            1
                            // percent_done
                        ]
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
         if(this.serviceId) {
                this.fetchTasks()
            }
    },
    methods: {
        fetchTasks() {
            this.fetched = false
            console.log('fetching tasks with ', this.serviceId)
            const url ="task/active"
            console.log("going ", url);
            axios.get(`/api/${url}/by/${this.serviceId}`).then(response => {
            if (response.data.status !== "success") {
                console.log("error ", response);
            } else {
                const tasks = response.data.task;
                console.log('response!', tasks) 
                if(tasks.length > 0) {
                    tasks.map(task => {
                        const dataObj = {
                            label: task.title,
                            data: [
                                Math.floor( task.percent_done )
                            ]
                        }
                        console.log('running loop!')
                        this.data.labels[0] = task.title
                        this.data.datasets[0] = dataObj

                        this.fetched = true
                    })
                } else console.log('no tasks!')
                // this.tasks = 
            }
            });
        }
    },
    watch: {
            //Watch the serviceId Prop for changes, on change 
            //fetch new data
            parentId: function(newVal, oldVal) {
                this.serviceId = newVal
                console.log('running!', oldVal, newVal)
                this.fetchTasks()
            }
        },
};
</script>