import request from '@/utils/request'
// 获取文章的列表数据
export function getArticleList(params) {
  return new Promise((resolve, reject) => {
    request({
      url: '/article/list-page',
      method: 'get',
      params
    }).then(res => {
      // console.log(res)
      res.data.list.forEach(item => {
        if (item['status'] === 1) {
          item['status_num'] = '上架'
        } else {
          item['status_num'] = '下架'
        }
      })
      resolve(res)
    }).catch(error => {
      reject(error)
    })
  })
}
// 获取文章分类的列表数据
export function delArticle(id) {
  return request({
    url: '/article/delete',
    method: 'POST',
    data: {
      id
    }
  })
}
// 获取文章分类的列表数据
export function getCategoryList(params) {
  return request({
    url: '/article-category/list-child',
    params
  })
}

// 添加文章分类
export function addCategory(data) {
  return request({
    url: '/article-category/insert',
    method: 'post',
    data
  })
}
// 删除文章分类
export function delCategory(id) {
  return request({
    url: '/article-category/delete',
    method: 'post',
    data: {
      id
    }
  })
}
// 添加文章分类
export function updateCategory(data) {
  return request({
    url: '/article-category/update',
    method: 'post',
    data
  })
}
