import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Router Modules */
import marketRouter from './modules/market'
import cloudStationRouter from './modules/cloudStation'
import memberRouter from './modules/member'
import socialMediaRouter from './modules/socialMedia'

export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },
  {
    path: '/',
    redirect: '/market',
    hidden: true
  },
  marketRouter,
  cloudStationRouter,
  memberRouter,
  socialMediaRouter,
  {
    path: '*',
    redirect: '/404',
    hidden: true
  }
]

const createRouter = () => new Router({
  mode: 'history',
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher
}

export default router
