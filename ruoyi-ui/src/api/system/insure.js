import request from '@/utils/request'

// 查询保险列表
export function listInsure(query) {
  return request({
    url: '/system/insure/list',
    method: 'get',
    params: query
  })
}

// 查询保险详细
export function getInsure(insureId) {
  return request({
    url: '/system/insure/' + insureId,
    method: 'get'
  })
}

// 新增保险
export function addInsure(data) {
  return request({
    url: '/system/insure',
    method: 'post',
    data: data
  })
}

// 修改保险
export function updateInsure(data) {
  return request({
    url: '/system/insure',
    method: 'put',
    data: data
  })
}

// 删除保险
export function delInsure(insureId) {
  return request({
    url: '/system/insure/' + insureId,
    method: 'delete'
  })
}

// // 柱形图数据
// export function zhuxing() {
//   return request({
//     url: '/system/insure/echarts/zhuxing',
//     method: 'get'
//   })
// }
// // 饼图数据
// export function bingtu() {
//   return request({
//     url: '/system/insure/echarts/bingtu',
//     method: 'get'
//   })
// }
// // 散点图数据
// export function sandian() {
//   return request({
//     url: '/system/insure/echarts/sandian',
//     method: 'get'
//   })
// }
