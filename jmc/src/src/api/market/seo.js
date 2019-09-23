import request from '@/utils/request'

// 获取友情链接的列表数据
export function getLinksList(params) {
  return request({
    url: '/partner-link/list-page',
    method: 'GET',
    params
  })
}
// 添加友情链接
export function addLink(data) {
  return request({
    url: '/partner-link/insert',
    method: 'POST',
    data
  })
}
// 修改友情链接
export function updateLink(data) {
  return request({
    url: '/partner-link/update',
    method: 'POST',
    data
  })
}
// 删除友情链接
export function deleteLink(id) {
  return request({
    url: '/partner-link/delete',
    method: 'POST',
    data: {
      id
    }
  })
}
