<template>
  <el-card>
    <div slot="header" style="display: flex;justify-content: space-between;align-items: center">
      <span>商品列表</span>
      <div>
        <el-button type="primary" @click="addFormVisible=true">新增商品</el-button>
        <el-select v-model="statuId" placeholder="请选择" @change="getList">
          <el-option :key="'statu'" label="全部状态" value=""></el-option>
          <el-option v-for="(s,i) in status" :key="'statu'+i" :label="s" :value="i"></el-option>
        </el-select>
        <el-select v-model="categoryId" placeholder="请选择" @change="getList">
          <el-option v-for="cate in CategoryList" :key="'cate'+cate.id" :label="cate.name" :value="cate.id"></el-option>
        </el-select>
        <el-input placeholder="请输入商品名称" v-model="searchValue" class="input-with-select" style="width: 300px" @change="getList">
          <el-button slot="append" icon="el-icon-search"></el-button>
        </el-input>
      </div>
    </div>
    <el-table
      :data="tableData"
      style="width: 100%;margin-bottom: 20px"
      @selection-change="handleSelectionChange">
      <el-table-column
        type="selection"
        width="55">
      </el-table-column>
      <el-table-column
        label="商品ICON"
        width="100">
        <template slot-scope="scope">
          <img :src="scope.row.icon" alt="" width="60" @click="lokImg(scope.row.icon)">
        </template>
      </el-table-column>
      <el-table-column
        label="商品图片"
        width="auto">
        <template slot-scope="scope">
          <img :src="scope.row.pic1" alt="" width="60" @click="lokImg(scope.row.pic1)">
        </template>
      </el-table-column>
      <el-table-column
        label="商品名称"
        width="auto">
        <template slot-scope="scope">
          <router-link to="stock-list" style="color: #333;font-weight: bold">{{scope.row.name}}</router-link>
        </template>
      </el-table-column>
      <el-table-column
        label="商品价格"
        width="auto">
        <template slot-scope="scope">
          <span>{{(scope.row.price/100).toFixed(2)}}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="category_name"
        label="商品分类"
        width="auto">
      </el-table-column>
      <el-table-column
        label="商品介绍"
        width="300">
        <template slot-scope="scope">
          <el-tooltip effect="light" :content="scope.row.intro" placement="bottom">
            <span>{{scope.row.intro.length>20?scope.row.intro.substring(0,20)+'...':scope.row.intro}}</span>
          </el-tooltip>
        </template>
      </el-table-column>
      <el-table-column
        label="状态"
        width="auto">
        <template slot-scope="scope">
          <span>{{status[Number(scope.row.state)]}}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="操作"
        width="300">
        <template slot-scope="scope">
          <el-button v-if="scope.row.state!=='1'" size="mini" @click="handleShelve(scope.$index, scope.row, 1)">上架</el-button>
          <el-button v-if="scope.row.state==='2'" size="mini" @click="handleShelve(scope.$index, scope.row, 0)">下架</el-button>
          <el-button v-if="scope.row.state==='1'" size="mini" @click="handleShelve(scope.$index, scope.row, 2)">冻结</el-button>
          <el-button v-if="scope.row.state!=='1'" size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button v-if="scope.row.state!=='1'" size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
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
    <add-dialog v-model="addFormVisible" @callback="getList" :category-list="CategoryList"></add-dialog>
    <edit-dialog v-model="editFormVisible" @callback="getList" :category-list="CategoryList" :edit-data="editData"></edit-dialog>
    <el-dialog :visible.sync="dialogImageVisible" append-to-body top="5vh">
      <img width="100%" :src="dialogImageUrl" alt="">
    </el-dialog>
  </el-card>
</template>
<script>
import addDialog from './add-dialog.vue'
import editDialog from './edit-dialog.vue'
export default{
  components:{addDialog,editDialog},
  data () {
    return{
      token:this.$store.state.token,
      currentPage: 1,
      pageSize:10,
      pageCount:1,
      categoryId:'',
      tableData: [],
      CategoryList:[],
      statuId:'',
      status:['已下架','已上架','冻结中'],
      searchValue:'',
      delIds: [],
      addFormVisible:false,
      editFormVisible:false,
      editData:{},
      dialogImageVisible:false,
      dialogImageUrl:''
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
    handleEdit(index, row) {
      this.editData=row;
      this.editFormVisible=true
    },
    lokImg(url) {
      this.dialogImageUrl = url;
      this.dialogImageVisible = true;
    },
    //商品删除
    handleDelete(index, row) {
      this.$confirm('此操作将永久删除该商品, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$http.post('/product/deleteProduct',{ids:[row.id]})
          .then(result=>{
            if(Number(result.data.code)===10000){
              this.getList();
              this.$message.success(`删除成功!`);
            }else {
              this.$message.error(result.data.msg)
            }
          }).catch()
      }).catch();
    },
    getList(){
      this.$http.get('/product/fuzzyQueryProduct',{
        params:{
          shop_id:1,
          name:this.searchValue,
          state:this.statuId,
          category_id:this.categoryId,
          pageNo:this.currentPage,
          pageSize:this.pageSize
        }
      })
        .then(result=>{
          this.pageCount=result.data.data.page.totalPage
          this.tableData=result.data.data.results
        })
    },
    getCategoryList(){
      this.$http.get('/category/get/by/shop',{
        params:{
          shop_id:1,
          pageNo:1,
          pageSize:10000
        }
      })
        .then(result=>{
          this.CategoryList=result.data.data.results;
          this.CategoryList.unshift({id:'',name:'全部'})
        })
    },
    //中台控制商品上下架
    handleShelve(index,row,state){
      let stateStr=this.status[state];
      this.$confirm(`此操作将该商品${stateStr}, 是否继续?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$http.post('/product/productShelve',{product_ids:[row.id],state:state})
          .then(result=>{
            if(Number(result.data.code)===10000){
              this.getList();
              this.$message.success(`${stateStr}成功!`);
            }else {
              this.$message.error(result.data.msg)
            }
          }).catch()
      }).catch()
    },
  },
  created () {
    this.getCategoryList();
    this.getList()
  }
}
</script>
<style lang="less" type="text/less" scoped></style>

