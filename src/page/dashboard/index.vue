/**
* Created by c on 2018/3/1.
*/
<template>
	<div class="wrapper">
    <!--<top-nav></top-nav>-->
    <!--<side-menu></side-menu>-->
    <!--<div class="content">-->
      <!--<div class="loading-page"  v-if="$route.path === '/' ">-->
        <!--<img src="../../assets/img/111_03.png" alt=""/>-->
      <!--</div>-->
      <!--<el-scrollbar tag="div" >-->
      <!--<transition name="fade" mode="out-in">-->
        <!--<router-view/>-->
      <!--</transition>-->
      <!--</el-scrollbar>-->
    <!--</div>-->

    <el-container style="height:100vh">
      <!--<el-aside>-->
        <side-menu></side-menu>
      <!--</el-aside>-->
      <el-container>
        <el-header style="padding:0">
          <top-nav></top-nav>
        </el-header>
        <el-main>
          <div class="content">
            <div class="loading-page"  v-if="$route.path === '/' ">
              <img src="../../assets/img/111_03.png" alt=""/>
            </div>
            <el-scrollbar tag="div" >
              <transition name="fade" mode="out-in">
                <router-view/>
              </transition>
            </el-scrollbar>
          </div>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>
<script>
  import sideMenu from '../../components/side-menu/side-menu.vue'
  import topNav from '../../components/nav/top-nav.vue'
	export default {
		name: 'index',
		components: {sideMenu,topNav},
		data() {
			return {
        deposit_status : false
      }
		},
		methods: {

    },
    mounted(){
		  console.log(this.$route.path)
    }
	}
</script>

<style lang="less" type="text/less" scoped>
  .wrapper{
    height: 100%;
    overflow: hidden;
    .content{
      background: none repeat scroll 0 0 #fff;
      /*position: absolute;*/
      /*left: 235px;*/
      /*right: 0;*/
      /*top: 65px;*/
      width: auto;
      /*bottom: 0;*/
      box-sizing: border-box;
      .loading-page{
        display: flex;
        height: 100%;
        align-items: center;
        justify-content: center;
      }
    }

  }
</style>
