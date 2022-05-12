<template>
  <div class="pb-main-height">
    <div class="">
      <div class="public_table_tool">
        <div class="public_table_tool_inline" @click="getList">
          <i class="el-icon-refresh"></i>
        </div>
        <div class="public_table_tool_inline">
          <i class="el-icon-zoom-out"></i>
        </div>
        <div class="public_table_tool_inline" @click="addNameList">
          <i class="el-icon-circle-plus-outline"></i>
        </div>

        <div class="public_table_tool_inline">
          <i class="el-icon-delete"></i>
        </div>

        <div class="public_table_tool_inline">
          <i class="el-icon-close"></i>
        </div>
        <div class="public_table_tool_inline">
          <i class="el-icon-check"></i>
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
        <el-table-column prop="APP_NAME" label="应用名称" />
        <el-table-column prop="APP_URL" label="访问地址" width="200" />
        <el-table-column prop="APP_SORT" label="排序" />
        <el-table-column prop="APP_ICON" label="图标" />

        <el-table-column label="状态">
          <template slot-scope="scope">
            <el-switch
              v-model="scope.row.APP_ZT"
              active-value="1"
              inactive-value="0"
              active-color="#2D8CF0"
              inactive-color="#D2D2D2"
              @change="changeStatus($event, scope.row, scope.$index)"
            >
            </el-switch>
          </template>
        </el-table-column>

        <el-table-column fixed="right" label="操作" width="120">
          <template slot-scope="scope">
            <span class="public-table-btn table-btn-edit" @click="editTable(scope)"
              >编辑</span
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
      title="附件修改"
      :visible.sync="reviseTableDialog"
      width="50%"
      append-to-body
      @close="close"
    >
      <div style="width: 100%; text-align: center">
        <el-form
          :model="applicationForm"
          ref="applicationForm"
          :rules="applicationRules"
          label-width="120px"
        >
          <div class="d-display">
            <div class="w50">
              <el-form-item prop="APP_CODE" label="应用代码">
                <el-input
                  v-model="applicationForm.APP_CODE"
                  prefix-icon="iconfont icon-user"
                ></el-input>
              </el-form-item>
              <el-form-item prop="APP_NAME" label="应用名称">
                <el-input
                  v-model="applicationForm.APP_NAME"
                  prefix-icon="iconfont icon-user"
                ></el-input>
              </el-form-item>

              <el-form-item prop="APP_ICON" label="图标">
                <el-input
                  v-model="applicationForm.APP_ICON"
                  prefix-icon="iconfont icon-user"
                ></el-input>
              </el-form-item>
            </div>
            <div class="w50">
              <el-form-item prop="APP_SORT" label="排序">
                <el-input
                  v-model="applicationForm.APP_SORT"
                  prefix-icon="iconfont icon-user"
                ></el-input>
              </el-form-item>
              <el-form-item label="状态">
                <el-select
                  v-model="applicationForm.APP_ZT"
                  placeholder="请选择状态"
                >
                  <el-option label="停用" value="0"></el-option>
                  <el-option label="启用" value="1"></el-option>
                </el-select>
              </el-form-item>
              
              <el-form-item prop="APP_URL" label="访问地址">
                <el-input
                  v-model="applicationForm.APP_URL"
                  prefix-icon="iconfont icon-user"
                ></el-input>
              </el-form-item>
            </div>
          </div>
          <el-form-item prop="APP_REMARK" label="备注">
            <el-input
              type="textarea"
              v-model="applicationForm.APP_REMARK"
            ></el-input>
          </el-form-item>
        </el-form>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm">保存</el-button>
        <el-button @click="resetQuery">重置</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import tableMenutTool from '@/views/tools/tableMenutTool'
import {
  getAppData,
  addAppSave,
  updateStatusByIds,
  deleteApp,
} from '../api/application'
export default {
  name: 'application',
  components: {
    tableMenutTool,
    getAppData,
    addAppSave,
    updateStatusByIds,
    deleteApp,
  },
  components: {
    tableMenutTool,
  },
  data() {
    return {
      loading: false,
      tableData: [],
      total: 0,
      queryParams: {
        page: 1,
        limit: 10,
      },
      multipleSelection: [],
      reviseTableDialog: false,
      operatingStatus: '',
      applicationForm: {
        APP_ID: '',
        APP_CODE: '',
        APP_NAME: '',
        APP_ICON: '',
        APP_URL: '',
        APP_SORT: '',
        APP_REMARK: '',
        APP_ZT: '',
      },
      applicationRules: {
        APP_CODE: [
          { required: true, message: '请输入应用代码', trigger: 'blur' },
        ],
        APP_NAME: [
          { required: true, message: '请输入应用名称', trigger: 'blur' },
        ],
        APP_URL: [
          { required: true, message: '请输入访问地址', trigger: 'blur' },
        ],
        APP_SORT: [{ required: true, message: '请输入排序', trigger: 'blur' }],
        APP_ICON: [{ required: true, message: '请选择图标', trigger: 'change' }],
        APP_ZT: [
          { required: true, message: '请选择状态', trigger: 'change' },
        ],
        APP_REMARK: [{ required: true, message: '请输入备注', trigger: 'blur' }],
      },
      isShowCheckbox: false,
      dialogType: 'new',
      querySwitch: {
        ids: '',
        APP_ZT: '',
      },
    }
  },

  created() {
    this.getList()
  },

  methods: {
    getList() {
      this.loading = true
      getAppData(this.queryParams).then((response) => {
        this.tableData = response.data
        this.total = response.count
        this.loading = false
      })
    },
    submitForm: function () {
      this.$refs['applicationForm'].validate((valid) => {
        if (valid) {
          addAppSave(this.applicationForm)
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
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    close() {
      this.applicationForm = []
      this.reviseTableDialog = false
    },
    editTable(from) {
      this.dialogType = 'edit'
      this.reviseTableDialog = true
      this.applicationForm = from.row
    },
    resetQuery() {
      this.resetForm('applicationForm')
      this.reviseTableDialog = false
    },
    addNameList() {
      this.dialogType = 'new'
      return (this.reviseTableDialog = true)
    },

    handleDelete({ $index, row }) {
      this.$confirm('此操作将永久删除该用户, 是否继续?', '信息', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      })
        .then(async () => {
          await deleteApp(row.ROLE_ID)
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
    // 开关事件
    changeStatus(e, row, index) {
      this.querySwitch.ids = row.APP_ID
      if (e == true) {
        this.querySwitch.APP_ZT = '1'
      } else {
        this.querySwitch.APP_ZT = '0'
      }
      console.log(this.querySwitch.ids,this.querySwitch.APP_ZT)
      updateStatusByIds(this.querySwitch).then((response) => {
        if (response.statusCode !== 200) {
          this.$message.error(response.message)
        } else {
          this.$message.error(response.message)
        }
      })
    },
  },
}
</script>
<style>
.el-form-item__content .el-input,
.el-select,
.el-date-editor,
.el-form-item__content .el-checkbox-group {
  width: 100% !important;
}
</style>
<style lang='less' scoped>
</style>