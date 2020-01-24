<template>
<div class="bx--grid">
  <div class="bx--row">
    <cv-header aria-label="Carbon header">
      <cv-skip-to-content to="/admin/home">
        Skip to Content
      </cv-skip-to-content>

      <cv-header-name to="/admin/home" prefix="CLIENTELIGENCE">
        <router-link to="/admin/home">
        </router-link>
      </cv-header-name>

      <cv-header-nav aria-label="Carbon Nav" @click="menuVisible = !menuVisible" v-if="authenticated">
        <cv-header-menu-item to="/admin/home">
          Dashboard
        </cv-header-menu-item>

        <cv-header-menu-item to="/admin/users" @click="$emit('menu-visible')">
          Clients
        </cv-header-menu-item>

        <cv-header-menu-item to="/admin/services" @click="$emit('menu-visible')">
          Services
        </cv-header-menu-item>

        <cv-header-menu-item to="/admin/assignments" @click="$emit('menu-visible')">
          Projects
        </cv-header-menu-item>

        <cv-header-menu-item to="/admin/about" @click="$emit('menu-visible')">
          About
        </cv-header-menu-item>      
      </cv-header-nav>

      <template slot="header-global" @click="menuVisible = !menuVisible" v-if="authenticated">
        <cv-header-nav>
          <cv-header-menu-item @click="signOut">
            Sign Out
          </cv-header-menu-item>
        </cv-header-nav>
        
        <cv-header-global-action
          aria-label="App switcher"
          aria-controls="switcher-panel"
          @click="actionAppSwitcher">
          <AppSwitcher20 />
        </cv-header-global-action>
      </template>

      <template slot="right-panels" @click="menuVisible = !menuVisible" v-if="areRightPanels && authenticated">
        <cv-header-panel class="" id="switcher-panel">
          <cv-header-name>
            Good day, {{user.first_name}}
          </cv-header-name>

          <cv-switcher>
            <cv-switcher-item>
              <cv-switcher-item-link to="/admin/home" @click="$emit('menu-visible')">
                <!-- <NavBar ref="navBarRef" v-on:menu-visible="menuVisible = !menuVisible" /> -->
                Dashboard
              </cv-switcher-item-link>
            </cv-switcher-item>

            <cv-switcher-item>
              <cv-switcher-item-link to="/admin/users" @click="$emit('menu-visible')">
                Clients
              </cv-switcher-item-link>
            </cv-switcher-item>
            <cv-switcher-item>

              <cv-switcher-item-link to="/admin/services" @click="$emit('menu-visible')">
                Services
              </cv-switcher-item-link>
            </cv-switcher-item>

            <cv-switcher-item>
              <cv-switcher-item-link to="/admin/assignments" @click="$emit('menu-visible')">
                Projects
              </cv-switcher-item-link>
            </cv-switcher-item>

            <cv-switcher-item>
              <cv-switcher-item-link to="/admin/about" @click="$emit('menu-visible')">
                About
              </cv-switcher-item-link>
            </cv-switcher-item>

            <cv-switcher-item>
              <cv-switcher-item-link @click="signOut">
                Sign Out
              </cv-switcher-item-link>
            </cv-switcher-item>
          </cv-switcher>
        </cv-header-panel>
      </template>
    </cv-header>
    
    <div class="bx--row">
      <router-view class="bx--col-lg-16"></router-view>
    </div>
  </div>
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
  import { mapActions } from 'vuex' 
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
import AppSwitcher20 from '@carbon/icons-vue/es/app-switcher/20';

// Vue.use(CvHeader);
// Vue.use(CvHeaderGlobalAction);
// Vue.use(CvHeaderMenu);
// Vue.use(CvHeaderMenuButton);
// Vue.use(CvHeaderMenuItem);
// Vue.use(CvHeaderName);
// Vue.use(CvHeaderNav);
// Vue.use(CvHeaderPanel);
// Vue.use(CvSideNav);
// Vue.use(CvSideNavItems);
// Vue.use(CvSideNavLink);
// Vue.use(CvSideNavMenu);
// Vue.use(CvSideNavMenuItem);
// Vue.use(CvSkipToContent);
// Vue.use(CvSwitcher);
// Vue.use(CvSwitcherItem);
// Vue.use(CvSwitcherItemLink);
// Vue.use(CvHeaderSideNavItems);
// Vue.use(AppSwitcher20);

  export default {
    data() {
      return {
        menuVisible: false,
      }
    },
    components: {
      // NavBar,
      CvHeader,
      CvHeaderPanel,
      CvHeaderName,
      CvHeaderNav,
      CvHeaderSideNavItems,
      CvHeaderGlobalAction,
      CvHeaderMenu,
      CvHeaderMenuItem,
      CvHeaderMenuButton,
      CvSideNav,
      CvSideNavLink,
      CvSideNavMenu,
      CvSideNavItems,
      CvSideNavMenuItem,
      CvSkipToContent,
      CvSwitcher,
      CvSwitcherItem,
      CvSwitcherItemLink,
      AppSwitcher20
    },
    computed: {
      ...mapGetters({
          authenticated: 'auth/authenticated',
          user: 'auth/user'
      }),
      areRightPanels() {
        // return settings.group.rightPanels.length > 0;
      },
    },
    methods: {
      click: function() {
        this.menuVisible = !this.menuVisible
      },
      ...mapActions({
        signOutAction: 'auth/signOut'
      }),
      signOut() {
        this.signOutAction().then(() => {
          this.$emit('menu-visible')
          this.$router.replace({
            name: 'signin'
          })
        })
      },
      actionAppSwitcher() {
        this.doActionSwitcher();
      },
    },
    mounted() {
      this.doActionSwitcher = () => action('Notifications - click');
    }
  }
</script>
