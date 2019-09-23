<template>
  <div :class="{'has-logo':showLogo}">
    <logo v-if="showLogo" :collapse="isCollapse" />
    <el-scrollbar wrap-class="scrollbar-wrapper">
      <el-menu
        :default-active="activeMenu"
        :collapse="isCollapse"
        :background-color="variables.menuBg"
        :text-color="variables.menuText"
        :unique-opened="false"
        :active-text-color="variables.menuActiveText"
        :collapse-transition="false"
        mode="vertical"
      >
        <div v-if="showSite" class="dropdown-content">
          <el-dropdown @command="siteChange">
            <div class="el-dropdown-link">
              <span v-if="!isCollapse" class="dropdown-lable">{{ viewSite || currentSite }}</span>
              <i class="el-icon-caret-bottom el-icon--right" />
            </div>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item v-for="(item, index) in allSiteData" :key="index" :command="item">{{ item.site }}</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
        <sidebar-item v-for="route in routes" :key="route.path" :item="route" :base-path="`${root[0].path}/${route.path}`" />
      </el-menu>
    </el-scrollbar>
    <div class="setting">
      <div class="setting-item">
        <!-- <el-tooltip class="item" effect="dark" content="setting" placement="top" :disabled="$store.state.app.sidebar.opened">
          <div>
            <svg-icon icon-class="form" />
            <span>setting</span>
          </div>
        </el-tooltip> -->
        <el-menu
          :default-active="activeMenu"
          :collapse="isCollapse"
          :background-color="variables.menuBg"
          :text-color="variables.menuText"
          :unique-opened="false"
          :active-text-color="variables.menuActiveText"
          :collapse-transition="false"
          mode="vertical"
        >
          <div class="menu-wrapper">
            <el-menu-item index="0">
              <item icon="shezhi" title="设置" />
            </el-menu-item>
          </div>
        </el-menu>
      </div>
      <hamburger :is-active="sidebar.opened" class="hamburger-container" @toggleClick="toggleSideBar" />
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Logo from './Logo'
import SidebarItem from './SidebarItem'
import variables from '@/styles/variables.scss'
import Hamburger from '@/components/Hamburger'
import Item from './Item'

export default {
  components: { SidebarItem, Logo, Hamburger, Item },
  data() {
    return {
      viewSite: null
    }
  },
  computed: {
    ...mapGetters([
      'sidebar'
    ]),
    root() {
      return this.$router.options.routes.filter(item => item.path === this.$route.matched[0].path)
    },
    routes() {
      return this.root[0].children
    },
    activeMenu() {
      const route = this.$route
      const { meta, path } = route
      // if set path, the sidebar will highlight the path you set
      if (meta.activeMenu) {
        return meta.activeMenu
      }
      return path
    },
    showLogo() {
      return this.$store.state.settings.sidebarLogo
    },
    variables() {
      return variables
    },
    isCollapse() {
      return !this.sidebar.opened
    },
    showSite() {
      return this.$store.state.app.showSite
    },
    allSiteData() {
      return this.$store.state.market.allSite
    },
    currentSite: {
      get() {
        return this.allSiteData.filter(val => val.default)[0].site
      },
      set(newValue) {
        this.viewSite = newValue
      }
    }
  },
  methods: {
    toggleSideBar() {
      this.$store.dispatch('app/toggleSideBar')
    },
    siteChange(val) {
      this.currentSite = val.site
      this.$store.dispatch('market/setSite', val)
    }
  }
}
</script>
<style lang="scss" scoped>
.setting{
  font-size: 14px;
  width: 100%;
  height: 90px;
  position: fixed;
  bottom: 0;
  left: 0;
  .setting-item{
    height: 45px;
    line-height: 45px;
    white-space: nowrap;
    cursor: pointer;
    // svg{
    //   width: 1em;
    //   height: 1em;
    //   vertical-align: -0.15em;
    //   fill: currentColor;
    //   overflow: hidden;
    // }
  }
  .hamburger-container {
    height: 50%;
    line-height: 45px;
    cursor: pointer;
    transition: background .3s;
    -webkit-tap-highlight-color:transparent;
    position: absolute;
    right: 15px;
    width: 24px;
    padding: 0 !important;
    &:hover {
      background: rgba(0, 0, 0, .025)
    }
  }
}
.dropdown-content {
  height: 38px;
  line-height: 38px;
  padding-left: 20px;
  .el-dropdown-link {
    display: flex;
    align-items: center;
    cursor: pointer;
    .dropdown-lable {
      display: block;
      width: 140px;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      font-size: 13px;
      color: #606FC7;
    }
  }
}
</style>
