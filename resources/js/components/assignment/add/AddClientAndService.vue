<template>
    <div class="md-layout">
        <md-field>
            <label class="accent" for="service">Select a Service</label>
            <md-select name="service" id="service" palceholder="Select a service" v-model="serviceId">
                <md-option v-for="service in services" v-bind:key="service.id" :value="service.id">{{service.title}}</md-option>
            </md-select>
        </md-field>
        <md-field>
            <label class="accent" for="client">Select a Client</label>
            <md-select name="client" id="client" palceholder="Select a client" v-model="clientId"> 
                <md-option v-for="client in clients" v-bind:key="client.id" :value="client.id">{{client.first_name + ' ' + client.last_name}}</md-option>
            </md-select>
        </md-field>
        <md-button :disabled="!serviceId || !clientId" class="md-accent md-raised" @click="returnData">Save</md-button>
    </div>
</template>

<script>
    import axios from 'axios';
    import Vue from 'vue';
    import {MdMenu} from 'vue-material/dist/components'

    Vue.use(MdMenu);

    export default {
        data() {
            return {
                serviceId: null,
                clientId: null,
                clients: [],
                services: []
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
        }   
    }
</script>