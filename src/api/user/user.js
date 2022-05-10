import request from '../../../utils/request'

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

//添加
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


