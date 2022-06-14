<template>
  <div class="d-display data_diction">
    <div class="pb-main-data-left">
      <div class="public-card-body">
        <div class="public_table_tool">
          <el-popover placement="top" title="刷新" trigger="hover" width="36">
                  <div slot="reference" class="public_table_tool_inline" @click="getList()">
                    <i :class="[isRefreshRouter? 'el-icon-refresh refresh-go' : 'el-icon-refresh']"></i>
                  </div>
                </el-popover>
                <el-popover placement="top" title="添加" trigger="hover" width="36">
                  <div slot="reference" class="public_table_tool_inline" @click="addDetaList()">
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

        <div class="input_border">
          <el-table
            ref="tableJson"
            :data="tableData"
            style="width: 100%"
            @cell-click="goTableClick"
            @selection-change="handleSelectionChange"
          >
            <el-table-column fixed="left" type="selection" width="45" />
            <el-table-column label="分组代码">
              <template slot-scope="scope">
                {{ scope.row.OG_CODE }}
                <!-- <el-input
                  :value="scope.row.OG_CODE"
                  @blur="sureChange(scope)"
                  @input="(a) => tableInputInp(a, scope)"
                >
              </el-input> -->
              </template>
            </el-table-column>
            <el-table-column label="分组名称">
              <template slot-scope="scope">
                {{ scope.row.OG_NAME }}
              </template>
            </el-table-column>

            <el-table-column label="状态">
              <template slot-scope="scope">
                {{ stateText[scope.row.OG_STATE] }}
              </template>
            </el-table-column>
          </el-table>
        </div>

        <el-pagination
          v-show="total > 0"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="queryParams.page"
          :page-size="queryParams.limit"
          layout="total, prev, pager, next"
          :total="total"
        ></el-pagination>
      </div>
    </div>
    <div class="pb-main-data-right pb-main_pad-lf">
      <div class="h100 pb-bg">
      <div class="pb-bg pb-main-padding-bt pb-main-margin-b">
        <p class="public_card_header">分组详情</p>
        <el-form
          :model="groupingForm"
          ref="groupingForm"
          :rules="groupingRules"
          label-width="120px"
        >
          <div class="d-display pb-main-padding-t">
            <div class="w50">
              <el-form-item prop="OG_CODE" label="分组代码">
                <el-input
                  v-model="groupingForm.OG_CODE"
                  prefix-icon="iconfont icon-user"
                ></el-input>
              </el-form-item>
              <el-form-item prop="OG_NAME" label="分组名称">
                <el-input
                  v-model="groupingForm.OG_NAME"
                  prefix-icon="iconfont icon-user"
                ></el-input>
              </el-form-item>
            </div>
            <div class="w50">
              <el-form-item label="分组状态">
                <el-select
                  v-model="groupingForm.OG_STATE"
                  placeholder="请选择状态"
                >
                  <el-option label="停用" value="0"></el-option>
                  <el-option label="启用" value="1"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item prop="OG_REMARK" label="备注">
                <el-input
                  v-model="groupingForm.OG_REMARK"
                  prefix-icon="iconfont icon-user"
                ></el-input>
              </el-form-item>
            </div>
          </div>
          <div>
            <el-button type="primary" @click="submitForm">保存</el-button>
            <el-button @click="resetQuery(1)">重置</el-button>
          </div>
        </el-form>
      </div>

      <div class="pb-bg pb-main-margin-b">
        <p class="public_card_header">明细详情</p>
        <div class="public-card-body">
          <div class="public-card-body-border">
            <div class="public_table_tool">
              <el-popover placement="top" title="刷新" trigger="hover" width="36">
                  <div slot="reference" class="public_table_tool_inline" @click="getGroupingList()">
                    <i :class="[isRefreshRouter2? 'el-icon-refresh refresh-go' : 'el-icon-refresh']"></i>
                  </div>
                </el-popover>
                <el-popover placement="top" title="添加" trigger="hover" width="36">
                  <div slot="reference" class="public_table_tool_inline" @click="addDigitalDetails()">
                    <i class="el-icon-circle-plus-outline"></i>
                  </div>
                </el-popover>
                <el-popover placement="top" title="删除" trigger="hover" width="36">
                  <div slot="reference" class="public_table_tool_inline" @click="deleteTableDetails()">
                    <i class="el-icon-delete"></i>
                  </div>
                </el-popover>
              <div
                :class="
                  isShowCheckbox2 === true
                    ? 'public_editing_checkbox pb-checked-bg'
                    : 'public_editing_checkbox'
                "
                @click="editingCheckbox2()"
              >
                开启编辑
                <i
                  :class="
                    isShowCheckbox2 === true
                      ? 'el-icon-check pb-checked-i'
                      : 'el-icon-check'
                  "
                ></i>
              </div>
              <div class="pos_tool_tb">
                <div class="pos_table_tool">
                  
                  <div class="public_table_tool_inline">
                    <i class="el-icon-data-analysis"></i>
                  </div>
                  <div class="public_table_tool_inline" @click="exportData2">
                    <i class="el-icon-receiving"></i>
                  </div>
                  <div class="public_table_tool_inline" @click="printJson2">
                    <i class="el-icon-printer"></i>
                  </div>
                </div>
              </div>
            </div>
            <el-table
              ref="tableJson2"
              :data="groupingDetailsData"
              style="width: 100%"
              @selection-change="groupingChange"
            >
              <el-table-column fixed="left" type="selection" width="45" />
              <el-table-column label="#" type="index" width="45" />

              <el-table-column prop="OD_TEXT" label="显示名称" />
              <el-table-column prop="OD_VALUE" label="存储(值)" />
              <el-table-column prop="OD_SORT" label="排序" />
              <el-table-column label="状态">
                <template slot-scope="scope">
                  {{ stateText[scope.row.OD_STATE] }}
                </template>
              </el-table-column>
              <el-table-column prop="OD_REMARK" label="备注" />
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
          </div>

          <el-pagination
            v-show="total > 0"
            @size-change="handleSizeChange2"
            @current-change="handleCurrentChange2"
            :current-page="queryParamsDetails.page"
            :page-size="queryParamsDetails.limit"
            layout="total, sizes, prev, pager, next, jumper"
            :total="totalDetails"
          ></el-pagination>
        </div>
      </div>
      </div>
    </div>

    <el-dialog
      :title="dialogType === 'edit' ? '修改明细详情' : '添加明细详情'"
      :visible.sync="addDigitalDialog"
      width="50%"
      append-to-body
    >
      <div style="width: 100%; text-align: left">
        <el-form
          :model="addDigitaForm"
          ref="addDigitaForm"
          :rules="addDigitaRules"
          label-width="120px"
        >
          <div class="d-display">
            <div class="w50">
              <el-form-item prop="OD_TEXT" label="显示名称">
                <el-input
                  v-model="addDigitaForm.OD_TEXT"
                  prefix-icon="iconfont icon-user"
                ></el-input>
              </el-form-item>
              <el-form-item prop="OD_VALUE" label="存储(值)">
                <el-input
                  v-model="addDigitaForm.OD_VALUE"
                  prefix-icon="iconfont icon-user"
                ></el-input>
              </el-form-item>
            </div>
            <div class="w50">
              <el-form-item prop="OD_SORT" label="排序">
                <el-input
                  v-model="addDigitaForm.OD_SORT"
                  prefix-icon="iconfont icon-user"
                ></el-input>
              </el-form-item>
              <el-form-item prop="OD_STATE" label="状态">
                <el-select
                  v-model="addDigitaForm.OD_STATE"
                  placeholder="请选择状态"
                >
                  <el-option label="停用" value="0"></el-option>
                  <el-option label="启用" value="1"></el-option>
                </el-select>
              </el-form-item>
            </div>
          </div>

          <el-form-item prop="OD_REMARK" label="备注">
            <el-input
              type="textarea"
              v-model="addDigitaForm.OD_REMARK"
              placeholder="请输入备注"
            ></el-input>
          </el-form-item>
        </el-form>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitAddDigita">提交</el-button>
        <el-button @click="resetQuery(2)">重置</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import tableMenutTool from '@/views/tools/tableMenutTool'

import {
  getData,
  getListJsonByOgid,
  addDataSave,
  deleteData,
  deleteByIds,
  reviseTableInput,
} from '../../api/datadictionary/datadictionary'
export default {
  name: 'datadictionary',
  components: {
    tableMenutTool,
    getData,
    getListJsonByOgid,
    addDataSave,
    deleteData,
    deleteByIds,
    reviseTableInput,
  },
  data() {
    return {
      loading: true,
      isRefreshRouter: false,
      isRefreshRouter2: false,
      tableData: [],
      groupingDetailsData: [],
      total: 0,
      queryParams: {
        page: 1,
        limit: 10,
      },
      totalDetails: 0,
      queryParamsDetails: {
        page: 1,
        limit: 10,
        OG_ID: '',
      },
      multipleSelection: [],
      multipleSelectionDetails: [],
      stateText: { 0: '停用', 1: '启用', 2: '初始' },
      editTableDialog: false,
      groupingForm: {
        OG_ID: '',
        OG_CODE: '',
        OG_NAME: '',
        OG_STATE: '',
      },
      groupingRules: {
        OG_CODE: [
          { required: true, message: '请输入分组代码', trigger: 'blur' },
        ],
        OG_NAME: [
          { required: true, message: '请输入分组名称', trigger: 'blur' },
          {
            min: 3,
            max: 10,
            message: '长度在 3 到 10 个字符',
            trigger: 'blur',
          },
        ],
        OG_STATE: [
          { required: true, message: '请选择状态', trigger: 'change' },
        ],
      },
      isShowCheckbox: false,
      isShowCheckbox2: false,
      addDigitalDialog: false,
      addDigitaForm: {
        OD_ID: '',
        OG_ID: '',
        OD_TEXT: '',
        OD_VALUE: '',
        OD_SORT: '',
        OD_STATE: '',
        OD_REMARK: '',
      },
      addDigitaRules: {
        OD_TEXT: [
          { required: true, message: '请输入显示名称', trigger: 'blur' },
        ],
        OD_VALUE: [
          { required: true, message: '请输入存储(值)', trigger: 'blur' },
        ],
        OD_SORT: [{ required: true, message: '请输入排序', trigger: 'blur' }],
        OD_STATE: [
          { required: true, message: '请选择状态', trigger: 'change' },
        ],
      },
      dialogType: 'new',
      tableDeleteChange: '', //勾选选中列表id
      tableDeleteChangeDetails: '', //勾选详情老板选中列表id
      nameInputParams: {
        OG_NAME: '',
        OG_STATE: '',
        OG_PID: '',
        OG_ID: '',
        OG_REMARK: '',
        OG_CODE: '',
      },
      gotable: false,
    }
  },

  created() {
    this.getList()
    this.getGroupingList()
  },

  methods: {
    getList() {
      this.isRefreshRouter = !this.isRefreshRouter;
      setTimeout(() => {
        this.isRefreshRouter = !this.isRefreshRouter;
      },1000)
      getData(this.queryParams).then((response) => {
        this.tableData = response.data
        this.total = response.count
      })
    },
    getGroupingList() {
      this.isRefreshRouter2 = !this.isRefreshRouter2;
      setTimeout(() => {
        this.isRefreshRouter2 = !this.isRefreshRouter2;
      }, 1000)
      // this.queryParamsDetails.OG_ID =''
      getListJsonByOgid(this.queryParamsDetails).then((response) => {
        this.groupingDetailsData = response.data
        this.totalDetails = response.count
      })
    },
    exportData() {
      this.download('/lui_sys/pim/optionGroup/listJson.do', { ...this.tableData }, `数据字典信息`)
      // this.download(this.tableData, `数据字典.xlsx`)
    },
    printJson() {
      this.$print(this.$refs.tableJson);
    },
    exportData2() {
      this.download('/lui_sys/pim/optionData/listJsonByOgid.do', { ...this.groupingDetailsData }, `数据字典信息详情`)
      // this.download(this.tableData, `数据字典详情.xlsx`)
    },
    printJson2() {
      this.$print(this.$refs.tableJson2);
    },
    // tableInputInp(value, data) {
    //   this.nameInputParams.OG_NAME = value
    //   console.log(data.row);
    // },
    // sureChange(data) {
    //   this.nameInputParams = data.row
    //   reviseTableInput(this.nameInputParams).then((response) => {
    //   })
    // },

    editingCheckbox() {
      this.isShowCheckbox = !this.isShowCheckbox
    },
    editingCheckbox2() {
      this.isShowCheckbox2 = !this.isShowCheckbox2
    },
    handleSizeChange(newSize) {
      this.queryParams.limit = newSize
      this.getList()
    },
    handleCurrentChange(newPage) {
      this.queryParams.page = newPage
      this.getList()
    },
    handleSizeChange2(newSize) {
      this.queryParamsDetails.limit = newSize
      this.getGroupingList()
    },
    handleCurrentChange2(newPage) {
      this.queryParamsDetails.page = newPage
      this.getGroupingList()
    },
    submitForm: function () {
      this.$refs['groupingForm'].validate((valid) => {
        if (valid) {
          if (this.gotable == true) {
            reviseTableInput(this.groupingForm)
              .then((res) => {
                if (res.statusCode == 200) {
                  this.$notify.success({ title: '提示', message: '保存成功' })
                } else {
                  this.$notify.error({ title: '错误', message: res.message })
                }
                this.loading = false
                this.getList()
              })
              .catch((error) => {
                this.loading = false
              })
          } else {
            addDataSave(this.groupingForm)
              .then((res) => {
                if (res.statusCode == 200) {
                  this.$notify.success({ title: '提示', message: '保存成功' })
                } else {
                  this.$notify.error({ title: '错误', message: res.message })
                }
                this.loading = false
                this.getList()
              })
              .catch((error) => {
                this.loading = false
              })
          }
        } else {
          this.loading = false
          return false
        }
      })
    },
    submitAddDigita: function () {
      this.$refs['addDigitaForm'].validate((valid) => {
        if (valid) {
          addDataSave(this.addDigitaForm)
            .then((res) => {
              if (res.statusCode == 200) {
                this.$notify.success({ title: '提示', message: '保存成功' })
              } else {
                this.$notify.error({ title: '错误', message: res.message })
              }
              this.loading = false
              this.addDigitalDialog = false
              // this.getList()
              this.getGroupingList()
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
    close() {
      this.groupingForm = []
    },
    resetQuery(index) {
      if (index == '1') {
        if (this.gotable == true) {
          this.resetForm('groupingForm')
          this.getList();
        }else{
          this.resetForm('groupingForm')
          this.addDigitalDialog = false
        }
      } else {
        this.resetForm('addDigitaForm')
        this.addDigitalDialog = false
      }
    },

    addDetaList() {
      this.resetForm('groupingForm')
      this.$message({
        message: '请在分组详情中填写内容后保存。',
        type: 'warning',
        center: true,
      })
    },
    addDigitalDetails() {
      this.dialogType = 'new'
      this.resetForm('addDigitaForm')
      this.addDigitalDialog = true
    },
    editTable(from) {
      this.dialogType = 'edit'
      this.addDigitalDialog = true
      this.addDigitaForm = from.row
    },
    goTableClick(row) {
      this.gotable = true
      this.groupingForm = row
      this.queryParamsDetails.OG_ID = row.OG_ID
      this.addDigitaForm.OG_ID = row.OG_ID

      getListJsonByOgid(this.queryParamsDetails).then((response) => {
        this.groupingDetailsData = response.data
        this.totalDetails = response.count
        console.log(this.groupingDetailsData)
      })
    },
    handleSelectionChange(val) {
      const that = this
      that.tableDeleteChange = ''
      that.multipleSelection = val
      that.multipleSelection.forEach(function (e) {
        that.tableDeleteChange += e.OG_ID + ','
      })
      that.tableDeleteChange = that.tableDeleteChange.substr(0, that.tableDeleteChange.length-1)
    },
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
          .$confirm('确认删除吗?这将会删除分组及其明细数据', '信息', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning',
          })
          .then(async () => {
            await deleteByIds(that.tableDeleteChange)
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
    handleDelete({ $index, row }) {
      this.$confirm('此操作将永久删除该用户, 是否继续?', '信息', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      })
        .then(async () => {
          await deleteData(row.OD_ID)
          this.groupingDetailsData.splice($index, 1)
          this.$message({
            type: 'success',
            message: '删除成功!',
          })
        })
        .catch((err) => {
          console.error(err)
        })
    },
    groupingChange(val) {
      this.multipleSelectionDetails = val
      const that = this
      that.tableDeleteChangeDetails = ''
      that.multipleSelectionDetails = val
      that.multipleSelectionDetails.forEach(function (e) {
        that.tableDeleteChangeDetails += e.OD_ID + ','
      })
      that.tableDeleteChangeDetails = that.tableDeleteChangeDetails.substr(0, that.tableDeleteChangeDetails.length-1)

    },
    deleteTableDetails() {
      const that = this
      if (
        that.multipleSelectionDetails == undefined ||
        that.multipleSelectionDetails.length <= 0
      ) {
        that.$message({
          message: '请勾选择要删除的数据',
          type: 'warning',
          center: true,
        })
      } else {
        that
          .$confirm('确认删除吗?这将会删除分组及其明细数据', '信息', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning',
          })
          .then(async () => {
            await deleteData(that.tableDeleteChangeDetails)
            that.tableDeleteChangeDetails = ''
            that.getGroupingList()
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
.input_border .el-input .el-input__inner {
  border: 1px solid #fff;
  background: #fff;
}
.input_border .el-input .el-input__inner:hover {
  background: #f5f7fa;
  border: 1px solid #f5f7fa;
}
.input_border
  .el-table__row
  .hover-row:hover
  .input_border
  .el-input
  .el-input__inner {
  background: #f5f7fa;
  border: 1px solid #f5f7fa;
}
.input_border .el-input.is-active .el-input__inner,
.input_border .el-input__inner:focus {
  border-color: #409eff !important;
}
.el-form-item__content .el-input,
.el-select,
.el-form-item__content .el-checkbox-group {
  width: 100% !important;
}
.el-pagination{
  margin-top: 20px;
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
</style>