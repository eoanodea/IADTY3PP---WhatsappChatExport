<!--
@Author: John Carlo M. Ramos
@Date:   2019-11-07T18:25:17+00:00
@Email:  !!!!!---CTRL + ALT + C = Colour Picker---!!!!!
@Last modified by:   John Carlo M. Ramos
@Last modified time: 2019-11-07T18:35:54+00:00
-->



<template>
    <div>
      <md-app-toolbar class="md-primary">
          <md-button class="md-dense md-raised md-primary">
              Services
            </md-button>
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
        </md-list>
    </md-app-drawer>
    </div>
  

    <!-- <div id="main">
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
            <router-link to="/admin/services">
            <md-button class="md-dense md-raised md-primary">
              Services
            </md-button>
            </router-link>
    </div> -->
</template>
<script>
  import Vue from 'vue';
  import {MdButton, MdIcon, MdAppToolBar, MdList, MdDrawer} from 'vue-material/dist/components'

  Vue.use(MdButton);
  Vue.use(MdIcon);
  // Vue.use(MdAppToolBar);
  Vue.use(MdList);
  Vue.use(MdDrawer);

  export default {
    data: () => ({
      menuVisible: false
    })
  }
</script>
<style lang="scss" scoped>
  // .md-app {
  //   max-height: 400px;
  //   border: 1px solid rgba(#000, .12);
  // }

   // Demo purposes only
  .md-drawer {
    width: 230px;
    max-width: calc(100vw - 125px);
  }
</style>
