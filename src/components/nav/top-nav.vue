/**
* Created by c on 2018/3/1.
*/
<template>
	<div class="top-nav">
    <!--<div class="logo">-->
     <!--<router-link to="/"  > 智能咖啡管理系统</router-link>-->
    <!--</div>-->
    <div class="left-nav-content">
      <div class="user-info">
        <el-dropdown trigger="click" @command="checkout">
      <span class="el-dropdown-link">
        {{user.login_name}}<i class="el-icon-arrow-down el-icon--right"></i>
      </span>
          <el-dropdown-menu slot="dropdown" >
            <el-dropdown-item command="1">登出</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>
	</div>
</template>
<script>
	export default {
		name: 'top-nav',
		components: {},
		data() {
			return {
			  user:this.$store.state.user
      }
		},
		methods: {
		  /**
       * 登出
       *
       * */
      checkout(val){
        switch (Number(val))
        {
          case 1:
            // 这里是退出登录
            this.$http.post('/user/logout')
              .then(res=>{
                if (Number(res.data.code) === 10000) {
                  this.$message.error('您已退出登录')
                  this.$router.push('/login')
                }
              })
            break ;
        }
      },
      /**
       * 切换菜单显示折叠
       *
       * */
      changeCollapse(){
        let type = this.$store.state.isCollapse
        this.$store.commit('updateCollapse',!type)
        console.log(type)
      }
    },
    mounted(){
    }
	}
</script>

<style lang="less" type="text/less" scoped>
  .top-nav{
    width: 100%;
    height: 60px;
    display: flex;
    align-items: center;
    background: #ffffff;
    color: #ffffff;
    box-sizing: border-box;
    justify-content: space-between;
    .logo a{
      color: #b28850;
      font-size: 18px;
    }
    .logo{
      width: 234px;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      background: #191f28;
    }
    .left-nav-content{
      display: flex;
      flex: 1;
      height: 100%;
      padding-right: 20px;
      align-items: center;
      justify-content: flex-end;
      box-shadow: 0px 0px 4px 0 rgba(148,143,136,.3);
    }
    .user-info{
      .el-dropdown{
        color: #6a3906;
        font-size: 16px;
      }
    }
  }
</style>
