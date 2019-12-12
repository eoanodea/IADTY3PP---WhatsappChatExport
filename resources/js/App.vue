<!--
@Author: John Carlo M. Ramos
@Date:   2019-11-07T18:25:17+00:00
@Email:  !!!!!---CTRL + ALT + C = Colour Picker---!!!!!
@Last modified by:   John Carlo M. Ramos
@Last modified time: 2019-11-08T09:05:19+00:00
-->

<template>
 <div class="page-container">
    <md-app class="app-container">
      <md-app-toolbar class="md-primary">
        <md-button class="md-icon-button" @click="menuVisible = !menuVisible">
          <md-icon>menu</md-icon>
        </md-button>
        <router-link to="/admin/home">
          <span class="md-title">LOGO</span>
        </router-link>
      </md-app-toolbar>
      <md-app-drawer :md-active.sync="menuVisible">
        <md-toolbar class="md-transparent" md-elevation="0">Good day, User.</md-toolbar>
        <NavBar ref="navBarRef" v-on:menu-visible="menuVisible = !menuVisible" />
      </md-app-drawer>
      <md-app-content>
          <router-view></router-view>
      </md-app-content>
    </md-app>
  </div>
</template>
<script>
  import Vue from 'vue';
  import NavBar from './components/NavBar.vue'
  import {MdApp, MdContent, MdButton, MdToolbar} from 'vue-material/dist/components'

  Vue.use(MdContent);
  Vue.use(MdApp);
  Vue.use(MdToolbar);
  Vue.use(MdButton);



  export default {
    data() {
      return {
        menuVisible: false
      }
    },
    components: {
      NavBar
    },
    methods: {
      click: function() {
        this.menuVisible = !this.menuVisible
      }
    }
  }
</script>
<style lang="scss">
  @import "~vue-material/dist/theme/engine";
  .app-container {
    height: 1000px;
  }
  @include md-register-theme("default", (
    // primaryLight: #4e4e4e,
    primary: #262626,
    textPrimary: #fff,
    // primaryDark: #000000,
    // primaryContrast: #ffffff,
    // secondaryLight: #5fffb3,
    accent: #00cc83,
    // accentDark: #009a56,
    // accentContrast: #000000,
    theme: dark // This can be dark or light
  ));
  @import "~vue-material/dist/theme/all";
  </style>
