import request from '../../../utils/request'

const URL_PUBLIC = "/lui_sys/pim/logs";

export function getLogsData(query) {
  return request({
    url: URL_PUBLIC+'/listJson.do',
    method: 'post',
    params: query
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

// //获取修改编辑 条目信息
// export function updateUSER(RES_NAMES,ORG_ID, USER_SEX,
//       ORG_NAME, USER_ID, USER_STATE,
//       USER_NAME, ROLE_NAMES, USER_PHONE,
//       USER_CREATE_TIME, USER_CREATOR_ID,
//       RN,USER_ACCOUNTUSER_PWD) {
//   return request({
//     url: USER_PUBLIC+'/getById.do',
//     method: 'post',
//     params: {
//       RES_NAMES,ORG_ID, USER_SEX,
//       ORG_NAME, USER_ID, USER_STATE,
//       USER_NAME, ROLE_NAMES, USER_PHONE,
//       USER_CREATE_TIME, USER_CREATOR_ID,
//       RN,USER_ACCOUNTUSER_PWD
//     }
//   })
// }

// export function deleteUSER(ids) {
//   return request({
//     url: USER_PUBLIC+'/delete.do',
//     method: 'post',
//     params: {
//       ids
//     }
//   })
// }

// export function getInfo() {
//   return request({
//     url: '/vue-element-admin/user/info',
//     method: 'get',
//     params: { token }
//   })
// }

// export function logout() {
//   return request({
//     url: '/vue-element-admin/user/logout',
//     method: 'post'
//   })
// }
