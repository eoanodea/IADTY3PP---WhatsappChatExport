<!--
@Author: John Carlo M. Ramos
@Date:   2019-11-08T10:11:14+00:00
@Email:  !!!!!---CTRL + ALT + C = Colour Picker---!!!!!
@Last modified by:   John Carlo M. Ramos
@Last modified time: 2019-11-08T10:45:20+00:00
-->
<template>
    <div>
        <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#addServiceModal">
            Add Service
        </button>

        <div class="modal fade" id="addServiceModal" tabindex="-1" role="dialog" aria-label="Add Service Modal">
            <div class="modal-dialog modal-dialog-centered" role="document">
            <div class="modal-content">
            <div class="modal-header">
                <h2>Add a Service</h2>
            </div>

            <div class="modal-body">
            <p v-if="errors.length">
                    <b>Please correct the following error(s):</b>
                    <ul>
                    <li v-for="error in errors" v-bind:key="error.id">
                        {{ error.message }}
                        </li>
                    </ul>
                </p>
                <input type="text" class="form-control" placeholder="Title" v-model="title"> <br />
                <input type="text" class="form-control" placeholder="Description" v-model="description"> <br />
                <input type="checkbox" name="recurring_payment" value="Recurring Payment" v-model="recurring_payment"> Recurring Payment<br>
                <input type="number" class="form-control" placeholder="Standard Price" v-model="standard_price"> <br />
                <input type="checkbox" name="is_public" value="Is pubilc" v-model="is_public"> Public Service<br>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                <input type="submit" value="submit" class="btn btn-primary" label="Save" v-on:click="addService()">
            </div>

            </div>
        </div>
        </div>
    </div>
</template>
<script>
    import axios from 'axios';

    export default {
        data() {
            return {
                title: null,
                description: null,
                recurring_payment: null,
                standard_price: null,
                is_public: null,
                errors: []
            }
        },
        methods: {
            addService: function() {
                if(
                    this.title
                    && this.description
                    && this.recurring_payment
                    && this.standard_price
                    && this.is_public) {
                    return true
                }

                this.errors = [];
                if(!this.title) {
                     this.errors.push({id: 0, message: 'Title required.'});
                }
                if(!this.description) {
                     this.errors.push({id: 1, message: 'Description required.'});
                }
                if(!this.recurring_payment) {
                     this.errors.push({id: 2, message: 'Input required.'});
                }
                if(!this.standard_price) {
                     this.errors.push({id: 3, message: 'Standard Price required.'});
                }
                if(!this.is_public) {
                     this.errors.push({id: 4, message: 'Input required.'});
                }


            }

        }
    }
</script>
