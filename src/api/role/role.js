import request from '../../../utils/request'

const ROLE_PUBLIC = "/lui_sys/pim/role";

export function getRoleData() {
  return request({
    url: ROLE_PUBLIC+'/listJson.do',
    method: 'post'
  })
}
//添加
export function addRole(ROLE_NAME,ROLE_CODE,ROLE_REMARK) {
  return request({
    url: ROLE_PUBLIC+'/save.do',
    method: 'post',
    params: {
      ROLE_NAME,
      ROLE_CODE,
      ROLE_REMARK
    }
  })
}
//修改
export function updateRole(ROLE_ID,ROLE_STATE,ROLE_NAME,ROLE_CODE,ROLE_REMARK) {
  return request({
    url: ROLE_PUBLIC+'/save.do',
    method: 'post',
    params: {
      ROLE_ID,
      ROLE_STATE,
      ROLE_NAME,
      ROLE_CODE,
      ROLE_REMARK
    }
  })
}


export function deleteRole(ids) {
  return request({
    url: ROLE_PUBLIC+'/delete.do',
    method: 'post',
    params: {
      ids
    }
  })
}

export function selectMenuByRoleId(id) {
  return request({
    url: ROLE_PUBLIC+'/selectMenuByRoleId.do'+`?ROLE_ID=${id}`,
    method: 'get',
  })
}

//查看菜单权限

//保存菜单权限
export function saveMenuByRoleId(ROLE_ID,MENU_ID) {
  return request({
    url: ROLE_PUBLIC+`/saveMenuByRoleId.do`,
    method: 'post',
    params: {
      ROLE_ID,
      MENU_ID
    }
  })
}


// export function updateRole(id, data) {
//   return request({
//     url: `lui_sys/pim/role/save.do${id}`,
//     method: 'put',
//     data
//   })
// }
