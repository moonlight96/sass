const state = {
  siteId: null,
  allSite: window.sessionStorage.getItem('allSite') ? JSON.parse(sessionStorage.getItem('allSite')) : []
}

const mutations = {
  SET_SITE: (state, { id }) => {
    state.siteId = id
    state.allSite.forEach(val => {
      delete val.default
      if (val.id === id) val.default = true
    })
    window.sessionStorage.setItem('allSite', JSON.stringify(state.allSite))
  },
  SET_ALL_SITE: (state, value) => {
    state.allSite = value
  }
}

const actions = {
  setSite({ commit }, { id }) {
    commit('SET_SITE', { id })
  },
  setAllSite({ commit }, value) {
    commit('SET_ALL_SITE', value)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
