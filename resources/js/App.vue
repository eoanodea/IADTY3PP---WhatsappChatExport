<!--
@Author: John Carlo M. Ramos
@Date:   2019-11-07T18:25:17+00:00
@Email:  !!!!!---CTRL + ALT + C = Colour Picker---!!!!!
@Last modified by:   John Carlo M. Ramos
@Last modified time: 2019-11-08T09:05:19+00:00
-->



<template>
 <div class="page-container">
    <md-app>
      <md-app-toolbar class="md-primary">
        <md-button class="md-icon-button" @click="menuVisible = !menuVisible">
          <md-icon>menu</md-icon>
        </md-button>
        <span class="md-title">My Title</span>
      </md-app-toolbar>

      <md-app-drawer :md-active.sync="menuVisible">
        <md-toolbar class="md-transparent" md-elevation="0">Navigation</md-toolbar>

        <md-list>
          <md-list-item>
            <md-icon>move_to_inbox</md-icon>
            <span class="md-list-item-text">Inbox</span>
          </md-list-item>

          <md-list-item>
            <md-icon>send</md-icon>
            <span class="md-list-item-text">Sent Mail</span>
          </md-list-item>

          <md-list-item>
            <md-icon>delete</md-icon>
            <span class="md-list-item-text">Trash</span>
          </md-list-item>

          <md-list-item>
            <md-icon>error</md-icon>
            <span class="md-list-item-text">Spam</span>
          </md-list-item>
        </md-list>
      </md-app-drawer>

      <md-app-content>
          <router-view></router-view>
    </md-app-content>
      
    </md-app>
    </div>
    
</template>
<script>
import Vue from 'vue';
  
  import NavBar from './components/NavBar'
import {MdButton, MdIcon, MdToolbar, MdList, MdDrawer, MdApp, MdContent} from 'vue-material/dist/components'

  Vue.use(MdButton);
  Vue.use(MdIcon);

  Vue.use(MdToolbar);
  Vue.use(MdList);
  Vue.use(MdDrawer);
  Vue.use(MdContent)
  Vue.use(MdApp);

  export default {
    data() {
      return {
        menuVisible: false
      }
    },
    components: {
      NavBar

    }
  }
</script>
<style lang="scss" scoped>
  // .md-app {

  //   border: 1px solid rgba(#000, .12);
  // }
  // .md-drawer {
  //   width: 230px;
  //   max-width: calc(100vw - 125px);
  // }
  </style>
