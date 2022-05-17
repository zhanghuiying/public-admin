import request from '../../../utils/request'
import qs from 'qs'

const URL_PUBLIC = "/lui_sys/pim/optionData";

export function getData(query) {
  return request({
    url: '/lui_sys/pim/optionGroup/listJson.do',
    method: 'post',
    params: query
  })
}

// export function getListJsonByOgid(query) {
//   return request({
//     url: '/lui_sys/pim/optionGroup/listJson.do',
//     method: 'post',
//     params: query
//   })
// }

export function getListJsonByOgid(query) {
  return request({
    url: URL_PUBLIC+'/listJsonByOgid.do',
    method: 'post',
    params: query
  })
}

//添加
export function addDataSave(data) {
  return request({
    url: URL_PUBLIC + '/save.do',
    method: 'post',
    data: qs.stringify(data)
  })
}

//修改添加 双击table表单列表 
export function reviseTableInput(data) {
  return request({
    url: '/lui_sys/pim/optionGroup/save.do',
    method: 'post',
    data: qs.stringify(data)
  })
}

//删除
export function deleteData(ids) {
  return request({
    url: URL_PUBLIC+'/deleteByIds.do',
    method: 'post',
    params: {
      ids
    }
  })
}
//删除勾选列表
export function deleteByIds(ids) {
  return request({
    url: '/lui_sys/pim/optionGroup/deleteByIds.do',
    method: 'post',
    params: {
      ids
    }
  })
}
