<template>
  <div class="pb-main-height">
    <div class="h100 pb-bg">
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
        @selection-change="handleSelectionChange"
      >
        <el-table-column fixed="left" type="selection" width="45" />
        <el-table-column label="#" type="index" width="45" />
        <el-table-column prop="filename" label="文件名" :render-header="(element,obj) => renderSpecNameHeader(element, obj, {componentType: 'input'})"/>
        <el-table-column prop="path" label="路径" :render-header="(element,obj) => renderSpecNameHeader(element, obj, {componentType: 'input'})"/>
        <el-table-column prop="size" label="大小" :render-header="(element,obj) => renderSpecNameHeader(element, obj, {componentType: 'input'})"/>
        <el-table-column prop="uploadtime" label="上传时间" :render-header="(element,obj) => renderSpecNameHeader(element, obj, {componentType: 'input'})"/>
        <el-table-column prop="storagelocation" label="存储位置" :render-header="(element,obj) => renderSpecNameHeader(element, obj, {componentType: 'input'})"/>
        <el-table-column fixed="right" label="操作" width="120">
          <template slot-scope="scope">
            <span
              class="public-table-btn table-btn-edit"
              @click="editTable(scope)"
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
      :title="dialogType === 'edit' ? '修改附件' : '添加附件'"
      :visible.sync="reviseTableDialog"
      width="50%"
      append-to-body
      @close="close"
    >
      <div style="width: 100%; text-align: center">
        <el-form
          :model="appendixForm"
          ref="appendixForm"
          :rules="appendixRules"
          label-width="90px"
        >
          <div class="d-display">
            <div class="w50">
              <el-form-item prop="filename" label="文件名">
                <el-input
                  v-model="appendixForm.filename"
                  prefix-icon="iconfont icon-user"
                ></el-input>
              </el-form-item>
              <el-form-item prop="path" label="路径">
                <el-input
                  v-model="appendixForm.path"
                  prefix-icon="iconfont icon-user"
                ></el-input>
              </el-form-item>
              <el-form-item prop="uploadtime" label="上传时间">
                <el-date-picker
                  v-model="appendixForm.uploadtime"
                  type="date"
                  placeholder="选择日期"
                >
                </el-date-picker>
              </el-form-item>
              <el-form-item prop="uploaduser" label="上传用户">
                <el-input
                  v-model="appendixForm.uploaduser"
                  prefix-icon="iconfont icon-user"
                ></el-input>
              </el-form-item>
            </div>
            <div class="w50">
              <el-form-item prop="newfilename" label="新文件名">
                <el-input
                  v-model="appendixForm.newfilename"
                  prefix-icon="iconfont icon-user"
                ></el-input>
              </el-form-item>
              <el-form-item prop="size" label="大小">
                <el-input
                  v-model="appendixForm.size"
                  prefix-icon="iconfont icon-user"
                ></el-input>
              </el-form-item>
              <el-form-item prop="state" label="状态">
                <el-input
                  v-model="appendixForm.state"
                  prefix-icon="iconfont icon-user"
                ></el-input>
              </el-form-item>

              <el-form-item prop="extensionname" label="扩展名">
                <el-input
                  v-model="appendixForm.extensionname"
                  prefix-icon="iconfont icon-user"
                ></el-input>
              </el-form-item>
            </div>
          </div>
          <el-form-item prop="filelocation" label="文件位置">
            <el-input
              v-model="appendixForm.filelocation"
              prefix-icon="iconfont icon-user"
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
import SelectHeader from '../components/Pagination/SelectHeader'
import {
  getAttachmentData,
  addAttachmentSave,
  deleteUser,
} from '../api/attachment'
export default {
  name: 'attachment',
  components: {
    tableMenutTool,
    getAttachmentData,
    addAttachmentSave,
    deleteUser,
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
        filename: '',
        path: '',
        size: '',
        uploadtime: '',
        storagelocation:'',
      },
      reviseTableDialog: false,
      appendixForm: {
        filename: 'sdadmin',
        newfilename: 'sdadmin',
        path: 'hnshendy.com',
        size: '1024',
        state: '',
        uploadtime: '2021-05-28 22:01:59',
        uploaduser: '',
        extensionname: '',
        filelocation: '',
      },
      appendixRules: {
        filename: [
          { required: true, message: '请输入文件名', trigger: 'blur' },
        ],
        newfilename: [
          { required: true, message: '请输入新文件名', trigger: 'blur' },
        ],
        path: [{ required: true, message: '请输入路径', trigger: 'blur' }],
        size: [{ required: true, message: '请输入大小', trigger: 'blur' }],
        uploadtime: [
          {
            type: 'date',
            required: true,
            message: '请选择上传日期',
            trigger: 'change',
          },
        ],
        uploaduser: [
          { required: true, message: '请输入上传用户', trigger: 'blur' },
        ],
        extensionname: [
          { required: true, message: '请输入扩展名', trigger: 'blur' },
        ],
        filelocation: [
          { required: true, message: '请输入文件位置', trigger: 'blur' },
        ],
      },
      isShowCheckbox: false,
      dialogType: 'new',
      multipleSelection: [],
      tableDeleteChange: '', //勾选选中列表id
      queryParamsSaveUserOrg: {
        ids: '',
      },
    }
  },

  created() {
    this.getList()
  },

  methods: {
    getList() {
      this.isRefreshRouter = !this.isRefreshRouter;
      setTimeout(() => {
        this.isRefreshRouter = !this.isRefreshRouter;
      }, 1000)
      getAttachmentData(this.queryParams).then((response) => {
        this.tableData = response.data
        this.total = response.count
      })
    },
    exportData() {
      this.download('/lui_sys/xtgl/file/listJson.do', { ...this.tableData }, `附近管理信息`)
      // this.download(this.tableData, `附近管理信息.xlsx`)
    },
    printJson() {
      this.$print(this.$refs.tableJson);
    },
    submitForm: function () {
      this.$refs['appendixForm'].validate((valid) => {
        if (valid) {
          addAttachmentSave(this.appendixForm)
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
        that.tableDeleteChange += e.USER_ID + ','
        that.queryParamsSaveUserOrg.ids += e.USER_ID + ','
      })
      that.tableDeleteChange = that.tableDeleteChange.substr(0, that.tableDeleteChange.length-1)
      that.queryParamsSaveUserOrg.ids = that.queryParamsSaveUserOrg.ids.substr(0, that.queryParamsSaveUserOrg.ids.length-1)
    },
    close() {
      this.appendixForm = []
      this.reviseTableDialog = false
    },
    resetQuery() {
      this.resetForm('appendixForm')
      this.reviseTableDialog = false
    },
    editTable(from) {
      this.dialogType = 'edit'
      this.reviseTableDialog = true
      this.appendixForm = from.row
    },
    addNameList() {
      this.dialogType = 'new'
      this.reviseTableDialog = true
    },
    handleDelete({ $index, row }) {
      this.$confirm('此操作将永久删除该用户, 是否继续?', '信息', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      })
        .then(async () => {
          await deleteUser(row.APP_ID)
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
/* .el-popover{
  min-width: 36px!important;
  text-align: center!important;
  padding:6px 0!important;
  border: 1px solid #ccc!important;
}
.el-popover .el-popover__title{
  font-size: 12px!important;
  margin: 0!important;
  color: #333!important;
} */
</style>
<style lang='less' scoped>
</style>