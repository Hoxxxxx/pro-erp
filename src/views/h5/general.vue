<template>
  <div class="h5Home">
    <div class="head">
      <van-nav-bar
        :title="formData.work_name"
        left-arrow
        @click-left="onClickLeft"
      />
    </div>
    <van-skeleton round :row="20" animate :loading="noDATA">
      <div class="cont">
        <van-tabs
          scrollspy
          sticky
          :offset-top="'0.8rem'"
          :color="'#409EFD'"
          :title-active-color="'#409EFD'"
          :class="type == 3 ? 'padding_bottom_none' : ''"
        >
          <div class="serial">
            <div>
              <span class="serial_label">业务日期:</span>
              <span class="serial_cont">{{ formData.business_date }}</span>
            </div>
            <div>
              <span class="serial_label">申请单编号:</span>
              <span class="serial_cont">{{ formData.number }}</span>
            </div>
          </div>
          <van-tab
            v-for="(group, grop_index) in formData.form_layout"
            :key="grop_index"
            :title="group.sub_title"
          >
            <h2 class="store-list-group-title">{{ group.sub_title }}</h2>
            <van-cell-group v-for="(item, index) in group.groups" :key="index">
              <van-field
                v-if="item.form_type == 'input'"
                v-model="item.show"
                :label="item.label"
                :name="item.name"
                input-align="right"
                label-class="label"
                clearable
                :required="item.required"
                :readonly="!item.editable"
                :placeholder="item.editable ? `请输入${item.label == '' ? '' : item.label}` : '暂无数据'"
              />
              <div v-if="item.form_type == 'datetime'">
                <van-cell
                  :title="item.label"
                  :value="item.value"
                  @click="openDate(item)"
                />
                <van-calendar
                  v-model="item.showDate"
                  @confirm="onConfirm(item, $event)"
                  color="#409EFD"
                />
              </div>
              <div v-if="item.form_type == 'select'">
                <div v-if="item.editable">
                  <van-field
                    readonly
                    clickable
                    label-class="label"
                    input-align="right"
                    :label="item.label"
                    :value="item.value"
                    is-link
                    placeholder="选择部门"
                    @click="openSelect(item)"
                  />
                  <van-popup v-model="item.showSelect" round position="bottom">
                    <van-picker
                      show-toolbar
                      :columns="item.options"
                      @cancel="item.showSelect = false"
                      @confirm="onConfirm_select(item, $event)"
                    />
                  </van-popup>
                </div>
                <div v-else>
                  <van-field
                    v-model="item.show"
                    :label="item.label"
                    input-align="right"
                    label-class="label"
                    readonly
                  />
                </div>
              </div>
              <div v-if="item.form_type == 'table'" class="table">
                <van-collapse v-model="item.name" accordion>
                  <van-collapse-item
                    v-for="(coll, coll_index) in item.son"
                    :key="coll_index"
                    :title="`${item.label}表（${coll_index + 1}）`"
                    :name="`${coll_index}`"
                  >
                    <van-field
                      v-for="(td, td_index) in coll"
                      :key="td_index"
                      v-model="td.show"
                      :name="td.name"
                      :label="td.label"
                      input-align="right"
                      label-class="label"
                      clearable
                      :required="td.required"
                      :readonly="!td.editable"
                      :placeholder="td.label == '' ? `请输入${td.label}` : ''"
                    />
                  </van-collapse-item>
                </van-collapse>
              </div>
            </van-cell-group>
            <div
              v-if="
                group.groups.length > 0 && group.groups[0].form_type == 'table'
              "
            >
              <van-cell-group>
                <van-cell
                  v-for="(son, son_index) in group.groups[0].son_total"
                  :key="son_index"
                  :title="son.label"
                  :value="son.value"
                />
              </van-cell-group>
            </div>
            <div v-if="group.sub_title == '附件信息'" class="whiteBG">
              <van-empty
                v-if="group.groups.length == 0"
                class="custom-image"
                image-size="0.8rem"
                image="https://img.yzcdn.cn/vant/custom-empty-image.png"
                description="暂无附件"
              />
              <ul class="files" v-else>
                <li
                  class="file"
                  v-for="(file, file_index) in group.groups"
                  :key="file_index"
                >
                  <van-icon name="orders-o" size="30" />
                  <span @click="download(file)">{{
                    file.filename.split(".")[0]
                  }}</span>
                </li>
              </ul>
            </div>
            <van-steps
              v-if="group.sub_title == '流程信息'"
              direction="vertical"
              :active="group.groups.length - 1"
              active-color="#F56C6C"
            >
              <van-step
                v-for="(step, step_index) in group.groups"
                :key="step_index"
              >
                <p>{{ step.date }}</p>
                <div class="stepInner">
                  <h5 class="stepLabel">
                    {{ `第${step_index + 1}步 ${step.title}` }}
                  </h5>
                  <h5 class="stepState">
                    <template>
                      <span v-if="step.pertype == '99'">通过</span>
                      <span v-if="step.pertype == '0'" class="handling"
                        >审批中</span
                      >
                      <span v-if="step.pertype == '2'">拒绝</span>
                      <span v-if="step.pertype == '3'">退回</span>
                      <span v-if="step.pertype == '5'">审批结束</span>
                    </template>
                  </h5>
                  <h5 class="stepMember">{{ step.name }} {{ step.date }}</h5>
                </div>
              </van-step>
            </van-steps>
          </van-tab>
        </van-tabs>
      </div>
      <footer v-if="type != 3">
        <!-- 审核/查看显示按钮 -->
        <div class="btn_check" v-if="type == 1">
          <van-popover
            class="others"
            v-model="showMore"
            trigger="click"
            placement="top-start"
            v-if="actions.length > 0"
          >
            <div
              class="linkBox"
              v-for="(link, link_index) in actions"
              :key="link_index"
            >
              <van-cell :title="link.name" is-link @click="toLink(link.url)" />
            </div>
            <template #reference>
              <van-button
                class="btn_operation"
                size="small"
                color=""
                plain
                type="info"
                >其他
              </van-button>
            </template>
          </van-popover>
          <van-button
            class="btn_operation"
            size="small"
            color="#F56C6C"
            type="default"
            @click="next(3)"
            >退回</van-button
          >
          <van-button
            class="btn_operation"
            size="small"
            color="#FBD951"
            type="warning"
            @click="next(2)"
            >拒绝</van-button
          >
          <van-button
            class="btn_operation"
            size="small"
            color="#6DD400"
            type="danger"
            @click="next(1)"
            >同意</van-button
          >
        </div>
        <!-- 新增显示按钮 -->
        <div class="btn_add" v-if="type == 2">
          <van-button
            class="btn_operation w2rem"
            size="small"
            color="#409EFF"
            type="warning"
            >保存</van-button
          >
          <van-button
            class="btn_operation w2rem"
            size="small"
            color="#6DD400"
            type="danger"
            @click="agree()"
            >下一步</van-button
          >
        </div>
      </footer>
    </van-skeleton>
  </div>
</template>

<script>
import { Toast } from "vant";
import { h5Data, h5DataAdd, h5NewProcess } from "@/api/process_new";
import { h5OpenLoading } from "@/utils/utils.js";
export default {
  data() {
    return {
      formData: {},
      // 底部操作栏
      showMore: false, //其他
      actions: [],
      type: null, //当前页面类型：查看、新增、审核  type=1就是审核  type=2 新增  type=3 查看
      noDATA: true, //控制显示骨架屏
      workid: "",
      overloading: null, //加载定时器
    };
  },
  created() {
    this.type = this.$route.query.type ? this.$route.query.type : 1;
    this.workid = this.$route.query.workid;
    if (this.type == 2) {
      this.geth5DataAdd();
    } else {
      this.geth5Data();
    }
  },
  methods: {
    //顶部返回
    onClickLeft() {
      let url = `${process.env.VUE_APP_URL}/pmobile/index.php?fileurl=workclass&u=m&t=index&type=1`;
      window.location.href = url;
    },
    // 获取审核/查看页面数据
    geth5Data() {
      let params = {
        workid: this.workid,
        type: this.type,
      };
      const loading = h5OpenLoading(this);
      h5Data(params).then((res) => {
        if (res.status == 200) {
          loading.close();
          this.noDATA = false;
          let flow1 = {
            sub_title: "附件信息",
            groups: [],
          };
          flow1.groups = res.data.file;
          res.data.form_layout.push(flow1);
          let flow = {
            sub_title: "流程信息",
            groups: [],
          };
          flow.groups = res.data.workclass_perflow;
          res.data.form_layout.push(flow);
          // erp_turn等于0时的财务信息不显示
          if(res.data.workclass_flow.erp_turn == 0){
            res.data.form_layout = res.data.form_layout.filter((item)=>{
              return item.sub_title != "财务信息"
            })
          }
          this.actions = res.data.workclass_info.more;
          this.formData = res.data;
        } else {
          loading.close();
          Toast.fail("数据获取失败，请重新加载！");
        }
        clearTimeout(this.overloading);
      });
    },
    // 获取新增流程信息
    geth5DataAdd() {
      let params = {
        tplid: 8950,
      };
      const loading = h5OpenLoading(this);
      h5DataAdd(params).then((res) => {
        if (res.status == 200) {
          loading.close();
          this.noDATA = false;
          this.formData = res.data;
        } else {
          loading.close();
          this.$toast({
            type: "fail",
            message: "数据获取失败！",
          });
        }
        clearTimeout(this.overloading);
      });
    },
    formatDate(date) {
      return `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`;
    },
    //********* 内容区域操作 *****
    openDate(val) {
      this.$set(val, "showDate", true);
    },
    // 日期选择确认
    onConfirm(item, $event) {
      item.showDate = false;
      item.default = this.formatDate($event);
    },
    // 单选框
    openSelect(val) {
      this.$set(val, "showSelect", true);
    },
    onConfirm_select(item, $event) {
      item.showSelect = false;
      item.default = $event;
    },
    // 底部操作按钮区域
    showMoreBtn() {
      this.showMore = true;
    },
    toLink(link) {
      window.open(link);
    },
    agree() {
      let param = {
        annexurlid: [],
        from_data: {},
        tplid: 8950,
      };
      this.formData.form_layout.forEach((item) => {
        item.groups.forEach((group) => {
          if (group.form_type != "table") {
            param.from_data[group.name] = group.show;
          } else {
            let arrSon = [];
            let arr = {};
            group.son.forEach((ele) => {
              arr[ele.name] = ele.show;
            });
            arrSon.push(arr);
            param.from_data[group.name] = arrSon;
          }
        });
      });
      h5NewProcess(param).then((res) => {
        if (res.status == 200) {
          this.$toast({
            type: "success",
            message: "成功！",
          });
        } else {
          this.$toast({
            type: "fail",
            message: "失败",
          });
        }
      });
    },
    // 文件下载
    download(file) {
      let u = navigator.userAgent;
      if (u.indexOf("Android") > -1 || u.indexOf("Linux") > -1) {
        //安卓手机
        window.androidLLCallback.downloadFile(file.fileaddr, file.filename);
      } else if (u.indexOf("iPhone") > -1) {
        //苹果手机
        this.$toast({
          type: "fail",
          message: "不支持苹果手机下载文件，请到PC端处理！",
        });
      }
    },
    // 同意拒绝退回
    next(val) {
      this.$router.push({
        path: "/h5/toss",
        query: {
          tosstype: val,
          workid: this.workid,
        },
      });
    },
  },
};
</script>

<style lang="less" scoped>
</style>