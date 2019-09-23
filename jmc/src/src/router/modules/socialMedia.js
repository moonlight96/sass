import Layout from '@/layout'
import Content from '@/layout/content'

export default {
  path: '/social-media',
  component: Layout,
  name: '社媒',
  redirect: '/social-media/release',
  meta: { title: '社媒', icon: 'shemei-fill', isHeader: true },
  children: [
    {
      path: 'release',
      component: Content,
      redirect: '/social-media/release/release-page',
      name: '发布',
      meta: { title: '发布', icon: 'fabu' },
      children: [
        {
          path: 'release-page',
          name: '发布',
          component: () => import('@/views/socialMedia/releasePage'),
          meta: { title: '发布' }
        }
      ]
    }
  ]
}
