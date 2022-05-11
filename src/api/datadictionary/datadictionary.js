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

export function getListJsonByOgid() {
  return request({
    url: URL_PUBLIC+'/listJsonByOgid.do',
    method: 'post'
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