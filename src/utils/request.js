import store from '@/store'
import axios from 'axios'
import { Toast } from 'vant'
// 创建实例
const instance = axios.create({
  baseURL: 'http://smart-shop.itheima.net/index.php?s=/api',
  timeout: 5000,
  headers: {
    platform: 'H5'
  }
})

// 配置 - 配置请求-响应拦截器
// 请求拦截器
instance.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  // 开启laoding，禁止背景点击（节流处理，防止多次无效触发）
  // Toast 默认单例模式，同时只能存在一个
  Toast.loading({
    message: '加载中',
    forbidClick: true, // 进制背景中点击
    loadingType: 'spinner', // 配置loading图标
    duration: 0 // 不会自动消失
  })

  // 只要有 token，就在请求时携带，便于请求需要授权的接口
  const token = store.getters.token
  if (token) {
    config.headers['Access-Token'] = token
  }

  return config
}, function (error) {
  return Promise.reject(error)
})

// 响应拦截器
instance.interceptors.response.use(function (response) {
  // 对响应数据做些什么
  const res = response.data
  if (res.status !== 200) {
    // 给提示 this.$toast 不可以，不是 vue 的使用环境
    Toast(res.message)
    // 派出一个错误的 promise
    return Promise.reject(res.message)
  } else {
    // 正确情况，直接核心业务逻辑，清除 loading 效果
    Toast.clear()
  }
  return res
}, function (error) {
  return Promise.reject(error)
})

// 导出配置好的实例
export default instance
