/**
* Created by c on 2018/3/1.
*/
<template>
  <div class="user-list">
    <!--查询条件-->
    <el-card class="box-card">
      <div slot="header">
        <span>订单筛选</span>
      </div>
      <div class="screen-panel">
        <el-form :model="orderScreen" label-width="100px">
          <el-row :gutter="20">
            <el-col :xs="18" :sm="18" :md="9" :lg="9" :xl="4">
              <el-form-item label="员工姓名:">
                <el-input v-model="orderScreen.staff_name"></el-input>
              </el-form-item>
            </el-col>
            <el-col :xs="18" :sm="18" :md="9" :lg="9" :xl="4">
              <el-form-item label="员工工号:">
                <el-input v-model="orderScreen.staff_code"></el-input>
              </el-form-item>
            </el-col>
            <el-col :xs="18" :sm="18" :md="9" :lg="9" :xl="4">
              <el-form-item label="订单状态:">
                <el-select v-model="orderScreen.status" placeholder="请选择用户状态">
                  <el-option
                    v-for="item in userStatus"
                    :key="item.key"
                    :label="item.name"
                    :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :xs="18" :sm="18" :md="9" :lg="9" :xl="8">
              <el-form-item label="下单时间:">
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
            <el-col :xs="18" :sm="18" :md="9" :lg="9" :xl="4">
              <el-form-item label="订单编号:">
                <el-input v-model="orderScreen.order_no"></el-input>
              </el-form-item>
            </el-col>
            <el-col :xs="18" :sm="18" :md="9" :lg="9" :xl="4">
              <el-form-item label="包间:">
                <el-select v-model="orderScreen.room_id" placeholder="请选择用户状态">
                  <el-option
                    v-for="item in roomList"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :xs="18" :sm="18" :md="9" :lg="9" :xl="8">
              <el-form-item label="预约时间:">
                <el-date-picker
                  v-model="roomTimeRange"
                  type="daterange"
                  range-separator="至"
                  start-placeholder="开始日期"
                  value-format="timestamp"
                  :picker-options="pickerOptions1"
                  end-placeholder="结束日期">
                </el-date-picker>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :xs="18" :sm="18" :md="9" :lg="9" :xl="4">
              <el-form-item label="门店名称:">
                <el-input v-model="orderScreen.shop_name"></el-input>
              </el-form-item>
            </el-col>
            <el-col :xs="18" :sm="18" :md="9" :lg="9" :xl="4">
              <el-form-item label="联系电话:">
                <el-input v-model="orderScreen.contact_phone"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-button type="primary" size="medium" @click="queryUserList" plain class=" m-r15">查询</el-button>
            <el-button size="medium" @click="resetQuery"  plain>重置</el-button>
          </el-row>
        </el-form>
      </div>
    </el-card>
    <!--查询条件 end-->
    <!--用户列表-->
    <el-card class="m-t-20">
      <div slot="header">
        <span>包间列表</span>
      </div>
      <div class="table-content">
        <el-scrollbar tag="div">
         <el-table
          :data="tableData"
          style="width: 100%"
          :row-class-name="tableRowClassName"
        >
           <el-table-column
             label="操作"
             width="350"
           >
             <template slot-scope="scope">
               <el-button
                 size="mini"
                 type="primary"
               >有物损
               </el-button>
               <el-button
                 size="mini"
                 type="success"
               >无物损
               </el-button>
               <el-button
                 size="mini"
                 type="danger"
                 @click="cancelOrder(scope.row.id)"
                 :disabled="scope.row.status != 3 && scope.row.status != 5"
               >取消订单
               </el-button>
             </template>
           </el-table-column>
           <el-table-column
             label="客户姓名/联系电话"
             width="180"
           >
             <template slot-scope="scope">
               <span>{{scope.row.contact_name+'/'+scope.row.contact_phone}}</span>
             </template>
           </el-table-column>
           <el-table-column
             label="所在包间"
             width="180"
           >
             <template slot-scope="scope">
               <span>{{scope.row.item_room_name}}</span>
             </template>
           </el-table-column>
          <el-table-column
            label="订单编号"
            width="230">
            <template slot-scope="scope">
              <span>{{ scope.row.order_no }}
                <b class="reminder-tips">催单</b>
              </span>
            </template>
          </el-table-column>
           <el-table-column
             label="订单金额"
             width="180"
           >
             <template slot-scope="scope">
               <span>￥{{scope.row.fee/100}}</span>
             </template>
           </el-table-column>
           <el-table-column
             label="优惠金额"
             width="180"
           >
             <template slot-scope="scope">
               <span v-if="scope.row.discount_fee!=='0'">￥{{(scope.row.discount_fee/100).toFixed(2)}}</span>
               <span v-else>--</span>
             </template>
           </el-table-column>
           <el-table-column
             label="押金折扣金额"
             width="180"
           >
             <template slot-scope="scope">
               <span v-if="scope.row.discount_deposit_fee!=='0'">￥{{(scope.row.discount_deposit_fee/100).toFixed(2)}}</span>
               <span v-else>--</span>
             </template>
           </el-table-column>
           <el-table-column
             label="订单状态"
             width="180"
           >
             <template slot-scope="scope">
               <el-tag v-if="scope.row.status == 1 ">待确认</el-tag>
               <el-tag v-if="scope.row.status == 2 " type="success">待付款</el-tag>
               <el-tag v-if="scope.row.status == 3 " type="info">已付款</el-tag>
               <el-tag v-if="scope.row.status == 4 " type="warning">待制作</el-tag>
               <el-tag v-if="scope.row.status == 5 " type="warning">消费中</el-tag>
               <el-tag v-if="scope.row.status == 6 " type="danger">已完成</el-tag>
               <el-tag v-if="scope.row.status == 7 " type="danger">未消费</el-tag>
               <el-tag v-if="scope.row.status == 8 " type="danger">支付超时</el-tag>
               <el-tag v-if="scope.row.status == 9 " type="danger">取消订单</el-tag>
             </template>
           </el-table-column>
          <el-table-column
            label="所属员工"
            width="180"
          >
            <template slot-scope="scope">
              <span>{{ scope.row.staff_name}}</span>
            </template>
          </el-table-column>


          <el-table-column
            label="备注信息"
            width="180"
          >
            <template slot-scope="scope">
              <span>{{scope.row.remark}}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="预约开始时间"
            width="180"
          >
            <template slot-scope="scope">
              <span>{{scope.row.item_room_start}}</span>
            </template>
          </el-table-column>
           <el-table-column
             label="预约结束时间"
             width="180"
           >
             <template slot-scope="scope">
               <span>{{scope.row.item_room_end}}</span>
             </template>
           </el-table-column>
          <el-table-column
            label="实际开始时间"
            width="180"
          >
            <template slot-scope="scope">
              <span>{{scope.row.item_fact_start}}</span>
            </template>
          </el-table-column>
            <el-table-column
              label="实际结束时间"
              width="180"
            >
              <template slot-scope="scope">
                <span>{{scope.row.item_fact_end}}</span>
              </template>
          </el-table-column>

          <el-table-column
            label="创建时间"
            width="180"
          >
            <template slot-scope="scope">
              <span>{{scope.row.create_at}}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="支付时间"
            width="180"
          >
            <template slot-scope="scope">
              <span>{{scope.row.pay_at}}</span>
            </template>
          </el-table-column>

          <el-table-column
            label="所属门店"
            width="180"
          >
            <template slot-scope="scope">
              <span>{{scope.row.shop_name}}</span>
            </template>
          </el-table-column>
          <el-table-column
          label="物损金额"
          width="180"
          >
          <template slot-scope="scope">
          <!--<span>{{scope.row.order_end}}</span>-->
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
            <el-select v-model="displayNum" placeholder="请选择每页显示条数" @change="setPageSize">
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
            :current-page="currentPage"
            :page-size="result.page.pageSize"
            :total="result.page.totalCount">
          </el-pagination>
        </div>
      </div>
    </el-card>
    <!--用户列表 end-->
  </div>
</template>
<script>
  export default {
    name: 'manager-list',
    components: {},
    data() {
      return {
        // 时间选择 return
        pickerOptions2: {
          onPick: (time) => {
            if (time.maxDate && time.minDate) {
              let start = new Date(time.minDate).format('yyyy-MM-dd')
              let end = new Date(time.maxDate).format('yyyy-MM-dd')
              this.orderScreen.create_start = start
              this.orderScreen.create_end  = end
            }
          }
        },
        pickerOptions1: {
          onPick: (time) => {
            if (time.maxDate && time.minDate) {
              let start = new Date(time.minDate).format('yyyy-MM-dd')
              let end = new Date(time.maxDate).format('yyyy-MM-dd')
              this.orderScreen.room_start = start
              this.orderScreen.room_end  = end
            }
          }
        },
        displayNumList: [{num: 5}, {num: 10}, {num: 15}, {num: 20}],
        displayNum: 5,
        token: this.$store.state.token,
        currentPage: 1,
        orderTimeRange: '',
        roomTimeRange: '',
        orderScreen: {
          staff_name: '',//员工姓名
          staff_code: '',//员工工号
          create_start: '',//下单时间开始
          create_end: '',// 下单时间结束
          order_no: '',//订单编号
          product_type:1,
          room_id: '',//包间id
          room_end: '',//预约时间结束
          room_start: '',//预约时间开始
          status: '',//订单状态
          shop_name: '',//门店名称
          contact_phone: '',//联系电话
        },
        userStatus: [
          {name: '待确认', value: 1, key: 1},
          {name: '待付款', value: 2, key: 2},
          {name: '已付款', value: 3, key: 3},
          {name: '待制作', value: 4, key: 4},
          {name: '消费中', value: 5, key: 5},
          {name: '已完成', value: 6, key: 6},
          {name: '未消费', value: 7, key: 7},
        ],
        tableData: [],
        roomList:[],
        result: {
          page: {totalCount: 1},
          results: []
        },
        user:this.$store.state.user
      }
    },
    methods: {
      /**
       *
       * 取消订单
       **/
      cancelOrder(id){
        this.$confirm('确认取消订单？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(()=>{
          this.$http.post('order/cancel',{
            id:id,
            token: this.token,
          })
            .then(res=>{
              if (Number(res.data.code) === 10000) {
                this.$message({
                  type: 'success',
                  message: '订单已取消!'
                });
                this.resetQuery()
              }else {
                this.$message.error(res.data.msg);
              }
            })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '取消操作'
          });
        });
      },
      /**
       * 查询所有房间信息
       *
       * */
      getAllRoom(){
        this.$http.get('room/get/by/category')
          .then(res=>{
            if (Number(res.data.code) === 10000) {
              this.roomList = res.data.data.results
            }
          })
      },
      /**
       * 计算table 催单状态
       *
       * */
      tableRowClassName(scope){
        if (Number(scope.row.level) === 2) {
          return 'row-warning'
        }
      },
      /**
       * 重置查询条件
       *
       * */
      resetQuery() {
        for (let i in this.orderScreen) {
          this.orderScreen[i] = ''
        }
        this.orderScreen.product_type = 1
        this.orderTimeRange = null,
        this.roomTimeRange = null,
        this.currentPage = 1
        this.getUserList()
      },
      /**
       * 按照筛选条件查询用户列表
       *
       * */
      queryUserList() {
        this.getUserList()
      },
      /**
       * 切换分页
       *
       * */
      handleCurrentChange(val) {
        this.currentPage = val
        this.getUserList()
      },
      /**
       * 查询订单列表
       *
       * */
      getUserList() {
        this.$http.get('order/get/by/admin?pageSize=' + this.displayNum + '&pageNo=' + this.currentPage + '',
          {
            params:this.orderScreen
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
    computed:{
      orderNum(){
        return this.$store.state.orderRoomNum
      },
      reminderNum(){
        return this.$store.state.reminder
      }
    },
    watch:{
      orderNum(){
        this.resetQuery()
      },
      reminderNum(){
        this.resetQuery()
      }
    },
    mounted() {
      // 查询订单
      this.getAllRoom()
      this.getUserList()
    }
  }
</script>

<style lang="less" type="text/less" scoped>
  .user-list {
    .table-bottom {
      padding-top: 20px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      .total-setting {
        display: flex;
        font-size: 14px;
        align-items: center;
        .total-num {
          margin-right: 15px;
          span {
            color: #409EFF;
          }
        }
      }
    }
  }
</style>
