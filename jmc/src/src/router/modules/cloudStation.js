import Layout from '@/layout'
import Content from '@/layout/content'

export default {
  path: '/cloud-station',
  component: Layout,
  name: '云站',
  redirect: '/cloud-station/website-list',
  meta: { title: '云站', icon: 'yunzhan-fill', isHeader: true },
  children: [
    {
      path: 'content-manage',
      component: Content,
      redirect: '/cloud-station/content-manage/article-list',
      name: '内容管理',
      meta: { title: '内容管理', icon: 'neirongguanli' },
      children: [
        {
          path: 'article-list',
          name: '文章列表',
          component: () => import('@/views/contentManage/article/articleList'),
          meta: { title: '文章列表' }
        }
      ]
    },
    {
      path: 'website-list',
      component: () => import('@/views/contentManage/websiteList'),
      hidden: true,
      name: '网站列表',
      meta: { noSidebar: true, title: '网站列表' }
    },
    {
      path: 'website-manage',
      component: Content,
      redirect: '/cloud-station/website-manage/website-set',
      name: '网站管理',
      meta: { title: '网站管理', icon: 'wangzhanguanli' },
      children: [
        {
          path: 'website-set',
          name: '网站设置',
          component: () => import('@/views/websiteManage/websiteSet'),
          meta: { title: '网站设置' }
        },
        {
          path: 'website-TDK',
          name: '网站TDK',
          component: () => import('@/views/websiteManage/websiteTDK'),
          hidden: true,
          meta: { title: '网站TDK' }
        },
        {
          path: 'domain-bind',
          name: '域名绑定',
          component: () => import('@/views/websiteManage/domainBind'),
          meta: { title: '域名绑定' }
        },
        {
          path: 'redirect301',
          name: '301重定向',
          component: () => import('@/views/websiteManage/redirect301'),
          meta: { title: '301重定向' }
        },
        {
          path: 'stats-code',
          name: '统计代码',
          component: () => import('@/views/websiteManage/statsCode'),
          meta: { title: '统计代码' }
        }
      ]
    }
  ]
}
