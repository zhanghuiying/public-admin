<template>
  <div class="pb-main-height">
    <div class="">
      <div class="public_table_tool">
        <div class="public_table_tool_inline" @click="getList()">
          <i class="el-icon-refresh"></i>
        </div>

        <div class="public_table_tool_inline" @click="addNameList">
          <i class="el-icon-circle-plus-outline"></i>
        </div>

        <div class="public_table_tool_inline">
          <i class="el-icon-delete"></i>
        </div>
        <div class="public_table_tool_inline">
          <i class="el-icon-setting" @click="editingSetting()"></i>
        </div>
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
          <table-menut-tool />
        </div>
      </div>

      <el-table
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
              @click="handleDelete(scope.row)"
              >删除</span
            >
          </template>
        </el-table-column>
      </el-table>

      <el-pagination
        v-show="total > 0"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="queryParams.pageNum"
        :page-size="queryParams.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
    </div>

    <el-dialog
      title="参数修改"
      :visible.sync="reviseTableDialog"
      width="50%"
      append-to-body
      @close="close"
    >
      <div style="width: 100%; text-align: center">
        <el-form
          :model="parameterForm"
          ref="queryForm"
          :rules="parameterRules"
          label-width="120px"
        >
          <el-form-item prop="name" label="参数名称">
            <el-input
              v-model="parameterForm.CODE"
              prefix-icon="iconfont icon-user"
            ></el-input>
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
        <el-button type="primary" @click="submitForm('parameterForm')"
          >提交</el-button
        >
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
          ref="queryForm2"
          :rules="settingRules"
          label-width="120px"
        >
          <div class="d-display">
            <div class="w50">
              <el-form-item prop="homeName" label="首页名称">
                <el-input
                  v-model="settingForm.homeName"
                  prefix-icon="iconfont icon-user"
                ></el-input>
              </el-form-item>
              <el-form-item prop="iconClass" label="图标class">
                <el-input
                  v-model="settingForm.iconClass"
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

          <el-form-item prop="logoImage" label="logo图片">
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
          <el-form-item prop="accessAddress" label="访问地址">
            <el-input
              v-model="settingForm.accessAddress"
              prefix-icon="iconfont icon-user"
              placeholder="点击logo跳转的地址"
            ></el-input>
          </el-form-item>
        </el-form>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitSettingForm('settingForm')"
          >提交</el-button
        >
        <el-button @click="resetQuery2">重置</el-button>
      </div>
    </el-dialog>

    <el-dialog :visible.sync="dialogVisible">
      <img width="100%" :src="settingForm.logoImage" alt="" />
    </el-dialog>
  </div>
</template>

<script>
import tableMenutTool from '@/views/tools/tableMenutTool'
import {
  getParameterData,
  addParameterSave,
  deleteParameter,
  addSystemParameterSave,
} from '../api/parametersettings'
export default {
  name: 'parametersettings',
  components: {
    tableMenutTool,
    getParameterData,
    addParameterSave,
    deleteParameter,
    addSystemParameterSave,
  },
  data() {
    return {
      loading: false,
      tableData: [],
      total: 0,
      queryParams: {
        pageNum: 1,
        pageSize: 10,
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
        homeName: 'sdadmin',
        systemName: 'sfdf',
        iconClass: 'element-ui-icon element-ui-icon-home',
        logoImage: '',
        address: 'sdadmin',
        accessAddress: 'sdadmin',
      },
      settingRules: {
        homeName: [
          { required: true, message: '请输入首页名称', trigger: 'blur' },
        ],
        systemName: [
          { required: true, message: '请输入系统名称', trigger: 'blur' },
        ],
        iconClass: [
          { required: true, message: '请输入图标class', trigger: 'blur' },
        ],
        logoImage: [
          { required: true, message: '请输入logo图片', trigger: 'blur' },
        ],
        address: [{ required: true, message: '请输入地址', trigger: 'blur' }],
        accessAddress: [
          { required: true, message: '请填写访问地址', trigger: 'blur' },
        ],
      },
      isShowCheckbox: false,
      dialogVisible: false,
      disabled: false,
      dialogType: 'new',
    }
  },

  created() {
    this.getList()
  },

  methods: {
    getList() {
      this.loading = true
      getParameterData(this.queryParams).then((response) => {
        this.tableData = response.data
        this.total = response.count
        this.loading = false
      })
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.loading = true
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
      this.$confirm('是否确认删除该用户?', '信息', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      })
        .then(async () => {
          await deleteParameter(row.ROLE_ID)
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
    submitSettingForm() {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.loading = true
          addSystemParameterSave(this.parameterForm)
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
      this.queryParams.pageSize = newSize
      this.getList()
    },
    handleCurrentChange(newPage) {
      this.queryParams.pageNum = newPage
      this.getList()
    },
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    close() {
      this.parameterForm = []
      this.reviseTableDialog = false
    },
    resetQuery() {
      this.resetForm('queryForm')
      this.reviseTableDialog = false
    },
    resetQuery2() {
      this.resetForm('queryForm2')
      this.SettingFromDialog = false
    },
    editTable(from) {
      this.dialogType = 'edit'
      this.reviseTableDialog = true
      this.parameterForm = from.row
    },

    editingSetting() {
      return (this.SettingFromDialog = true)
    },
    addNameList() {
      this.dialogType = 'new'
      return (this.reviseTableDialog = true)
    },
    handleRemove(file) {
      console.log(file)
    },
    handlePictureCardPreview(file) {
      this.settingForm.logoImage = file.url
      this.dialogVisible = true
    },
    handleDownload(file) {
      console.log(file)
    },
  },
}
</script>

<style lang='less' scoped>
</style>