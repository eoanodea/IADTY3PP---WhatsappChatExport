<template>
    <div id="main">
        This is the Home page {{ msg }}


        <passport-clients></passport-clients>
        <passport-authorized-clients></passport-authorized-clients>
        <passport-personal-access-tokens></passport-personal-access-tokens>


    </div>
</template>
<script>
  // import { MdButton } from 'vue-material/dist/components'
  
  // Vue.use(MdButton)
  export default {
    data() {
      return {
        msg: "Hi"
      }
    },
    components: {
        //
    }
  }
</script>
