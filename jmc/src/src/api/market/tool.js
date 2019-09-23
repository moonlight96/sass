import request from '@/utils/request'

// 获取语句库的列表数据
export function getSentenceList(params) {
  return new Promise((resolve, reject) => {
    request({
      url: '/sentence/list-page',
      params
    }).then(res => {
      res.data.list.forEach(item => {
        if (item['type'] === 1) {
          item.sentence_type = '差异化语句'
        }
      })
      resolve(res)
    }).catch(error => {
      reject(error)
    })
  })
}

// 添加语句库
export function addSentence(data) {
  return request({
    url: '/sentence/insert',
    method: 'POST',
    data
  })
}
// 修改语句库
export function updateSentence(data) {
  return request({
    url: '/sentence/update',
    method: 'POST',
    data
  })
}
// 删除语句库
export function deleteSentence(id) {
  return request({
    url: '/sentence/delete',
    method: 'POST',
    data: {
      id
    }
  })
}
