<!--
@Author: John Carlo M. Ramos
@Date:   2019-11-07T18:31:22+00:00
@Email:  !!!!!---CTRL + ALT + C = Colour Picker---!!!!!
@Last modified by:   John Carlo M. Ramos
@Last modified time: 2019-11-07T18:37:21+00:00
-->
<template>
    <div class="container">
      <h4>Testing 123</h4>
    </div>

</template>
<script>
    import axios from 'axios';

    export default {
        data() {
            return {
                users: null
            }
        },
        mounted () {
            // axios.get('http://localhost:8000/api/user/all')
            // .then(response => (this.users = response.data))
        },
        methods: {
            addUser: function() {
                console.log("hello")
            }
        }

    }
</script>
<style>
    .header {
        display: flex;
        justify-content: space-between;
    }
    .userContainer {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        margin-bottom: 20px;
    }
    .item {
        width: 100%;
    }
    .item:nth-child(even) {
        background-color: #e6e6e67d;
    }
</style>
