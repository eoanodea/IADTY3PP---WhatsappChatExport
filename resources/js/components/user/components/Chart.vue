<script>
import Vue from "vue";
import axios from "axios";
import "@carbon/charts/styles.css";
import chartsVue from "@carbon/charts-vue";
Vue.use(chartsVue);

export default {
    name: "Chart",
    components: {},
    
    data() {
        return {
            task: {
                title: "",
                percent_done: 0
            },
            active: this.$route.params.active 
                ? this.$this.route.params.active === "true" 
                ? true 
                : false 
                : this.isActive,
            parentId: null,
            data: {
                labels :[
                    title
                ],
                datasets: [
                    {
                        label: "Dataset 1",
                        data: [
                            percent_done
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
    },
    methods: {
        fetchTasks() {
            console.log('fetching')
            const url ="task/active"
            console.log("going ", url);
            axios.get(`/api/${url}/${this.$serviceId}`).then(response => {
            if (response.data.status !== "success") {
                console.log("error ", response);
            } else {
                this.task = response.data.task;
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
    template: '<ccv-donut-chart :data="data" :options="options">{{ task.percent_done }}</ccv-donut-chart>'
};
</script>