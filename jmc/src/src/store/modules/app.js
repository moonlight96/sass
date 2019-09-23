import Cookies from 'js-cookie'

const state = {
  header: {
    opened: Cookies.get('headerStatus') ? !!+Cookies.get('headerStatus') : true
  },
  sidebar: {
    opened: Cookies.get('sidebarStatus') ? !!+Cookies.get('sidebarStatus') : true,
    withoutAnimation: false
  },
  device: 'desktop',
  // 更多列表
  isHide: true,
  // 显示更多按钮
  isShowMore: Cookies.get('moreStatus') ? +true : false,
  domain: window.location.hostname,
  navHideNum: 0,
  // 是否显示站点选择下拉菜单
  showSite: true
}

const mutations = {
  TOGGLE_SIDEBAR: state => {
    state.sidebar.opened = !state.sidebar.opened
    state.sidebar.withoutAnimation = false
    if (state.sidebar.opened) {
      Cookies.set('sidebarStatus', 1)
    } else {
      Cookies.set('sidebarStatus', 0)
    }
  },
  CLOSE_SIDEBAR: (state, withoutAnimation) => {
    Cookies.set('sidebarStatus', 0)
    state.sidebar.opened = false
    state.sidebar.withoutAnimation = withoutAnimation
  },
  TOGGLE_DEVICE: (state, device) => {
    state.device = device
  },
  TOGGLE_HEADER: state => {
    state.header.opened = !state.header.opened
    if (state.header.opened) {
      Cookies.set('headerStatus', 1)
    } else {
      Cookies.set('headerStatus', 0)
    }
  },
  CLOSE_HEADER: (state) => {
    Cookies.set('headerStatus', 0)
    state.header.opened = false
  },
  SET_NAVHIDENUM: (state, navHideNum) => {
    state.navHideNum = navHideNum
  }
}

const actions = {
  toggleSideBar({ commit }) {
    commit('TOGGLE_SIDEBAR')
  },
  closeSideBar({ commit }, { withoutAnimation }) {
    commit('CLOSE_SIDEBAR', withoutAnimation)
  },
  toggleDevice({ commit }, device) {
    commit('TOGGLE_DEVICE', device)
  },
  toggleHeader({ commit }) {
    commit('TOGGLE_HEADER')
  },
  closeHeader({ commit }) {
    commit('CLOSE_HEADER')
  },
  showMore({ commit }) {
    commit('SHOW_MORE')
  },
  hideMore({ commit }) {
    commit('HIDE_MORE')
  },
  setNavHideNum: ({ commit }, navHideNum) => {
    commit('SET_NAVHIDENUM', navHideNum)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
