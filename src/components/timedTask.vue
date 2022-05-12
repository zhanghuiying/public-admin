<template>
  <div class="pb-main-height">
    <div class="">
      <div class="public_table_tool">
        <div class="public_table_tool_inline" @click="getList">
          <i class="el-icon-refresh"></i>
        </div>
        <div class="public_table_tool_inline" @click="addNameList">
          <i class="el-icon-circle-plus-outline"></i>
        </div>

        <div class="public_table_tool_inline">
          <i class="el-icon-delete"></i>
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
        <el-table-column prop="NAME" label="定时任务名称" />
        <el-table-column prop="CRONSTR" label="CRON表达式" />
        <el-table-column prop="CLASSPATH" label="任务类名" />

        <el-table-column label="运行状态">
          <template slot-scope="scope">
            <el-switch
              v-model="scope.row.YXZT"
              active-value="1"
              inactive-value="0"
              active-color="#2D8CF0"
              inactive-color="#D2D2D2"
              @change="changeStatus($event, scope.row, scope.$index)"
            >
            </el-switch>
          </template>
        </el-table-column>

        <el-table-column fixed="right" label="操作" width="220">
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
            <span
              class="public-table-btn table-btn-delete"
              @click="exeTaskOnece(scope)"
              >执行一次</span
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
      :title="dialogType === 'edit' ? '附件修改' : '添加附件修改'"
      :visible.sync="reviseTableDialog"
      width="50%"
      append-to-body
      @close="close"
    >
      <div style="width: 100%; text-align: center">
        <el-form
          :model="timedTaskForm"
          ref="timedTaskForm"
          :rules="timedTaskRules"
          label-width="120px"
        >
          <div class="d-display">
            <div class="w50">
              <el-form-item prop="CLASSPATH" label="任务类">
                <el-input
                  v-model="timedTaskForm.CLASSPATH"
                  prefix-icon="iconfont icon-user"
                ></el-input>
              </el-form-item>
              <el-form-item prop="NAME" label="任务名称">
                <el-input
                  v-model="timedTaskForm.NAME"
                  prefix-icon="iconfont icon-user"
                ></el-input>
              </el-form-item>
            </div>
            <div class="w50">
              <el-form-item prop="CRONSTR" label="CRON表达式">
                <el-input
                  v-model="timedTaskForm.CRONSTR"
                  prefix-icon="iconfont icon-user"
                ></el-input>
              </el-form-item>
              <el-form-item label="运行状态">
                <el-select
                  v-model="timedTaskForm.YXZT"
                  placeholder="请选择运行状态"
                >
                  <el-option label="停用" value="0"></el-option>
                  <el-option label="启用" value="1"></el-option>
                </el-select>
              </el-form-item>
            </div>
          </div>
          <el-form-item prop="remark" label="备注">
            <el-input type="textarea" v-model="timedTaskForm.BZ"></el-input>
          </el-form-item>
        </el-form>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm('timedTaskForm')">保存</el-button>
        <el-button @click="resetQuery">重置</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import tableMenutTool from '@/views/tools/tableMenutTool'
import {
  getTimedtaskData,
  getTaskClass,
  addTimedtaskSave,
  deleteTimedtask,
  editSwitchChange,
  exeTaskOnece,
} from '../api/timedtask'
export default {
  name: 'timedtask',
  components: {
    tableMenutTool,
    getTimedtaskData,
    getTaskClass,
    addTimedtaskSave,
    deleteTimedtask,
    editSwitchChange,
    exeTaskOnece,
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
      timedTaskForm: {
        ID: '',
        CLASSPATH: '',
        NAME: '',
        CRONSTR: '',
        YXZT: '',
        BZ: '',
      },
      timedTaskRules: {
        CLASSPATH: [{ required: true, message: '任务类', trigger: 'blur' }],
        NAME: [{ required: true, message: '请输入任务名称', trigger: 'blur' }],
        CRONSTR: [
          { required: true, message: '请输入CRON表达式', trigger: 'blur' },
        ],
        YXZT: [
          { required: true, message: '请选择运行状态', trigger: 'change' },
        ],
        BZ: [{ required: true, message: '请输入备注', trigger: 'blur' }],
      },
      isShowCheckbox: false,
      dialogType: 'new',
      TaskClassData: [],
      querySwitch: {
        ID: '',
        YXZT: '',
      },
    }
  },

  created() {
    this.getList()
    this.getTaskClassList()
  },

  methods: {
    getList() {
      this.loading = true
      getTimedtaskData(this.queryParams).then((response) => {
        this.tableData = response.data
        this.total = response.count
        this.loading = false
      })
    },
    getTaskClassList() {
      this.loading = true
      getTaskClass(this.queryParams).then((response) => {
        this.TaskClassData = response.data
        this.loading = false
      })
    },
    submitForm: function () {
      this.$refs['timedTaskForm'].validate((valid) => {
        if (valid) {
          addTimedtaskSave(this.timedTaskForm)
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
      this.timedTaskForm = []
      this.reviseTableDialog = false
    },
    resetQuery() {
      this.resetForm('timedTaskForm')
      this.reviseTableDialog = false
    },
    editTable(from) {
      this.dialogType = 'edit'
      this.reviseTableDialog = true
      this.timedTaskForm = from.row
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
          await deleteTimedtask(row.ROLE_ID)
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
      this.querySwitch.ID = row.ID
      if (e == true) {
        this.querySwitch.YXZT = '1'
      } else {
        this.querySwitch.YXZT = '0'
      }
      editSwitchChange(this.querySwitch).then((response) => {
        if (response.statusCode !== 200) {
          this.$message.error(response.message)
        } else {
          this.$message.error(response.message)
        }
      })
    },
    exeTaskOnece({ $index, row }) {
      this.timedTaskForm = row
      this.$confirm('确定吗?', '信息', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      })
        .then(async () => {
          exeTaskOnece(this.timedTaskForm).then((response) => {
            if (response.statusCode !== 200) {
              this.$message.error(response.message)
            } else {
              this.$message.error(response.message)
            }
          })
        })
        .catch((err) => {
          console.error(err)
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