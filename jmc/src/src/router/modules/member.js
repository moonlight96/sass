import Layout from '@/layout'
import Content from '@/layout/content'

const memberRouter = {
  path: '/member',
  component: Layout,
  name: '会员',
  redirect: '/member/member-manage',
  meta: { title: '会员', icon: 'huiyuan-fill', isHeader: true },
  children: [
    {
      path: 'member-manage',
      component: Content,
      redirect: '/member/member-manage/member-group',
      name: '会员管理',
      meta: { title: '会员管理', icon: 'huiyuanguanli' },
      children: [
        {
          path: 'member-list',
          name: '会员列表',
          component: () => import('@/views/member/memberManage/list'),
          hidden: true, // 页面暂时没开发，隐藏
          meta: { title: '会员列表' }
        },
        {
          path: 'member-group',
          name: '会员分组',
          component: () => import('@/views/member/memberManage/group'),
          meta: { title: '会员分组' }
        }
      ]
    }
  ]
}

export default memberRouter
