<template>
  <div class="pb-main-height">
    <div class="pb-bg">
      <div class="public_table_tool">
        <el-popover placement="top" title="刷新" trigger="hover" width="36">
                  <div slot="reference" class="public_table_tool_inline" @click="getList()">
                    <i :class="[isRefreshRouter? 'el-icon-refresh refresh-go' : 'el-icon-refresh']"></i>
                  </div>
                </el-popover>
                <el-popover placement="top" title="添加" trigger="hover" width="36">
                  <div slot="reference" class="public_table_tool_inline" @click="addNameList()">
                    <i class="el-icon-circle-plus-outline"></i>
                  </div>
                </el-popover>
                <el-popover placement="top" title="删除" trigger="hover" width="36">
                  <div slot="reference" class="public_table_tool_inline" @click="deleteTable()">
                    <i class="el-icon-delete"></i>
                  </div>
                </el-popover>
            <el-popover placement="top" title="设置" trigger="hover" width="36">
            <div slot="reference" class="public_table_tool_inline" @click="editingSetting()">
              <i class="el-icon-setting"></i>
            </div>
          </el-popover>
        <div
          :class="
            isShowCheckbox === true
              ? 'public_editing_checkbox pb-checked-bg'
              : 'public_editing_checkbox'
          "
          @click="editingCheckbox()"
        >
          开启编辑
          <i
            :class="
              isShowCheckbox === true
                ? 'el-icon-check pb-checked-i'
                : 'el-icon-check'
            "
          ></i>
        </div>
        <div class="pos_tool_tb">
          <div class="pos_table_tool">
            <el-popover placement="top" title="筛选列" trigger="hover" width="45">
              <div slot="reference" class="public_table_tool_inline">
                <i class="el-icon-data-analysis"></i>
              </div>
            </el-popover>
            <el-popover placement="top" title="导出" trigger="hover" width="36">
              <div slot="reference" class="public_table_tool_inline" @click="exportData">
                <i class="el-icon-receiving"></i>
              </div>
            </el-popover>
            <el-popover placement="top" title="打印" trigger="hover" width="36">
              <div slot="reference" class="public_table_tool_inline" @click="printJson">
                <i class="el-icon-printer"></i>
              </div>
            </el-popover>
          </div>
        </div>
      </div>

      <el-table
        ref="tableJson"
        :data="tableData"
        style="width: 100%"
        v-loading="loading"
        @selection-change="handleSelectionChange"
      >
        <el-table-column fixed="left" type="selection" width="45" />
        <el-table-column label="#" type="index" width="45" />
        <el-table-column prop="CODE" label="参数名称" />
        <el-table-column prop="JSONSTR" label="参数值" width="700" />

        <el-table-column fixed="right" label="操作" width="120">
          <template slot-scope="scope">
            <span
              class="public-table-btn table-btn-edit"
              @click="editTable(scope)"
              >修改</span
            >
            <span
              class="public-table-btn table-btn-delete"
              @click="handleDelete(scope)"
              >删除</span
            >
          </template>
        </el-table-column>
      </el-table>

      <el-pagination
        v-show="total > 0"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="queryParams.page"
        :page-size="queryParams.limit"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
    </div>

    <el-dialog
      :title="dialogType === 'edit' ? '参数修改' : '参数添加'"
      :visible.sync="reviseTableDialog"
      width="50%"
      append-to-body
      @close="close"
    >
      <div class="dialog_div">
        <el-form
          :model="parameterForm"
          ref="parameterForm"
          :rules="parameterRules"
          label-width="120px"
        >
          <el-form-item prop="name" label="参数名称">
            <el-select @change="selectSysinfoKey" v-model="parameterForm.CODE" placeholder="请选择">
              <el-option
                v-for="item in sysinfoKeyData"
                :key="item.value"
                :label="item.label"
                :value="item.value">
                <span style="float: left">{{ item.label }}</span>
              </el-option>
            </el-select>
            <!-- <el-input v-model="parameterForm.CODE"></el-input> -->
          </el-form-item>

          <el-form-item prop="parameter" label="参数值">
            <el-input
              type="textarea"
              v-model="parameterForm.JSONSTR"
            ></el-input>
          </el-form-item>
        </el-form>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm">提交</el-button>
        <el-button @click="resetQuery">重置</el-button>
      </div>
    </el-dialog>

    <el-dialog
      title="系统参数设置"
      :visible.sync="SettingFromDialog"
      width="50%"
      append-to-body
    >
      <div style="width: 100%; text-align: left">
        <el-form
          :model="settingForm"
          ref="settingForm"
          :rules="settingRules"
          label-width="120px"
        >
          <div class="d-display">
            <div class="w50">
              <el-form-item prop="title" label="首页名称">
                <el-input
                  v-model="settingForm.title"
                  prefix-icon="iconfont icon-user"
                ></el-input>
              </el-form-item>
              <el-form-item prop="icon" label="图标class">
                <el-input
                  v-model="settingForm.icon"
                  prefix-icon="iconfont icon-user"
                ></el-input>
              </el-form-item>
            </div>
            <div class="w50">
              <el-form-item prop="systemName" label="系统名称">
                <el-input
                  v-model="settingForm.systemName"
                  prefix-icon="iconfont icon-user"
                ></el-input>
              </el-form-item>
              <el-form-item prop="address" label="地址">
                <el-input
                  v-model="settingForm.address"
                  prefix-icon="iconfont icon-user"
                ></el-input>
              </el-form-item>
            </div>
          </div>

          <el-form-item prop="image" label="logo图片">
            <el-upload action="#" list-type="picture-card" :auto-upload="false">
              <i slot="default" class="el-icon-plus"></i>
              <div slot="file" slot-scope="{ file }">
                <img
                  class="el-upload-list__item-thumbnail"
                  :src="file.url"
                  alt=""
                />
                <span class="el-upload-list__item-actions">
                  <span
                    class="el-upload-list__item-preview"
                    @click="handlePictureCardPreview(file)"
                  >
                    <i class="el-icon-zoom-in"></i>
                  </span>
                  <span
                    v-if="!disabled"
                    class="el-upload-list__item-delete"
                    @click="handleDownload(file)"
                  >
                    <i class="el-icon-download"></i>
                  </span>
                  <span
                    v-if="!disabled"
                    class="el-upload-list__item-delete"
                    @click="handleRemove(file)"
                  >
                    <i class="el-icon-delete"></i>
                  </span>
                </span>
              </div>
            </el-upload>
          </el-form-item>
          <el-form-item prop="href" label="访问地址">
            <el-input
              v-model="settingForm.href"
              prefix-icon="iconfont icon-user"
              placeholder="点击logo跳转的地址"
            ></el-input>
          </el-form-item>
        </el-form>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitSettingForm()">提交</el-button>
        <el-button @click="resetQuery2">重置</el-button>
      </div>
    </el-dialog>

    <el-dialog :visible.sync="dialogVisible">
      <img width="100%" :src="settingForm.image" alt="" />
    </el-dialog>
  </div>
</template>

<script>
import tableMenutTool from '@/views/tools/tableMenutTool'
import {
  getParameterData,
  addParameterSave,
  addsystemSave,
  deleteParameter,
  addSystemParameterSave,
  getSysinfoKeyMap,
} from '../api/parametersettings'
export default {
  name: 'parametersettings',
  components: {
    tableMenutTool,
    getParameterData,
    addParameterSave,
    addsystemSave,
    deleteParameter,
    addSystemParameterSave,
    getSysinfoKeyMap,
  },
  data() {
    return {
      loading: false,
      isRefreshRouter: false,
      tableData: [],
      total: 0,
      queryParams: {
        page: 1,
        limit: 10,
      },
      multipleSelection: [],
      reviseTableDialog: false,
      SettingFromDialog: false,
      parameterForm: {
        ID: '',
        CODE: '',
        JSONSTR: '',
      },
      parameterRules: {
        CODE: [{ required: true, message: '请输入参数名称', trigger: 'blur' }],
        JSONSTR: [{ required: true, message: '请填写参数值', trigger: 'blur' }],
      },
      settingForm: {
        title: '',
        systemName: '',
        icon: '',
        image: '',
        address: '',
        href: '',
      },
      settingRules: {
        title: [{ required: true, message: '请输入首页名称', trigger: 'blur' }],
        systemName: [
          { required: true, message: '请输入系统名称', trigger: 'blur' },
        ],
        icon: [{ required: true, message: '请输入图标class', trigger: 'blur' }],
        image: [
          { required: true, message: '请选择logo图片', trigger: 'image' },
        ],
        address: [{ required: true, message: '请输入地址', trigger: 'blur' }],
        href: [{ required: true, message: '请填写访问地址', trigger: 'blur' }],
      },
      isShowCheckbox: false,
      dialogVisible: false,
      disabled: false,
      dialogType: 'new',
      tableDeleteChange: '', //勾选选中列表id
      sysinfoKeyMapData: [], //add 参数名称 集合
      CODE: '系统参数', //系统参数
      systemParametersData: [], //系统参数列表
      sysinfoKeyData: [{
          label: '文件上传路径 - file.path',
          value: 'file.path'
        }, {
          label: '允许上传文件类型,多种用;号分开 - file.type',
          value: 'file.type'
        }, {
          label: '未登录跳转地址 - nosess',
          value: 'nosess'
        }, {
          label: '系统基础参数 - 系统参数',
          value: '系统参数'
        }, {
          label: '登录出地址,如果启用单点登录 - logoutUrl',
          value: 'logoutUrl'
        }, {
          label: '连续登录失败几次后次数后锁定用户，默认5次，设置小于0的表示不限制。 - loginFailTimes',
          value: 'loginFailTimes'
        }, {
          label: '无权限跳转地址 - nopms',
          value: 'nopms'
        }, {
          label: '登录界面文字 - loginTitle',
          value: 'loginTitle'
        }, {
          label: '子系统选择界面的标题 - casMainTitle',
          value: 'casMainTitle'
        }, {
          label: '登录是否需要验证码 - needCaptcha',
          value: 'needCaptcha'
        }],
    }
  },

  created() {
    this.getList()
    this.getSysinfoKeyMapList()
  },

  methods: {
    getList() {
      this.isRefreshRouter = !this.isRefreshRouter;
      setTimeout(() => {
        this.isRefreshRouter = !this.isRefreshRouter;
      },1000)
      getParameterData(this.queryParams).then((response) => {
        this.tableData = response.data
        this.total = response.count
      })
    },
    exportData() {
      this.download('/lui_sys/xtgl/info/listJson.do', { ...this.tableData }, `参数设置信息`)
      // this.download(this.tableData, `参数设置.xlsx`)
    },
    printJson() {
      this.$print(this.$refs.tableJson);
    },
    getSysinfoKeyMapList() {
      getSysinfoKeyMap(this.sysinfoKeyMapData).then((response) => {
        this.sysinfoKeyMapData = response
        // let obj = {}
        // obj.label = name
        // obj.value = value
        // var str = "系统参数:file.type"
        // console.log(this.sysinfoKeyMapData.split(':')[1])    // 后面   你是外国人
        // console.log(this.sysinfoKeyMapData.split(':')[0]) 
      })
    },
    selectSysinfoKey(value) {
      this.CODE = value
      addsystemSave(this.CODE).then((response) => {
        this.parameterForm = response.data
      })
    },
    submitForm: function () {
      this.$refs['parameterForm'].validate((valid) => {
        if (valid) {
          addParameterSave(this.parameterForm)
            .then((res) => {
              if (res.statusCode == 200) {
                this.$notify.success({ title: '提示', message: '保存成功' })
              } else {
                this.$notify.error({ title: '错误', message: res.message })
              }
              this.loading = false
              this.reviseTableDialog = false
              this.getList()
            })
            .catch((error) => {
              this.loading = false
            })
        } else {
          this.loading = false
          return false
        }
      })
    },
    handleDelete({ $index, row }) {
      this.$confirm('此操作将永久删除该用户, 是否继续?', '信息', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      })
        .then(async () => {
          await deleteParameter(row.ID)
          this.tableData.splice($index, 1)
          this.$message({
            type: 'success',
            message: '删除成功!',
          })
        })
        .catch((err) => {
          console.error(err)
        })
    },
    submitSettingForm: function () {
      this.$refs['settingForm'].validate((valid) => {
        if (valid) {
          addSystemParameterSave(this.settingForm)
            .then((res) => {
              if (res.statusCode == 200) {
                this.$notify.success({ title: '提示', message: '保存成功' })
              } else {
                this.$notify.error({ title: '错误', message: res.message })
              }
              this.loading = false
              this.SettingFromDialog = false
              this.getList()
            })
            .catch((error) => {
              this.loading = false
            })
        } else {
          this.loading = false
          return false
        }
      })
    },

    editingCheckbox() {
      this.isShowCheckbox = !this.isShowCheckbox
    },
    handleSizeChange(newSize) {
      this.queryParams.limit = newSize
      this.getList()
    },
    handleCurrentChange(newPage) {
      this.queryParams.page = newPage
      this.getList()
    },
    close() {
      this.parameterForm = []
      this.reviseTableDialog = false
    },
    resetQuery() {
      this.resetForm('parameterForm')
      this.reviseTableDialog = false
    },
    resetQuery2() {
      this.resetForm('settingForm')
      this.SettingFromDialog = false
    },
    editTable(from) {
      this.dialogType = 'edit'
      this.reviseTableDialog = true
      this.parameterForm = from.row
    },

    editingSetting() {
      addsystemSave(this.CODE).then((response) => {
        this.systemParametersData = response
        this.SettingFromDialog = true
      })
    },
    addNameList() {
      this.dialogType = 'new'
      return (this.reviseTableDialog = true)
    },
    handleRemove(file) {
      console.log(file)
    },
    handlePictureCardPreview(file) {
      this.settingForm.image = file.url
      this.dialogVisible = true
    },
    handleDownload(file) {
      console.log(file)
    },
    // 多选框选中数据
    handleSelectionChange(val) {
      const that = this
      that.tableDeleteChange = ''
      that.multipleSelection = val
      that.multipleSelection.forEach(function (e) {
        that.tableDeleteChange += e.ID + ','
      })
      that.tableDeleteChange = that.tableDeleteChange.substr(0, that.tableDeleteChange.length-1)
    },
    //删除勾选的列表用户
    deleteTable() {
      const that = this
      if (
        that.multipleSelection == undefined ||
        that.multipleSelection.length <= 0
      ) {
        that.$message({
          message: '请勾选择要删除的数据',
          type: 'warning',
          center: true,
        })
      } else {
        that
          .$confirm('此操作将永久删除该用户, 是否继续?', '信息', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning',
          })
          .then(async () => {
            await deleteParameter(that.tableDeleteChange)
            that.tableDeleteChange = ''
            that.getList()
            that.$message({
              type: 'success',
              message: '删除成功!',
            })
          })
          .catch((err) => {
            console.error(err)
          })
      }
    },
  },
}
</script>
<style>
.el-select{
  width: 100%;
}
.el-popover{
  min-width: 36px!important;
  text-align: center!important;
  padding:6px 0!important;
  border: 1px solid #ccc!important;
}
.el-popover .el-popover__title{
  font-size: 12px!important;
  margin: 0!important;
  color: #333!important;
}
</style>
<style lang='less' scoped>
.pb-bg {
  padding-bottom: 20px;
}
.dialog_div {
  // width: 100%;
  // text-align: center
}
.input_popover {
  // text-align: left;
  position: relative;
  background: red;
}
.popover_div {
  // position: absolute;
  // left: 0;
  // bottom: -180px;
  // width: 100%;
  // height: 180px;
  // z-index: 999;
  // background: yellow;
}
.popover_div_p {
  height: 36px;
  line-height: 36px;
  padding: 0 10px;
  cursor: pointer;
}
.popover_div_p:hover {
  font-weight: bold;
  color: #2d8cf0;
  background: #f6f6f6;
}
</style>