import Mock from 'mockjs'

const links = Mock.mock({
  'items|20': [{
    name: 'wsss',
    url: 'www.baidu.com',
    linkUrl: 'www.baidu.com',
    'postion|1': ['首页', '产品栏目'],
    createTime: '2019-09-16 09:43:37',
    createAuthor: 'admin'
  }]
})

export default [
  {
    url: '/partner-link/list-page',
    type: 'get',
    response: config => {
      const items = links.items
      return {
        code: 20000,
        data: {
          total: items.length,
          items: items
        }
      }
    }
  }
]
