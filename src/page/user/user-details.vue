/**
* Created by c on 2018/3/1.
*/
<template>
  <div class="user-details">
    <div class="user-details-header el-card">
      <el-row>
        <el-col :span="3">
          待消费订单(10)
        </el-col>
        <el-col :span="3">
          未支付订单(10)
        </el-col>
        <el-col :span="3">
          进行中订单(10)
        </el-col>
        <el-col :span="3">
          不满意评价(10)
        </el-col>
        <el-col :span="3">
          未使用优惠券订单(10)
        </el-col>
        <el-col :span="3">
          即将过期优惠券(10)
        </el-col>
        <el-col :span="3">
          使用中房间(10)
        </el-col>
      </el-row>
    </div>
    <div class="user-intro m-t-20">
      <el-row>
        <el-col :span="4">
        <span>
          张先生|1231231231
        </span>
          <span>
          归属地
          <b>上海</b>
        </span>
        </el-col>
        <el-col :span="3">
          注册来源：
          <b>
            微信H5
          </b>
        </el-col>
        <el-col :span="3">
          账户类型：
          <b>
            普通账户
          </b>
        </el-col>
      </el-row>
    </div>
    <div class="ongoing-order m-t-20">
      <el-card class="box-card">
        <div slot="header">
          <span>正在进行中的订单</span>
        </div>
        <div class="content">
          <el-row>
            <el-col :span="4">
              <div class="item">
                <span class="label">
                  id:
                </span>
                <span class="value">
                  1231231
                </span>
              </div>
              <div class="item">
                <span class="label">
                  下单时间:
                </span>
                <span class="value">
                  1231231
                </span>
              </div>
              <div class="item">
                <span class="label">
                  预约时间:
                </span>
                <span class="value">
                  1231231
                </span>
              </div>
              <div class="item">
                <span class="label">
                  预约数量:
                </span>
                <span class="value">
                  1
                </span>
              </div>
            </el-col>
            <el-col :span="4">
              <div class="item">
                <span class="label">
                  项目:
                </span>
                <span class="value">
                  1231231
                </span>
              </div>
              <div class="item">
                <span class="label">
                  门店地址:
                </span>
                <span class="value">
                  1231231
                </span>
              </div>
              <div class="item">
                <span class="label">
                  联系人:
                </span>
                <span class="value">
                  1231231
                </span>
              </div>
              <div class="item">
                <span class="label">
                  状态:
                </span>
                <span class="value">
                  <el-tag>消费中</el-tag>
                </span>
              </div>
            </el-col>
            <el-col :span="8">
              操作：
              <div class="m-t-20 m-b-15">
                <el-button type="success" size="medium">开始服务</el-button>
              </div>
              <div>
                <el-button type="danger" size="medium">结束服务</el-button>
              </div>
            </el-col>
          </el-row>
        </div>
      </el-card>
    </div>
    <div class="user-info m-t-20">
      <el-card>
        <div slot="header" class="clearfix">
          <span>客户基本信息</span>
        </div>
        <div class="info-table">
          <div class="info-table-item">
            <div class="title">
              客户编号
            </div>
            <div class="info">
              u213123145
            </div>
          </div>
          <div class="info-table-item">
            <div class="title">
              客户姓名
            </div>
            <div class="info">
              李先生
            </div>
          </div>
          <div class="info-table-item">
            <div class="title">
              客户电话
            </div>
            <div class="info">
              13678907896
            </div>
          </div>
          <div class="info-table-item">
            <div class="title">
              注册来源
            </div>
            <div class="info">
              微信H5
            </div>
          </div>
          <div class="info-table-item">
            <div class="title">
              账号类型
            </div>
            <div class="info">
              普通
            </div>
          </div>
          <div class="info-table-item">
            <div class="title">
              归属地区
            </div>
            <div class="info">
              上海
            </div>
          </div>
          <div class="info-table-item">
            <div class="title">
              常用联系人
            </div>
            <div class="info">
              李先生
            </div>
          </div>
          <div class="info-table-item">
            <div class="title">
              邮箱
            </div>
            <div class="info">
              dsdjskdsjk@163.com
            </div>
          </div>
          <div class="info-table-item">
            <div class="title">
              注册时间
            </div>
            <div class="info">
              2015/3/30/ 12:43:21
            </div>
          </div>
          <div class="info-table-item">
            <div class="title">
              账户状态
            </div>
            <div class="info">
              正常
            </div>
          </div>
          <div class="info-table-item">
            <div class="title">
              下单次数
            </div>
            <div class="info">
              265
            </div>
          </div>
          <div class="info-table-item">
            <div class="title">
              消费金额
            </div>
            <div class="info">
              1100.00
            </div>
          </div>
          <div class="info-table-item">
            <div class="title">
              订单完成数
            </div>
            <div class="info">
              212
            </div>
          </div>
          <div class="info-table-item">
            <div class="title">
              优惠券金额
            </div>
            <div class="info">
              1100.00
            </div>
          </div>
          <div class="info-table-item">
            <div class="title">
              评价次数(待定)
            </div>
            <div class="info">
              55
            </div>
          </div>
          <div class="info-table-item">
            <div class="title">
              首次下单时间
            </div>
            <div class="info">
              2015/3/30/ 12:43:21
            </div>
          </div>
          <div class="info-table-item">
            <div class="title">
              最近下单时间
            </div>
            <div class="info">
              2015/3/30/ 12:43:21

            </div>
          </div>
          <div class="info-table-item">
            <div class="title">
              常用下单门店(地址)
            </div>
            <div class="info">
              上海市闵行区知春路211号5楼520
            </div>
          </div>
          <div class="info-table-item">
            <div class="title">
              最近下单门店
            </div>
            <div class="info">
              上海市闵行区知春路211号5楼520
            </div>
          </div>
          <div class="info-table-item width-100">
            <div class="title">
              备注
            </div>
            <div class="info">
              备注是一条备注啊，真的是备注
            </div>
          </div>
        </div>
      </el-card>
    </div>
    <div class="order-list m-t-20">
      <el-card>
        <div slot="header">
          客户订单信息
        </div>
        <div class="order-list-content">
          <div class="order-header">
            <span class="label">
              订单列表
            </span>
            <span class="status">
              待消费(10)
            </span>
            <span class="status">
              进行中(10)
            </span>
            <span class="status">
              完成(10)
            </span>
            <span class="status">
              已取消(10)
            </span>
            <span class="status">
              过期(10)
            </span>
          </div>
          <div class="order-table">
            <el-table
              :data="tableData"
              style="width: 100%">
              <el-table-column
                label="订单编号"
                width="180">
                <template slot-scope="scope">
                  <span >{{ scope.row.code }}</span>
                </template>
              </el-table-column>
              <el-table-column
                label="员工工号"
                width="180">
                <template slot-scope="scope">
                  <span >{{ scope.row.id }}</span>
                </template>
              </el-table-column>
              <el-table-column
                label="客户姓名"
                width="180"
              >
                <template slot-scope="scope">
                  <span >{{ scope.row.name }}</span>

                </template>
              </el-table-column>
              <el-table-column
                label="联系人电话"
                width="180"
              >
                <template slot-scope="scope">
                  <span >{{ scope.row.phone }}</span>

                </template>
              </el-table-column>

              <el-table-column
                label="来源"
                width="180"
              >
                <template slot-scope="scope">
                  <span >{{ scope.row.source }}</span>

                </template>
              </el-table-column>
              <el-table-column
                label="状态"
                width="180"
              >
                <template slot-scope="scope">
                  <span >{{ scope.row.status }}</span>

                </template>
              </el-table-column>
              <el-table-column
                label="类型"
                width="180"
              >
                <template slot-scope="scope">
                  <span >{{ scope.row.type }}</span>

                </template>
              </el-table-column>
              <el-table-column
                label="消费内容"
                width="180"
              >
                <template slot-scope="scope">
                  <span >{{ scope.row.info }}</span>

                </template>
              </el-table-column>
              <el-table-column
                label="实收费用"
                width="180"
              >
                <template slot-scope="scope">
                  <span >{{ scope.row.fee }}</span>

                </template>
              </el-table-column>
              <el-table-column
                label="订单生成时间"
                width="180"
              >
                <template slot-scope="scope">
                  <span >{{ scope.row.orderTime }}</span>

                </template>
              </el-table-column>
            </el-table>
            <div class="order-table-bottom">
              <div class="total-setting">
                <div class="total-num">
                  共
                  <span>
                   6
                  </span>
                  条记录
                </div>
                <el-pagination
                  background
                  layout="prev, pager, next"
                  :total="6">
                </el-pagination>
              </div>
            </div>
          </div>
        </div>
      </el-card>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'user-details',
    components: {},
    data() {
      return {
        tableData: [
          {
          code: 'ABCD123456',
          id: 'U123456565',
          name: '张先生',
          phone: '18217751890',
          source: '微信',
          status: '完成',
          type: '普通',
          info: '咖啡一个，包间一个',
          fee: '38.00',
          orderTime: '2015-3-4 12:00'
          },
          {
            code: 'ABCD123456',
            id: 'U123456565',
            name: '张先生',
            phone: '18217751890',
            source: '微信',
            status: '取消',
            type: '普通',
            info: '咖啡一个，包间一个',
            fee: '38.00',
            orderTime: '2015-3-4 12:00'
          },
          {
            code: 'ABCD123456',
            id: 'U123456565',
            name: '张先生',
            phone: '18217751890',
            source: '微信',
            status: '进行中',
            type: '普通',
            info: '咖啡一个，包间一个',
            fee: '38.00',
            orderTime: '2015-3-4 12:00'
          },
          {
            code: 'ABCD123456',
            id: 'U123456565',
            name: '张先生',
            phone: '18217751890',
            source: '微信',
            status: '待消费',
            type: '普通',
            info: '咖啡一个，包间一个',
            fee: '38.00',
            orderTime: '2015-3-4 12:00'
          },
          {
            code: 'ABCD123456',
            id: 'U123456565',
            name: '张先生',
            phone: '18217751890',
            source: '微信',
            status: '过期',
            type: '普通',
            info: '咖啡一个，包间一个',
            fee: '38.00',
            orderTime: '2015-3-4 12:00'
          },
          {
            code: 'ABCD123456',
            id: 'U123456565',
            name: '张先生',
            phone: '18217751890',
            source: '微信',
            status: '完成',
            type: '普通',
            info: '咖啡一个，包间一个',
            fee: '38.00',
            orderTime: '2015-3-4 12:00'
          },
        ]
      }
    },
    methods: {}
  }
</script>

<style lang="less" type="text/less" scoped>
  .user-details {
    .user-details-header {
      padding: 20px;
    }
    .user-intro {
      padding: 15px 20px;
      color: #606266;
      font-size: 14px;
      border: 1px solid #DCDFE6;
      border-radius: 3px;
      span {
        margin-right: 15px;
      }
      b {
        color: #303133;
      }
    }
    .ongoing-order {
      .content {
        font-size: 16px;
        .item {
          font-size: 14px;
          margin-bottom: 20px;
        }
        .label {
          width: 100px;
          display: inline-block;
          color: #666666;
        }
        .value {
          color: #909399;
        }
      }
    }
    .user-info {
      .info-table {
        display: flex;
        flex-wrap: wrap;
        border-right: 1px solid #E4E7ED;
        border-top: 1px solid #E4E7ED;
        .info-table-item {
          width: 20%;
          font-size: 14px;
          div {
            padding: 10px 5px;
          }
          .title {
            background: oldlace;
            border-right: 1px solid #E4E7ED;
          }
          .info {
            border-top: 1px solid #E4E7ED;
            border-right: 1px solid #E4E7ED;
            border-bottom: 1px solid #E4E7ED;
          }
          &:nth-child(5n+1) {
            .info, .title {
              border-left: 1px solid #E4E7ED;
            }
          }
          &:nth-child(5n) {
            .info, .title {
              border-right: none;
            }
          }
        }
        .width-100 {
          border-left: 1px solid #E4E7ED;
        }
      }
    }
    .order-list {
      .order-list-content {
        .order-header {
          background: #D4DDE6;
          padding: 15px 5px;
          margin: 0 -20px;
          color: #303133;
          border: 1px solid #DCDFE6;
          font-size: 14px;
          .label {
            margin-right: 150px;
          }
          .status {
            margin-right: 10px;
          }
        }
        .total-setting {
          display: flex;
          font-size: 14px;
          margin-top: 20px;
          align-items: center;
          justify-content: space-between;
          .total-num {
            margin-right: 15px;
            span {
              color: #409EFF;
            }
          }
        }
      }
    }
  }
</style>
