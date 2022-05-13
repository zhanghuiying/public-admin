import request from '../../../utils/request'
import qs from 'qs'

const URL_PUBLIC = "/lui_sys/pim/role";

export function getRoleData(query) {
  return request({
    url: URL_PUBLIC+'/listJson.do',
    method: 'post',
    params: query
  })
}
//添加
export function addRoleSave(data) {
  return request({
    url: URL_PUBLIC + '/save.do',
    method: 'post',
    data: qs.stringify(data)
  })
}
//删除/删除勾选列表
export function deleteRole(ids) {
  return request({
    url: URL_PUBLIC+'/delete.do',
    method: 'post',
    params: {
      ids
    }
  })
}

//查看菜单权限
export function selectMenuByRoleId(id) {
  return request({
    url: URL_PUBLIC+'/selectMenuByRoleId.do'+`?ROLE_ID=${id}`,
    method: 'get',
  })
}
//保存菜单权限
export function saveMenuByRoleId(ROLE_ID,MENU_ID) {
  return request({
    url: URL_PUBLIC+`/saveMenuByRoleId.do`,
    method: 'post',
    params: {
      ROLE_ID,
      MENU_ID
    }
  })
}
//获取角色 菜单权限
export function getRoleMenu(data) {
  return request({
    url: `/lui_sys/pim/menu/selectall.do`,
    method: 'post',
    data: qs.stringify(data)
  })
}
