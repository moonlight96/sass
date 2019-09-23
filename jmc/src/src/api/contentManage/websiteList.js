import request from '@/utils/request'

// 获取网站的列表数据
export function getWebsiteList(params) {
  return request({
    url: '/site/list-page',
    params
  })
}
