<template>
    <div id="main">
        <NavBar></NavBar>
        <!-- <nav-bar></nav-bar> -->
        <header id="header">
            <h1>
                Vue JS Component
            </h1>
        </header>
        <div id="content">
            <router-view></router-view>
        </div>
    </div>
</template>
<script>
  // import { MdButton } from 'vue-material/dist/components'
  import NavBar from './components/NavBar'
  // Vue.use(MdButton)
  export default {
    data() {
      return {
        //
      }
    },
    components: {
      NavBar
        
    }
  }
</script>