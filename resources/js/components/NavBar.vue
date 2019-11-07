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