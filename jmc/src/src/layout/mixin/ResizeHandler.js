import store from '@/store'
import { mapGetters } from 'vuex'

const { body } = document
const WIDTH = 992 // refer to Bootstrap's responsive design
const NAV_WIDTH = 768
const STEP = 50

export default {
  data() {
    return {
      val: 0
    }
  },
  computed: {
    ...mapGetters([
      'nav',
      'navHideNum'
    ])
  },
  watch: {
    $route(route) {
      if (this.device === 'mobile' && this.sidebar.opened) {
        store.dispatch('app/closeSideBar', { withoutAnimation: false })
      }
    }
  },
  beforeMount() {
    window.addEventListener('resize', this.$_resizeHandler)
    window.addEventListener('resize', this.$_resizeNav)
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.$_resizeHandler)
    window.removeEventListener('resize', this.$_resizeNav)
  },
  mounted() {
    const isMobile = this.$_isMobile()
    if (isMobile) {
      store.dispatch('app/toggleDevice', 'mobile')
      store.dispatch('app/closeSideBar', { withoutAnimation: true })
    }
    this.$_resizeNav()
  },
  methods: {
    // https://vuejs.org/v2/style-guide/index.html#Private-property-names-essential
    $_isMobile() {
      const rect = body.getBoundingClientRect()
      return rect.width - 1 < WIDTH
    },
    $_resizeHandler() {
      if (!document.hidden) {
        const isMobile = this.$_isMobile()
        store.dispatch('app/toggleDevice', isMobile ? 'mobile' : 'desktop')
        if (isMobile) {
          store.dispatch('app/closeSideBar', { withoutAnimation: true })
        }
      }
    },
    $_resizeNav() {
      const rect = body.getBoundingClientRect()
      const num = -Math.ceil((rect.width - NAV_WIDTH) / STEP)
      store.dispatch('app/setNavHideNum', num)
    }
  }
}
