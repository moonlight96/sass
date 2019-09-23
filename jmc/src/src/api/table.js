import request from '@/utils/request'

export function getList(params) {
  return request({
    url: '/table/list',
    method: 'get',
    params
  })
}

export function getList2(params) {
  return request({
    url: '/contentManage/list-page',
    method: 'get',
    params
  })
}
