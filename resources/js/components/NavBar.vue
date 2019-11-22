<!--
@Author: John Carlo M. Ramos
@Date:   2019-11-07T18:25:17+00:00
@Email:  !!!!!---CTRL + ALT + C = Colour Picker---!!!!!
@Last modified by:   John Carlo M. Ramos
@Last modified time: 2019-11-07T18:35:54+00:00
-->



<template>
  <md-list>
    <md-list-item to="/admin/home" @click="$emit('menu-visible')">
        <md-icon class="md-accent">home</md-icon>
        <span class="md-list-item-text">Home</span>
    </md-list-item>
    <md-list-item to="/admin/users" @click="$emit('menu-visible')">
      <md-icon class="md-accent">people</md-icon>
      <span class="md-list-item-text">Users</span>
    </md-list-item>
    <md-list-item to="/admin/about" @click="$emit('menu-visible')">
      <md-icon class="md-accent">send</md-icon>
      <span class="md-list-item-text">About</span>
    </md-list-item>
    <md-list-item to="/admin/services" @click="$emit('menu-visible')">
      <md-icon class="md-accent">assignment</md-icon>
      <span class="md-list-item-text">Services</span>
    </md-list-item>
  </md-list>
</template>
<script>
  import Vue from 'vue';
  import {MdApp, MdButton, MdIcon, MdToolbar, MdList, MdDrawer} from 'vue-material/dist/components'

  Vue.use(MdButton);
  Vue.use(MdIcon);
  Vue.use(MdToolbar);
  Vue.use(MdList);
  Vue.use(MdDrawer);
  Vue.use(MdApp);



  export default {
    data: () => ({
      menuVisible: false
    })
  }
</script>
<style lang="scss" scoped>

</style>
