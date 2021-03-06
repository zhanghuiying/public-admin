import request from '../../../utils/request'
import qs from 'qs'

const URL_PUBLIC = "/lui_sys/pim/user";

export function getUserData(query) {
  return request({
    url: URL_PUBLIC+'/listJson.do',
    method: 'post',
    params: query
  })
}

export function getUserPageData(query) {
  return request({
    url: URL_PUBLIC+'/pageData.do',
    method: 'post',
    params: query
  })
}

//添加
export function addUserSave(data) {
  return request({
    url: URL_PUBLIC+ '/save.do',
    method: 'post',
    data: qs.stringify(data)
  })
}
//删除勾选列表
export function deleteUser(ids) {
  return request({
    url: URL_PUBLIC+'/delete.do',
    method: 'post',
    params: {
      ids
    }
  })
}
//禁用勾选列表
export function disableUser(ids) {
  return request({
    url: URL_PUBLIC+'/disable.do',
    method: 'post',
    params: {
      ids
    }
  })
}

//启用勾选列表
export function enableUser(ids) {
  return request({
    url: URL_PUBLIC+'/enable.do',
    method: 'post',
    params: {
      ids
    }
  })
}

//重置密码勾选列表用户 
export function resetPasswordUser(ids) {
  return request({
    url: URL_PUBLIC+'/resetPassword.do',
    method: 'post',
    params: {
      ids
    }
  })
}

//绑定角色 dialog
export function saveUserRoles(data) {
  return request({
    url: URL_PUBLIC+ '/saveUserRoles.do',
    method: 'post',
    data: qs.stringify(data)
  })
}
//绑定功能组 dialog
export function saveUserOperate(data) {
  return request({
    url: URL_PUBLIC+ '/saveUserOperate.do',
    method: 'post',
    data: qs.stringify(data)
  })
}
//更换机构 dialog
export function saveUserOrg(data) {
  return request({
    url: '/lui_sys/pim/user!saveUserOrg.action',
    method: 'post',
    data: qs.stringify(data)
  })
}

//菜单树 获取跟节点--------------------
export function getFollowNod(data) {
  return request({
    url: '/lui_sys/pim/org/getOrg.do',
    method: 'post',
    data: qs.stringify(data)
  })
}
//菜单树 get添加跟节点
export function addFollowNod(query) {
  return request({
    url: '/lui_sys/pim/org!insert.action',
    method: 'get',
    params: query
  })
}
//菜单树 post添加跟节点
export function addFollowNodPost(query) {
  return request({
    url: '/lui_sys/pim/org!insert.action',
    method: 'post',
    params: query
  })
}
//菜单树 修改跟节点名称
export function updateFollowNod(data) {
  return request({
    url: '/lui_sys/pim/org/update.do',
    method: 'post',
    data: qs.stringify(data)
  })
}

//菜单树 删除跟节点名称
export function deleteFollowNod(ORG_ID) {
  return request({
    url: '/lui_sys/pim/org!delete.action?ORG_ID=' + `${ORG_ID}`,
    method: 'get'
  })
}


