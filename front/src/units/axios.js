import axios from 'axios'

axios.defaults.credentials = false;
axios.defaults.emulateHTTP = true;
axios.defaults.noCookie = true;
axios.defaults.withCredentials = true;
// 超时时间
axios.defaults.timeout = 30000

/**
 * http请求拦截器
 * */
axios
  .interceptors
  .request
  .use(config => {
    config.url ='http://10.1.87.105:3000'+config.url
    console.log(config.url)
    return config
  }, error => {
    return Promise.reject(error)
  })
/**
 * http响应拦截器
 * */
axios
  .interceptors
  .response
  .use(response => {
    console.log(response)
    let data = response.data
    if (data.code === 1) {
      return data.data
    } else {
      return Promise.reject({
        result: data,
        response
      });
    }
  }, error => {
    return Promise.reject(error)
  });

export default axios
