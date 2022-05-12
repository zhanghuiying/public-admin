import request from '../../utils/request'
import qs from 'qs'

//获取菜单栏接口
export function getMenuData() {
  return request({
    url: '/lui_sys/pim/main/pearUserMenu.do',
    method: 'get'
  })
}

//获取登录成功首页
export function getPearData() {
  return request({
    url: '/lui_sys/content/web/config/pear.config.json',
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