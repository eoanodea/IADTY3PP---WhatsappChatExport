<!--
@Author: John Carlo M. Ramos
@Date:   2019-11-07T18:25:17+00:00
@Email:  !!!!!---CTRL + ALT + C = Colour Picker---!!!!!
@Last modified by:   John Carlo M. Ramos
@Last modified time: 2019-11-07T18:35:54+00:00
-->



<template>
    <div id="main">
      <p>hello nav bar</p>
        <router-link to="/admin/home">
            <md-button class="md-primary">
              Home
            </md-button>
            </router-link>
            <router-link to="/admin/about">
            <md-button class="md-primary">
             About
            </md-button>
            </router-link>
            <router-link to="/admin/users">
            <md-button class="md-primary">
              Users
            </md-button>
            </router-link>
            <router-link to="/admin/services">
            <md-button class="md-primary">
              Services
            </md-button>
            </router-link>
    </div>
</template>
<script>
  import MdButton from 'vue-material/dist/components'

  // Vue.use(MdButton)
  export default {
    data() {
      return {
        //
      }
    },
    components: {
        MdButton
    }
  }
</script>
