<template>
  <div class="pb-main-height">
    <div class="">
      <div class="public_table_tool">
        <div class="public_table_tool_inline">
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
        max-height="250"
        @selection-change="handleSelectionChange"
      >
        <el-table-column fixed="left" type="selection" width="45" />
        <el-table-column label="#" type="index" width="45" />
        <el-table-column prop="name" label="参数名称" />
        <el-table-column prop="parametervalue" label="参数值" width="700" />

        <el-table-column fixed="right" label="操作" width="120">
          <template slot-scope="scope">
            <span class="public-table-btn table-btn-edit" @click="reviseTable"
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
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[100, 200, 300, 400]"
        :page-size="1"
        class="el_pagination"
        layout="total, sizes, prev, pager, next, jumper"
        :total="1"
      >
      </el-pagination>
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
          ref="parameterForm"
          :rules="parameterRules"
          label-width="120px"
        >
          <el-form-item prop="name" label="参数名称">
            <el-input
              v-model="parameterForm.name"
              prefix-icon="iconfont icon-user"
            ></el-input>
          </el-form-item>
          <el-form-item prop="parameter" label="参数值">
            <el-input
              type="textarea"
              v-model="parameterForm.parameter"
            ></el-input>
          </el-form-item>
        </el-form>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm('form')">提交</el-button>
        <el-button @click="resetForm">重置</el-button>
      </div>
    </el-dialog>

    <el-dialog
      title="系统参数设置"
      :visible.sync="SettingFromDialog"
      width="50%"
      append-to-body
    >
      <div style="width: 100%; text-align: left;">
        <el-form
          :model="settingForm"
          ref="settingForm"
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
        <el-button type="primary" @click="submitSettingForm('form')"
          >提交</el-button
        >
        <el-button @click="resetSettingForm">重置</el-button>
      </div>
    </el-dialog>

    <el-dialog :visible.sync="dialogVisible">
      <img width="100%" :src="settingForm.logoImage" alt="" />
    </el-dialog>
  </div>
</template>

<script>
import tableMenutTool from '@/views/tools/tableMenutTool'
export default {
  name: 'parametersettings',
  components: {
    tableMenutTool,
  },
  data() {
    return {
      tableData: [
        {
          name: 'zhy',
          parametervalue: '登录系统',
        },
      ],
      currentPage: 4,
      multipleSelection: [],
      reviseTableDialog: false,
      SettingFromDialog: false,
      parameterForm: {
        name: 'sdadmin',
        parameter: 'sdadmin',
      },
      parameterRules: {
        name: [{ required: true, message: '请输入参数名称', trigger: 'blur' }],
        parameter: [
          { required: true, message: '请填写参数值', trigger: 'blur' },
        ],
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
    }
  },

  created() {
    this.getList()
  },

  methods: {
    getList() {},
    submitForm() {},
    submitSettingForm() {},
    editingCheckbox() {
      this.isShowCheckbox = !this.isShowCheckbox
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`)
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`)
    },
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    close() {
      this.parameterForm = []
      this.reviseTableDialog = false
    },
    resetForm() {
      this.$refs.parameterForm.resetFields()
      this.reviseTableDialog = false
    },
    resetSettingForm() {
      this.$refs.settingForm.resetFields()
      this.SettingFromDialog = false
    },
    reviseTable() {
      return (this.reviseTableDialog = true)
    },
    editingSetting() {
      return (this.SettingFromDialog = true)
    },
    addNameList() {
      return (this.reviseTableDialog = true)
      this.$refs.parameterForm.resetFields()
    },

    handleDelete(row) {
      const ids = row.id || this.ids
      this.$confirm('是否确认删除该用户?', '信息', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      })
        .then(function () {
          // return delCRestaurants(ids)
        })
        .then(() => {
          this.getList()
          this.msgSuccess('删除成功')
        })
        .catch(function () {})
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