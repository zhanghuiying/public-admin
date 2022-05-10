import request from '../../utils/request'

const URL_PUBLIC = "/lui_sys/generateCode";

export function getCodeData(query) {
  return request({
    url: URL_PUBLIC+'/listJson.do',
    method: 'post',
    params: query
  })
}




