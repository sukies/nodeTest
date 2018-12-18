import axios from './axios'
/**
 * 搜索
 */
export const search = (params) => {
  return axios({
    method: 'get',
    url:'/iconSet/search',
    params: params,
    withCredentials: false
  })
}

/**
 * 获取分类内容
 */
export const getClassify = (params) => {
    return axios({
        method: 'get',
        url:'/iconSet/getClassify',
        params: params,
        withCredentials: false
    })
}
/**
 * 添加图片
 */
export const addIcon = (params) => {
    return axios({
        method: 'get',
        url:'/iconSet/addIcon',
        params: params,
        withCredentials: false
    })
}