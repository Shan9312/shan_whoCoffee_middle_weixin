<template>
  <el-card>
    <div slot="header" style="display: flex;justify-content: space-between;align-items: center">
      <span>商品列表</span>
      <div>
        <el-button type="primary" @click="handle(1)">上架</el-button>
        <el-button type="primary" @click="handle(0)">下架</el-button>
        <el-input placeholder="请输入商品名称" v-model="search" class="input-with-select" style="width: 300px;margin-left: 10px;" @change="getList">
          <el-button slot="append" icon="el-icon-search"></el-button>
        </el-input>
      </div>
    </div>
    <el-table
      ref="singleTable"
      :data="tableData"
      style="width: 100%;margin-bottom: 20px"
      @selection-change="handleSelectionChange"
      @filter-change="handleFilterChange">
      <el-table-column
        type="selection"
        width="55">
      </el-table-column>
      <el-table-column
        label="商品ICON"
        width="100">
        <template slot-scope="scope">
          <img :src="scope.row.icon" alt="" width="60">
        </template>
      </el-table-column>
      <el-table-column
        prop="name"
        label="商品名称">
      </el-table-column>
      <el-table-column
        prop="intro"
        label="商品描述">
      </el-table-column>
      <el-table-column
        prop="quantity"
        label="商品数量">
      </el-table-column>
      <el-table-column
        prop="valid"
        label="状态"
        column-key="valid"
        :filters="[{ text: '上架', value: 1 }, { text: '下架', value: 0 }]"
        :filter-multiple="false"
        filter-placement="bottom">
        <template slot-scope="scope">
          <el-tag
            :type="Number(scope.row.valid) === 1 ? 'primary' : 'success'"
            close-transition
          >{{status[scope.row.valid]}}</el-tag>
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
  </el-card>
</template>
<script>
export default{
  data () {
    return{
      status:['下架','上架'],
      valid:'',
      currentPage: 1,
      pageSize:10,
      pageCount:1,
      search:'',
      tableData: [],
      selectIds:[]
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
      this.selectIds = list
    },
    handleFilterChange(filters){
      this.valid=filters.valid[0]
      this.getList()
    },
    handle(valid){
      if(this.selectIds.length<1){
        this.$message({
          type: 'warning',
          message: '请选择操作对象!'
        });
        return
      }
      this.$http.post('/product/update/product/status',{
        ids:this.selectIds.join(','),
        valid:valid
      })
        .then(result=>{
          if(Number(result.data.code)===10000){
            this.getList();
            this.$message({
              type: 'success',
              message: '操作成功!'
            });
          }
        })
    },
    getList(){
      this.$http.get('/product/get/product/list',{
        params:{
          valid:this.valid,
          product_name:this.search,
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

