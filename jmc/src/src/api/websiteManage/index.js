import request from '@/utils/request'

//  统计代码获取数据
export function getGaCode(data) {
  return request({
    url: '/site-code/detail',
    method: 'post',
    data
  })
}

// 统计代码新增编辑数据
export function getGaCodeEdit(data) {
  return request({
    url: '/site-code/insert',
    method: 'POST',
    data
  })
}
