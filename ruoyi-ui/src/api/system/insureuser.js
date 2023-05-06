import request from '@/utils/request'

// 查询保险用户列表
export function listInsureuser(query) {
  return request({
    url: '/system/insureuser/list',
    method: 'get',
    params: query
  })
}

// 查询保险用户详细
export function getInsureuser(insureuserId) {
  return request({
    url: '/system/insureuser/' + insureuserId,
    method: 'get'
  })
}

// 新增保险用户
export function addInsureuser(data) {
  return request({
    url: '/system/insureuser',
    method: 'post',
    data: data
  })
}

// 修改保险用户
export function updateInsureuser(data) {
  return request({
    url: '/system/insureuser',
    method: 'put',
    data: data
  })
}

// 删除保险用户
export function delInsureuser(insureuserId) {
  return request({
    url: '/system/insureuser/' + insureuserId,
    method: 'delete'
  })
}
