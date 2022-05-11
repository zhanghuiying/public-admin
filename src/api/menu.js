import request from '../../utils/request'

export function getMenuList() {
  return request({
    url: '/lui_sys/pim/main/pearUserMenu.do',
    method: 'get'
  })
}

export function changePassword(data) {
  return request({
    url: '/lui_sys/pim/user/savePwd.do',
    method: 'post',
    data: qs.stringify(data)
  })
}