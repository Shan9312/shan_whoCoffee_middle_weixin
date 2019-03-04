<template>
  <div id="app">
    <router-view/>
    <!--音乐播放器-->
    <audio ref="audioPlay" preload src='../static/102504.mp3'></audio>
  </div>
</template>

<script>
  import appConfig from './appConfig'
export default {
  name: 'App',
  data(){
    return{
      user:this.$store.state.user ,
      dTime: 0 , // 音频长度
      cTime : false ,
      type: '' ,
      randomNum:0 ,
      nowTime: 0,
      musicObj:''
    }
  },
  methods: {
    /**
     * 播放音乐
     *
     * */
    playMusic () {
      if(this.cTime){
        this.musicObj.play()
      }
    },
    /**
     *
     * 三位数的随机数
     *
     * */
    GetRandomNum (Min,Max) {
      var Range = Max - Min
      var Rand = Math.random()
      return(Min + Math.round(Rand * Range))
    },
  },
  mounted(){
    this.$nextTick(()=>{
      this.musicObj = this.$refs.audioPlay
      this.musicObj.oncanplaythrough=()=>{
        this.cTime = true
        this.dTime = Number(this.musicObj.duration) // 4.388571
        this.musicObj.volume=1

        this.playMusic()
      };
      this.musicObj.onplay=()=>{
        this.cTime = false
      };
      this.musicObj.onended=()=>{
        this.cTime = true
      }
    })
    /**
     * WebSocket
     * 订单实时更新逻辑
     *
     * */
    this.randomNum = this.GetRandomNum(1,1000) // 获取一个随机数
    this.nowTime = (new Date()).getTime() // 获取当前的时间戳
    let ws;//websocket实例
    let lockReconnect = false;
    let wsUrl = 'ws://' + appConfig.API.WS_URL + '/websocket/' + this.user.shop_id + '___' + this.user.uuid + ' ' + this.randomNum + ' ' + this.nowTime + ' ';
    let _this = this;
    function createWebSocket(url) {
      if (_this.user) {
        try {
          ws = new WebSocket(url);
          initEventHandle();
        } catch (e) {
          reconnect(url);
        }
      } else {
        console.log('你清除了缓存,拿不到用户信息了')
      }
    }

    function initEventHandle() {
      ws.onclose = function () {  // 当websocket被关闭时触发该事件
        reconnect(wsUrl);
      };
      ws.onerror = function () {  // 当网络发生错误时触发该事件
        reconnect(wsUrl);
      };
      ws.onopen = function () {  // 当网络连接建立时触发该事件
        //心跳检测重置
        heartCheck.reset().start();
      };
      ws.onmessage = function (event) { // 当websocket接收到服务器发来的消息的时触发的事件
        //如果获取到消息，心跳检测重置
        //拿到任何消息都说明当前连接是正常的
        //console.log('ok')
        let data = JSON.parse(event.data)
        _this.type = data.type
        if (data.type === 'REMINDER') {
          // 新的催单
          _this.$store.commit('updateReminderNum')
          _this.$message.success('您有新的催单')
          _this.playMusic ()
        } else if (data.type === 'FOOD_ORDER_CREATE') {
          // 新的点餐订单
          _this.$store.commit('updateOrderNum')
          _this.$message.success('您有新点餐订单')
          _this.playMusic ()
          console.log('订单来了，音乐响了')
        }else if (data.type === 'ROOM_ORDER_CREATE') {
          // 新的包厢订单
          _this.$store.commit('updateOrderProductNum')
          _this.$message.success('您有新的包厢订单')
        } else if (data.type === 'ORDER_REFUND') {
          // 新的退款
          _this.$store.commit('updateRefundNum')
          _this.$message.success('您有新的退款')
        } else if (data.type === 'SYSTEM_REFUND') {
          // 有系统自动押金退款
          _this.$store.commit('updateAutoRefundNum')
          _this.$message.success('您有退款订单自动完成')
        }
        heartCheck.reset().start();
      }
    }

    function reconnect(url) {
      if (lockReconnect) return;
      lockReconnect = true;
      //没连接上会一直重连，设置延迟避免请求过多
      setTimeout(function () {
        createWebSocket(url);
        lockReconnect = false;
      }, 2000);
    }

    //心跳检测
    var heartCheck = {
      timeout: 1000,//60秒
      timeoutObj: null,
      serverTimeoutObj: null,
      reset: function () {
        clearTimeout(this.timeoutObj);
        clearTimeout(this.serverTimeoutObj);
        return this;
      },
      start: function () {
        let startSelf = this;
        this.timeoutObj = setTimeout(function () {
          //这里发送一个心跳，后端收到后，返回一个心跳消息，
          //onmessage拿到返回的心跳就说明连接正常
          let str = '', obj;
          if (_this.user) {
            obj = {data: new Date().getTime(), shop_id: _this.user.shop_id, type: 'BEAT'}
          } else {
            return false
          }
          str = JSON.stringify(obj)
          ws.send(str);
          startSelf.serverTimeoutObj = setTimeout(function () {//如果超过一定时间还没重置，说明后端主动断开了
            ws.close();//如果onclose会执行reconnect，我们执行ws.close()就行了.如果直接执行reconnect 会触发onclose导致重连两次
          }, startSelf.timeout)
        }, this.timeout)
      }
    }
    createWebSocket(wsUrl);

  },
  created () {
  }
}
</script>

<style type="text/less" >
  @import "assets/css/common.less";
  @import "assets/css/reset.css";
#app {
  font-family: -apple-system,PingFang SC,Hiragino Sans GB,Microsoft YaHei,Helvetica Neue,Arial,sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  height: 100%;
}
</style>
