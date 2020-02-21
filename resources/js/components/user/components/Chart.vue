<script>
import Vue from "vue";
import "@carbon/charts/styles.css";
import chartsVue from "@carbon/charts-vue";
Vue.use(chartsVue);

export default {
    name: "Chart",
    components: {},
    
    data() {
        return {
            data: {
                labels :[
                    "Task 1",
                    "Task 2",
                    "Task 3",
                    "Task 4",
                    "Task 5",
                    "Task 6"
                ],
                datasets: [
                    {
                        label: "Dataset 1",
                        data: [
                            48, 
                            20, 
                            3, 
                            10, 
                            12, 
                            7
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
    template: '<ccv-donut-chart :data="data" :options="options"></ccv-donut-chart>'
};
</script>