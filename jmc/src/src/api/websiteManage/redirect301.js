import request from '@/utils/request'

// 获取列表
export function getList(params) {
  return request({
    url: '/site-domain/list-page',
    method: 'get',
    params
  })
}

// 添加
export function addList(params) {
  return request({
    url: '/site-domain/add',
    method: 'post',
    params
  })
}

// 删除
export function removeList(params) {
  return request({
    url: '/site-domain/delete',
    method: 'post',
    params
  })
}
