<template>
    <div>
        <md-button class="md-icon-button" @click="showDialog = true">
            <md-icon>add</md-icon>
        </md-button>
        <md-dialog :md-active.sync="showDialog">
            <md-dialog-title>Add a new Task</md-dialog-title>
            <md-dialog-content>
                <p v-if="errors.length">
                    <b class="error">Please correct the following error(s):</b>
                    <ul>
                    <li v-for="error in errors" v-bind:key="error.id" class="error">
                        {{ error.message }}
                        </li>
                    </ul>
                </p>
                <md-field>
                    <label for="title">Title</label>
                    <md-input name="title" type="text" class="form-control" placeholder="Title" v-model="task.title" /> <br />
                </md-field>
                <md-field>
                    <label for="description">Description</label>
                    <md-input name="description" type="text" class="form-control" placeholder="Description" v-model="task.description" /> <br />
                </md-field>
                <md-field>
                    <label for="percent_done">Percent Done</label>
                    <md-input name="percent_done" type="number" class="form-control" placeholder="Percent Done" v-model="task.percent_done" /> <br />
                </md-field>

            </md-dialog-content>

            <md-dialog-actions>
                <md-button class="md-primary md-raised" @click="showDialog = false">Back</md-button>
                <md-button class="md-accent md-raised" @click="validateTask" :disabled="submitting">Save</md-button>
            </md-dialog-actions>
        </md-dialog>
    </div>
</template>
<script>
export default {
    data() {
        return {
            task: {
                title: '',
                description: '',
                percent_done: 0
            },
            showDialog: false,
            errors: [],
            submitting: false
        }
    },
    methods: {
        validateTask: function() {
            const {task} = this
            if(
                task.title
                && task.description
                && task.percent_done) {
                this.returnTask(task)
            }

            this.errors = [];
            if(!task.title) {
                    this.errors.push({id: 0, message: 'Title required.'});
            }
            if(!task.description) {
                    this.errors.push({id: 1, message: 'Description required.'});
            }
            if(!task.percent_done) {
                    this.errors.push({id: 2, message: 'Percentage done is required.'});
            }
        },
        returnTask: function(task) {
            this.$emit('new-task', task)
            this.showDialog = false
        },
        resetComponent() {
            this.showDialog = false
            this.task.title = ''
            this.task.description = ''
            this.task.percent_done = 0
            this.errors = []
        },
    }
    
}
</script>
