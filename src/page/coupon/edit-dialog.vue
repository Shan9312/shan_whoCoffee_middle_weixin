<template>
  <el-dialog title="修改商品" :visible.sync="addFormVisible" width="30%">
    <el-form :model="addForm" :rules="addRules" ref="addForm">
      <el-form-item label="商品名称：" :label-width="formLabelWidth" prop="name">
        <el-input v-model="addForm.name" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="商品分类：" :label-width="formLabelWidth" prop="category_id">
        <el-select v-model="addForm.category_id" placeholder="请选择活动区域" style="width: 100%">
          <el-option v-for="c in categoryList" v-if="c.id!==''" :key="'cateadd'+c.id" :label="c.name" :value="c.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="商品价格：" :label-width="formLabelWidth" prop="price">
        <el-input v-model="addForm.price" type="number" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="商品介绍：" :label-width="formLabelWidth" prop="intro">
        <el-input type="textarea" v-model="addForm.intro" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="商品ICON：" :label-width="formLabelWidth">
        <el-upload
          class="avatar-uploader"
          :action="imgUrl"
          :data="imgData"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :on-exceed="handleExceed"
          :before-upload="beforeAvatarUpload">
          <img v-if="addForm.icon" :src="addForm.icon" class="avatar">
          <i class="el-icon-plus avatar-uploader-icon" v-else ></i>
        </el-upload>
      </el-form-item>
      <el-form-item label="商品图片：" :label-width="formLabelWidth">
        <el-upload
          :action="imgUrl"
          :data="imgData"
          list-type="picture-card"
          :on-preview="handlePictureCardPreview"
          :on-success="handleSuccess"
          :on-exceed="handleExceed"
          :before-upload="beforeAvatarUpload"
          :file-list="fileList"
          :limit="1">
          <i class="el-icon-plus"></i>
        </el-upload>
        <el-dialog :visible.sync="dialogImageVisible" append-to-body >
          <img width="100%" :src="dialogImageUrl" alt="">
        </el-dialog>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="addFormVisible = false">取 消</el-button>
      <el-button type="primary" @click="handleAdd()">确 定</el-button>
    </div>
  </el-dialog>
</template>
<script>
export default{
  name:'edit-dialog',
  props:{
    value:Boolean,
    categoryList:{
      type:Array,
      default:[]
    },
    editData:Object
  },
  data () {
    return{
      token:this.$store.state.token,
      addFormVisible:this.value,
      addForm:{
        id:'',
        name:'',
        category_id:'',
        price:'',
        intro:'',
        pic1:'',
        icon:'',
      },
      fileList:[],
      addRules: {
        name: [
          { required: true, message: '请输入商品名称', trigger: 'blur' }
        ],
        category_id: [
          { required: true, message: '请选择商品分类', trigger: 'change' }
        ],
        price: [
          { required: true, message: '请输入商品价格', trigger: 'blur' }
        ],
        intro: [
          { required: true, message: '请输入商品描述', trigger: 'blur' }
        ]
      },
      formLabelWidth:'100px',
      dialogImageUrl: '',
      dialogImageVisible: false
    }
  },
  watch:{
    value(val){
      this.addFormVisible=val
    },
    addFormVisible(val){
      this.$emit('input',val)
      if(!val){
        this.$refs['addForm'].resetFields();
        for(let i in this.addForm){
          this.addForm[i]=null
        }
        this.fileList.length=0
      }else{
        for(let i in this.addForm){
          if(i==='price')this.addForm[i]=(this.editData[i]/100).toFixed(2);
          else this.addForm[i]=this.editData[i]
        }
        this.fileList.push({url:this.editData.pic1})
      }
    }
  },
  computed:{
    imgUrl(){
      return ''+this.$http.defaults.baseURL+'/upload/product/img'
    },
    imgData(){
      return {token:this.token}
    }
  },
  methods: {
    handleAvatarSuccess(res, file) {
      this.addForm.icon = res.data.originalUrl;
    },
    handleSuccess(response, file, fileList) {
      if(Number(response.code)===10000){
        this.addForm.pic1=response.data.originalUrl
      }else{
        this.$message.error(response.msg);
        fileList.pop();
      }
    },
    handleExceed(file, fileList) {
      this.$message.warning('最多只能上传1张图片!');
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg'||file.type === 'image/jpg'||file.type === 'image/png';
      const isLt2M = file.size / 1024 / 1024 < 3;

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG / PNG 格式!');
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!');
      }
      return isJPG && isLt2M;
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogImageVisible = true;
    },
    handleAdd(){
      this.$refs['addForm'].validate((valid) => {
        if (valid) {
          this.addForm.price=this.addForm.price*100;
          this.$http.post('/product/updateProduct',{list:[this.addForm]})
            .then(result=>{
              if(Number(result.data.code)===10000){
                this.addFormVisible=false;
                this.$message({
                  type: 'success',
                  message: '添加成功!'
                });
                this.$emit('callback')
              }
            })
        }
      });
    },
  },
  created () {

  }
}
</script>
<style lang="less" type="text/less" scoped></style>

