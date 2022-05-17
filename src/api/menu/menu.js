import request from '../../../utils/request'
import qs from 'qs'

const URL_PUBLIC = "/lui_sys/pim/menu";

//获取 菜单权限
export function getMenu(data) {
  return request({
    url: URL_PUBLIC+'/selectall.do',
    method: 'post',
    data: qs.stringify(data)
  })
}

//添加菜单栏目
export function addMenuSave(data) {
  return request({
    url: URL_PUBLIC+ '/save.do',
    method: 'post',
    data: qs.stringify(data)
  })
}
//禁用，启用
export function updateSta(query) {
  return request({
    url: URL_PUBLIC+ '/updateSta.do',
    method: 'post',
    params: query
  })
}


//删除勾选 菜单
export function deleteMenu(ids) {
  return request({
    url: URL_PUBLIC+'/delete.do',
    method: 'post',
    params: {
      ids
    }
  })
}

