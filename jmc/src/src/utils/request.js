// import { MessageBox, Message } from 'element-ui'
// import store from '@/store'
// import { getToken } from '@/utils/auth'

const JSDK = window.JCSP

const baseURL = process.env.VUE_APP_BASE_API

export default (params) => {
  params.url = baseURL + params.url
  if (params.params) {
    params.data = params.params
    delete params.params
  }
  return new Promise((resolve, reject) => {
    JSDK.request(
      params,
      res => {
        resolve(res)
        // vm.items = res.data
      },
      res => {
        reject(res)
      },
      res => {
        console.log('调用接口发生错误')
        console.log(res)
        reject(res)
      }
    )
  })
}
