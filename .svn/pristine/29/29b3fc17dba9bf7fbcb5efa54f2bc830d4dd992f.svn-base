<template>
  <div class="pb-main-height">
    <div class="">
      <div class="public_table_tool">
        <div class="public_table_tool_inline">
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
       
        <div :class="isShowCheckbox===true?'public_editing_checkbox pb-checked-bg' : 'public_editing_checkbox'" 
        @click="editingCheckbox()">开启编辑
          <i :class="isShowCheckbox===true?'el-icon-check pb-checked-i' : 'el-icon-check'"></i>
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
        <el-table-column prop="applicationName" label="应用名称" />
        <el-table-column prop="address" label="访问地址" width="200" />
        <el-table-column prop="sort" label="排序" />
        <el-table-column prop="icon" label="图标" />

        <el-table-column label="状态">
          <template slot-scope="scope">
            <el-switch
              v-model="operatingStatus"
              active-color="#2D8CF0"
              inactive-color="#D2D2D2"
            >
            </el-switch>
          </template>
        </el-table-column>

        <el-table-column fixed="right" label="操作" width="120">
          <template slot-scope="scope">
            <span class="public-table-btn table-btn-edit" @click="reviseTable"
              >更新</span
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
              <el-form-item prop="applicationCode" label="应用代码">
                <el-input
                  v-model="applicationForm.applicationCode"
                  prefix-icon="iconfont icon-user"
                ></el-input>
              </el-form-item>
              <el-form-item prop="applicationName" label="应用名称">
                <el-input
                  v-model="applicationForm.applicationName"
                  prefix-icon="iconfont icon-user"
                ></el-input>
              </el-form-item>

              <el-form-item prop="icon" label="图标">
                <el-input
                  v-model="applicationForm.icon"
                  prefix-icon="iconfont icon-user"
                ></el-input>
              </el-form-item>
            </div>
            <div class="w50">
              <el-form-item prop="sort" label="排序">
                <el-input
                  v-model="applicationForm.sort"
                  prefix-icon="iconfont icon-user"
                ></el-input>
              </el-form-item>
              <el-form-item label="状态">
                <el-select
                  v-model="applicationForm.status"
                  placeholder="请选择状态"
                >
                  <el-option label="停用" value="0"></el-option>
                  <el-option label="启用" value="1"></el-option>
                  <el-option label="初始" value="2"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item prop="address" label="访问地址">
                <el-input
                  v-model="applicationForm.address"
                  prefix-icon="iconfont icon-user"
                ></el-input>
              </el-form-item>
            </div>
          </div>
          <el-form-item prop="remark" label="备注">
            <el-input type="textarea" v-model="applicationForm.remark"></el-input>
          </el-form-item>
        </el-form>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm('form')">保存</el-button>
        <el-button @click="resetForm">重置</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import tableMenutTool from '@/views/tools/tableMenutTool'
export default {
  name: 'Log',
  components: {
    tableMenutTool,
  },
  data() {
    return {
      tableData: [
        {
          applicationName: '应用名称',
          address: '	http://127.0.0.1:8087/landos',
          sort: '1',
          icon: '',
          status: '0',
        },
      ],
      currentPage: 4,
      multipleSelection: [],
      reviseTableDialog: false,
      operatingStatus: '',
      applicationForm: {
        applicationCode: '',
        applicationName: '应用名称',
        address: '	http://127.0.0.1:8087/landos',
        sort: '1',
        icon: '',
        status: '0',
        remark: '',
      },

      applicationRules: {
        applicationCode: [
          { required: true, message: '请输入应用代码', trigger: 'blur' },
        ],
        applicationCode: [
          { required: true, message: '请输入应用名称', trigger: 'blur' },
        ],
        address: [{ required: true, message: '请输入访问地址', trigger: 'blur' }],
        sort: [
          { required: true, message: '请输入排序', trigger: 'blur' },
        ],
        icon: [
          { required: true, message: '请选择图标', trigger: 'change' },
        ],
        status: [
          { required: true, message: '请选择活动区域', trigger: 'change' },
        ],
        remark: [{ required: true, message: '请输入备注', trigger: 'blur' }],
      },
      isShowCheckbox: false,
    }
  },

  created() {
    this.getList()
  },

  methods: {
    getList() {},
    submitForm() {},
    editingCheckbox(){
      this.isShowCheckbox = !this.isShowCheckbox;
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
      this.applicationForm = []
      this.reviseTableDialog = false
    },
    resetForm() {
      this.$refs.applicationForm.resetFields()
      this.reviseTableDialog = false
    },
    reviseTable() {
      return (this.reviseTableDialog = true)
    },
    addNameList() {
      return (this.reviseTableDialog = true)
      this.$refs.applicationForm.resetFields()
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