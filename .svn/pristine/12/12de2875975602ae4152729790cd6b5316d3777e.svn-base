<template>
  <div class="d-display data_diction">
    <div class="pb-main-data-left">
      <div class="public-card-body">
        <div class="public_table_tool">
          <div class="public_table_tool_inline">
            <i class="el-icon-refresh"></i>
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

        <div class="input_border">
          <el-table
            :data="tableData"
            style="width: 100%"
            @selection-change="handleSelectionChange"
          >
            <el-table-column fixed="left" type="selection" width="45" />
            <el-table-column label="分组代码">
              <template slot-scope="scope">
                <el-input v-model="scope.row.groupingCode"></el-input>
              </template>
            </el-table-column>
            <el-table-column label="分组名称">
              <template slot-scope="scope">
                <el-input v-model="scope.row.groupingName"></el-input>
              </template>
            </el-table-column>

            <el-table-column label="状态">
              <template slot-scope="scope">
                {{ stateText[scope.row.state] }}
              </template>
            </el-table-column>
          </el-table>
        </div>

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
    </div>
    <div class="pb-main-data-right pb-main_pad-lf">
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
              <el-form-item prop="code" label="分组代码">
                <el-input
                  v-model="groupingForm.code"
                  prefix-icon="iconfont icon-user"
                ></el-input>
              </el-form-item>
              <el-form-item prop="name" label="分组名称">
                <el-input
                  v-model="groupingForm.name"
                  prefix-icon="iconfont icon-user"
                ></el-input>
              </el-form-item>
            </div>
            <div class="w50">
              <el-form-item label="分组状态">
                <el-select
                  v-model="groupingForm.state"
                  placeholder="请选择状态"
                >
                  <el-option label="停用" value="0"></el-option>
                  <el-option label="启用" value="1"></el-option>
                  <el-option label="初始" value="2"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item prop="remark" label="备注">
                <el-input
                  v-model="groupingForm.remark"
                  prefix-icon="iconfont icon-user"
                ></el-input>
              </el-form-item>
            </div>
          </div>
          <div>
            <el-button type="primary" @click="submitForm('form')"
              >保存</el-button
            >
            <el-button @click="resetForm">重置</el-button>
          </div>
        </el-form>
      </div>

      <div class="pb-bg pb-main-margin-b">
        <p class="public_card_header">明细详情</p>
        <div class="public-card-body">
          <div class="public-card-body-border">
            <div class="public_table_tool">
              <div class="public_table_tool_inline">
                <i class="el-icon-refresh"></i>
              </div>
              <div
                class="public_table_tool_inline"
                @click="addDigitalDetails()"
              >
                <i class="el-icon-circle-plus-outline"></i>
              </div>
              <div class="public_table_tool_inline">
                <i class="el-icon-delete"></i>
              </div>
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
                <table-menut-tool />
              </div>
            </div>
            <el-table
              :data="groupingDetailsData"
              style="width: 100%"
              @selection-change="handleSelectionChange"
            >
              <el-table-column fixed="left" type="selection" width="45" />
              <el-table-column label="#" type="index" width="45" />

              <el-table-column prop="name" label="显示名称" />
              <el-table-column prop="storage" label="存储(值)" />
              <el-table-column prop="sort" label="排序" />
              <el-table-column label="状态">
                <template slot-scope="scope">
                  {{ stateText[scope.row.state] }}
                </template>
              </el-table-column>
              <el-table-column prop="remark" label="备注" />
              <el-table-column fixed="right" label="操作" width="120">
                <template slot-scope="scope"> </template>
              </el-table-column>
            </el-table>
          </div>

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
      </div>
    </div>

    <el-dialog
      title="明细详情"
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
              <el-form-item prop="showName" label="显示名称">
                <el-input
                  v-model="addDigitaForm.showName"
                  prefix-icon="iconfont icon-user"
                ></el-input>
              </el-form-item>
              <el-form-item prop="store" label="存储(值)">
                <el-input
                  v-model="addDigitaForm.store"
                  prefix-icon="iconfont icon-user"
                ></el-input>
              </el-form-item>
            </div>
            <div class="w50">
              <el-form-item prop="sort" label="排序">
                <el-input
                  v-model="addDigitaForm.sort"
                  prefix-icon="iconfont icon-user"
                ></el-input>
              </el-form-item>
              <el-form-item prop="state" label="状态">
                <el-select
                  v-model="addDigitaForm.state"
                  placeholder="请选择状态"
                >
                  <el-option label="停用" value="0"></el-option>
                  <el-option label="启用" value="1"></el-option>
                </el-select>
              </el-form-item>
            </div>
          </div>

          <el-form-item prop="remark" label="备注">
            <el-input
              type="textarea"
              v-model="addDigitaForm.remark"
              placeholder="请输入备注"
            ></el-input>
          </el-form-item>
        </el-form>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitAddDigita('form')"
          >提交</el-button
        >
        <el-button @click="resetAddDigita">重置</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import tableMenutTool from '@/views/tools/tableMenutTool'

export default {
  name: 'datadictionary',
  components: {
    tableMenutTool,
  },
  data() {
    return {
      tableData: [
        {
          groupingCode: 'CBDKXXZT',
          groupingName: '消息级别',
          state: '1',
        },
      ],
      groupingDetailsData: [
        {
          name: 'CBDKXXZT',
          storage: '23',
          sort: '1',
          state: '1',
          remark: '1',
        },
      ],
      currentPage: 4,
      multipleSelection: [],
      stateText: { 0: '停用', 1: '启用', 2: '初始' },
      editTableDialog: false,
      groupingForm: {
        code: '',
        name: '',
        remark: '',
        state: '1',
      },
      groupingRules: {
        code: [{ required: true, message: '请输入分组代码', trigger: 'blur' }],
        name: [
          { required: true, message: '请输入分组名称', trigger: 'blur' },
          {
            min: 3,
            max: 10,
            message: '长度在 3 到 10 个字符',
            trigger: 'blur',
          },
        ],
        remark: [{ required: true, message: '请输入备注', trigger: 'blur' }],
        state: [{ required: true, message: '请选择状态', trigger: 'change' }],
      },
      isShowCheckbox: false,
      isShowCheckbox2: false,
      addDigitalDialog: false,
      addDigitaForm: {
        showName: 'sdadmin',
        store: 'sfdf',
        sort: '',
        state: '',
        remark: '',
      },
      addDigitaRules: {
        showName: [
          { required: true, message: '请输入显示名称', trigger: 'blur' },
        ],
        store: [{ required: true, message: '请输入存储(值)', trigger: 'blur' }],
        sort: [{ required: true, message: '请输入排序', trigger: 'blur' }],
        state: [{ required: true, message: '请选择状态', trigger: 'change' }],
        remark: [{ required: true, message: '请输入备注', trigger: 'blur' }],
      },
    }
  },

  created() {
    this.getList()
  },

  methods: {
    getList() {},
    submitAddDigita() {},
    editingCheckbox() {
      this.isShowCheckbox = !this.isShowCheckbox
    },
    editingCheckbox2() {
      this.isShowCheckbox2 = !this.isShowCheckbox2
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
    submitForm() {},
    close() {
      this.groupingForm = []
    },
    resetAddDigita() {
      this.addDigitalDialog = false
      this.$refs.groupingorm.resetFields()
    },
    resetForm() {
      this.$refs.groupingorm.resetFields()
    },
    addDigitalDetails() {
      return (this.addDigitalDialog = true)
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
</style>
<style lang='less' scoped>
</style>