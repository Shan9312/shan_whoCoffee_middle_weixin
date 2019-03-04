import Vue from 'vue'
import Router from 'vue-router'
import store from '../store/store'
import axios from '../factory-api/http'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: "*",
      redirect: '/page',
    },
    {
      path:'/login',
      name:'login',
      meta:{
        title:'登录页',
        requireAuth: true, // 登录页不许要token
      },
      component: resolve => {
        require(['../page/login/login.vue'], resolve)
      },
    },
    {
      path: '/',
      name: 'index',
      meta:{
        title:'管理后台'
      },
      component: resolve => {
        require(['../page/dashboard/index.vue'], resolve)
      },
      children: [
        {
          // 用户列表
          path:'/user-list',
          name:'user',
          meta:{
            title:'用户列表'
          },
          component: resolve => {
            require(['../page/user/user-list.vue'], resolve)
          }
        },
        {
          // 用户详情
          path:'/user-details',
          name:'details',
          meta:{
            title:'用户详情'
          },
          component: resolve => {
            require(['../page/user/user-details.vue'], resolve)
          }
        },
        {
          // 员工列表
          path:'/employee-list',
          name:'employee',
          meta:{
            title:'员工列表'
          },
          component: resolve => {
            require(['../page/employee/employee-list.vue'], resolve)
          }
        },
        {
          // 员工详情
          path:'/employee-details',
          name:'employee-details',
          meta:{
            title:'员工详情'
          },
          component: resolve => {
            require(['../page/employee/employee-details.vue'], resolve)
          }
        },
        {
          // 订单列表
          path:'/order-list',
          name:'order-list',
          meta:{
            title:'订单列表'
          },
          component: resolve => {
            require(['../page/order/order-list.vue'], resolve)
          }
        },
        {
          // 订单-制作人列表
          path:'/order-list-producer',
          name:'order-list-producer',
          meta:{
            title:'订单列表'
          },
          component: resolve => {
            require(['../page/order/order-list-producer.vue'], resolve)
          }
        },
        {
          //  押金列表
          path:'/deposit-list',
          name:'deposit',
          meta:{
            title:'押金列表'
          },
          component: resolve => {
            require(['../page/deposit/deposit-list.vue'], resolve)
          }
        },
        {  // 包间列表
          path:'/manager-list',
          name:'manager-list',
          meta:{
            title:'包间列表'
          },
          component: resolve => {
            require(['../page/managerRoom/manager-list.vue'], resolve)
          }
        },
        {  // 制作人包间列表
          path:'/manager-list-producer',
          name:'managerRoom',
          meta:{
            title:'制作人包间列表'
          },
          component: resolve => {
            require(['../page/managerRoom/manager-list-producer.vue'], resolve)
          }
        },
        {  // 优惠券分类
          path:'/coupon-type',
          name:'couponType',
          meta:{
            title:'优惠券分类列表'
          },
          component: resolve => {
            require(['../page/coupon/coupon-type.vue'], resolve)
          }
        },
        {  // 优惠券列表
          path:'/coupon-list',
          name:'couponList',
          meta:{
            title:'优惠券列表'
          },
          component: resolve => {
            require(['../page/coupon/coupon-list.vue'], resolve)
          }
        },
        {  // 优惠券历史记录
          path:'/coupon-history',
          name:'couponHistory',
          meta:{
            title:'优惠券历史记录'
          },
          component: resolve => {
            require(['../page/coupon/coupon-history.vue'], resolve)
          }
        },
        {  // IP地址设置
          path:'/set-ip',
          name:'setIp',
          meta:{
            title:'IP地址设置'
          },
          component: resolve => {
            require(['../page/admin/ip.vue'], resolve)
          }
        },
        {  // 商品管理
          path:'/set-shop',
          name:'setShop',
          meta:{
            title:'商品管理'
          },
          component: resolve => {
            require(['../page/admin/shop.vue'], resolve)
          }
        },
      ]
    }
  ]
})
// 路由权限判断
// 获取 cookie
let getCookie = (name) => {
  let arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
  if (arr = document.cookie.match(reg))
    return (arr[2]);
  else
    return null;
}
if (getCookie('token')) {
  store.commit('login',getCookie('token'))
  store.commit('updateUserInfo',JSON.parse(window.localStorage.getItem('userInfo')))
}
router.beforeEach((to, from, next) => {
  document.title = to.meta.title
  // 判断本地存储的用户信息 是否被清掉
  // 判断是否有cookie
    if(!to.meta.requireAuth){
      if (window.localStorage.getItem('userInfo')) {
        if (store.state.token) {
        // 检测token 是否有效
        axios.get('user/check/token')
          .then(res=>{
            if (Number(res.data.code) === 10000) {
              next()
              store.commit('login', getCookie('token'))
              store.commit('updateUserInfo',JSON.parse(window.localStorage.getItem('userInfo')))
            }else {
              //跳转到登录页
              next(
                {
                  path:'/login',
                  query:{redirect:to.fullPath}
                }
              )
            }
          })
        next()
      }else {
        //跳转到登录页
        next(
          {
            path:'/login',
            query:{redirect:to.fullPath}
          }
        )
      }
    }else {
      // 无效
      //跳转到登录页
      next(
        {
          path:'/login',
          query:{redirect:to.fullPath}
        }
      )
    }
    }else {
      next()
    }
})
export default  router

