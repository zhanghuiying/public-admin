import request from '../../utils/request'
import qs from 'qs'

const URL_PUBLIC = "/lui_sys/xtgl/file/";

export function getAttachmentData(query) {
  return request({
    url: URL_PUBLIC+'/listJson.do',
    method: 'post',
    params: query
  })
}
//添加
export function addAttachmentSave(data) {
  return request({
    url: URL_PUBLIC + '/save.do',
    method: 'post',
    data: qs.stringify(data)
  })
}


