import request from '../../../utils/request'


export function getRoleData() {
  return request({
    url: '/lui_sys/pim/role/listJson.do',
    method: 'post'
  })
}

export function addRole(ROLE_NAME,ROLE_CODE,ROLE_REMARK) {
  return request({
    url: 'lui_sys/pim/role/save.do',
    method: 'post',
    params: {
      ROLE_NAME,
      ROLE_CODE,
      ROLE_REMARK
    }
  })
}

