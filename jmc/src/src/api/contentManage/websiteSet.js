import request from '@/utils/request'

// 网站设置-网站信息-获取
export function getBindInfo(params) {
  return request({
    url: '/site/detail',
    params
  })
}
// 网站设置-网站信息-编辑
export function updateBind(data) {
  return request({
    url: '/site/update',
    method: 'POST',
    data
  })
}
// 网站设置-TDK设置-获取
export function getTdkInfo(params) {
  return request({
    url: '/site-detail/detail',
    params
  })
}
// 网站设置-TDK设置-编辑
export function updateTdk(data) {
  return request({
    url: '/site-detail/update',
    method: 'POST',
    data
  })
}
