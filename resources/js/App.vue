<template>
<div class="bx--grid">
  <div>
    <cv-header aria-label="Carbon header">
      <cv-skip-to-content to="/admin/home">
        Skip to Content
      </cv-skip-to-content>

      <!-- Logo -->

      <cv-header-name v-if="!user" to="/">
        <h4>CLIENTEL<span class="logoCol">IGENCE</span></h4>
      </cv-header-name>
      <cv-header-name v-else :to="user.is_admin ? '/admin/home' : '/home'">
        <h4>CLIENTEL<span class="logoCol">IGENCE</span></h4>
      </cv-header-name>
      

      <!-- Top Navigation bar -->
      <cv-header-nav aria-label="Carbon Nav" @click="menuVisible = !menuVisible" >
        
        <template v-if="authenticated">
          <!-- Admin Links -->
          <template v-if="user.is_admin">
            <!-- Dashboard -->
            <cv-header-menu-item to="/admin/home">
              Dashboard
            </cv-header-menu-item>

            <!-- Clients -->
            <cv-header-menu-item to="/admin/users" @click="click">
              Clients
            </cv-header-menu-item>

            <!-- Services -->
            <cv-header-menu-item to="/admin/services" @click="click">
              Services
            </cv-header-menu-item>

            <!-- Projects -->
            <cv-header-menu-item to="/admin/assignments" @click="click">
              Projects
            </cv-header-menu-item>

            <!-- Transactions -->
            <cv-header-menu-item to="/admin/transactions/" @click="click">
              Transactions
            </cv-header-menu-item>
          </template>
          <template v-else>
            <!-- Dashboard -->
            <cv-header-menu-item to="/home">
              Dashboard
            </cv-header-menu-item>
            <!-- Profile -->
            <cv-header-menu-item :to="'/admin/users/show/' + user.id">
              Profile
            </cv-header-menu-item>
          </template>

        </template>
        <template v-else>
          <!-- Sign In -->
          <cv-header-menu-item to="/" @click="click">
            Sign In
          </cv-header-menu-item>

          <!-- About -->
          <cv-header-menu-item to="/about" @click="click">
            About
          </cv-header-menu-item>
        </template>

      </cv-header-nav>

      <!-- Right Panel Config -->
      <template slot="header-global" @click="menuVisible = !menuVisible">
        <!-- Sign Out -->
        <cv-header-nav v-if="authenticated">
          <cv-header-menu-item @click="signOut">
            Sign Out
          </cv-header-menu-item>
        </cv-header-nav>
        
        <!-- App Switcher IBM Carbon Component -->
        <cv-header-global-action
          aria-label="App switcher"
          aria-controls="switcher-panel"
          @click="click">
          <AppSwitcher20 />
        </cv-header-global-action>
      </template>

      <!-- Right Panel Contents -->
      <template slot="right-panels" @click="menuVisible = !menuVisible">
        <cv-header-panel class="" id="switcher-panel">
          <cv-switcher>
            <template v-if="authenticated">
            <!-- Message for User -->
            <cv-header-name>
              Good day, {{user.first_name}}
            </cv-header-name>

            <!-- Admin Links -->
            <template v-if="user.is_admin">
              <!-- Dashboard -->
              <cv-switcher-item>
                <cv-switcher-item-link to="/admin/home" @click="click">
                  Dashboard
                </cv-switcher-item-link>
              </cv-switcher-item>

              <!-- Clients -->
              <cv-switcher-item>
                <cv-switcher-item-link to="/admin/users" @click="click">
                  Clients
                </cv-switcher-item-link>
              </cv-switcher-item>

              <!-- Services -->
              <cv-switcher-item>
                <cv-switcher-item-link to="/admin/services" @click="click">
                  Services
                </cv-switcher-item-link>
              </cv-switcher-item>

              <!-- Projects -->
              <cv-switcher-item>
                <cv-switcher-item-link to="/admin/assignments" v-on:click="click">
                  Projects
                </cv-switcher-item-link>
              </cv-switcher-item>

              <!-- Transactions -->
              <cv-switcher-item>
                <cv-switcher-item-link to="/admin/transactions" v-on:click="click">
                  Transactions
                </cv-switcher-item-link>
              </cv-switcher-item>
            </template>
            <!-- Client Pages -->
            <template v-else>
              <!-- Dashboard -->
              <cv-switcher-item>
                <cv-switcher-item-link to="/home" @click="click">
                  Dashboard
                </cv-switcher-item-link>
              </cv-switcher-item>
              <cv-switcher-item>
                <cv-switcher-item-link :to="'/admin/users/show/' + user.id" @click="click">
                  Profile
                </cv-switcher-item-link>
              </cv-switcher-item>
            </template>
            <!-- Sign Out -->
            <cv-switcher-item>
              <cv-switcher-item-link href="javascript:void(0)" @click="signOut">
                Sign Out
              </cv-switcher-item-link>
            </cv-switcher-item>

            </template>
            <template v-else>
              <!-- Sign In -->
              <cv-switcher-item>
                <cv-switcher-item-link to="/" @click="click">
                  Sign In
                </cv-switcher-item-link>
              </cv-switcher-item>
              
              <!-- About -->
              <cv-switcher-item>
                <cv-switcher-item-link to="/about" @click="click">
                  About
                </cv-switcher-item-link>
              </cv-switcher-item>
            </template>

          </cv-switcher>
        </cv-header-panel>
      </template>
    </cv-header>
    
    <div class="router-container">
      <transition :name="transitionName" mode="out-in">
        <router-view></router-view>
      </transition>
    </div>
  </div>
</div>
</template>
<script>
  import { mapGetters } from 'vuex'
  import Vue from 'vue';
  import { mapActions } from 'vuex'

  import AppSwitcher20 from '@carbon/icons-vue/es/app-switcher/20';

  const DEFAULT_TRANSITION = 'fade';

  export default {
    data() {
      return {
        menuVisible: true,
        transitionName: DEFAULT_TRANSITION,
        isAdmin: false
      }
    },
    components: {
      AppSwitcher20
    },
    computed: {
      ...mapGetters({
          authenticated: 'auth/authenticated',
          user: 'auth/user'
      }),
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
    },
    /**
     * Watch Router for changes
     * On Update, check if to route index
     * if greater than from route index
     * if so, slide left, else slide right
     */
    watch: {
      user: function(newVal, oldVal) {
        console.log('new val!', newVal)
        if(newVal && newVal.is_admin) this.isAdmin = true
        else this.isAdmin = false
      },
      '$route' (to, from, options) {
        const routes = this.$router.options.routes
        let toIndex
        let fromIndex

        routes.map((dat, i) => {
          if(dat.name === to.name) toIndex = i
          if(dat.name === from.name) fromIndex = i
        })

        this.transitionName = toIndex < fromIndex ? 'slide-right' : 'slide-left'
      }
    }
  }
</script>

<style lang="scss" scoped>
  .router-container {
    margin: 80px 0;
  }
  .slide-left-enter-active,
  .slide-left-leave-active,
  .slide-right-enter-active,
  .slide-right-leave-active {
    transition-duration: 0.5s;
    transition-property: height, opacity, transform;
    transition-timing-function: cubic-bezier(0.55, 0, 0.1, 1);
    overflow: hidden;
  }
  .slide-left-enter,
  .slide-right-leave-active {
    opacity: 0;
    transform: translate(5em, 0);
  }

  .slide-left-leave-active,
  .slide-right-enter {
    opacity: 0;
    transform: translate(-5em, 0);
  }
</style>