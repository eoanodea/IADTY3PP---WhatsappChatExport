<template>
<div>
<cv-header aria-label="Carbon header">
  <cv-skip-to-content href="/admin/home">
    Skip to Content
  </cv-skip-to-content>
  <cv-header-name href="/admin/home" prefix="CLIENTELIGENCE">
    <router-link to="/admin/home">
    </router-link>
  </cv-header-name>
  <template slot="header-global">
    <cv-header-global-action
      aria-label="App switcher"
      aria-controls="switcher-panel"
      @click="actionAppSwitcher">
      <AppSwitcher20 />
    </cv-header-global-action>
  </template>
  <template slot="right-panels" @click="menuVisible = !menuVisible" v-if="areRightPanels && authenticated">
    <cv-header-panel class="" id="user-panel">
      <cv-switcher>
        <cv-switcher-item>
          <cv-switcher-item-link>
            <cv-header-name>
              Good day, {{user.first_name}}
            </cv-header-name>
            <NavBar ref="navBarRef" v-on:menu-visible="menuVisible = !menuVisible" />
          </cv-switcher-item-link>
        </cv-switcher-item>
      </cv-switcher>
    </cv-header-panel>
  </template>
</cv-header>
<router-view style="margin-top:300px;"></router-view>
</div>
 <!-- <div class="page-container">
    <md-app md-waterfall md-mode="fixed" class="app-container">
      <md-app-toolbar class="md-primary space-between">
        <router-link to="/admin/home">
          <span class="md-title">LOGO</span>
        </router-link>
        <md-button class="md-icon-button" @click="menuVisible = !menuVisible" v-if="authenticated">
          <md-icon>menu</md-icon>
        </md-button>
        </md-app-toolbar>
        <md-app-drawer md-right md-persistent="full" :md-active.sync="menuVisible">
          <md-toolbar class="md-transparent" md-elevation="0">Good day, {{user.first_name}}</md-toolbar>
          <NavBar ref="navBarRef" v-on:menu-visible="menuVisible = !menuVisible" />
        </md-app-drawer>
      
      <md-app-content>
          <router-view></router-view>
      </md-app-content>
    </md-app>
  </div> -->
</template>
<script>
  import { mapGetters } from 'vuex'
  import Vue from 'vue';
  import 'carbon-components/css/carbon-components.css';
  import CarbonComponentsVue from '@carbon/vue/src/index';
  Vue.use(CarbonComponentsVue);
  import NavBar from './components/NavBar.vue'
  // import {MdApp, MdContent, MdButton, MdToolbar, MdDrawer} from 'vue-material/dist/components'

  // Vue.use(MdContent);
  // Vue.use(MdApp);
  // Vue.use(MdToolbar);
  // Vue.use(MdButton);
  // Vue.use(MdDrawer);

  import {
  CvHeader,
  CvHeaderGlobalAction,
  CvHeaderMenu,
  CvHeaderMenuButton,
  CvHeaderMenuItem,
  CvHeaderName,
  CvHeaderNav,
  CvHeaderPanel,
  CvSideNav,
  CvSideNavItems,
  CvSideNavLink,
  CvSideNavMenu,
  CvSideNavMenuItem,
  CvSkipToContent,
  CvSwitcher,
  CvSwitcherItem,
  CvSwitcherItemLink,
  CvHeaderSideNavItems,
} from '@carbon/vue/src';

Vue.use(CvHeader);
Vue.use(CvHeaderGlobalAction);
Vue.use(CvHeaderMenu);
Vue.use(CvHeaderMenuButton);
Vue.use(CvHeaderMenuItem);
Vue.use(CvHeaderName);
Vue.use(CvHeaderNav);
Vue.use(CvHeaderPanel);
Vue.use(CvSideNav);
Vue.use(CvSideNavItems);
Vue.use(CvSideNavLink);
Vue.use(CvSideNavMenu);
Vue.use(CvSideNavMenuItem);
Vue.use(CvSkipToContent);
Vue.use(CvSwitcher);
Vue.use(CvSwitcherItem);
Vue.use(CvSwitcherItemLink);
Vue.use(CvHeaderSideNavItems);

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
