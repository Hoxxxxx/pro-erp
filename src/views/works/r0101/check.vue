<template>
  <div class="workSpace">
    
    <!-- 表单区域 -->
    <el-card class="formContent">
      <div class="btnBox" v-if="activeTab == 'firTab'">
        <!-- <el-button type="primary" @click="$router.push('/')">回到首页</el-button> -->
        <el-button type="primary" @click="goPrint">打印</el-button>
      </div>
      <el-tabs v-model="activeTab" @tab-click="handleClick">
        <el-tab-pane name="firTab">
          <!-- tab标签 -->
          <div slot="label" class="potBox">
            <span
              class="pot"
              :class="activeTab == 'firTab' ? 'potActive' : ''"
            ></span>
            <span>表单</span>
          </div>
          <!-- 内容 -->
          <div class="tabContent">
            <div class="title">{{workname}}</div>
            <div class="table_Info">
              <span class="code">业务日期：{{tableData.oaa02}}</span>
              <span class="name">申请单编号：{{tableData.oaa01}}</span>
            </div>
            <div class="tableBox">
              <!-- 基本信息 -->
              <div class="title_line">基本信息</div>
              <div class="form_line">
                <div class="titlebox">经办人</div>
                <div class="infobox middlebox  ">{{ tableData.oaa03_show }}</div>
                <div class="titlebox">联系电话</div>
                <div class="infobox selectbox middlebox last_row  ">{{ tableData.oaa05 }}</div>
              </div>
              <div class="form_line lastline">
                <div class="titlebox">申请人</div>
                <div class="infobox selectbox  ">{{ tableData.oaa04_show }}</div>
                <div class="titlebox">员工编号</div>
                <div class="infobox  ">{{ tableData.oaa04_gen01 }}</div>
                <div class="titlebox">所属部门</div>
                <div class="infobox last_row  ">{{ tableData.oaa04_gen04 }}</div>
              </div>
              <!-- 合同信息 -->
              <div class="title_line">合同信息</div>
              <div class="form_line">
                <div class="titlebox">合同名称</div>
                <div class="infobox selectbox middlebox">
                  {{ tableData.oay01 }}
                </div>
                <div class="titlebox">合同编号</div>
                <div class="infobox middlebox editNot last_row">
                  {{ tableData.oay02 }}
                </div>
              </div>
              <div class="form_line lastline">
                <div class="titlebox">合同金额</div>
                <div class="infobox middlebox editNot">
                  {{ tableData.oay03 }}
                </div>
                <div class="infobox middlebox editNot last_row" style="width: 619px; flex-grow: 0">
                  <!-- {{showData.status_human}} -->
                </div>
              </div>
              <!-- 预付信息 -->
              <div class="title_line">预付信息</div>
              <div class="form_line">
                <div class="titlebox">预付厂商</div>
                <div class="infobox selectbox  ">{{tableData.oaa11}}</div>
                <div class="titlebox">厂商简称</div>
                <div class="infobox  ">{{tableData.oaa11_show}}</div>
                <div class="titlebox">支付方式</div>
                <div class="infobox last_row selectbox disabledbox">
                  <el-select
                    v-model="tableData.oaa16"
                    class="select"
                    placeholder="请选择支付方式"
                    disabled
                  >
                    <el-option
                      v-for="(item, index) in fixedData.payTypes"
                      :key="index"
                      :label="item.pma02"
                      :value="item.pma01"
                    >
                    </el-option>
                  </el-select>
                </div>
              </div>
              <div class="form_line">
                <div class="titlebox">币种</div>
                <div class="infobox selectbox disabledbox">
                  <el-select
                    v-model="tableData.oaa13"
                    class="select"
                    placeholder="请选择币种"
                    disabled
                  >
                    <el-option
                      v-for="item in fixedData.azisList"
                      :key="item.azi01"
                      :label="item.azi02"
                      :value="item.azi01"
                    >
                    </el-option>
                  </el-select>
                </div>
                <div class="titlebox">汇率</div>
                <div class="infobox selectbox  ">{{tableData.oaa14}}</div>
                <div class="titlebox">预付金额</div>
                <div class="infobox last_row  ">{{tableData.oaa12}}</div>
              </div>
              <div class="form_line">
                <div class="titlebox">折合汇率金额</div>
                <div class="infobox middlebox  ">{{exchange}}</div>
                <div class="titlebox">折合汇率金额大写</div>
                <div class="infobox middlebox   last_row">{{exchange_Cap}}</div>
              </div>
              <div class="form_line">
                <div class="titlebox">项目</div>
                <div class="infobox middlebox selectbox  ">{{ tableData.oaa27_show }}</div>
                <div class="titlebox">项目WBS</div>
                <div class="infobox middlebox selectbox last_row  ">{{ tableData.oaa28_show }}</div>
              </div>
              <div class="form_line">
                <div class="titlebox">说明</div>
                <div class="infobox areabox longbox" style="width: 100%">
                  <el-input
                    type="textarea"
                    :rows="4"
                    v-model="tableData.oaa18"
                    placeholder="请输入说明"
                    maxlength="80"
                    show-word-limit
                    disabled
                  >
                  </el-input>
                </div>
              </div>
              <div class="form_line last_line">
                <div class="titlebox">备注</div>
                <div class="infobox areabox longbox" style="width: 100%">
                  <el-input
                    type="textarea"
                    :rows="4"
                    v-model="tableData.oaa99"
                    placeholder="请输入备注"
                    maxlength="80"
                    show-word-limit
                    disabled
                  >
                  </el-input>
                </div>
              </div>
              <!-- 收款信息 -->
              <div class="title_line">收款信息</div>
              <div class="form_line">
                <div class="titlebox">收款人</div>
                <div class="infobox selectbox  ">{{tableData.oaa21}}</div>
                <div class="titlebox">开户行</div>
                <div class="infobox selectbox  ">{{tableData.oaa22}}</div>
                <div class="titlebox">收款账号</div>
                <div class="infobox selectbox last_row  ">{{tableData.oaa23}}</div>
              </div>
              <div class="form_line last_line">
                <div class="titlebox">支票号</div>
                <div class="infobox last_row longbox selectbox  " style="width: 100%">{{tableData.oaa24}}</div>
              </div>
              <!-- 财务信息 -->
              <div v-if="oazShow == 1">
                <div class="title_line">
                  财务信息
                </div>
                <div class="form_line">
                  <div class="titlebox">银行</div>
                  <div class="infobox selectbox editNot">
                    <div class="" >
                      {{ tableData.oaz01 }}
                    </div>
                  </div>
                  <div class="titlebox">异动码</div>
                  <div class="infobox selectbox editNot">
                    <div class="" >
                      {{ tableData.oaz02 }}
                    </div>
                  </div>
                  <div class="titlebox">记账日期</div>
                  <div class="infobox middlebox datebox last_row">
                    <el-date-picker
                      v-model="tableData.oaz03"
                      type="date"
                      format="yyyy-MM-dd"
                      value-format="yyyy-MM-dd"
                      disabled
                    >
                    </el-date-picker>
                  </div>
                </div>
                <div class="form_line last_line">
                  <div class="titlebox">账款类型</div>
                  <div class="infobox selectbox editNot">
                    <div class="editNot" >
                      {{ tableData.oaz04 }}
                    </div>
                  </div>
                  <div class="titlebox">凭证编号</div>
                  <div class="infobox selectbox editNot">
                    {{ tableData.oaz06 }}
                  </div>
                  <div class="titlebox">支付方式</div>
                  <div class="infobox middlebox selectbox last_row editNot">
                    {{ tableData.oaz05 }}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </el-tab-pane>

        <el-tab-pane label="流程进度" name="secTab">
          <!-- tab标签 -->
          <div slot="label" class="potBox">
            <span
              class="pot"
              :class="activeTab == 'secTab' ? 'potActive' : ''"
            ></span>
            <span> 流程进度</span>
          </div>
          <!-- 内容 -->
          <div class="tabContent">
            <div class="title">{{workname}}</div>
            <div class="table_Info">
              <span class="code">业务日期：{{tableData.oaa02}}</span>
              <span class="name">申请单编号：{{tableData.oaa01}}</span>
            </div>
          </div>
        </el-tab-pane>
      </el-tabs>
    </el-card>

    <!-- 附件区域 -->
    <el-card class="secContentCard" v-if="activeTab == 'firTab'">
      <!-- 内容 -->
      <div class="tabContent">
        <div class="title">附件内容</div>
        <!-- 已有文件部分 -->
        <div class="saveList">
          <div class="saveItem" v-for="(item,index) in fileList_user" :key="index">
            <i class="el-icon-document" style="margin-right: 7px"></i>
            <a style="cursor: pointer;" @click="download(item.id, item.name)"><span>{{item.name}}</span></a>
            <div class="btnBox">
              <!-- <el-button type="text">预览</el-button> -->
              <el-button type="text" @click="download(item.id, item.name)">下载</el-button>
            </div>
          </div>
        </div>
      </div>
    </el-card>

    <el-card class="secContentCard" v-if="activeTab == 'secTab'">
      <div class="tabContent">
        <div class="title">流程办理进度</div>
          <el-timeline class="timeline">
            <el-timeline-item 
              v-for="(item, index) in workclass_perflow"
              :key="index"
              :timestamp="item.date" 
              placement="top">
              <el-card>
                <p class="step">第{{index+1}}步：{{item.title}}</p>
                <p class="result">
                  <template>
                    <p v-if="item.pertype == '99'">通过</p>
                    <p v-if="item.pertype == '0'" class="handling">审批中</p>
                    <p v-if="item.pertype == '2'">拒绝</p>
                    <p v-if="item.pertype == '3'">退回</p>
                    <p v-if="item.pertype == '5'">审批结束</p>
                  </template>
                </p>
                <p class="admin">{{item.name}}  {{item.date}}</p>
              </el-card>
            </el-timeline-item>
          </el-timeline>
      </div>
    </el-card>

  </div>
</template>

<script>
import { OpenLoading } from "@/utils/utils.js";
// api
import { workflowsList, } from "@/api/process_new.js"
import { azisList, pmasList  } from "@/api/basic";

export default {
  components: {},
  data() {
    return {
      overloading: '', //加载定时器
      workid: '',
      workname: '预付款申请单',
      activeTab: "firTab",
      tableData: {},
      // 汇率数据
      exchange: '', //折合汇率
      exchange_Cap: '', //折合汇率大写
      unit: new Array("仟", "佰", "拾", "", "仟", "佰", "拾", "", "仟", "佰", "拾", "", "角", "分"),
      fixedData: {
        //支付方式
        payTypes: [],
        // 币种列表
        azisList: [],
      },
      oazShow: 0, //是否显示财务信息（当前人是否是出纳）0：否 1：是
      fileList_user: [],
      addParams: {
        from_data: {},
        annexurlid: [],
        tplid: 8951
      },
      // 当前流程列表
      workclass_perflow: [],
    };
  },
  created() {
    this.workid = this.$route.query.workid
    // this.workid = 4546
    this.getPmas()
    this.getAzis()
    this.getworkflows()
  },
  methods: {
    goPrint() {
      let routeUrl = this.$router.resolve({
        path: "printPage",
        query: {
          workid: this.workid
        }
      });
      window.open(routeUrl.href, '_blank');
    },
    handleClick() {
      // console.log(this.activeTab);
    },
    // ***********获取流程信息************
    getworkflows(){
      const loading = OpenLoading(this, 1)
      const params = {
        workid: this.workid
      }
      workflowsList(params).then(res=>{
        if(res.status == 200){
          loading.close()
          clearTimeout(this.overloading)
          this.tableData = res.data.workclass_info.from_data
          this.workname = res.data.workclass_info.title
          this.workclass_perflow = res.data.workclass_perflow
          this.oazShow = res.data.workclass_flow.erp_turn
          if (res.data.file !== null) {
            res.data.file.forEach( item => {
              this.fileList_user.push({
                id: item.id,
                name: item.filename,
                url: item.fileaddr
              })
            })
          }
          this.getExchangeRate()
        }else{
          loading.close()
          clearTimeout(this.overloading)
          this.$message.error('获取流程信息失败：', res.error.message);
        }
      })
    },
    // ***********获取下拉列表信息************
    getAzis () {
      azisList()
      .then( result => {
        if (result.status == 200) {
          this.fixedData.azisList = result.data;
        } else {
          this.$message.error("获取币种列表失败：" + result.error.message);
        }
      })
    },
    getPmas () {
      pmasList()
      .then( result => {
        if (result.status == 200) {
          this.fixedData.payTypes = result.data;
        } else {
          this.$message.error("获取付款方式列表失败：" + result.error.message);
        }
      })
    },
    // 计算折合汇率
    getExchangeRate() {
      this.exchange = Number(this.tableData.oaa14) * Number(this.tableData.oaa12)
      this.exchange = this.exchange.toFixed(2)
      this.NumberToChinese(this.exchange)
    },
    //阿拉伯数字转换函数
    toDx(n) {
      switch (n) {
          case "0":
              return "零";
          case "1":
              return "壹";
          case "2":
              return "贰";
          case "3":
              return "叁";
          case "4":
              return "肆";
          case "5":
              return "伍";
          case "6":
              return "陆";
          case "7":
              return "柒";
          case "8":
              return "捌";
          case "9":
              return "玖";
      }
    },
    // 转大写
    NumberToChinese(m){
      m *= 100;
      m += "";
      var length = m.length;

      var result = "";
      for (var i = 0; i < length; i++) {
          if (i == 2) {
            result = "元" + result;
          } else if (i == 6) {
            result = "万" + result;
          } else if (i == 10) {
            result = "亿" + result;
          }
          if (m.charAt(length - i - 1) == 0) {
              if (i != 0 && i != 1) {
                  if (result.charAt(0) != '零' && result.charAt(0) != '元' && result.charAt(0) != '万') {
                      result = "零" + result;
                  }
              }
              continue;
          }
          result = this.toDx(m.charAt(length - i - 1)) + this.unit[this.unit.length - i - 1] + result;
      }
      result += result.charAt(result.length - 1) == '元' ? "整" : "";
      this.exchange_Cap = result;
    },
    // *******************************************
    // ***************附件上传******************
    // 上传成功
    handleSuccess(response, file, fileList) {
      this.addParams.annexurlid.push({
        filename: response.data.filename,
        fileaddr: response.data.path
      })
    },
    // 移除上传项
    handleRemove(file, fileList) {
      this.addParams.annexurlid.forEach( (item, index) => {
        if (item.filename == file.name) {
          this.addParams.annexurlid.splice( index, 1 )
        }
      })
    },
    // 点击上传项回调
    handlePreview(file) {
      console.log(file);
    },
    // 超出上传限制回调
    handleExceed(files, fileList) {
      // this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
    },
    // 移除前回调
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${ file.name }？`);
    },
    // 下载文件流
    async download(id, filename) {
      const { data: res } = await this.axios({
          method: 'get',
          url: `files/download/${id}`,
          responseType: "blob",
      })
      let fileName = filename;
      let fileType = {
        doc: 'application/msword',
        docx: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        xls: 'application/vnd.ms-excel',
        xlsx: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        ppt: 'application/vnd.ms-powerpoint',
        pptx: 'application/vnd.openxmlformats-officedocument.presentationml.presentation',
        pdf: 'application/pdf',
        txt: 'text/plain',
        png: 'image/png',
        jpg: 'image/jpeg',
        jpeg: 'image/jpeg',
        zip: 'application/zip',
        rar: 'application/x-rar',
      }
      let type=fileName.split('.')[1];//获取文件后缀名
      let blob = new Blob([res],{
        type:fileType.type
      });
      let url = window.URL.createObjectURL(blob);
      let link = document.createElement("a");
      link.style.display = "none";
      link.href = url;
      link.setAttribute("download", fileName);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    },
    // ******************************************
    // ******************************************
  },
};
</script>

<style lang="less" scoped>
@import "../../../assets/style/public.less";
</style>
