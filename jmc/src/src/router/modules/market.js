import Layout from '@/layout'
import Content from '@/layout/content'

const marketRouter = {
  path: '/market',
  component: Layout,
  name: '营销',
  redirect: '/market/chooseSite',
  meta: { title: '营销', icon: 'yingxiao-fill', isHeader: true, showSiteData: true },
  children: [
    {
      path: 'chooseSite',
      name: '选择站点',
      component: () => import('@/views/market/chooseSite'),
      hidden: true,
      meta: { noSidebar: true }
    },
    {
      path: 'siteList',
      name: '网站列表',
      component: () => import('@/views/siteYun/siteList'),
      hidden: true,
      meta: { noSidebar: true }
    },
    {
      path: 'overview',
      component: () => import('@/views/market/overview'),
      name: '营销概览',
      disabled: true,
      meta: { title: '营销概览', icon: 'yingxiaogailan' }
    },
    {
      path: 'transformation',
      component: () => import('@/views/404'),
      name: '营销转化',
      disabled: true,
      meta: { title: '营销转化', icon: 'yingxiaozhuanhua' }
    },
    {
      path: 'suggestions',
      component: () => import('@/views/404'),
      name: '营销建议',
      disabled: true,
      meta: { title: '营销建议', icon: 'yingxiaojianyi' }
    },
    {
      path: 'tools',
      component: Content,
      redirect: '/market/tools/keywords',
      name: '营销工具',
      meta: { title: '营销工具', icon: 'yingxiaogongju' },
      children: [
        {
          path: 'keywords',
          component: () => import('@/views/404'),
          name: '关键词库',
          disabled: true,
          meta: { title: '关键词库' }
        },
        {
          path: 'statement',
          component: () => import('@/views/market/tool/statement'),
          name: '语句库',
          meta: { title: '语句库' }
        },
        {
          path: 'product',
          component: () => import('@/views/market/tool/product'),
          name: '产品管理',
          meta: { title: '产品管理' }
        },
        {
          path: 'paramList',
          component: () => import('@/views/market/tool/paramList'),
          name: '产品参数列表',
          meta: { title: '产品参数列表' }
        }
      ]
    },
    {
      path: 'optimization',
      component: Content,
      redirect: '/market/optimization/seo',
      name: 'AI站内优化',
      meta: { title: 'AI站内优化', icon: 'AIzhanneiyouhua' },
      children: [
        {
          path: 'seo',
          component: () => import('@/views/market/seo/index'),
          name: 'SEO优化',
          meta: { title: 'SEO优化' }
        },
        {
          path: 'links',
          component: () => import('@/views/market/seo/links'),
          name: '友情链接',
          meta: { title: '友情链接' }
        }
      ]
    },
    {
      path: 'aiProduct',
      component: Content,
      redirect: '/market/aiProduct/overview',
      name: 'AI产品',
      meta: { title: 'AI产品', icon: 'AIchanpin' },
      children: [
        {
          path: 'overview',
          component: () => import('@/views/404'),
          name: 'AI产品数据概览',
          disabled: true,
          meta: { title: 'AI产品数据概览' }
        },
        {
          path: 'list',
          component: () => import('@/views/404'),
          name: 'AI产品管理',
          disabled: true,
          meta: { title: 'AI产品管理' }
        }
      ]
    },
    {
      path: 'aiNews',
      component: Content,
      redirect: '/market/aiNews/overview',
      name: 'AI文章',
      meta: { title: 'AI文章', icon: 'AIwenzhang' },
      children: [
        {
          path: 'overview',
          component: () => import('@/views/404'),
          name: 'AI文章数据概览',
          disabled: true,
          meta: { title: '数据概览' }
        },
        {
          path: 'list',
          component: () => import('@/views/404'),
          name: 'AI文章管理',
          disabled: true,
          meta: { title: 'AI文章管理' }
        }
      ]
    },
    {
      path: 'aiJuhe',
      component: Content,
      redirect: '/market/aiJuhe/overview',
      name: 'AI聚合页',
      meta: { title: 'AI聚合页', icon: 'AIjuheye' },
      children: [
        {
          path: 'overview',
          component: () => import('@/views/404'),
          name: 'AI聚合页数据概览',
          disabled: true,
          meta: { title: 'AI聚合页数据概览' }
        },
        {
          path: 'list',
          component: () => import('@/views/404'),
          name: 'AI聚合页管理',
          disabled: true,
          meta: { title: 'AI聚合页管理' }
        }
      ]
    }
  ]
}

export default marketRouter
