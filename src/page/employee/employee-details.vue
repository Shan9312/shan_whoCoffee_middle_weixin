/**
* Created by c on 2018/3/2.
*/
<template>
  <div class="employee-details">
    <!--摘要信息-->
    <div class="summary-info">
      <el-card>
        <div slot="header">
          摘要信息
        </div>
        <div class="summary-info-content">
          <el-row>
            <el-col :span="4">
              <div class="user-img">
                <img src="https://via.placeholder.com/180x240" alt=""/>
              </div>
            </el-col>
            <el-col :span="20">
              <div class=info-list>
                <div class="info-item">
                  <span class="label">员工工号：</span>
                  <span class="value">U12345332</span>
                </div>
                <div class="info-item">
                  <span class="label">姓名：</span>
                  <span class="value">张小芳</span>
                </div>
                <div class="info-item">
                  <span class="label">手机号码：</span>
                  <span class="value">13800107890</span>
                </div>
                <div class="info-item">
                  <span class="label">工作城市：</span>
                  <span class="value">上海</span>
                </div>
                <div class="info-item">
                  <span class="label">工资：</span>
                  <span class="value">1000.00</span>
                </div>
                <div class="info-item">
                  <span class="label">工作天数：</span>
                  <span class="value">286</span>
                </div>
                <div class="info-item">
                  <span class="label">账号状态：</span>
                  <span class="value">U12345332</span>
                </div>
                <div class="info-item">
                  <span class="label">当前状态：</span>
                  <span class="value">U12345332</span>
                </div>
                <div class="info-item">
                  <span class="label">入职时间：</span>
                  <span class="value">2015-01-01 18:36</span>
                </div>
                <!--岗位-->
                <div class="info-item width-100">
                  <span class="label">
                    岗位：
                  </span>
                  <span class="value">
                     <el-radio-group v-model="radio3" fill="#b28850">
                        <el-radio-button label="咖啡师"></el-radio-button>
                        <el-radio-button label="收银员"></el-radio-button>
                        <el-radio-button label="领班"></el-radio-button>
                        <el-radio-button label="店长"></el-radio-button>
                        <el-radio-button label="经理"></el-radio-button>
                     </el-radio-group>
                  </span>
                </div>
                <!--岗位 end-->
                <!--责任区-->
                <div class="info-item width-100">
                  <span class="label">
                   责任区 ：
                  </span>
                  <span class="value">
                     <el-radio-group v-model="radio4" fill="#996c33">
                        <el-radio-button label="区域A"></el-radio-button>
                        <el-radio-button label="区域B"></el-radio-button>
                        <el-radio-button label="区域C"></el-radio-button>
                        <el-radio-button label="区域D"></el-radio-button>
                        <el-radio-button label="区域E"></el-radio-button>
                     </el-radio-group>
                  </span>
                </div>
                <!--责任区 end-->
              </div>
            </el-col>
          </el-row>
        </div>
      </el-card>
    </div>
    <!--摘要信息 end-->
    <!--基本信息 -->
    <div class="basic-info m-t-20">
      <el-card>
        <div slot="header">
          基本信息
        </div>
        <div class="work-info">
          <div class="sm-header">
            <el-tag>工作信息</el-tag>
          </div>
          <div class="info-list m-t-20">
            <div class="info-item">
              <span class="label">工号：</span>
              <span class="value">U123123768</span>
            </div>
            <div class="info-item">
              <span class="label">姓名：</span>
              <span class="value">张小芳</span>
            </div>
            <div class="info-item">
              <span class="label">手机号码：</span>
              <span class="value">13800208907</span>
            </div>
            <div class="info-item">
              <span class="label">工作城市：</span>
              <span class="value">上海</span>
            </div>
            <div class="info-item">
              <span class="label">备用电话：</span>
              <span class="value">15811124567</span>
            </div>
            <div class="info-item">
              <span class="label">咖啡师证：</span>
              <span class="value">高级/其他</span>
            </div>
            <div class="info-item">
              <span class="label">从业年限：</span>
              <span class="value">5年</span>
            </div>
            <div class="info-item">
              <span class="label">入职日期：</span>
              <span class="value">2017-01-01 18:36</span>
            </div>
            <div class="info-item">
              <span class="label">订单总数：</span>
              <span class="value">128</span>
            </div>
            <div class="info-item">
              <span class="label">完成订单数：</span>
              <span class="value">100</span>
            </div>
            <div class="info-item">
              <span class="label">员工星级：</span>
              <span class="value">5.0</span>
            </div>
          </div>
        </div>
        <div class="work-info">
          <div class="sm-header">
            <el-tag>个人信息</el-tag>
          </div>
          <div class="info-list m-t-20">
            <div class="info-item" >
              <span class="label">身份证：</span>
              <span class="value">310223197728299090</span>
            </div>
            <div class="info-item" >
              <span class="label">籍贯：</span>
              <span class="value">上海-闵行</span>
            </div>
            <div class="info-item" >
              <span class="label">居住地</span>
              <span class="value">上海</span>
            </div>
            <div class="info-item" >
              <span class="label">性别：</span>
              <span class="value">女</span>
            </div>
            <div class="info-item" >
              <span class="label">年龄：</span>
              <span class="value">28</span>
            </div>
            <div class="info-item width-100">
                  <span class="label">
                    户籍地址：
                  </span>
                  <span class="value">
                    上海市闵行区知春路128号金星园12栋1102
                  </span>
            </div>
            <div class="info-item width-100">
                  <span class="label">
                    联系地址：
                  </span>
              <span class="value">
                    上海市闵行区知春路128号金星园12栋1102
                  </span>
            </div>
            <div class="info-item width-100">
                  <span class="label">
                    员工简介：
                  </span>
              <span class="value">
                    五年咖啡师经验，各种花式拉花
                  </span>
            </div>
          </div>
        </div>
        <div class="card-info">
          <div class="sm-header">
            <el-tag>证件信息</el-tag>
          </div>
          <div class="card-info-content m-t-20">
            <el-row>
              <el-col :span="8">
                <h4 class="m-b-15">
                  身份证正面
                </h4>
                <img src="https://via.placeholder.com/300x200" alt=""/>
              </el-col>
              <el-col :span="8">
                <h4 class="m-b-15">
                  身份证反面
                </h4>
                <img src="https://via.placeholder.com/300x200" alt=""/>
              </el-col>
            </el-row>
          </div>
        </div>
      </el-card>
    </div>
    <!--基本信息 end-->
    <!--7天排班详情-->
    <div class="schedule m-t-20">
      <el-card>
        <div slot="header">
          七天排班情况
        </div>
        <div class="schedule-content">
          <div class="sc-header">
            <span class="title">
              日期
            </span>
            <span class="time-item" v-for="item in timeList">
              {{item.name}}
            </span>
          </div>
          <div class="sc-content">
            <div class="sc-con-item" v-for="item in 7">
              <span class="title">
                日期
              </span>
              <span class="sc-type"
                    v-for="item in scheduleData"
                    :class="{active:item.type}"
                >

              </span>
            </div>
          </div>
        </div>
      </el-card>
    </div>
    <!--7天排班详情-->
  </div>
</template>
<script>
  export default {
    name: 'employee-details',
    components: {},
    data() {
      return {
        radio3:'咖啡师',
        radio4:'区域D',
        timeList:[],
        scheduleData:[],
      }
    },
    methods: {},
    mounted(){
      for(var i=0;i<24;i++){
        this.timeList.push({name:i+':00',value:i})
        let type = false
        if (i<15&&i>9||i<6||i === 17) {
          type = true
        }
        this.scheduleData.push({type:type})
      }
    }
  }
</script>

<style lang="less" type="text/less" scoped>
  .employee-details {
    .info-list {
      display: flex;
      flex-wrap: wrap;
      .info-item {
        width: 30%;
        margin-bottom: 20px;
        margin-top: 5px;
        display: flex;
        font-size: 14px;
        align-items: center;
        .label {
          color: #666666;
          display: inline-block;
          width: 90px;
          font-weight: 500;
        }
        .value {
          color: #606266;
        }
      }
    }
    .summary-info {
      .summary-info-content {
      }
    }
    .basic-info{
      .sm-header{
        padding: 10px 0;
        color: #606266;
        font-size: 14px;
        border-bottom: 1px dashed #E4E7ED;
      }
      .work-info{
        border-bottom: 1px solid #E4E7ED;
      }
    }
    .schedule{
      .schedule-content{
        .sc-header{
         height: 45px;
          display: flex;
          align-items: center;
          .title{
            width: 80px;
            display: inline-block;
          }
          .time-item{
            width: 60px;
            text-align: center;
          }
        }
        .sc-content{
          overflow-y: scroll;
          .sc-con-item{
            height: 45px;
            display: flex;
            align-items: center;
            .title{
              width: 80px;
              display: inline-block;
            }
            span.sc-type{
              width: 60px;
              height: 45px;
              box-sizing: border-box;
              border: 1px solid #E4E7ED;
              background: #fffbf4;
            }
            span.active{
              background: #cfa972;
            }
          }
        }
      }
    }
  }
</style>
