import request from '../../utils/request'

const URL_PUBLIC = "/lui_sys/generateCode";

export function getCodeData(query) {
  return request({
    url: URL_PUBLIC+'/listJson.do',
    method: 'post',
    params: query
  })
}
//添加生成代码
export function addCodeProduction(data) {
  return request({
    url: URL_PUBLIC + '!code.action',
    method: 'post',
    data: qs.stringify(data)
  })
}



