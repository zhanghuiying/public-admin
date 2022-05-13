import request from '../../../utils/request'
import qs from 'qs'

const URL_PUBLIC = "/lui_sys/pim/operate";

export function getPageData(query) {
  return request({
    url: URL_PUBLIC+'/getPageData.do',
    method: 'post',
    params: query
  })
}

export function getSelectallMenu(query) {
  return request({
    url: '/lui_sys/pim/menu/selectall.do',
    method: 'post',
    params: query
  })
}

//保持选中权限
// export function saveOperations(data) {
//   return request({
//     url: URL_PUBLIC+ '/saveOperations.do',
//     method: 'post',
//     data: qs.stringify(data)
//   })
// }
export function saveOperations(query) {
  return request({
    url: URL_PUBLIC+ '/saveOperations.do',
    method: 'post',
    params: query
  })
}


//添加权限跟节点 选中接口
export function findOperate(RES_ID) {
  return request({
    url: URL_PUBLIC+'/findOperate.do',
    method: 'post',
    params: {
      RES_ID
    }
  })
}

//菜单树 添加权限 跟节点
export function insertGroup(query) {
  return request({
    url: URL_PUBLIC+'/insertGroup.do',
    method: 'post',
    params: query
  })
}
//菜单树 修改权限 跟节点
export function saveGroup(query) {
  return request({
    url: URL_PUBLIC+'!saveGroup.action',
    method: 'post',
    params: query
  })
}

// ORG_CODE: 91551
// RES_ID: 91551
// RES_PID: 0
// RES_NAME: 权限组1


// RES_ID: 685EE01BCCE54A9FA45850A69F6F4C6A
// RES_PID: 0
// RES_NAME: 权限组2


//菜单树 删除权限 跟节点名称
export function deleteGroup(RES_ID) {
  return request({
    url: '/lui_sys/pim/operate!deleteGroup.action?RES_ID=' + `${RES_ID}`,
    method: 'get'
  })
}


