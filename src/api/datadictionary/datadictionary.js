import request from '../../../utils/request'

const URL_PUBLIC = "/lui_sys/pim/optionGroup";

export function getData(query) {
  return request({
    url: URL_PUBLIC+'/listJson.do',
    method: 'post',
    params: query
  })
}

export function getListJsonByOgid() {
  return request({
    url: URL_PUBLIC+'/getlistJsonByOgid.do',
    method: 'post'
  })
}
//添加

