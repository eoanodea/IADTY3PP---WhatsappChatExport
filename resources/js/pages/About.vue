<template>
    <div id="main">
        This is the about page {{ msg }}
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