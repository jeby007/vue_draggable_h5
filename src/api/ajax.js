import axios from 'axios'
import Vue from 'vue'
import { Notify } from 'vant';
Vue.use(Notify)
// process.env.NODE_ENV == 'development' ? axios.defaults.baseURL = serverConfig.apiUrl : axios.defaults.baseURL = serverConfig.baseUrl
const service = axios.create({withCredentials:true,timeout:5000})
export default function ajax(url, data={}, method='GET') {
  return new Promise(function (resolve, reject) {
    let promise
    // 执行异步ajax请求
    if(method==='GET') {
      promise = service.get(url, {params: data}) // params配置指定的是query参数
    } else {
      promise = service.post(url, data)
    }
    promise.then(response => {
      // 如果成功了, 调用resolve(response.data)
      resolve(response.data)
    }).catch(error => {  // 对所有ajax请求出错做统一处理, 外层就不用再处理错误了
      // 如果失败了, 提示请求后台出错
      //alert('请求错误: '+error.message)
      Notify({type:'warning',message:`请求出错: ${error.message}`})
    })
  })
}
