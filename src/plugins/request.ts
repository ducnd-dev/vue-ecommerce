import axios from 'axios'
import { forEach } from 'lodash'
import { Message } from 'element-ui'
import store from '../store'

const request = axios.create({
  baseURL: process.env.VUE_APP_BASE_URL,
  withCredentials: false
})

request.defaults.headers.put['Content-Type'] = 'application/x-www-form-urlencoded'

request.defaults.headers.common['Authorization'] = localStorage.getItem('access_token') ? 'Bearer ' + localStorage.getItem('access_token') : ''

request.interceptors.request.use(request => {
  return request
})

request.interceptors.response.use(
  response => {
    if (response.data.errorCode === 401) {
      Message.error('Hết phiên đăng nhập, vui lòng đăng nhập lại')
      store
        .dispatch('beAuth/refreshToken')
        .then(() => {
          return
        })
        .catch(() => {
          setTimeout(() => {
            location.href = '/login'
          }, 500)
          return Promise.reject(response.data)
        })
    } else if (response.data.errorCode === 400) {
      Message.error('Thông tin đăng nhập không chính xác')
    } else if (response.data.code !== 200 && response.data.status !== 'Success') {
      if (response.data instanceof Blob) {
        return response
      }
      forEach(response.data.errors, value => {
        Message.error(value)
      })
      return Promise.reject(response.data)
    }
    return response
  },
  error => {
    if (!error.response || error.response.status >= 500) {
      // error.message = 'Không thể kết nối đến máy chủ'
      error.message = 'Có lỗi kết nối tới máy chủ. Vui lòng thử lại sau ít phút'
      Message.error(error.message)
      return Promise.reject(error)
    }
    return Promise.reject(error)
  }
)

export default request
