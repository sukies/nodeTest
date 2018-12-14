import axios from './axios'
/**
 * 获取二维码值
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
 * 获取二维码值
 */
export const getClassify = (params) => {
    return axios({
        method: 'get',
        url:'/iconSet/getClassify',
        params: params,
        withCredentials: false
    })
}