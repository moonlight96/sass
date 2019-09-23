<template>
  <div class="navbar1">
    <div class="logo">
      <div class="logo_container">
        <a href="/" widget-action="logo">
          <img src="https://img2228.weyesns.com/uploads/www.weyes.cn/images/15603013675277.png?imageView2/2/w/1920/h/160/q/90" alt="聚焦网络">
        </a>
      </div>
    </div>
    <!-- <hamburger :is-active="sidebar.opened" class="hamburger-container" @toggleClick="toggleSideBar" /> -->
    <!-- <breadcrumb class="breadcrumb-container" /> -->
    <div class="nav_menu">
      <ul class="phone-hide">
        <li v-for="(item, index) in nav" :key="index" class="nav-item" :class="{'active': item.path === $route.matched[0].path}" @click="navItemClick(item)">
          <router-link v-if="index < nav.length - navHideNum" href="javascript:;" :to="{ path: item.path} ">
            <svg-icon :icon-class="item.meta.icon" />
            <span>{{ item.meta.title }}</span>
          </router-link>
        </li>
      </ul>
      <div v-if="navHideNum > 0" class="phone-show-menu">
        <div @click.stop="showMore">
          <div class="more">
            <svg-icon icon-class="form" />
            <span>更多</span>
          </div>
          <i class="el-icon-arrow-down" />
        </div>
        <ul class="nav_list" :class="{'isHide': $store.state.app.isHide}">
          <li v-for="(item, index) in nav" :key="index" class="nav-item" :class="{'active': item.path === $route.matched[0].path}">
            <router-link v-if="index >= nav.length - navHideNum" href="javascript:;" :to="{ path: item.path }">
              <svg-icon :icon-class="item.meta.icon" />
              <span>{{ item.meta.title }}</span>
            </router-link>
          </li>
        </ul>
      </div>
    </div>
    <div class="right-menu">
      <el-dropdown class="avatar-container" trigger="click">
        <div class="avatar-wrapper">
          <img :src="avatar+'?imageView2/1/w/80/h/80'" class="user-avatar">
          <!-- <i class="el-icon-caret-bottom" /> -->
        </div>
        <el-dropdown-menu slot="dropdown" class="user-dropdown">
          <router-link to="/">
            <el-dropdown-item>
              Home
            </el-dropdown-item>
          </router-link>
          <!-- <a target="_blank" href="https://github.com/PanJiaChen/vue-admin-template/">
            <el-dropdown-item>Github</el-dropdown-item>
          </a>
          <a target="_blank" href="https://panjiachen.github.io/vue-element-admin-site/#/">
            <el-dropdown-item>Docs</el-dropdown-item>
          </a> -->
          <el-dropdown-item divided>
            <span style="display:block;" @click="logout">退出</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
// import Breadcrumb from '@/components/Breadcrumb'
// import Hamburger from '@/components/Hamburger'

export default {
  data() {
    return {
      nowIndex: 0,
      moreIndex: 0
    }
  },
  computed: {
    ...mapGetters([
      'sidebar',
      'avatar',
      'domain',
      'navHideNum'
    ]),
    nav: function() {
      return this.$router.options.routes.filter(item => item.meta && item.meta.isHeader)
    }
  },
  methods: {
    toggleSideBar() {
      this.$store.dispatch('app/toggleSideBar')
    },
    async logout() {
      await this.$store.dispatch('user/logout')
      this.$router.push(`/login?redirect=${this.$route.fullPath}`)
    },
    // 展示更多
    showMore() {
      this.$store.state.app.isHide = false
    },
    // nav项点击事件
    navItemClick(item) {
      this.$store.state.app.showSite = item.meta.showSiteData || false
    }
  }
}
</script>

<style lang="scss" scoped>
.isHide{
  display: none
}
ul{
  margin: 0;
  padding: 0;
  list-style: none;
}
.navbar1 {
  height: 64px;
  // overflow: hidden;
  position: relative;
  // background: #fff;
  // box-shadow: 0 1px 4px rgba(0,21,41,.08);
  background: #1C2260;
  box-shadow: 0 0 4px 0 rgba(0,0,0,0.12), 0 4px 4px 0 rgba(0,0,0,0.24);
  padding: 0 10px;
  display: flex;
  z-index: 1002;
  .logo{
    float: left;
    height: 64px;
    width: 184px;
    padding: 15px 0;
    .logo_container{
      height: 100%;
      img{
        height: 100%;
        vertical-align: middle;
      }
    }
  }
  .nav_menu{
    flex: 1;
    height: 100%;
    margin: 0 22px;
    display: flex;
    // overflow-x: hidden;
    ul.phone-hide{
      display: flex;
      height: 100%;
      .nav-item{
        position: relative;
        font-size: 13px;
        margin: 0;
        height: 100%;
        // width: 50px;
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;
        &.active{
          a{
            color: rgba(255, 255, 255, 1);
          }
        }
        a{
          color: rgba(255, 255, 255, 0.5);
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 0 14px;
          span{
            margin-top: 5px;
          }
          &:before {
            content: "";
            position: absolute;
            top: 0;
            right: 0;
            bottom: 0;
            left: 0;
          }
        }
      }
    }
    .phone-show-menu {
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 13px;
      padding: 0;
      width: 54px;
      color: rgba(255, 255, 255, .5);
      cursor: pointer;
      position: relative;
      transition: all 0.5s;
      div{
        display: flex;
        align-items: center;
      }
      .more{
        display: flex;
        flex-direction: column;
        align-items: center;
        color: rgba(255, 255, 255, .5);
      }
      span{
        margin-top: 5px;
      }
      .nav_list{
        position: absolute;
        left: 0;
        top: 60px;
        background-color: #fff;
        box-shadow: 0 1px 2px 0 rgba(0,0,0,.1);
        border: 1px solid rgba(177,180,185,.45);
        border-radius: 4px;
        font-size: 1.2rem;
        .nav-item{
          position: relative;
          font-size: 13px;
          margin: 0;
          height: 100%;
          width: 100px;
          display: flex;
          justify-content: center;
          align-items: center;
          cursor: pointer;
          &.active{
            a{
              color: rgba(28, 34, 96, 1);
            }
          }
          &:hover{
            background-color: #DEE1F2;
          }
          a{
            padding: 10px 0;
            color: rgba(28, 34, 96, 0.5);
            span{
              margin-left: 5px;
            }
            &:before {
              content: "";
              position: absolute;
              top: 0;
              right: 0;
              bottom: 0;
              left: 0;
            }
          }
        }
      }
      &.showMore{
        display: flex;
      }
      &.hideMore{
        display: none;
      }
    }
  }
  .hamburger-container {
    line-height: 60px;
    height: 100%;
    cursor: pointer;
    transition: background .3s;
    -webkit-tap-highlight-color:transparent;

    &:hover {
      background: rgba(0, 0, 0, .025)
    }
  }

  .breadcrumb-container {
    float: left;
  }

  .right-menu {
    width: 32px;
    height: 100%;
    margin-right: 20px;
    &:focus {
      outline: none;
    }

    .right-menu-item {
      display: inline-block;
      padding: 0 8px;
      height: 100%;
      font-size: 18px;
      color: #5a5e66;
      vertical-align: text-bottom;

      &.hover-effect {
        cursor: pointer;
        transition: background .3s;

        &:hover {
          background: rgba(0, 0, 0, .025)
        }
      }
    }

    .avatar-container {
      margin-right: 30px;
      .avatar-wrapper {
        margin-top: 16px;
        position: relative;
        .user-avatar {
          cursor: pointer;
          width: 32px;
          height: 32px;
          border-radius: 50%;
          vertical-align: middle;
        }

        .el-icon-caret-bottom {
          cursor: pointer;
          position: absolute;
          right: -20px;
          top: 10px;
          font-size: 12px;
        }
      }
    }
  }
}
</style>
