import request from '../../utils/request'

export function getMenuList() {
  return request({
    url: '/lui_sys/pim/main/pearUserMenu.do',
    method: 'get'
  })
}

