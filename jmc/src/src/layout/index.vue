<template>
  <div :class="classObj" class="app-wrapper" @click="hideMore">
    <div v-if="device==='mobile'&&sidebar.opened" class="drawer-bg" @click="handleClickOutside" />
    <div :class="navbarObj">
      <navbar />
    </div>
    <div class="main-container" :class="{'open':!$store.state.app.header.opened}">
      <sidebar class="sidebar-container" />
      <app-main />
    </div>
  </div>
</template>

<script>
import { Navbar, Sidebar, AppMain } from './components'
import ResizeMixin from './mixin/ResizeHandler'

export default {
  name: 'Layout',
  components: {
    Navbar,
    Sidebar,
    AppMain
  },
  mixins: [ResizeMixin],
  computed: {
    header() {
      return this.$store.state.app.header
    },
    sidebar() {
      return this.$store.state.app.sidebar
    },
    device() {
      return this.$store.state.app.device
    },
    fixedHeader() {
      return this.$store.state.settings.fixedHeader
    },
    classObj() {
      return {
        hideSidebar: !this.sidebar.opened,
        openSidebar: this.sidebar.opened,
        withoutAnimation: this.sidebar.withoutAnimation,
        mobile: this.device === 'mobile',
        noSidebar: this.$route.meta.noSidebar
      }
    },
    navbarObj() {
      return {
        'fixed-header': this.$store.state.settings.fixedHeader,
        hideHeader: !this.header.opened,
        openHeader: this.header.opened
      }
    },
    siteId() {
      return this.$store.state.market.siteId // 需要监听的数据
    }
  },
  watch: {
    // 监听侧边栏站点选择的改变，重定向到营销的首页
    siteId(newVal, oldVal) {
      if (this.$route.path.includes('market')) {
        this.$router.push({ path: '/market/optimization/seo' })
      }
    }
  },
  methods: {
    handleClickOutside() {
      this.$store.dispatch('app/closeSideBar', { withoutAnimation: false })
    },
    // 隐藏更多列表
    hideMore() {
      this.$store.state.app.isHide = true
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "~@/styles/mixin.scss";
  @import "~@/styles/variables.scss";

  .app-wrapper {
    @include clearfix;
    position: relative;
    height: 100%;
    width: 100%;
    background-color: $mainBg;
    &.mobile.openSidebar{
      position: fixed;
      top: 0;
    }
  }
  .drawer-bg {
    background: #000;
    opacity: 0.3;
    width: 100%;
    top: 0;
    height: 100%;
    position: absolute;
    z-index: 999;
  }

  .fixed-header {
    position: fixed;
    top: 0;
    right: 0;
    z-index: 9;
    width: calc(100% - #{$sideBarWidth});
    transition: width 0.28s;
  }

  .hideSidebar .fixed-header {
    width: calc(100% - 54px)
  }

  .mobile .fixed-header {
    width: 100%;
  }
</style>
