<template>
  <div class="pb-main-height">
    <div class="h100 pb-bg">
      <div class="public_table_tool">
        <el-tooltip class="item" effect="dark" content="刷新" placement="top">
          <div class="public_table_tool_inline" @click="getList()">
            <i :class="[isRefreshRouter? 'el-icon-refresh refresh-go' : 'el-icon-refresh']"></i>
          </div>
        </el-tooltip>
        <el-tooltip class="item" effect="dark" content="添加" placement="top">
          <div class="public_table_tool_inline" @click="addNameList()">
            <i class="el-icon-circle-plus-outline"></i>
          </div>
        </el-tooltip>
        <el-tooltip class="item" effect="dark" content="删除" placement="top">
          <div class="public_table_tool_inline" @click="deleteTable()">
            <i class="el-icon-delete"></i>
          </div>
        </el-tooltip>
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
            <el-tooltip class="item" effect="dark" content="筛选列" placement="top">
              <div class="public_table_tool_inline">
                <i class="el-icon-data-analysis"></i>
              </div>
            </el-tooltip>
            <el-tooltip class="item" effect="dark" content="导出" placement="top">
              <div class="public_table_tool_inline" @click="exportData">
                <i class="el-icon-receiving"></i>
              </div>
            </el-tooltip>
            <el-tooltip class="item" effect="dark" content="打印" placement="top">
              <div class="public_table_tool_inline" @click="printJson">
                <i class="el-icon-printer"></i>
              </div>
            </el-tooltip>
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
        
        
        <el-table-column prop="NAME" label="定时任务名称" :render-header="(element,obj) => renderSpecNameHeader(element, obj, {componentType: 'input'})"/>
        <el-table-column prop="CRONSTR" label="CRON表达式" :render-header="(element,obj) => renderSpecNameHeader(element, obj, {componentType: 'input'})"/>
        <el-table-column prop="CLASSPATH" label="任务类名" :render-header="(element,obj) => renderSpecNameHeader(element, obj, {componentType: 'input'})"/>

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
      :title="dialogType === 'edit' ? '修改定时任务' : '添加定时任务'"
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
        <el-button type="primary" @click="submitForm()">保存</el-button>
        <el-button @click="resetQuery">重置</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import tableMenutTool from '@/views/tools/tableMenutTool'
import SelectHeader from '../components/Pagination/SelectHeader'
import {
  getTimedtaskData,
  getTaskClass,
  addTimedtaskSave,
  deleteTimedtask,
  deleteUser,
  editSwitchChange,
  exeTaskOnece
} from '../api/timedtask'
export default {
  name: 'timedtask',
  components: {
    tableMenutTool,
    getTimedtaskData,
    getTaskClass,
    addTimedtaskSave,
    deleteTimedtask,
    deleteUser,
    editSwitchChange,
    exeTaskOnece,
    SelectHeader
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
        NAME: '',
        CRONSTR: '',
        CLASSPATH: '',
      },
      reviseTableDialog: false,
      timedTaskForm: {
        YXZT: '',
        ID: '',
        CLASSPATH: '',
        NAME: '',
        CRONSTR: '',
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
      multipleSelection: [],
      tableDeleteChange: '', //勾选选中列表id
      queryParamsSaveUserOrg: {
        ids: '',
      },
    }
  },

  created() {
    this.getList()
    this.getTaskClassList()
  },

  methods: {
    getList() {
      this.isRefreshRouter = !this.isRefreshRouter;
      setTimeout(() => {
        this.isRefreshRouter = !this.isRefreshRouter;
      },1000)
      getTimedtaskData(this.queryParams).then((response) => {
        this.tableData = response.data
        this.total = response.count
      })
    },
    exportData() {
      this.download('/lui_sys/pim/user/listJson.do', { ...this.tableData }, `定时任务信息`)
      // this.download(this.tableData, `定时任务.xlsx`)
    },
    printJson() {
      this.$print(this.$refs.tableJson);
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
      const that = this
      that.tableDeleteChange = ''
      that.queryParamsSaveUserOrg.ids = ''
      that.multipleSelection = val
      that.multipleSelection.forEach(function (e) {
        that.tableDeleteChange += e.ID + ','
        that.queryParamsSaveUserOrg.ids += e.ID + ','
      })
      that.tableDeleteChange = that.tableDeleteChange.substr(0, that.tableDeleteChange.length-1)
      that.queryParamsSaveUserOrg.ids = that.queryParamsSaveUserOrg.ids.substr(0, that.queryParamsSaveUserOrg.ids.length-1)

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
          await deleteTimedtask(row.ID)
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
            await deleteUser(that.tableDeleteChange)
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
              this.$notify.success({ title: '提示', message: '保存成功' })
            } else {
              this.$message.error(response.message)
            }
          })
        })
        .catch((err) => {
          console.error(err)
        })
    },
    renderSpecNameHeader (createElement, { column, $index }, mold) {
      const self = this
      return createElement(
        'div',{
          style: 'display:inline-flex;'
        },[
          createElement('div', {
            domProps: {
              innerHTML: column.label
            }
          }),
          createElement(SelectHeader, {
            style: 'cursor: pointer;position: absolute;right: 16px;top: 0;',
            props: {
              componentModule: mold.componentType,
              type: column.property,
              options: self.specIdOptions, // 下拉框选项
              defaultValue: self.examinerFieldChname, // 默认值
              defaultProps: {
                value: 'examinerFieldName',
                label: 'examinerFieldChname'
              }
            },
            on: {
              selectChange: self.selectChange,
              resetChange: self.resetChange
            },
            nativeOn: {
            }
          })
        ]
      )
    },
    selectChange (data) {
        const type = data['type']
        const value = data['value']
        this.queryParams[type] = value
        this.queryParams[data.type] = data.value;
        this.getList();
      },
    resetChange (data) {
      delete this.queryParams[data['type']]
      this.queryParams[data.type] = data.value;
      this.getList();
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