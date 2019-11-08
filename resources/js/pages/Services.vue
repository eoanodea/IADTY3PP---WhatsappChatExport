<!--
@Author: John Carlo M. Ramos
@Date:   2019-11-07T18:31:22+00:00
@Email:  !!!!!---CTRL + ALT + C = Colour Picker---!!!!!
@Last modified by:   John Carlo M. Ramos
@Last modified time: 2019-11-08T11:33:47+00:00
-->
<template>
    <div class="container">
      <!-- <h4>Testing 123</h4> -->
      <ListServices></ListServices>
    </div>

</template>
<script>
    import axios from 'axios';
    import ListServices from './../components/service/ListServices';

    export default {
        data() {
            return {
                services: null
            }
        },
        mounted () {
            // axios.get('http://localhost:8000/api/service/all')
            // .then(response => (this.services = response.data))
        },
        methods: {
            addService: function() {
                console.log("hello")
            }
        },
        components: {
          ListServices
        }

    }
</script>
<style>
    .header {
        display: flex;
        justify-content: space-between;
    }
    .serviceContainer {
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
