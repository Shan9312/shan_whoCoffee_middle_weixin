/**
 * Created by caoshi on 2018/3/2.
 */
import Vue from 'vue'
import Vuex from 'vuex'
import * as types from './type'
Vue.use(Vuex)
const store = new Vuex.Store({
  state:{
    user:{},
    token:null,
    isCollapse:false,
    orderProductNum:0, // socket 新增点餐订单标识
    orderRoomNum:0, // socket 新增包厢订单标识
    reminder:0,// socket 新增催单标识
    refundNum:0,// socket 新增退款标识
    autoRefundNum:0,// socket 自动退款标识
  },
  mutations:{
    [types.LOGIN]: (state, data) => {
      state.token = data;
    },
    updateUserInfo(state,newUserInfo){
      state.user = newUserInfo
    },
    updateCollapse(state,data){
      state.isCollapse = data
    },
    // 更新点餐订单标识
    updateOrderNum(state){
      state.orderProductNum++
    },
    // 更新包厢订单标识
    updateOrderProductNum(state){
      state.orderRoomNum++
    },
    // 更新催单标识
    updateReminderNum(state){
      state.reminder++
    },
    // 更新退款标识
    updateRefundNum(state){
      state.refundNum++
    },
    // 更新自动退款标识
    updateAutoRefundNum(state){
      state.autoRefundNum++
    }
  }
})
export default store;
