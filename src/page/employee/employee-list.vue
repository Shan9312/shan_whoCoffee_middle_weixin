/**
* Created by c on 2018/3/1.
*/
<template>
  <div class="employee-list">
    <!--查询条件-->
    <el-card class="box-card">
      <div slot="header">
        <span>员工筛选</span>
      </div>
      <div class="screen-panel">
        <el-form :model="userScreen" label-width="100px">
          <el-row :gutter="20">
            <el-col :xs="18" :sm="18" :md="9" :lg="9" :xl="5">
              <el-form-item label="员工姓名:">
                <el-input v-model="userScreen.nick_name"></el-input>
              </el-form-item>
            </el-col>
            <el-col :xs="18" :sm="18" :md="9" :lg="9" :xl="5">
              <el-form-item label="员工电话:">
                <el-input v-model="userScreen.phone"></el-input>
              </el-form-item>
            </el-col>
            <el-col :xs="18" :sm="18" :md="9" :lg="9" :xl="5">
              <el-form-item label="入职时间:">
                <el-date-picker
                  v-model="hireTimeRange"
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
            <el-col :xs="18" :sm="18" :md="9" :lg="9" :xl="5">
              <el-form-item label="性别:">
                <el-select v-model="userScreen.gender" placeholder="请选择性别">
                  <el-option v-for="item in genderList"
                             :key="item.key"
                             :label="item.name"
                             :value="item.value"
                  >

                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <!--<el-col :span="5">-->
              <!--<el-form-item label="班次:">-->
                <!--<el-select v-model="userScreen.shift" placeholder="请选择班次">-->
                  <!--<el-option-->
                    <!--v-for="item in shiftStatus"-->
                    <!--:key="item.key"-->
                    <!--:label="item.name"-->
                    <!--:value="item.value">-->
                  <!--</el-option>-->
                <!--</el-select>-->
              <!--</el-form-item>-->
            <!--</el-col>-->
            <!--<el-col :span="5">-->
              <!--<el-form-item label="上班时间:">-->
                <!--<el-date-picker-->
                  <!--v-model="userScreen.workTime"-->
                  <!--type="datetimerange"-->
                  <!--range-separator="至"-->
                  <!--start-placeholder="开始日期"-->
                  <!--value-format="timestamp"-->
                  <!--end-placeholder="结束日期">-->
                <!--</el-date-picker>-->
              <!--</el-form-item>-->
            <!--</el-col>-->
          </el-row>
          <el-row>
              <el-button type="primary" size="medium" @click="queryUserList" plain class="m-r-15">查询</el-button>
              <el-button size="medium" @click="resetQuery" plain>重置</el-button>
          </el-row>
        </el-form>
      </div>
    </el-card>
    <!--查询条件 end-->
    <!--用户列表-->
    <el-card class="m-t-20">
      <div slot="header">
        <span>员工列表</span>
      </div>
      <div class="table-content">
        <el-scrollbar tag="div">
        <el-table
          :data="tableData"
          style="width: 100%">
          <el-table-column
            label="员工工号"
            width="180">
            <template slot-scope="scope">
              <span >{{ scope.row.code_no }}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="员工姓名"
            width="180">
            <template slot-scope="scope">
              <span >{{ scope.row.nick_name}}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="性别"
            width="180"
          >
            <template slot-scope="scope">
              <span >{{ scope.row.gender==1?'男':'女'}}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="工种"
            width="180"
          >
            <template slot-scope="scope">
              <span>
                {{scope.row.role_name}}
              </span>
            </template>
          </el-table-column>
          <el-table-column
            label="联系电话"
            width="180"
          >
            <template slot-scope="scope">
              {{scope.row.phone}}
            </template>
          </el-table-column>
          <el-table-column
            label="订单数"
            width="180"
          >
            <template slot-scope="scope">
              无
            </template>
          </el-table-column>
          <el-table-column
            label="工作城市"
            width="180"
          >
            <template slot-scope="scope">
              无
            </template>
          </el-table-column>
          </el-table-column>
          <el-table-column
            label="服务项目"
            width="180"
          >
            <template slot-scope="scope">
              无
            </template>
          </el-table-column>
          <el-table-column
            label="入职时间"
            width="180"
          >
            <template slot-scope="scope">
              <span>{{scope.row.hiredate}}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="操作"
            width="250"
          >
            <template slot-scope="scope">
              <router-link :to="{path:'/employee-details',query:{id:1}}">
                <el-button
                  size="mini"
                  plain
                >查看
                </el-button>
              </router-link>
              <el-button
                size="mini"
                type="info"
                plain
              >编辑
              </el-button>
              <el-button
                size="mini"
                type="danger"
                plain
                @click="disableUser(scope.row.id,scope.row.status)"
              >
                {{scope.row.status == 0 ?'启用':'停用'}}
              </el-button>
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
            <el-select v-model="displayNum" placeholder="请选择"  @change="setPageSize">
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
    name: 'user-list',
    components: {},
    data() {
      return {
        pickerOptions1: {
          onPick: (time) => {
            if (time.maxDate && time.minDate) {
              let start = new Date(time.minDate).format('yyyy-MM-dd')
              let end = new Date(time.maxDate).format('yyyy-MM-dd')
              this.userScreen.hiredate_start = start
              this.userScreen.hiredate_end  = end
            }
          }
        },
        displayNumList: [{num: 5}, {num: 10}, {num: 15}, {num: 20}],
        genderList: [{name: '男', value: 1}, {name: '女', value: 2}],
        displayNum: 5,
        currentPage: 1,
        hireTimeRange:null,
        userScreen: {
          nick_name: '',//员工姓名
          hiredate_start: '',//入职时间
          hiredate_end: '',// 入职 结束时间
          phone: '',//电话
          gender: '',//性别
        },
        shiftStatus: [
          {name: '班次1', value: 0, key: 1},
          {name: '班次2', value: 1, key: 2},
          {
          name: '班次3',
          value: 2,
          key: 3
        }],
        tableData: [],
        result: {
          page: {
            totalPage: 1,
          },
          results: []
        }
      }
    },
    methods: {
      /**
       * 停用启用员工
       *
       * */
      disableUser(id,type){
        let url = ''
        if (Number(type) === 1) {
          url = 'user/freeze/admin'
        }else {
          url = 'user/unfreeze/admin'
        }
        this.$http.post(url,{id:id})
          .then(res=>{
            if (Number(res.data.code) === 10000) {
              this.$message.success('操作成功')
              this.resetQuery()
            }
          })
      },
      /**
       * 重置查询条件
       *
       * */
      resetQuery() {
        for (let i in this.userScreen) {
          this.userScreen[i] = ''
        }
        this.hireTimeRange = null
        this.currentPage = 1
        this.getUserList()
      },
      /**
       * 按照筛选条件查询用户列表
       *
       * */
      queryUserList() {
        this.currentPage = 1
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
       * 查询用户列表
       *
       * */
      getUserList() {
        this.$http.get('/user/get/admin/user?pageSize=' + this.displayNum + '&pageNo=' + this.currentPage + '',
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
    mounted() {
      this.getUserList()
    }
  }
</script>

<style lang="less" type="text/less" scoped>
  .employee-list {
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
