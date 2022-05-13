import request from '../../../utils/request'
import qs from 'qs'

const URL_PUBLIC = "/lui_sys/pim/menu";

export function getMenuData(query) {
  return request({
    url: URL_PUBLIC+'/listJson.do',
    method: 'post',
    params: query
  })
}
//获取 菜单权限
export function getMenu(data) {
  return request({
    url: URL_PUBLIC+'/selectall.do',
    method: 'post',
    data: qs.stringify(data)
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
export function addMenuSave(data) {
  return request({
    url: URL_PUBLIC+ '/save.do',
    method: 'post',
    data: qs.stringify(data)
  })
}



