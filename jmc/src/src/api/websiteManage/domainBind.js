import request from '@/utils/request'

// 绑定域名
export function bindDomain(params) {
  return request({
    url: '/site/bind',
    method: 'post',
    params
  })
}
