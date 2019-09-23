const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  domain: state => state.app.domain,
  nav: state => state.app.nav,
  navHideNum: state => state.app.navHideNum,
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  name: state => state.user.name,
  market: state => state.market
}
export default getters
