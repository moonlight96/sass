import request from '@/utils/request'

// 获取会员的列表数据
export function getMemberList(data) {
  return request({
    url: '/member-group/list-page',
    method: 'GET',
    params: { data }
  })
}
// 获取会员的详情数据
export function getMemberDetail(data) {
  return request({
    url: '/member-group/detail',
    method: 'GET',
    params: { data }
  })
}
// 获取会员的详情数据
export function delMember(id) {
  return request({
    url: '/member-group/delete',
    method: 'POST',
    data: { id }
  })
}

