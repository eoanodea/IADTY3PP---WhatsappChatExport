<!--
@Author: John Carlo M. Ramos
@Date:   2019-11-03T22:20:18+00:00
@Email:  !!!!!---CTRL + ALT + C = Colour Picker---!!!!!
@Last modified by:   John Carlo M. Ramos
@Last modified time: 2019-11-08T08:55:52+00:00
-->



<template>
    <div id="main">
        This is the about page: {{ msg }}
    </div>
</template>
<script>
  // import { MdButton } from 'vue-material/dist/components'

  // Vue.use(MdButton)
  export default {
    data() {
      return {
        msg: "NOT ENOUGH COFFEE!!!!!!"
      }
    },
    components: {
        //
    }
  }
</script>
