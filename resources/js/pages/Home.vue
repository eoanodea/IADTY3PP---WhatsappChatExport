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
  import { mapGetters } from 'vuex'

  export default {
    data() {
      return {
        msg: 'Welcome'
      }
    },
    components: {
      //
    },
    computed: {
      ...mapGetters({
        user: 'auth/user'
      })
    }
  }
</script>
