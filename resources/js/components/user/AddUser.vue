<template>
    <div>
        <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#addUserModal">
            Add User
        </button>

        <div class="modal fade" id="addUserModal" tabindex="-1" role="dialog" aria-label="Add User Modal">
            <div class="modal-dialog modal-dialog-centered" role="document">
            <div class="modal-content">
            <div class="modal-header">
                <h2>Add a User</h2>
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
                <input type="text" class="form-control" placeholder="Name" v-model="name"> <br />
                <input type="email" class="form-control" placeholder="Email" v-model="email"> <br />
                <input type="password" class="form-control" placeholder="Password" v-model="password"> <br />
                <input type="password" class="form-control" placeholder="Password Confirmation" v-model="confirm_password"> <br />
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                <input type="submit" value="submit" class="btn btn-primary" label="Save" v-on:click="addUser()">
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
                name: null,
                email: null,
                password: null,
                confirm_password: null,
                errors: []
            }
        },
        methods: {
            addUser: function() {
                if(
                    this.name 
                    && this.email 
                    && this.password
                    && this.password === this.confirm_password) {
                    return true
                }

                this.errors = [];
                if(!this.name) {
                     this.errors.push({id: 0, message: 'Name required.'});
                }
                if(!this.email) {
                     this.errors.push({id: 1, message: 'Email required.'});
                }
                if(!this.password) {
                     this.errors.push({id: 2, message: 'Password required.'});
                }
                if(this.password !== this.confirm_password) {
                     this.errors.push({id: 3, message: 'Password doesnt match.'});
                }

                
            }

        }
    }
</script>