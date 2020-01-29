<template>
<div class="bx--grid">
  <div class="bx--row">
    <cv-header aria-label="Carbon header">
      <cv-skip-to-content to="/admin/home">
        Skip to Content
      </cv-skip-to-content>

      <!-- Logo -->
      <cv-header-name to="/admin/home" prefix="CLIENTELIGENCE">
        <router-link to="/admin/home">
        </router-link>
      </cv-header-name>

      <!-- Dashboard -->
      <cv-header-nav aria-label="Carbon Nav" @click="menuVisible = !menuVisible" v-if="authenticated">
        <cv-header-menu-item to="/admin/home">
          Dashboard
        </cv-header-menu-item>

        <!-- Clients -->
        <cv-header-menu-item to="/admin/users" @click="$emit('menu-visible')">
          Clients
        </cv-header-menu-item>

        <!-- Services -->
        <cv-header-menu-item to="/admin/services" @click="$emit('menu-visible')">
          Services
        </cv-header-menu-item>

        <!-- Projects -->
        <cv-header-menu-item to="/admin/assignments" @click="$emit('menu-visible')">
          Projects
        </cv-header-menu-item>

        <!-- About -->
        <cv-header-menu-item to="/admin/about" @click="$emit('menu-visible')">
          About
        </cv-header-menu-item>      
      </cv-header-nav>

      <!-- Right Panel Config -->
      <template slot="header-global" @click="menuVisible = !menuVisible" v-if="authenticated">
        <!-- Sign Out -->
        <cv-header-nav>
          <cv-header-menu-item @click="signOut">
            Sign Out
          </cv-header-menu-item>
        </cv-header-nav>
        
        <!-- App Switcher IBM Carbon Component -->
        <cv-header-global-action
          aria-label="App switcher"
          aria-controls="switcher-panel"
          @click="actionAppSwitcher">
          <AppSwitcher20 />
        </cv-header-global-action>
      </template>

      <!-- Right Panel Contents -->
      <template slot="right-panels" @click="menuVisible = !menuVisible" v-if="authenticated">
        <cv-header-panel class="" id="switcher-panel">
          <cv-switcher>
            <!-- Message for User -->
            <cv-header-name>
              Good day, {{user.first_name}}
            </cv-header-name>

            <!-- Dashboard -->
            <cv-switcher-item>
              <cv-switcher-item-link to="/admin/home" @click="$emit('menu-visible')">
                Dashboard
              </cv-switcher-item-link>
            </cv-switcher-item>

            <!-- Clients -->
            <cv-switcher-item>
              <cv-switcher-item-link to="/admin/users" @click="$emit('menu-visible')">
                Clients
              </cv-switcher-item-link>
            </cv-switcher-item>

            <!-- Services -->
            <cv-switcher-item>
              <cv-switcher-item-link to="/admin/services" @click="$emit('menu-visible')">
                Services
              </cv-switcher-item-link>
            </cv-switcher-item>

            <!-- Projects -->
            <cv-switcher-item>
              <cv-switcher-item-link to="/admin/assignments" @click="$emit('menu-visible')">
                Projects
              </cv-switcher-item-link>
            </cv-switcher-item>

            <!-- About -->
            <cv-switcher-item>
              <cv-switcher-item-link to="/admin/about" @click="$emit('menu-visible')">
                About
              </cv-switcher-item-link>
            </cv-switcher-item>

            <!-- Sign Out -->
            <cv-switcher-item>
              <cv-switcher-item-link @click="signOut">
                Sign Out
              </cv-switcher-item-link>
            </cv-switcher-item>
          </cv-switcher>
        </cv-header-panel>
      </template>
    </cv-header>
    
    <!-- <div class="bx--row"> -->
      <router-view class="" style="padding: 60px;"></router-view>
    <!-- </div> -->
  </div>
</div>
</template>
<script>
  import { mapGetters } from 'vuex'
  import Vue from 'vue';
  import 'carbon-components/css/carbon-components.css';
  import CarbonComponentsVue from '@carbon/vue/src/index';
  Vue.use(CarbonComponentsVue);
  import NavBar from './components/NavBar.vue'
  import { mapActions } from 'vuex'

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

  export default {
    data() {
      return {
        menuVisible: true,
      }
    },
    components: {
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
        return true;
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
        // this.doActionSwitcher();
        this.menuVisible = true;
      },
    },
    mounted() {
      // this.doActionSwitcher = () => ;
    }
  }
</script>
