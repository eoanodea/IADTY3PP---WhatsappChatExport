<template>
<div>
    <!-- Select Service -->
    <label for="service">Select a Service</label>
    <cv-dropdown :value="value" name="service" id="service" v-model="serviceId" class="cv-dropdown" placeholder="Select a Service">
        <cv-dropdown-item v-for="service in services" v-bind:key="service.id" :value="service.id">
            {{service.title}}
        </cv-dropdown-item>
    </cv-dropdown>

    <!-- Select Client -->
    <br/>
    <label for="client">Select a Client</label>
    <cv-dropdown :value="value" name="client" id="client" v-model="clientId" class="cv-dropdown" placeholder="Select a Client">
        <cv-dropdown-item v-for="client in clients" v-bind:key="client.id" :value="client.id">
            {{client.first_name + ' ' + client.last_name}}
        </cv-dropdown-item>
    </cv-dropdown>

    <!-- Save Button -->
    <br/>
    <cv-link :disabled="!serviceId || !clientId" @click="returnData" style="text-decoration: none;">
        <button :disabled="!serviceId || !clientId" @click="returnData" class="bx--btn bx--btn--lg bx--btn--primary">
            Save
        </button>
    </cv-link>
</div>
</template>

<script>
    import axios from 'axios';
    import Vue from 'vue';
    
    import CarbonComponentsVue from '@carbon/vue/src/index';
    import { 
        CvContentSwitcher, 
        CvContentSwitcherButton, 
        CvContentSwitcherContent,
        CvDropdown, 
        CvDropdownItem, 
        CvDropdownSkeleton } from '@carbon/vue/src'

    Vue.use(CarbonComponentsVue);

    export default {
        data() {
            return {
                serviceId: null,
                clientId: null,
                clients: [],
                services: [],
                value: {
                    config: [
                        'value',
                        {
                            default: '',
                            'Value 10': '10',
                            'Value 20': '20',
                            'Value 30': '30',
                            'Value 40': '40',
                            'Value 50': '50',
                        }
                    ]
                }
            }
        },
        mounted() {
            this.fetchServices()
            this.fetchClients()
        },
        methods: {
            fetchServices() {
                axios.get('/api/service/all')
                .then(response => {
                    if(!response.data) {
                        console.log('Error no services', response)
                    } else {
                        this.services = response.data
                    }
                })
            },
            fetchClients() {
                axios.get('/api/user/all')
                    .then(response => {
                        if(!response.data) {
                            console.log('Error no services', response)
                        } else {
                            this.clients = response.data
                        }
                    })
            },
            returnData() {
                this.$emit('selected-service-client', this.serviceId, this.clientId)
            }
        },
        components: {
            CvContentSwitcher, 
            CvContentSwitcherButton, 
            CvContentSwitcherContent,
            CvDropdown, 
            CvDropdownItem, 
            CvDropdownSkeleton
        }   
    }
</script>