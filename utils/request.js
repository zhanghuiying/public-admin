import axios from 'axios'
import { MessageBox, Message } from 'element-ui'
// import store from '@/store'
// import { getToken } from '@/utils/auth'

// 创建一个axios实例
const service = axios.create({
  baseURL: "/api", 
  timeout: 5000
})

// const baseURL = process.env.API_ROOT
// const service = axios.create({
//   baseURL: baseURL, // api base_url
//   timeout: 5000 // 请求超时时间
// })
// export const pureAxios = axios.create({
//   baseURL: baseURL, // api base_url
//   timeout: 6000 // 请求超时时间
// })

// 请求的拦截
service.interceptors.request.use(
  config => {
    // if (store.getters.token) {
    //   //这个是后台token的名字
    //   config.headers['X-Token'] = getToken()
    // }
    return config
  },
  error => {
    // 错误的处理
    console.log(error)
    return Promise.reject(error)
  }
)

// 响应请求
service.interceptors.response.use(
 
  response => {
     const res = response.data

    // if (res.code !== 200) {
    //   Message({
    //     message: res.message || 'Error',
    //     type: 'error',
    //     duration: 5 * 1000
    //   })

      // 50008: Illegal token; 50012: Other clients logged in; 50014: Token expired;
      // if (res.code === 50008 || res.code === 50012 || res.code === 50014) {
      //   // to re-login
      //   MessageBox.confirm('You have been logged out, you can cancel to stay on this page, or log in again', 'Confirm logout', {
      //     confirmButtonText: 'Re-Login',
      //     cancelButtonText: 'Cancel',
      //     type: 'warning'
      //   }).then(() => {
      //     store.dispatch('user/resetToken').then(() => {
      //       location.reload()
      //     })
      //   })
      // }
    //   return Promise.reject(new Error(res.message || 'Error'))
    // } else {
      return res
    // }
  },
  error => {
    console.log('err' + error) // for debug
    Message({
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

export default service
