// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store/store'

import ElementUI from 'element-ui' // ele ui 框架
import 'element-ui/lib/theme-chalk/index.css' // ele css
import axios from './factory-api/http'
import {Loading} from 'element-ui'

Vue.config.productionTip = false

/**
 * 加载插件
 *
 * */
Vue.use(ElementUI)
Vue.use(store)
Vue.use(router)
Vue.prototype.$http = axios;
axios.defaults.timeout =  6000;
/**
 *  axios 请求token和相应拦截
 *
 * */
let loading;
axios.interceptors.request.use(
  config => {
    // 如果是检测token有效性的接口，不显示loading
    if (config.url.indexOf('user/check/token') === -1 ) {
      loading = Loading.service({
        lock: true,
        text: '玩命加载中',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      });
    }
    let token = store.state.token
    if (token) {
      // 如果是 get 查询
      if (config.method === 'get') {
        // 如果是登录接口 不传token
        if(config.url.indexOf('user/login/platform') !== -1){
          config.params = {
            ...config.params
          }
        }else {
          config.params = {
            token:token,
            ...config.params
          }
        }
      }else {
        // 这里是 post 请求
        let  data =  config.data
        // 如果是登录接口 不传token
        if(config.url.indexOf('user/login/platform') !== -1){
          config.data = {
            ...data
          }
        }else {
          config.data = {
            token:token,
            ...data
          }
        }
      }

    }
    return config
  },
  error => {
    return Promise.reject(error)
  }
)
/**
 * 响应拦截 处理返回中token无效 统一拦截
 *
 * */
axios.interceptors.response.use(
  response=>{
    setTimeout(()=>{
      if (loading) {
        loading.close()
      }
    },180)
    if (Number(response.data.code) === 20300) {
      ElementUI.Message.error('登录token无效,请重新登录')
      router.push({
        path:'/login',
        query:{redirect:router.currentRoute.fullPath} // 从那个页面跳转
      })
    }
    return response
  },
  error => {
    setTimeout(()=>{
      if (loading) {
        loading.close()
      }
    },180)
    return Promise.reject(error)
  }
)
/**
 * 公共方法
 *
 * */
//设置cookie
Vue.prototype.setCookie = (c_name, value, expiredays) => {
  let exdate = new Date();
  exdate.setDate(exdate.getDate() + expiredays);
  document.cookie = c_name + "=" + escape(value) + ((expiredays === null) ? "" : ";expires=" + exdate.toGMTString())+";path=/";
}
/* eslint-disable no-new */
// 对Date的扩展，将 Date 转化为指定格式的String
// 月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符，
// 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字)
// 例子：
// (new Date()).Format("yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423
// (new Date()).Format("yyyy-M-d h:m:s.S")      ==> 2006-7-2 8:9:4.18
Date.prototype.format =function(format)
{
  let o = {
    "M+" : this.getMonth()+1, //month
    "d+" : this.getDate(), //day
    "h+" : this.getHours(), //hour
    "m+" : this.getMinutes(), //minute
    "s+" : this.getSeconds(), //second
    "q+" : Math.floor((this.getMonth()+3)/3), //quarter
    "S" : this.getMilliseconds() //millisecond
  }
  if(/(y+)/.test(format)) format=format.replace(RegExp.$1,
    (this.getFullYear()+"").substr(4- RegExp.$1.length));
  for(let k in o)if(new RegExp("("+ k +")").test(format))
    format = format.replace(RegExp.$1,
      RegExp.$1.length===1? o[k] :
        ("00"+ o[k]).substr((""+ o[k]).length));
  return format;
}
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
