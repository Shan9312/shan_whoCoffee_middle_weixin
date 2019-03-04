<template>
  <el-card>
    <el-form :inline="true" :model="Form" :rules="Rules" ref="Form">
      <el-form-item label="IP地址：" prop="ip">
        <el-input v-model="Form.ip" :maxlength="30"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">更新</el-button>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onTest">检测</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>
<script>
export default{
  data () {
    return{
      Form:{
        ip:''
      },
      Rules:{
        ip: [
          { required: true, message: '请输入IP地址', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    onSubmit(){
      this.$refs['Form'].validate((valid) => {
        if (valid) {
          this.$http.post('/room/update/room/config',this.Form)
            .then(result=>{
              if(Number(result.data.code)===10000){
                this.$message({
                  type: 'success',
                  message: '操作成功!'
                });
              }else{
                this.$message({
                  type: 'error',
                  message: result.data.msg
                });
              }
            })
        } else {
          return false;
        }
      });
    },
    onTest(){
      this.$http.get('/test',{
          params:{
            "count": 0,
            "room_id": 1,
            "type": 'ENTRANCE_GUARD',
            "action": 'CLOSE'
          },
          timeout:3000
      })
        .then(result=>{
          if(Number(result.data.code)===10000){
            this.$message({
              type: 'success',
              message: '测试连接成功!'
            });
          }else{
            this.$message({
              type: 'error',
              message: '测试连接失败，请重新检查配置！'
            });
          }
        })
        .catch( (error) =>{
          this.$message({
            type: 'error',
            message: '测试连接失败，请重新检查配置！'
          });
        });
    }
  },
  created () {

  }
}
</script>
<style lang="less" type="text/less" scoped></style>

