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
          <i class="el-icon-setting"></i>
        </div>
        <div class="">开启编辑</div>
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
            <el-input type="textarea" v-model="parameterForm.parameter"></el-input>
          </el-form-item>
        </el-form>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm('form')">提交</el-button>
        <el-button @click="resetForm">重置</el-button>
      </div>
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
      parameterForm: {
        name: 'sdadmin',
        parameter: 'sdadmin',
      },
      parameterRules: {
        name: [
          { required: true, message: '请输入参数名称', trigger: 'blur' },
        ],
        parameter: [
            { required: true, message: '请填写参数值', trigger: 'blur' }
        ]
      },
    }
  },

  created() {
    this.getList()
  },

  methods: {
    getList() {},
    submitForm() {},
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
    reviseTable() {
      return (this.reviseTableDialog = true)
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
  },
}
</script>

<style lang='less' scoped>
</style>