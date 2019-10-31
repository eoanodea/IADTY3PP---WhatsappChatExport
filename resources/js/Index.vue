<template>
    <div id="main">
        <header id="header">
            <h1>
                Vue JS Component
            </h1>
        </header>
        <div id="content">
            Some content
            <md-button class="md-primary">
              Button!
            </md-button>
        </div>
    </div>
</template>
<script>
  import { MdButton } from 'vue-material/dist/components'
  
  Vue.use(MdButton)
  export default {
    data() {
      return {
        //
      }
    },
    components: {
        //
    }
  }
</script>