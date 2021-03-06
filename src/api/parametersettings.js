import request from '../../utils/request'
import qs from 'qs'

const URL_PUBLIC = "/lui_sys/xtgl/info";

export function getParameterData(query) {
  return request({
    url: URL_PUBLIC+'/listJson.do',
    method: 'post',
    params: query
  })
}
export function getSysinfoKeyMap(query) {
  return request({
    url: URL_PUBLIC+'/getSysinfoKeyMap.do',
    method: 'post',
    params: query
  })
}

//添加参数
export function addParameterSave(data) {
  return request({
    url: URL_PUBLIC + '/save.do',
    method: 'post',
    data: qs.stringify(data)
  })
}
//添加参数
export function addsystemSave(CODE) {
  return request({
    url: URL_PUBLIC + '/getObj.do',
    method: 'post',
    params: {
      CODE
    }
  })
}

//添加系统参数设置
export function addSystemParameterSave(data) {
  return request({
    url: URL_PUBLIC + '/save.do',
    method: 'post',
    data: qs.stringify(data)
  })
}
//删除/勾选删除
export function deleteParameter(ids) {
  return request({
    url: URL_PUBLIC+'/deleteByIds.do',
    method: 'post',
    params: {
      ids
    }
  })
}



