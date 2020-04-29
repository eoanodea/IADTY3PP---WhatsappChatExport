<template>
    <div class="formAlignment">
        <!-- Select Service -->
        <cv-dropdown label="Select a Service" value="service" name="service" id="service" v-model="serviceId" class="placeholderForms" placeholder="Please Choose a Service">
            <cv-dropdown-item v-for="service in services" v-bind:key="service.id" :value="service.id.toString()">
                <span>{{service.title}}</span>
            </cv-dropdown-item>
        </cv-dropdown>

        <!-- Select Client -->
        <br/>
        <cv-dropdown label="Select a Client" value="client" name="client" id="client" v-model="clientId" class="cv-dropdown" placeholder="Please Choose a Client">
            <cv-dropdown-item v-for="client in users" v-bind:key="client.id" :value="client.id.toString()">
                <span>{{client.first_name}}</span> <span class="dropDownSpan logoCol">{{client.last_name}}</span>
            </cv-dropdown-item>
        </cv-dropdown>

        <!-- Save Button -->
        <br/>
        <button :disabled="!serviceId || !clientId" @click="returnData" class="bx--btn bx--btn--lg bx--btn--primary">
            Save
        </button>
    </div>
</template>

<script>
    import Vue from 'vue';
    import { mapGetters } from 'vuex';
    
    export default {
        data() {
            return {
                serviceId: null,
                clientId: null,
            }
        },
        mounted() {
            this.$store.dispatch('user/loadUsers')
            this.$store.dispatch('service/loadServices')
        },
        methods: {
            returnData() {
                this.$emit('selected-service-client', this.serviceId, this.clientId)
            }
        },
        computed: {
            ...mapGetters({
                services: 'service/services',
                loadingService: 'service/loading',
                errorService: 'service/error',
                users: 'user/users',
                loadingUser: 'service/loading',
                errorUser: 'service/error',
            })
        },
        components: {
            //
        }   
    }
</script>