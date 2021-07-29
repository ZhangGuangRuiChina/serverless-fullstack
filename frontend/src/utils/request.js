import axios from 'axios'
import { Message } from 'element-ui'
import { hostname, serverUrl} from './serverEnv.js'

// create an axios instance
const service = axios.create({
  
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 5000 // request timeout
})

// request interceptor
service.interceptors.request.use(
  config => {
    // do something before request is sent
    const url = config.url;
    
    // 本地开发使用本地代理服务
    if (hostname === 'localhost') {
      config.url = `/sls${url}`
    } else {
      config.url = serverUrl + url;
    }
    return config
  },
  error => {
    // do something with request error
    console.log(error) // for debug
    return Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  /**
   * If you want to get http information such as headers or status
   * Please return  response => response
  */

  /**
   * Determine the request status by custom code
   * Here is just an example
   * You can also judge the status by HTTP Status Code
   */
  response => {
    
    if (response.status !== 200) {
      Message({ 
        message: response.statusText || 'Error',
        type: 'error',
        duration: 5 * 1000
      })

      return Promise.reject(new Error(response.statusText || 'Error'))
      
    } else {
      return response
    }
  },
  error => {
    console.log('err' + error) // for debug
    Message({
      message: error.statusText,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

export default service
