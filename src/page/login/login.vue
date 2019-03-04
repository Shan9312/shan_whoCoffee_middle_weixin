/**
* Created by c on 2018/3/2.
*/
<template>
  <div class="login">
    <div class="main-content">
      <div class="ms-title">
        后台管理系统
      </div>
      <div class="ms-login el-card">
        <el-form :model="loginForm" :rules="rules" ref="loginForm">
          <el-form-item prop="username">
            <el-input v-model="loginForm.username" @keyup.enter.native="login" placeholder="用户名"></el-input>
          </el-form-item>
          <el-form-item prop="psw">
            <el-input v-model="loginForm.psw" @keyup.enter.native="login" placeholder="密码" type="password"></el-input>
          </el-form-item>
        </el-form>
        <div class="login-btn text-center">
          <el-button size="medium" type="primary" @click="login" >登录</el-button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'login',
    components: {},
    data() {
      return {
        loginForm: {
          username: '',
          psw: ''
        },
        rules: {
          username: [
            {required: true, message: '请输入用户名', trigger: 'blur'},
            {min: 3, max: 20, message: '长度在 3 到 20 个字符', trigger: 'blur'}
          ],
          psw: [
            {required: true, message: '请输入密码', trigger: 'blur'},
            {min: 3, max: 20, message: '长度在 3 到 20 个字符', trigger: 'blur'}
          ]
        }
      }
    },
    methods: {
      /**
       * 登录
       * 写入cookies
       * */
      login() {
        this.$refs['loginForm'].validate((valid) => {
          if (valid) {
            this.$http.post('user/login/platform',
              {
                login_name: this.loginForm.username,
                login_type: 1,
                password: this.loginForm.psw
              }
            )
              .then(res => {
                if (Number(res.data.code) === 10000) {
                  this.$message.success('登录成功')
                  let data = res.data.data
                  let expireDays = 1000 * 60 * 60 * 24 * 15;
                  this.$store.commit('updateUserInfo', data);
                  this.setCookie('token', data.token, expireDays);
                  this.$store.commit('login', data.token);
                  window.localStorage.setItem('userInfo',JSON.stringify(data))
                    let query =  this.$route.query.redirect
                    if (query) {
                      this.$router.push({path:query})
                    }else {
                      this.$router.push({path:'/'})
                    }
                }else {
                  this.$message.error({message:res.data.msg})
                }
              })
            }
        })
      }
    }
  }
</script>

<style lang="less" type="text/less" scoped>
  .login {
    width: 100%;
    height: 100%;
    position: relative;
    background: #2c3e50;
    display: flex;
    align-items: center;
    justify-content: center;
    .main-content {
      .ms-title {
        font-size: 30px;
        color: #ffffff;
        text-align: center;
        margin-bottom: 30px;
      }
      .ms-login {
        padding: 40px;
        width: 380px;
        box-sizing: border-box;
      }
    }
  }
</style>
