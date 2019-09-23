import Mock from 'mockjs'

const statements = Mock.mock({
  'items|20': [{
    type: 1,
    sentence_content: '@paragraph(7)'
  }]
})

export default [
  {
    url: '/sentence/list-page',
    type: 'get',
    response: config => {
      const items = statements.items
      return {
        code: 0,
        data: {
          total: items.length,
          list: items
        }
      }
    }
  }
]
