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
    url: USER_PUBLIC + '/save.do',
    method: 'post',
    data: qs.stringify(data)
  })
}

export function deleteUser(ids) {
  return request({
    url: URL_PUBLIC+'/delete.do',
    method: 'post',
    params: {
      ids
    }
  })
}

//菜单树 获取跟节点
export function getFollowNod(query) {
  return request({
    url: '/lui_sys/pim/org/getOrg.do',
    method: 'post',
    params: query
  })
}


//菜单树 添加跟节点
export function addFollowNod(query) {
  return request({
    url: '/lui_sys/pim/org!insert.action',
    method: 'post',
    params: query
  })
}

//菜单树 修改跟节点名称
export function updateFollowNod(query) {
  return request({
    url: '/lui_sys/pim/org/update.do',
    method: 'post',
    params: query
  })
}

// /lui_sys/pim/org!delete.action?ORG_ID=157061
export function deleteFollowNod(ORG_ID) {
  return request({
    url: '/lui_sys/pim/org!delete.action' + `${ORG_ID}`,
    method: 'get'
  })
}
// export function addUSER(USER_ID, ORG_ID, USER_ACCOUNT,
//       USER_NAME, USER_PHONE, USER_SEX,
//       USER_STATE,roleIds,operateIds) {
//   return request({
//     url: USER_PUBLIC+'/save.do',
//     method: 'post',
//     params: {
//       USER_ID, ORG_ID, USER_ACCOUNT,
//       USER_NAME, USER_PHONE, USER_SEX,
//       USER_STATE,roleIds,operateIds,
//     }
//   })
// }


