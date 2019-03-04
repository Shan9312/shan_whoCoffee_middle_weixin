/**
* Created by c on 2018/3/1.
*/
<template>
	<div class="side-menu">
    <el-menu
      :default-active="$route.path"
      class="el-menu-vertical-demo"
      background-color="#191f28"
      text-color="#fff"
      :collapse="isCollapse"
      active-text-color="#cfa972">
      <div class="logo">
        <img src="../../assets/img/login_logo.png" alt="" class="imgs">
        <i class="btn el-icon-tickets" @click="isCollapse=!isCollapse" ></i>
        <router-link to="/" v-if="!isCollapse"> 智能咖啡管理系统</router-link>
      </div>
      <el-submenu index="1" v-if="info.role_id!=2&&info.role_id!=7">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>用户模块</span>
        </template>
        <router-link to="/user-list">
          <el-menu-item  index="/user-list">
           用户列表
          </el-menu-item>
        </router-link>
      </el-submenu>
      <el-submenu index="2" v-if="info.role_id!=2&&info.role_id!=7">
        <template slot="title">
          <i class="el-icon-setting"></i>
          <span>员工模块</span>
        </template>
        <router-link to="/employee-list">
        <el-menu-item  index="/employee-list">
          员工列表
        </el-menu-item>
        </router-link>
      </el-submenu>
      <el-submenu index="3">
        <template slot="title">
          <i class="el-icon-menu"></i>
          <span >订单模块</span>
        </template>
        <router-link to="/order-list">
          <el-menu-item  index="/order-list">
            订单列表
          </el-menu-item>
        </router-link>
          <router-link to="/order-list-producer">
          <el-menu-item  index="/order-list-producer">
            制作人员列表
          </el-menu-item>
        </router-link>
      </el-submenu>
      <!--增加 包间管理-->
      <el-submenu index="4">
        <template slot="title">
          <i class="el-icon-menu"></i>
          <span>包间模块</span>
        </template>
        <router-link to="/manager-list">
          <el-menu-item  index="/manager-list">
            包间列表
          </el-menu-item>
        </router-link>
        <router-link to="/manager-list-producer">
          <el-menu-item  index="/manager-list-producer">
            制作人包间列表
          </el-menu-item>
        </router-link>
      </el-submenu>
      <!--增加 包间管理-->
      <!--增加 押金 模块-->
      <el-submenu index="5" v-if="info.role_id!=2">
        <template slot="title">
          <i class="el-icon-menu"></i>
          <span>审核模块</span>
        </template>
        <router-link to="/deposit-list">
          <el-menu-item  index="/deposit-list">
            退款审核
          </el-menu-item>
        </router-link>
      </el-submenu>
      <!--优惠券 模块-->
      <el-submenu index="6" v-if="0">
        <template slot="title">
          <i class="el-icon-menu"></i>
          <span>优惠券模块</span>
        </template>
        <router-link to="/coupon-type">
          <el-menu-item  index="/coupon-type">
            优惠券分类
          </el-menu-item>
        </router-link>
        <router-link to="/coupon-list">
          <el-menu-item  index="/coupon-list">
            优惠券列表
          </el-menu-item>
        </router-link>
        <router-link to="/coupon-history">
          <el-menu-item  index="/coupon-history">
            优惠券使用记录
          </el-menu-item>
        </router-link>
      </el-submenu>
      <!--管理员模块-->
      <el-submenu index="7" v-if="info.role_id==7||info.role_id==8||info.role_id==9">
        <template slot="title">
          <i class="el-icon-menu"></i>
          <span>管理员模块</span>
        </template>
        <router-link to="/set-ip">
          <el-menu-item  index="/set-ip">
            IP地址设置
          </el-menu-item>
        </router-link>
        <router-link to="/set-shop" v-if="info.role_id==9">
          <el-menu-item  index="/set-shop">
            商品管理
          </el-menu-item>
        </router-link>
      </el-submenu>
    </el-menu>
	</div>
</template>
<script>
	export default {
		name: 'side-menu',
		components: {},
		data() {
			return {
        info:this.$store.state.user,
        isCollapse:false
      }
		},
    computed:{
//      isCollapse(){
//        return this.$store.state.isCollapse
//      }
    },
    created(){
		    //console.log(this.info)
    }
	}
</script>

<style lang="less" type="text/less" >
  .side-menu{
    /*position: fixed;*/
    /*top: 0;*/
    /*left: 0;*/
    /*width: 235px;*/
    height: 100%;
    text-align:left;
    &::before{
      display: block;
      width:30px;
      height:30px;
      background: #6a3906;
      position: absolute;
      top:15px;
      right:-40px;
      content: '';
    }
    .el-menu--inline{
      .el-menu-item{
        padding-left: 54px !important;
      }
    }
    .el-menu-vertical-demo:not(.el-menu--collapse) {
      width: 235px;
      min-height: 500px;
    }
    .logo{
      height: 60px;
      line-height: 60px;
      text-align: center;
      a{
        color: #b28850!important;
        font-size: 18px;
      }
      .imgs{
        width: 35px;
        text-align: center;
        /*margin-right: 10px;*/
        vertical-align: middle;
      }
      .btn{
        width: 30px;
        height: 30px;
        /*border:1px solid red;*/
        font-size: 30px;
        display: inline-block;
        color: #6a3906;
        margin-top:15px;
        position: absolute;
        right: -41px;
      }
    }
    ul{
      height: 100%;
      a{
        color: #ffffff;
      }
      li.is-active{
        a{
          color: #cfa972;
        }
      }
    }
  }
</style>
