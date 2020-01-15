<!--
@Author: John Carlo M. Ramos
@Date:   2019-11-07T18:25:17+00:00
@Email:  !!!!!---CTRL + ALT + C = Colour Picker---!!!!!
@Last modified by:   John Carlo M. Ramos
@Last modified time: 2019-11-08T09:05:19+00:00
-->

<template>
 <div class="page-container">
    <md-app md-waterfall md-mode="fixed" class="app-container">
      <md-app-toolbar class="md-primary space-between">
        <router-link to="/">
          <span class="md-title">LOGO</span>
        </router-link>
        <md-button class="md-icon-button" @click="menuVisible = !menuVisible" v-if="authenticated">
          <md-icon>menu</md-icon>
        </md-button>
        </md-app-toolbar>
        <md-app-drawer :md-active.sync="menuVisible" v-if="authenticated">
          <md-toolbar class="md-transparent" md-elevation="0">Good day, {{user.first_name}}</md-toolbar>
          <NavBar ref="navBarRef" v-on:menu-visible="menuVisible = !menuVisible" />
        </md-app-drawer>
      
      <md-app-content>
          <router-view></router-view>
      </md-app-content>
    </md-app>
  </div>
</template>
<script>
  import { mapGetters } from 'vuex'
  import Vue from 'vue';
  import NavBar from './components/NavBar.vue'
  import {MdApp, MdContent, MdButton, MdToolbar, MdDrawer} from 'vue-material/dist/components'

  Vue.use(MdContent);
  Vue.use(MdApp);
  Vue.use(MdToolbar);
  Vue.use(MdButton);
  Vue.use(MdDrawer);

  export default {
    data() {
      return {
        menuVisible: false
      }
    },
    components: {
      NavBar
    },
    computed: {
      ...mapGetters({
          authenticated: 'auth/authenticated',
          user: 'auth/user'
      })
    },
    methods: {
      click: function() {
        this.menuVisible = !this.menuVisible
      }
    }
  }
</script>
