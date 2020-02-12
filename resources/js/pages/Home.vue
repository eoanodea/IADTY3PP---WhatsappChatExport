<!--
@Author: John Carlo M. Ramos
@Date:   2019-11-03T22:20:18+00:00
@Email:  !!!!!---CTRL + ALT + C = Colour Picker---!!!!!
@Last modified by:   John Carlo M. Ramos
@Last modified time: 2019-11-08T08:54:53+00:00
-->

<template>
    <div class="display-1" style="padding: 50px 0px;">
      Dashboard: <p v-if="user">{{msg}}, {{ user.first_name }}</p>

    </div>
</template>

<script>
  import Vue from 'vue'
  import axios from 'axios'
  import { mapGetters } from 'vuex'
  import User from './../components/user/User'
  import Service from './../components/service/Service'
  import ListTask from './../components/task/ListTask'
  import 'carbon-components/css/carbon-components.css';
  import CarbonComponentsVue from '@carbon/vue/src/index';
  import { Modal, DataTable, Loading } from 'carbon-components';

  Vue.use(CarbonComponentsVue);

  export default {
    data() {
      return {
        msg: 'Welcome'
      }
    },
    components: {
      User,
      Service,
      ListTask,
      Notification,
      Modal,
      DataTable, 
      Loading
    },
    computed: {
      ...mapGetters({
        user: 'auth/user'
      })
    }
  }
</script>
