import request from '../../utils/request'
import qs from 'qs'

const URL_PUBLIC = "/lui_sys/xtgl/dsrw/";

export function getTimedtaskData(query) {
  return request({
    url: URL_PUBLIC+'/listJson.do',
    method: 'post',
    params: query
  })
}

export function getTaskClass(query) {
  return request({
    url: URL_PUBLIC+'/getTaskClass.do',
    method: 'post',
    params: query
  })
}

//添加
export function addTimedtaskSave(data) {
  return request({
    url: URL_PUBLIC + '/save.do',
    method: 'post',
    data: qs.stringify(data)
  })
}
//switch 开关
export function editSwitchChange(data) {
  return request({
    url: URL_PUBLIC + '/save.do',
    method: 'post',
    data: qs.stringify(data)
  })
}

//删除
export function deleteTimedtask(ids) {
  return request({
    url: URL_PUBLIC+'/deleteByIds.do',
    method: 'post',
    params: {
      ids
    }
  })
}

//执行一次
export function exeTaskOnece(data) {
  return request({
    url: URL_PUBLIC + '/exeTaskOnece.do',
    method: 'post',
    data: qs.stringify(data)
  })
}

