<!--
@Author: John Carlo M. Ramos
@Date:   2019-11-07T18:25:17+00:00
@Email:  !!!!!---CTRL + ALT + C = Colour Picker---!!!!!
@Last modified by:   John Carlo M. Ramos
@Last modified time: 2019-11-08T09:05:19+00:00
-->



<template>
    <div id="main">
        <NavBar></NavBar>
        <!-- <nav-bar></nav-bar> -->
        <header id="header">
            <h1>
                Cloud-Based Freelancer/Client Management System 
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
