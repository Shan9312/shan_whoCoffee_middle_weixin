/**
* Created by c on 2018/3/1.
*/
<template>
  <div class="user-list">
    <!--查询条件-->
    <el-card class="box-card">
      <div slot="header">
        <span>用户筛选</span>
      </div>
      <div class="screen-panel">
        <el-form :model="userScreen" label-width="100px">
          <el-row :gutter="20">
            <el-col  :xs="18" :sm="18" :md="9" :lg="9" :xl="5">
              <el-form-item label="用户编号:">
                <el-input v-model="userScreen.user_no" placeholder="请输入用户编号"></el-input>
              </el-form-item>
            </el-col>
            <el-col :xs="18" :sm="18" :md="9" :lg="9" :xl="7">
              <el-form-item label="注册时间:">
                <el-date-picker
                  v-model="createTimeRange"
                  type="daterange"
                  range-separator="至"
                  start-placeholder="开始日期"
                  value-format="timestamp"
                  :picker-options="pickerOptions1"
                  end-placeholder="结束日期">
                </el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :xs="18" :sm="18" :md="9" :lg="9" :xl="7">
              <el-form-item label="最后下单时间:">
                <el-date-picker
                  v-model="orderTimeRange"
                  type="daterange"
                  range-separator="至"
                  start-placeholder="开始日期"
                  value-format="timestamp"
                  :picker-options="pickerOptions2"
                  end-placeholder="结束日期">
                </el-date-picker>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :xs="18" :sm="18" :md="9" :lg="9" :xl="5">
              <el-form-item label="模糊查询:" >
                <el-input v-model="userScreen.info" placeholder="请客户姓名,电话,邮箱"></el-input>
              </el-form-item>
            </el-col>
            <el-col :xs="18" :sm="18" :md="9" :lg="9" :xl="5">
              <el-form-item label="状态:">
                <el-select v-model="userScreen.status" placeholder="请选择用户状态">
                  <el-option
                    v-for="item in userStatus"
                    :key="item.key"
                    :label="item.name"
                    :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :xs="18" :sm="18" :md="9" :lg="9" :xl="4">
              <el-form-item label="用户身份:">
                <el-select v-model="userScreen.user_type" placeholder="请选择用户身份">
                  <el-option
                    v-for="item in userType"
                    :key="item.key"
                    :label="item.name"
                    :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row class="search-btn">
              <el-button type="primary" size="medium" @click="queryUserList" class=" m-r-15" plain>查询</el-button>
              <el-button size="medium" @click="resetQuery" class="" plain>重置</el-button>
          </el-row>
        </el-form>
      </div>
    </el-card>
    <!--查询条件 end-->
    <!--用户列表-->
    <el-card class="m-t-20">
      <div slot="header">
        <span>用户筛选</span>
      </div>
      <div class="table-content">
        <el-scrollbar tag="div">
        <el-table
          :data="tableData"
          style="width: 100%">
          <el-table-column
            label="用户编号"
            width="180">
            <template slot-scope="scope">
              <span>{{ scope.row.user_no }}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="会员卡号"
            width="180">
            <template slot-scope="scope">
              <span>{{ scope.row.vipCardNo }}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="创建时间"
            width="180">
            <template slot-scope="scope">
              <span>{{scope.row.create_at}}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="手机号码"
            width="180"
          >
            <template slot-scope="scope">
              <span>{{scope.row.last_order_phone}}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="客户姓名"
            width="180"
          >
            <template slot-scope="scope">
              <span>{{scope.row.last_order_name}}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="会员等级"
            width="180"
          >
            <template slot-scope="scope">
              <span>{{scope.row.user_level?scope.row.user_level:'0'}}级</span>
            </template>
          </el-table-column>
          <el-table-column
            label="邮箱"
            width="180"
          >
            <template slot-scope="scope">
              <span>{{scope.row.last_order_email}}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="生日"
            width="180"
          >
            <template slot-scope="scope">
              <span>{{scope.row.birthday}}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="性别"
            width="180"
          >
            <template slot-scope="scope">
              <span v-if="scope.row.gender === '0'"></span>
              <span v-if="scope.row.gender === '1'">男</span>
              <span v-if="scope.row.gender === '2'">女</span>
            </template>
          </el-table-column>
          <el-table-column
            label="账户余额"
            width="180"
          >
            <template slot-scope="scope">
              <span>{{((Number(scope.row.coin)+Number(scope.row.point_ticket))/100).toFixed(2)}}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="实充金额"
            width="180"
          >
            <template slot-scope="scope">
              <span>{{((Number(scope.row.coin))/100).toFixed(2)}}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="赠送金额"
            width="180"
          >
            <template slot-scope="scope">
              <span>{{((Number(scope.row.point_ticket))/100).toFixed(2)}}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="订单总数"
            width="180"
          >
            <template slot-scope="scope">
              <span>{{scope.row.order_nums}}单</span>
            </template>
          </el-table-column>
          <el-table-column
            label="使用总时间"
            width="180"
          >
            <template slot-scope="scope">
              <span>{{scope.row.order_time_nums/2}}小时</span>
            </template>
          </el-table-column>
          <el-table-column
            label="消费金额"
            width="180"
          >
            <template slot-scope="scope">
              <span>￥{{scope.row.order_fee/100}}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="账户身份"
            width="180"
          >
            <template slot-scope="scope">
              <span v-if="scope.row.user_type === '1'">新会员</span>
              <span v-if="scope.row.user_type === '2'">老会员</span>
              <span v-if="scope.row.user_type === '3'">不活跃会员</span>
            </template>
          </el-table-column>
          <el-table-column
            label="状态"
            width="180"
          >
            <template slot-scope="scope">
              <el-tag v-if="scope.row.status == 1 " type="info">正常</el-tag>
              <el-tag v-if="scope.row.status == 0 " type="warning">失效</el-tag>
            </template>
          </el-table-column>
          <el-table-column
            label="最近下单时间"
            width="180"
          >
            <template slot-scope="scope">
              <span>{{scope.row.create_at}}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="最近下单门店"
            width="240"
          >
            <template slot-scope="scope">
              <span>{{scope.row.shop_name}}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="操作"
            width="250"
          >
            <template slot-scope="scope">
              <router-link :to="{path:'/user-details',query:{id:1}}">
              <el-button
                size="mini"
                plain
                >查看</el-button>
              </router-link>
              <el-button
                size="mini"
                type="info"
                plain
                v-if="roleType === '8'"
                @click="openDialog(scope.row)"
                >编辑余额</el-button>
              <el-button
                size="mini"
                type="danger"
                plain
              >停用</el-button>
            </template>
          </el-table-column>
        </el-table>
        </el-scrollbar>
      </div>
      <div class="table-bottom">
        <div class="total-setting">
          <div class="total-num">
            共
            <span>
             {{result.page.totalCount}}
            </span>
            条记录
          </div>
          <div class="display-num">
            每页显示
            <el-select v-model="displayNum" placeholder="请选择每页显示条数"  @change="setPageSize">
              <el-option
                v-for="item in displayNumList"
                :key="item.num"
                :label="item.num"
                :value="item.num">
              </el-option>
            </el-select>
            条
          </div>
        </div>
        <div class="pagination" v-if="result.results.length > 0">
          <el-pagination
            background
            layout="prev, pager, next"
            @current-change="handleCurrentChange"
            :page-size="result.page.pageSize"
            :total="result.page.totalCount">
          </el-pagination>
        </div>
      </div>
    </el-card>
    <!--用户列表 end-->
    <el-dialog
      title="修改用户余额"
      :visible.sync="dialogVisible"
      width="30%">
      <el-form ref="form" :model="form" label-width="80px" :rules="rules">
        <!--<el-form-item label="充值金额" prop="coin">-->
          <!--<el-input v-model="form.coin"></el-input>-->
        <!--</el-form-item>-->
        <el-form-item label="赠送金额" prop="pointTicket">
          <el-input v-model="form.pointTicket"></el-input>
        </el-form-item>
      </el-form>
      <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="confirmChange">确 定</el-button>
    </el-dialog>

  </div>
</template>
<script>
  export default {
    name: 'user-list',
    components: {},
    data() {
      const checkNum = (rule, value, callback) => {
        if (value === '') {
           callback(new Error('余额不能为空'));
        } else if (!/^[+]{0,1}(\d+)$|^[+]{0,1}(\d+\.\d+)$/.test(value)) {
           callback(new  Error('请输入正确的金额'))
        } else {
          callback()
        }
      };

      return {
        // 时间选择 return
        pickerOptions1: {
          onPick: (time) => {
            if (time.maxDate && time.minDate) {
              let start = new Date(time.minDate).format('yyyy-MM-dd')
              let end = new Date(time.maxDate).format('yyyy-MM-dd')
              this.userScreen.create_start = start
              this.userScreen.create_end  = end
            }
          }
        },
        pickerOptions2: {
          onPick: (time) => {
            if (time.maxDate && time.minDate) {
              let start = new Date(time.minDate).format('yyyy-MM-dd')
              let end = new Date(time.maxDate).format('yyyy-MM-dd')
              this.userScreen.last_order_start = start
              this.userScreen.last_order_end  = end
            }
          }
        },
        displayNumList:[{num:5},{num:10},{num:15},{num:20}],
        displayNum:5,
        currentPage:1,
        createTimeRange:null,
        orderTimeRange:null,
        userScreen:{
          user_no:'',//用户编号
          time:'',//注册时间
          create_end:'',//用户创建时间结束
          create_start:'',//用户创建时间开始
          last_order_end:'', // 最后一次订单结束
          last_order_start:'', // 最后一次订单开始
          info:'',//模糊查询
          status:'',//状态值
          user_type: '',
        },
        userStatus:[{name:'失效',value:0,key:1},{name:'正常',value:1,key:2}],
        tableData: [],
        result:{
          page: {totalCount: 1},
          results: []
        },
        roleType: this.$store.state.user.role_id, // 用户类型
        dialogVisible:false,
        form: {
          coin: 0 ,
          pointTicket: 0,
          userId: ''
        },
        userType: [
          {name: '新会员', value: 1, key: 1},
          {name: '老会员', value: 2, key: 2},
          {name: '不活跃会员', value: 3, key: 3},
        ],
        rules:{
          coin:{ required: true, trigger: 'change' ,validator: checkNum,},
          pointTicket:{ required: true, trigger: 'change',validator: checkNum, },
        }
      }
    },
    methods: {
      /**
       * 确认修改余额
       *
       * */
      confirmChange() {
        this.$refs['form'].validate((valid) => {
          if (valid) {
            this.form.pointTicket = this.form.pointTicket*100
            this.$http.post('/user/things/update',this.form)
              .then((res)=>{
                if (Number(res.data.code) === 10000 ) {
                  this.dialogVisible = false
                  this.$message.success('修改成功')
                  this.getUserList()
                  this.$http.post('user/things/insert/boss/log',this.form)
                    .then((res)=>{
                      console.log(res)
                    })
                }
              })
          }
        })
      },
      /**
       * 打开弹窗
       *
       * */
      openDialog(item) {
        this.form.coin = Number(item.coin)/100
        this.form.pointTicket = Number(item.point_ticket)/100
        this.form.userId =  item.id
        this.dialogVisible = true
      },
      /**
       * 重置查询条件
       *
       * */
      resetQuery(){
        for (let i in this.userScreen){
          this.userScreen[i] = ''
        }
        this.orderTimeRange = null,
        this.createTimeRange = null,
        this.currentPage = 1
        this.getUserList()
      },
      /**
       * 按照筛选条件查询用户列表
       *
       * */
      queryUserList(){
        this.currentPage = 1
        this.getUserList()
      },
      /**
       * 切换分页
       *
       * */
      handleCurrentChange(val){
        this.currentPage = val
        this.getUserList()
      },
      /**
       * 查询用户列表
       *
       * */
      getUserList(){
        this.$http.get('user/get/consumer/user?pageSize=' + this.displayNum + '&pageNo=' + this.currentPage + '',
          {
            params:this.userScreen
          }
        )
          .then(res => {
            if (Number(res.data.code) === 10000) {
              console.log(res.data.data)
              this.tableData = res.data.data.results
              this.result = res.data.data
            }
          })
          .catch(err=>{
            console.log(err)
          })
      },
      /**
       *
       * 修改每页显示条数
       * 默认五个
       *
       * */
      setPageSize(val) {
        this.displayNum = val
        this.currentPage = 1
        this.getUserList()
      },
    },
    mounted(){
      this.getUserList()
      console.log(this.$store.state)
    }
  }
</script>

<style lang="less" type="text/less" scoped>
  .user-list {
    .table-bottom{
      padding-top: 20px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      .total-setting{
        display: flex;
        font-size: 14px;
        align-items: center;
        .total-num{
          margin-right: 15px;
          span{
            color: #409EFF;
          }
        }
      }
    }
  }
</style>
