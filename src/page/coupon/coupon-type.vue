<template>
  <el-card>
    <div slot="header" style="display: flex;justify-content: space-between;align-items: center">
      <span>分类列表</span>
      <div>
        <el-button type="primary" @click="del">批量删除</el-button>
        <el-button type="primary" @click="handleAdd">新增分类</el-button>
      </div>
    </div>
    <el-table
      ref="singleTable"
      :data="tableData"
      style="width: 100%;margin-bottom: 20px"
      @selection-change="handleSelectionChange">
      <el-table-column
        type="selection"
        width="55">
      </el-table-column>
      <el-table-column
        prop="name"
        label="分类名称">
      </el-table-column>
      <el-table-column
        label="操作">
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div style="display: flex;justify-content: flex-end">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[10, 20, 30, 40]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :page-count="pageCount">
      </el-pagination>
    </div>
    <el-dialog title="新增分类" :visible.sync="addFormVisible" width="30%">
      <el-form :model="addForm" :rules="addRules" ref="addForm">
        <el-form-item label="分类名称：" :label-width="formLabelWidth" prop="name">
          <el-input v-model="addForm.name" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="add()" v-if="!addForm.id">确 定</el-button>
        <el-button type="primary" @click="edit()" v-if="addForm.id">确 定</el-button>
      </div>
    </el-dialog>
  </el-card>
</template>
<script>
export default{
  data () {
    return{
      currentPage: 1,
      pageSize:10,
      pageCount:1,
      tableData: [],
      addFormVisible:false,
      addForm:{
        id:null,
        shop_id:1,
        rank:0,
        name:'',
      },
      addRules: {
        name: [
          { required: true, message: '请输入分类名称', trigger: 'blur' }
        ]
      },
      formLabelWidth:'100px',
      delIds:[]
    }
  },
  methods: {
    handleSizeChange(val) {
      this.pageSize=val
      this.getList()
    },
    handleCurrentChange(val) {
      this.currentPage=val
      this.getList()
    },
    handleSelectionChange(val) {
      let list=[];
      val.forEach(n=>{
        list.push(n.id)
      });
      this.delIds = list
    },
    handleAdd(){
      this.addFormVisible=true
      this.addForm.name='';
      this.addForm.id=null;
      this.addForm.rank=0;
    },
    add(){
      this.$refs['addForm'].validate((valid) => {
        if (valid) {
          this.$http.post('/category/create',{list:[this.addForm]})
            .then(result=>{
              if(Number(result.data.code)===10000){
                this.addFormVisible=false;
                this.getList();
                this.$message({
                  type: 'success',
                  message: '添加成功!'
                });
              }
            })
        }
      });
    },
    handleEdit(index, row) {
      this.addFormVisible=true;
      this.addForm.name=row.name;
      this.addForm.id=row.id;
      this.addForm.rank=row.rank;
    },
    edit(){
      this.$refs['addForm'].validate((valid) => {
        if (valid) {
          this.$http.post('/category/update',{list:[this.addForm]})
            .then(result=>{
              if(Number(result.data.code)===10000){
                this.addFormVisible=false;
                this.getList();
                this.$message({
                  type: 'success',
                  message: '修改成功!'
                });
              }
            })
        }
      });
    },
    handleDelete(index, row) {
      this.$confirm('此操作将永久删除该分类, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.delIds=[row.id];
        this.del()
      })
    },
    del(){
      if(this.delIds.length<1){
        this.$message({
          type: 'warning',
          message: '请选择删除对象!'
        });
        return
      }
      this.$http.post('/category/delete',{
        ids:this.delIds
      })
        .then(result=>{
          if(Number(result.data.code)===10000){
            this.getList();
            //this.$refs.singleTable.setCurrentRow();
            this.$message({
              type: 'success',
              message: '删除成功!'
            });
          }
        })
    },
    getList(){
      this.$http.get('/category/get/by/shop',{
        params:{
          shop_id:1,
          pageNo:this.currentPage,
          pageSize:this.pageSize
        }
      })
        .then(result=>{
          this.pageCount=result.data.data.page.totalPage
          this.tableData=result.data.data.results
        })
    }
  },
  created () {
    this.getList()
  }
}
</script>
<style lang="less" type="text/less" scoped></style>

