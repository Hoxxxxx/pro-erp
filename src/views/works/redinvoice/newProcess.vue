<template>
  <div class="workSpace">
    <!-- 表单区域 -->
    <el-card class="formContent">
      <div class="btnBox" v-if="activeTab == 'firTab'">
        <!-- <el-button type="primary" @click="$router.push('/')">回到首页</el-button> -->
        <el-button type="primary" class="save" @click="addNewFlow('add')">保存</el-button>
        <el-button type="primary" class="next" @click="addNewFlow('next')">下一步</el-button>
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
            <div class="title">{{ workName }}</div>
            <div class="table_Info">
              <span class="code">业务日期：{{ tableData.oaa02 }}</span>
              <span class="name">申请单编号：{{ tableData.oaa01 }}</span>
            </div>
            <div class="tableBox">
              <!-- 基本信息 -->
              <div class="title_line">基本信息</div>
              <div class="form_line">
                <div class="titlebox required">
                  <span :class="form_must.includes('oaa03') ? 'redPot' : ''">经办人</span>
                </div>
                <div class="infobox middlebox editNot">
                  {{ tableData.oaa03_show }}
                </div>
                <div class="titlebox">
                  <span :class="form_must.includes('oaa05') ? 'redPot' : ''">联系电话</span>
                </div>
                <div class="infobox selectbox middlebox last_row">
                  <input
                    class="abstracInput"
                    v-model="tableData.oaa05"
                    placeholder="请输入联系电话"
                  />
                </div>
              </div>
              <div class="form_line lastline">
                <div class="titlebox required">
                  <span :class="form_must.includes('oaa04') ? 'redPot' : ''">申请人</span>
                </div>
                <div class="infobox selectbox">
                  <div class="selector" @click="selectDialog('SQR')">
                    {{ showData.oaa04_show }}
                  </div>
                </div>
                <div class="titlebox required">
                  <span :class="form_must.includes('oaa04') ? 'redPot' : ''">员工编号</span>
                </div>
                <div class="infobox editNot">
                  {{ showData.oaa04_gen01 }}
                </div>
                <div class="titlebox">
                  <span :class="form_must.includes('oaa04') ? 'redPot' : ''">所属部门</span>
                </div>
                <div class="infobox editNot last_row">
                  {{ showData.oaa04_gen04 }}
                </div>
              </div>
              <!-- 付款信息 -->
              <div class="title_line">开票信息</div>
              <div class="form_line">
                <div class="titlebox required">
                  <span :class="form_must.includes('oaa10') ? 'redPot' : ''">销售方名称</span>
                </div>
                <div class="infobox middlebox selectbox">
                  <div class="selector" @click="selectDialog('XSF')">{{showData.oaa10_show}}</div>
                </div>
                <div class="titlebox">
                  <span :class="form_must.includes('oaa11') ? 'redPot' : ''">销售方纳税人识别号</span>
                </div>
                <div class="infobox selectbox middlebox last_row">
                  <input
                    class="abstracInput"
                    v-model="tableData.oaa11"
                    placeholder="请输入销售方纳税人识别号"
                  />
                </div>
              </div>
              <div class="form_line lastline">
                <div class="titlebox required">
                  <span :class="form_must.includes('oaa12') ? 'redPot' : ''">购买方名称</span>
                </div>
                <div class="infobox middlebox selectbox">
                  <div class="selector" @click="selectDialog('GMF')">{{tableData.oaa12}}</div>
                </div>
                <div class="titlebox">
                  <span :class="form_must.includes('oaa13') ? 'redPot' : ''">购买方纳税人识别号</span>
                </div>
                <div class="infobox selectbox middlebox last_row">
                  <input
                    class="abstracInput"
                    v-model="tableData.oaa13"
                    placeholder="请输入购买方纳税人识别号"
                  />
                </div>
              </div>
              <!-- 发票明细行 -->
              <div class="title_line">发票明细行</div>
              <div>
                <el-table
                  :data="tableData.oab"
                  v-loading="false"
                  element-loading-background="rgba(0, 0, 0, 0.5)"
                  element-loading-text="数据正在加载中"
                  element-loading-spinner="el-icon-loading"
                  style="width: 100%"
                  :cell-style="{ background: '#fff', color: '#666666' }"
                  :header-cell-class-name="must_oab"
                >
                  <el-table-column
                    prop="id"
                    label="增 / 删"
                    fixed="left"
                    width="100px"
                    align="center"
                  >
                    <template slot-scope="scope">
                      <div>
                        <div style="font-size: 24px; width: 100%; height: 100%">
                          <i
                            v-if="scope.$index == tableData.oab.length - 1"
                            @click="addRow1()"
                            class="el-icon-circle-plus"
                            style="color: #409efd; width: 30px; cursor: pointer"
                          ></i>
                          <i
                            @click="deleteRow1(scope.$index)"
                            class="el-icon-remove"
                            style="color: #f56c6c; width: 30px; cursor: pointer"
                          ></i>
                        </div>
                      </div>
                    </template>
                  </el-table-column>
                  <el-table-column
                    prop="oab01"
                    label="商品名称"
                    min-width="130px"
                    align="center"
                  >
                    <template slot-scope="scope">
                      <div>
                        <div
                          class="selector selectBorder"
                          @click="selectDialog('SP', scope.$index)"
                        >
                          {{ scope.row.oab01_show }}
                        </div>
                      </div>
                    </template>
                  </el-table-column>
                  <el-table-column
                    prop="oab02"
                    label="数量"
                    min-width="160px"
                    align="center"
                  >
                    <template slot-scope="scope">
                      <div>
                        <el-input
                          v-model="scope.row.oab02"
                          placeholder="数量"
                          @input="sum_HSJE(scope.$index)"
                        ></el-input>
                      </div>
                    </template>
                  </el-table-column>
                  <el-table-column
                    prop="oab03"
                    label="含税单价"
                    min-width="130px"
                    align="center"
                  >
                    <template slot-scope="scope">
                      <div>
                        <el-input
                          v-model="scope.row.oab03"
                          placeholder="含税单价"
                          @input="sum_HSJE(scope.$index)"
                        ></el-input>
                      </div>
                    </template>
                  </el-table-column>
                  <el-table-column
                    prop="oab07"
                    label="含税金额"
                    min-width="170px"
                    align="center"
                  >
                    <template slot-scope="scope">
                      <div>
                        <el-input
                          v-model="scope.row.oab07"
                          placeholder="含税金额"
                          @input="change_HSJE(scope.$index)"
                        ></el-input>
                      </div>
                    </template>
                  </el-table-column>
                  <el-table-column
                    prop="oab05"
                    label="税别"
                    min-width="170px"
                    align="center"
                  >
                    <template slot-scope="scope">
                      <div>
                        <div
                          class="selector selectBorder"
                          @click="selectDialog('FPSB', scope.$index)"
                        >
                          {{ scope.row.oab05 }}
                        </div>
                      </div>
                    </template>
                  </el-table-column>
                  <el-table-column
                    prop="oab05_show"
                    label="税率"
                    min-width="170px"
                    align="center"
                  >
                    <div slot-scope="scope">
                      <el-input
                        v-model="scope.row.oab05_show"
                        placeholder="税率"
                        disabled
                      ></el-input>
                    </div>
                  </el-table-column>
                  <el-table-column
                    prop="oab06"
                    label="税额"
                    min-width="170px"
                    align="center"
                  >
                    <template slot-scope="scope">
                      <div>
                        <el-input
                          v-model="scope.row.oab06"
                          placeholder="税额"
                        ></el-input>
                      </div>
                    </template>
                  </el-table-column>
                  <el-table-column
                    prop="oab04"
                    label="税前金额"
                    min-width="130px"
                    align="center"
                  >
                  <template slot-scope="scope">
                      <div>
                        <el-input
                          v-model="scope.row.oab04"
                          placeholder="税前金额"
                        ></el-input>
                      </div>
                    </template>
                  </el-table-column>
                </el-table>
                <div class="summry">
                  <ul class="summryUl">
                    <li class="summryLi">
                      <div class="summryName">税前金额合计</div>
                      <div class="summryCont editNot">{{ com_SQJEyb }}</div>
                    </li>
                    <li class="summryLi">
                      <div class="summryName">税额合计</div>
                      <div class="summryCont editNot">{{ com_SEyb }}</div>
                    </li>
                    <li class="summryLi">
                      <div class="summryName">含税合计</div>
                      <div class="summryCont editNot">{{ com_HSHJyb }}</div>
                    </li>
                  </ul>
                </div>
              </div>
              <div class="form_line">
                <div class="titlebox required">
                  <span :class="form_must.includes('oaa17') ? 'redPot' : ''">说明</span>
                </div>
                <div class="infobox areabox longbox" style="width: 100%">
                  <el-input
                    type="textarea"
                    :rows="4"
                    v-model="tableData.oaa17"
                    placeholder="请输入说明"
                    maxlength="255"
                    show-word-limit
                  >
                  </el-input>
                </div>
              </div>
              
              
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
        <el-upload
          class="upload_annex"
          :action="$store.state.upload_url"
          :on-success="handleSuccess"
          :on-preview="handlePreview"
          :on-remove="handleRemove"
          :before-upload="beforeAvatarUpload"
          :before-remove="beforeRemove"
          multiple
          :on-exceed="handleExceed"
          :file-list="fileList"
          accept=".doc,.docx,.xls,.xlsx,.ppt,.pptx,.pdf,.txt,.png,.jpg,.jpeg,.zip,.rar"
        >
          <el-button size="small" type="primary">点击上传</el-button>
        </el-upload>
      </div>
    </el-card>

    <el-card class="secContentCard" v-if="activeTab == 'secTab'">
      <div class="tabContent">
        <div class="title">流程办理进度</div>
        <el-timeline class="timeline">
          <el-timeline-item timestamp="2018/4/12" placement="top">
            <el-card>
              <p class="step">第一步：申请人提交申请</p>
              <p class="result">通过</p>
              <p class="admin">分公司(2)系统管理员 2020-11-02 13:37:42</p>
            </el-card>
          </el-timeline-item>
          <el-timeline-item timestamp="2018/4/3" placement="top">
            <el-card>
              <p class="step">第二步：部门主管审批 (主办：部门主管)</p>
              <p class="result handling">流程办理中</p>
              <p class="admin">分公司(2)系统管理员 2020-11-02 13:37:42</p>
            </el-card>
          </el-timeline-item>
        </el-timeline>
      </div>
    </el-card>
    <!-- 数据选择弹出框 -->
    <SelectData
      :isLoading="dataSelect.selectLoading"
      :dialogTitle.sync="dataSelect.dialogTitle"
      :dialogVisible.sync="dataSelect.dialogVisible"
      :headList.sync="dataSelect.headList"
      :bodyData.sync="dataSelect.bodyData"
      :choosedData="dataSelect.choosedData"
      :editType.sync="dataSelect.editType"
      :searchApi="dataSelect.searchApi"
      :searchType="dataSelect.searchType"
      :searchParams="dataSelect.searchParams"
      :filter="dataSelect.filter"
      :keyMsg="dataSelect.keyMsg"
      @selectSure="selectSure"
      @selectCancel="selectCancel"
    ></SelectData>
  </div>
</template>

<script>
import SelectData from "@/components/selectData";
import { dateFmt,number_chinese,OpenLoading } from "@/utils/utils.js";
import { addFlow,editFlow,workflows,openitems } from "@/api/process_new";
import {  mustItem } from "@/api/basic";
import {
  gensList,
  azisList,
  pmasList,
  pjbsList,
  aagsList,
  pjasList,
  userInfo
} from "@/api/basic.js";

export default {
  components: { SelectData },
  data() {
    return {
      activeTab: "firTab",
      workid: "",
      workName: "红字发票申请", //流程名
      showData: {
        oaa04_show: "", //申请人
        oaa04_gen01: "", //申请人编号
        oaa04_gen04: "", //申请人部门
        oaa10_show: "", //销售方名称
        expenseMoney: "", //报销金额
        expenseMoneyF: "", //报销金额大写
      },
      tableData: {
        // 基本信息
        oaa01: "", //申请单编号
        oaa02: "", //业务日期
        oaa03: "", //经办人
        oaa04: "", //申请人id
        oaa05: "", //联系电话
        // 开票信息
        oaa10: "", //销售方名称
        oaa11: "", //销售方纳税人识别号
        oaa12: "", //购买方名称
        oaa13: "", //购买方纳税人识别号
        // 发票明细
        oaa14: "", //税前金额合计
        oaa15: "", //税额合计
        oaa16: "TT", //含税合计
        oaa17: "", //说明
        // 表格部分
        oab: [], // 发票明细
      },
      form_must:[],
      oab_must:[],//差旅明细必填项
      oaz: {
        oaz01: "", //银行
        oaz02: "", //异动码
        oaz03: "", //记账日期
        oaz04: 2001, //账款类型
        oaz05: "", //支付方式
        oaz06: "", //凭证编号
      },
      fixedData: {
        // 币种列表
        cointypes: [],
        //支付方式
        payTypes: [],
      },
      fileList: [],
      addParams: {
        from_data: {},
        annexurlid: [],
        tplid: 8985,
      },
      rowIndex: "", //当前点击的行数
      //数据选择弹出框
      dataSelect: {
        editType: "entry",
        selectLoading: false,
        cur_input: "", // 当前点击的输入框
        dialogTitle: "数据选择", //当前弹框的title
        dialogVisible: false, //控制显示隐藏弹框
        headList: [], //表头
        bodyData: [], //表格数据
        choosedData: [], //选中的数据
        searchApi: "", //搜索框的接口地址
        searchParams:{},//搜索接口自带参数
        searchType:"",//搜索类型
        filter: [], //筛选条件
        keyMsg: [], //需要显示在顶部的数据
      },
      // 弹出框表头数据
      tableHead: {
        // 申请人
        head_SQR: [
          { name: "gen01", title: "员工编号" },
          { name: "gen02", title: "员工名称" },
          { name: "gen03", title: "所属部门编号" },
          { name: "gen04", title: "所属部门" },
        ],
        head_YFCS: [
          { name: "pmc01", title: "厂商编号" },
          // { name: "pmc02", title: "厂商分类" },
          { name: "pmc03", title: "厂商简称" },
          // { name: "pmc04", title: "付款厂商编号" },
          // { name: "pmc30", title: "厂商性质" },
          // { name: "pmc47", title: "税别" },
          { name: "pmc56", title: "银行账号" },
          { name: "pmcud01", title: "开户银行" },
          { name: "pmcud04", title: "账户名称" },
        ],
        head_SB: [
          { name: "gec01", title: "税别编号" },
          { name: "gec02", title: "税别名称" },
          { name: "gec011", title: "进/销项" },
          { name: "gec03", title: "会计科目编号" },
          { name: "gec04", title: "税率" },
          { name: "gec06", title: "1.應稅 2.零稅率 3.免稅" },
          { name: "gec07", title: "單價含稅否" },
          { name: "gec08", title: "媒體申報格式" },
        ],
        head_pmcs: [
          { name: "pmc01", title: "供应厂商编号" },
          { name: "pmc02", title: "厂商分类" },
          { name: "pmc03", title: "厂商简称" },
          { name: "pmc04", title: "付款厂商编号" },
          { name: "pmc30", title: "厂商性质" },
          { name: "pmc47", title: "税别" },
        ],
        head_occs: [
          { name: "occ01", title: "客户编号" },
          { name: "occ02", title: "客户名称" },
        ],
        head_nmas: [
          { name: "nma01", title: "银行编号" },
          { name: "nma02", title: "银行名称" },
          { name: "nma28", title: "1.支存 2.活存 3.其他" },
          { name: "nma04", title: "银行账号" },
          { name: "nma09", title: "存款类别" },
          { name: "nma10", title: "存款币别" },
        ],
        head_gecs: [
          { name: "gec01", title: "税别编号" },
          { name: "gec02", title: "税别名称" },
          { name: "gec03", title: "会计科目编号" },
          { name: "gec04", title: "税率" },
          { name: "gec06", title: "税种" },
          { name: "gec07", title: "单价含税否" },
          { name: "gec08", title: "媒体申报格式" },
          { name: "gec11", title: "进 / 销项" },
        ],
        head_pjas: [
          { name: "gja01", title: "项目编号" },
          { name: "gja02", title: "项目名称" },
        ],
        head_XSF: [
          { name: "occ01", title: "客户编号" },
          { name: "occ02", title: "客户名称" },
        ],
        head_GMF: [
          { name: "company01", title: "公司名称" },
          { name: "company02", title: "纳税人识别号" },
        ],
        head_SP: [
          { name: "id", title: "商品编号" },
          { name: "name", title: "商品名称" },
        ],
      },
    };
  },
  created() {
    this.addParams.tplid = this.$route.query.tplid ? this.$route.query.tplid : 8985
    this.initOAuserInfo()
    this.addRow1();
    this.getAzi(); //币种列表
    this.getPma(); //支付方式
    this.getMustItem()
  },
  computed: {
    // 税前金额合计
    com_SQJEyb(){
      let sum =  this.tableData.oab.reduce((prev, cur) => {
        return prev + Number(cur.oab04);
      }, 0);
      this.tableData.oaa14 = sum.toFixed(2)
      return sum.toFixed(2)
    },
    // 税额合计
    com_SEyb(){
      let sum =  this.tableData.oab.reduce((prev, cur) => {
        return prev + Number(cur.oab06);
      }, 0);
      this.tableData.oaa15 = sum.toFixed(2)
      return sum.toFixed(2)
    },
    // 含税合计
    com_HSHJyb(){
      let sum =  this.tableData.oab.reduce((prev, cur) => {
        return prev + Number(cur.oab07);
      }, 0);
      this.tableData.oaa16 = sum.toFixed(2)
      return sum.toFixed(2)
    },
  },
  methods: {
    initOAuserInfo() {
      let oauserinfo = JSON.parse(sessionStorage.getItem('oauserinfo'))
      this.tableData.oaa03 = oauserinfo.oauserid ? oauserinfo.oauserid : ''
      this.tableData.oaa03_show = oauserinfo.oaname
      if(oauserinfo.oauserid) {
        userInfo(oauserinfo.oauserid)
        .then(res => {
          if(res.status == 200){
            this.tableData.oaa05 = res.data.phone
            this.tableData.oaa04 = res.data.employee_code
            this.showData.oaa04_show = res.data.employee_show
            this.showData.oaa04_gen01 = res.data.employee_code
            this.showData.oaa04_gen04 = res.data.department_show
          }else{
            this.$message.warning("用户信息获取失败！" + res.error.message);
          }
        })
      }
    },
    getMustItem(){
      let params={
        tplid:this.addParams.tplid
      }
      mustItem(params).then(res=>{
        if(res.status == 200){
          this.form_must = res.data.form_able
          this.oab_must = res.data.form_must_able.oab ? res.data.form_must_able.oab : []
        }else{
          this.$message.error('必填项获取失败：', res.error.message)
        }
      })
    },
    must_oab(obj) {
      if (this.oab_must.includes(obj.column.property)) {
        return "must";
      }
    },
    handleClick() {
      // console.log(this.activeTab);
    },
    // ****************附件上传*****************
    // 限制格式
    beforeAvatarUpload(file) {
      const isDoc = file.type === "application/msword";
      const isDocx = file.type === "application/vnd.openxmlformats-officedocument.wordprocessingml.document";
      const isXls = file.type === "application/vnd.ms-excel";
      const isXlsx = file.type === "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
      const isPPT = file.type === "application/vnd.ms-powerpoint";
      const isPPTX = file.type === "application/vnd.openxmlformats-officedocument.presentationml.presentation";
      const isPDF = file.type === "application/pdf";
      const isTXT = file.type === "text/plain";
      const isPNG = file.type === "image/png";
      const isJPG = file.type === "image/jpeg";
      const isJPEG = file.type === "image/jpeg";
      const isZIP = file.type === "application/zip";
      const isRAR = file.type === "application/x-rar";
      const isNull = file.type === '';
      const isLt200M = file.size / 1024 / 1024 < 200;

      if (!isDoc && !isDocx && !isXls && !isXlsx && !isPPT && !isPPTX && !isPDF && !isTXT && !isPNG && !isJPG && !isJPEG && !isZIP && !isRAR ) {
        this.$message.warning("上传文件仅限 doc / docx / xls / xlsx / ppt / pptx / pdf / txt / png / jpg / jpeg / zip / rar 格式!");
        return false;
      }
      if (!isLt200M) {
        this.$message.warning("上传文件大小不能超过 200MB!");
        return false;
      }
    },
    // 上传成功
    handleSuccess(response, file, fileList) {
      this.addParams.annexurlid.push({
        id: response.data.id,
        filename: response.data.filename,
        fileaddr: response.data.path,
      });
    },
    // 移除上传项
    handleRemove(file, fileList) {
      this.addParams.annexurlid.forEach((item, index) => {
        if (item.filename == file.name) {
          this.addParams.annexurlid.splice(index, 1);
        }
      });
    },
    handlePreview(file) {
      console.log(file);
    },
    handleExceed(files, fileList) {
      this.$message.warning(
        `当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${
          files.length + fileList.length
        } 个文件`
      );
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`);
    },
    // *******************************************
    // ****************其他操作*******************
    // 新增（暂存）表单
    addNewFlow(type) {
      this.tableData = {...this.tableData,...this.oaz}
      this.addParams.from_data = this.tableData
      const loading = OpenLoading(this, 2)
      if (this.workid == '') {
        addFlow(this.addParams)
        .then( result => {
          if (result.status == 200) {
            this.workid = result.data.workid
            this.tableData.oaa01 = result.data.oaa01
            this.tableData.oaa02 = result.data.oaa02
            if (type == 'add') {
              this.$message.success("保存成功！");
            } else if (type == 'next') {
              this.$router.push(
                {
                  path:'/apply',
                  query: {
                    url_type: 'redinvoice',
                    workName:this.workName,
                    workid: this.workid,
                    workName: this.workName,
                    oaa01: this.tableData.oaa01,
                    oaa02: this.tableData.oaa02
                  }
                }
              )
            }
          } else {
            this.$message.error("保存失败：" + result.error.message);
          }
          loading.close();
        clearTimeout(this.overloading)
        })
      } else {
        this.addParams.workid = this.workid;
        editFlow(this.addParams).then((result) => {
          if (result.status == 200) {
            if (type == 'add') {
              this.$message.success("保存成功！");
            } else if (type == 'next') {
              this.$router.push(
                {
                  path:'/apply',
                  query: {
                    url_type: 'redinvoice',
                    workName:this.workName,
                    workid: this.workid,
                    workName: this.workName,
                    oaa01: this.tableData.oaa01,
                    oaa02: this.tableData.oaa02
                  }
                }
              )
            }
          } else {
            this.$message.error("保存失败：" + result.error.message);
          }
          loading.close();
        clearTimeout(this.overloading)
        });
      }
    },
    // *******************************************
    // 表格部分
    // 增加一行
    // 发票明细表格
    addRow1() {
      let data = {
        oab01: "", //商品名
        oab02: "", //数量
        oab03: "0.00", //含税单价
        oab04: "0.00", //税前金额
        oab05: "", //税率
        oab05_show: "1.00",
        oab06: "0.00", //税额
        oab07: "0.00", //含税金额
      };
      this.tableData.oab.push(data);
    },
    // 删除当前行
    deleteRow1(val) {
      this.$confirm("确认删除本条数据, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        this.tableData.oab.splice(val, 1);
        if (this.tableData.oab.length == 0) {
          this.addRow1();
        }
      });
    },
    // 含税金额计算
    sum_HSJE(rowIndex) {
      // 税前金额 = （含税金额  / （1+税率/100））
      this.tableData.oab[rowIndex].oab07 = (this.tableData.oab[rowIndex].oab02 * this.tableData.oab[rowIndex].oab03).toFixed(2)
      this.change_HSJE(rowIndex)
    },
    // 税额计算
    change_HSJE(rowIndex) {
      // 税前金额 = （含税金额  / （1+税率/100））
      this.tableData.oab[rowIndex].oab04 = (this.tableData.oab[rowIndex].oab07 / (1 + this.tableData.oab[rowIndex].oab05_show / 100)).toFixed(2)
      // 税额 = （含税金额  / （1+税率/100））* （税率 / 100）
      this.tableData.oab[rowIndex].oab06 = (this.tableData.oab[rowIndex].oab07 / (1 + this.tableData.oab[rowIndex].oab05_show / 100) * (this.tableData.oab[rowIndex].oab05_show / 100)).toFixed(2)
    },
    // 获取基础数据*******
    // 币种列表
    getAzi() {
      azisList().then((res) => {
        if (res.status == 200) {
          this.fixedData.cointypes = res.data;
        } else {
          this.$message.error("获取币种列表失败：" + result.error.message);
        }
      });
    },
    // 支付方式列表
    getPma() {
      pmasList().then((res) => {
        if (res.status == 200) {
          this.fixedData.payTypes = res.data;
        } else {
          this.$message.error("获取支付方式列表失败：" + result.error.message);
        }
      });
    },
    // ******************
    // 数据选择
    selectDialog(type, rowIndex) {
      this.rowIndex = rowIndex;
      this.dataSelect.dialogVisible = true;
      this.dataSelect.cur_input = type;
      this.dataSelect.choosedData = [];
      switch (type) {
        case "SQR":
          let filter_SQR = [{ label: "", model_key_search: "keyword" }];
          this.dataSelect.filter = filter_SQR;
          this.dataSelect.searchType = "single"
          this.dataSelect.editType = "entry"
          this.dataSelect.searchApi = "meta/gens";
          this.dataSelect.headList = this.tableHead.head_SQR;
          this.dataSelect.dialogTitle = "员工列表";
        break;
        case "YFCS":
          let filter_YFCS = [{ label: "", model_key_search: "keyword" }];
          this.dataSelect.filter = filter_YFCS;
          this.dataSelect.searchType = "single"
          this.dataSelect.editType = "entry"
          this.dataSelect.searchApi = "meta/pmcs";
          this.dataSelect.headList = this.tableHead.head_YFCS;
          this.dataSelect.dialogTitle = "应付厂商列表";
        break;
        case "SB":
          let filter_SB = [{ label: "", model_key_search: "keyword" },
          {
              label: "",
              model_key_search: "gec011",
              disabled: true,
              value: "1",
              hide: true,
            },];
          this.dataSelect.filter = filter_SB;
          this.dataSelect.searchType = "mixed"
          this.dataSelect.editType = "entry"
          this.dataSelect.searchApi = "meta/gecs";
          this.dataSelect.headList = this.tableHead.head_SB;
          this.dataSelect.dialogTitle = "税别列表";
        break;
        case "FPSB":
          let filter_FPSB = [{ label: "", model_key_search: "keyword" },
          {
              label: "",
              model_key_search: "gec011",
              disabled: true,
              value: "1",
              hide: true,
            },];
          this.dataSelect.filter = filter_FPSB;
          this.dataSelect.searchType = "mixed"
          this.dataSelect.editType = "entry"
          this.dataSelect.searchApi = "meta/gecs";
          this.dataSelect.headList = this.tableHead.head_SB;
          this.dataSelect.dialogTitle = "税别列表";
        break;
        case "getpmcsList":
          let filter_pmcs = [{ label: "", model_key_search: "keyword" }];
          this.dataSelect.filter = filter_pmcs;
          this.dataSelect.searchType = "single";
          this.dataSelect.editType = "entry";
          this.dataSelect.searchApi = "meta/pmcs";
          this.dataSelect.headList = this.tableHead.head_pmcs;
          this.dataSelect.dialogTitle = "供应商列表";
          break;
        case "getgensList":
          let filter_gens = [{ label: "", model_key_search: "keyword" }];
          this.dataSelect.filter = filter_gens;
          this.dataSelect.searchType = "single";
          this.dataSelect.editType = "entry";
          this.dataSelect.searchApi = "meta/gens";
          this.dataSelect.headList = this.tableHead.head_SQR;
          this.dataSelect.dialogTitle = "员工列表";
          break;
        case "getoccsList":
          let filter_occs = [{ label: "", model_key_search: "keyword" }];
          this.dataSelect.filter = filter_occs;
          this.dataSelect.searchType = "single";
          this.dataSelect.editType = "entry";
          this.dataSelect.searchApi = "meta/occs";
          this.dataSelect.headList = this.tableHead.head_occs;
          this.dataSelect.dialogTitle = "客户列表";
          break;
        case "getnmasList":
          let filter_nmas = [{ label: "", model_key_search: "keyword" }];
          this.dataSelect.filter = filter_nmas;
          this.dataSelect.searchType = "single";
          this.dataSelect.editType = "entry";
          this.dataSelect.searchApi = "meta/nmas";
          this.dataSelect.headList = this.tableHead.head_nmas;
          this.dataSelect.dialogTitle = "银行列表";
          break;
        case "getgecsList":
          let filter_gecs = [{ label: "", model_key_search: "keyword" }];
          this.dataSelect.filter = filter_gecs;
          this.dataSelect.searchType = "single";
          this.dataSelect.editType = "entry";
          this.dataSelect.searchApi = "meta/gecs";
          this.dataSelect.headList = this.tableHead.head_gecs;
          this.dataSelect.dialogTitle = "税别列表";
          break;
        case "getpjasList":
          let filter_pjas = [{ label: "", model_key_search: "keyword" }];
          this.dataSelect.filter = filter_pjas;
          this.dataSelect.searchType = "single";
          this.dataSelect.editType = "entry";
          this.dataSelect.searchApi = "meta/gjas";
          this.dataSelect.headList = this.tableHead.head_pjas;
          this.dataSelect.dialogTitle = "项目列表";
          break;
        case "XSF":
          let filter_XSF = [{ label: "", model_key_search: "keyword" },
          {
              label: "",
              model_key_search: "occ06",
              disabled: true,
              value: "1",
              hide: true,
            },];
          this.dataSelect.filter = filter_XSF;
          this.dataSelect.searchType = "mixed";
          this.dataSelect.editType = "entry";
          this.dataSelect.searchApi = "meta/occs";
          this.dataSelect.headList = this.tableHead.head_XSF;
          this.dataSelect.dialogTitle = "销售方列表";
          break;
        case "GMF":
        let filter_GMF = [{ label: "", model_key_search: "Org-Id" }];
        this.dataSelect.filter = filter_GMF;
        this.dataSelect.searchType = "single";
        this.dataSelect.editType = "entry";
        this.dataSelect.searchApi = "meta/sale_companies";
        this.dataSelect.headList = this.tableHead.head_GMF;
        this.dataSelect.dialogTitle = "购买方列表";
        break;
        case "SP":
          let filter_SP = [{ label: "", model_key_search: "keyword" }];
          this.dataSelect.filter = filter_SP;
          this.dataSelect.searchType = "single";
          this.dataSelect.editType = "entry";
          this.dataSelect.searchApi = "meta/invoicetypes";
          this.dataSelect.headList = this.tableHead.head_SP;
          this.dataSelect.dialogTitle = "商品列表";
          break;
        default:
        return;
        break;
      }
    },
    selectCancel(val) {
      this.dataSelect.dialogVisible = false;
      this.dataSelect.bodyData = val;
      this.dataSelect.choosedData = val;
    },
    selectSure(val) {
      this.dataSelect.dialogVisible = false;
      this.dataSelect.bodyData = [];
      this.dataSelect.choosedData = val;
      if (val.length > 0) {
        switch (this.dataSelect.cur_input) {
          case "SQR":
            this.tableData.oaa04 = val[0].gen01;
            this.showData.oaa04_show = val[0].gen02;
            this.showData.oaa04_gen01 = val[0].gen01;
            this.showData.oaa04_gen04 = val[0].gen04;
          break;
          case "SB":
          this.tableData.oaa15 = val[0].gec01;
          this.showData.oaa15_show = val[0].gec04;
          break;
          case "FPSB":
            this.tableData.oab[this.rowIndex].oab05 = val[0].gec01;
            this.tableData.oab[this.rowIndex].oab05_show = val[0].gec04;
            this.change_HSJE(this.rowIndex)
          break;
          case "XSF":
            this.tableData.oaa10 = val[0].occ01;
            this.showData.oaa10_show = val[0].occ02;
            this.tableData.oaa11 = val[0].occ11;
            break;
          case "GMF":
            this.tableData.oaa12 = val[0].company01;
            this.tableData.oaa13 = val[0].company02;
            break;
          case "SP":
            this.tableData.oab[this.rowIndex].oab01 = val[0].id;
            this.tableData.oab[this.rowIndex].oab01_show = val[0].name;
            break;
          default:
          return;
          break;
        }
      }
    },
    
  },
};
</script>

<style lang="less" scoped>
.summry {
  display: flex;
  flex-direction: row;
  box-sizing: border-box;
  border-bottom: 1px solid #cccccc;
  .summryUl {
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    color: #666;
    .summryLi {
      display: flex;
      flex-direction: row;
      align-items: center;
      flex: 1 1 auto;
      border-right: 1px solid #cccccc;
      .summryName {
        background: #FCFDFF;
        width: 150px!important;
        height: 40px;
        line-height: 40px;
        padding: 0 5px 0 5px;
        text-align: center;
        box-sizing: border-box;
        border-right: 1px solid #cccccc;
      }
      .summryCont {
        width: 230px;
        height: 40px;
        flex: 1 1 auto;
        line-height: 40px;
        text-align: center;
      }
      &:last-child {
        border-right: none;
        .summryCont{
          flex: 1 1 auto;
        }
      }
    }
  }
}
</style>
