import axios from 'axios'
import { MessageBox, Message } from 'element-ui'
import { tansParams } from "../utils/ruoyi";
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

// 通用下载方法
// export function download( params, filename) {
export function download(url, params, filename) {
  return service.post(url, params, {
    transformRequest: [(params) => {
      return tansParams(params)
    }],
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
    },
    responseType: 'blob'
  }).then((data) => {
    const content = data
    console.log(content);
  // let url = window.URL.createObjectURL(new Blob([params], { type: '.xlsx' }));
  //     let a= document.createElement('a');
  //     a.style.display = 'none';
  //     a.href = url;
  //     a.setAttribute('download', `${this.filename}.xlsx`);
  //      document.body.appendChild(a);
  //      a.click();
  //      url = window.URL.revokeObjectURL(url);
  //      document.body.removeChild(a)
    const blob = new Blob([content])
    if ('download' in document.createElement('a')) {
      const elink = document.createElement('a')
      elink.download = `${filename}.xlsx`
      elink.style.display = 'none'
      elink.href = URL.createObjectURL(blob)
      document.body.appendChild(elink)
      elink.click()
      this.$message.success('导出成功！')
      URL.revokeObjectURL(elink.href)
      document.body.removeChild(elink)
    } else {
      navigator.msSaveBlob(blob, filename)
    }
  }).catch((r) => {
    console.error(r)
  })
}
export default service
