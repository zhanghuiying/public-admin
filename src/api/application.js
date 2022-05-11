import request from '../../utils/request'
import qs from 'qs'

const URL_PUBLIC = "/lui_sys/xtgl/app/";

export function getAppData(query) {
  return request({
    url: URL_PUBLIC+'/listJson.do',
    method: 'post',
    params: query
  })
}

//添加
export function addAppSave(data) {
  return request({
    url: URL_PUBLIC + '/save.do',
    method: 'post',
    data: qs.stringify(data)
  })
}

//switch 开关
export function updateStatusByIds(data) {
  return request({
    url: URL_PUBLIC + '/updateStatusByIds.do',
    method: 'post',
    data: qs.stringify(data)
  })
}

//删除
export function deleteApp(ids) {
  return request({
    url: URL_PUBLIC+'/deleteByIds.do',
    method: 'post',
    params: {
      ids
    }
  })
}


