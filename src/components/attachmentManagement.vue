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
        <el-table-column prop="filename" label="文件名" />
        <el-table-column prop="path" label="路径" />
        <el-table-column prop="size" label="大小" />
        <el-table-column prop="uploadtime" label="上传时间" />
        <el-table-column prop="storagelocation" label="存储位置" />
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
      title="附件修改"
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
                  v-model="uploadtime"
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
        <el-button type="primary" @click="submitForm('form')">保存</el-button>
        <el-button @click="resetForm">重置</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import tableMenutTool from '@/views/tools/tableMenutTool'
export default {
  name: 'attachment',
  components: {
    tableMenutTool,
  },
  data() {
    return {
      tableData: [
        {
          filename: 'zhy',
          path: 'hnshandy.com',
          size: '1024',
          uploadtime: '2021-05-28 22:01:59',
          storagelocation: '中电软件二期',
        },
      ],
      currentPage: 4,
      multipleSelection: [],
      reviseTableDialog: false,
      appendixForm: {
        filename: 'sdadmin',
        newfilename: 'sdadmin',
        path: 'hnshandy.com',
        size: '1024',
        state: '',
        uploadtime: '2021-05-28 22:01:59',
        uploaduser: '',
        extensionname: '',
        filelocation: '',
      },
      appendixRules: {
        filename: [{ required: true, message: '请输入文件名', trigger: 'blur' }],
        newfilename: [{ required: true, message: '请输入新文件名', trigger: 'blur' }],
        path: [{ required: true, message: '请输入路径', trigger: 'blur' }],
        size: [{ required: true, message: '请输入大小', trigger: 'blur' }],
        uploadtime: [{ type: 'date', required: true, message: '请选择上传日期', trigger: 'change' }],
        uploaduser: [{ required: true, message: '请输入上传用户', trigger: 'blur' }],
        extensionname: [{ required: true, message: '请输入扩展名', trigger: 'blur' }],
        filelocation: [{ required: true, message: '请输入文件位置', trigger: 'blur' }],
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
      this.appendixForm = []
      this.reviseTableDialog = false
    },
    resetForm() {
      this.$refs.appendixForm.resetFields()
      this.reviseTableDialog = false
    },
    reviseTable() {
      return (this.reviseTableDialog = true)
    },
    addNameList() {
      return (this.reviseTableDialog = true)
      this.$refs.appendixForm.resetFields()
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