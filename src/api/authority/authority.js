import request from '../../../utils/request'
import qs from 'qs'

const URL_PUBLIC = "/lui_sys/pim/operate";

export function getPageData(query) {
  return request({
    url: URL_PUBLIC+'/getPageData.do',
    method: 'post',
    params: query
  })
}
// export function getUserPageData(query) {
//   return request({
//     url: URL_PUBLIC+'/pageData.do',
//     method: 'post',
//     params: query
//   })
// }

//添加
// export function addUserSave(data) {
//   return request({
//     url: URL_PUBLIC+ '/save.do',
//     method: 'post',
//     data: qs.stringify(data)
//   })
// }

//添加



