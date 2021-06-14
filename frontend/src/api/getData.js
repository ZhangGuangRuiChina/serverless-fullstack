import request from '@/utils/request'

export function getData(params) {
  return request({
    url: '/serverless/getData',
    method: 'get',
    params
  })
}
