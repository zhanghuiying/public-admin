<template>
  <div>
    <div class="code-production">
      <el-table
        :data="tableData"
        style="width: 100%"
        @selection-change="handleSelectionChange"
      >
        <el-table-column fixed="left" type="selection" width="45" />
        <el-table-column label="#" type="index" width="45" />
        <el-table-column prop="database" label="数据库" />
        <el-table-column prop="tablename" label="表名" />
        <el-table-column prop="remark" label="备注" />

        <el-table-column fixed="right" label="操作" width="200">
          <template slot-scope="scope">
            <span
              class="public-table-btn table-btn-edit"
              @click="fieldInformation()"
              >字段信息</span
            >
            <span
              class="public-table-btn table-btn-generate"
              @click="generateCode(scope.row)"
              >生成代码</span
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
      title="信息"
      :visible.sync="fieldInformationDialog"
      width="60%"
      append-to-body
      @close="close"
    >
      <div class="dialog_inquire">
        <el-input
          v-model="databaseMame"
          placeholder="请输入数据库名"
        ></el-input>
        <el-input v-model="tableName" placeholder="请输入表名"></el-input>
        <span class="inquire_btn"><i class="el-icon-zoom-out"></i> 查询</span>
      </div>

      <el-table
        :data="tableInquireData"
        style="width: 100%"
        max-height="440"
      >
        <el-table-column label="#" type="index" width="45" />
        <el-table-column prop="fieldName" label="字段名" />
        <el-table-column prop="fieldComment" label="字段注释" />
        <el-table-column prop="maximumLength" label="最大长度" />
        <el-table-column prop="AllowEmpty" label="允许为空" />
      </el-table>
    </el-dialog>

    <el-dialog
      title="信息"
      :visible.sync="generateCodeDialog"
      width="60%"
      append-to-body
    >
    <el-form
          :model="generateCodeForm"
          ref="generateCodeForm"
          :rules="generateCodeRules"
          label-width="120px"
        >
          <div class="d-display">
            <div class="w50">
              <el-form-item prop="databaseName" label="数据库名">
                <el-input
                  v-model="generateCodeForm.databaseName"
                  prefix-icon="iconfont icon-user"
                ></el-input>
              </el-form-item>
              <el-form-item prop="primarykey" label="主键">
                <el-input
                  v-model="generateCodeForm.primarykey"
                  prefix-icon="iconfont icon-user"
                  placeholder="不输入主键，默认为ID"
                ></el-input>
              </el-form-item>

              <el-form-item prop="replace" label="是否替换">
                <el-switch v-model="generateCodeForm.replace"></el-switch>
              </el-form-item>

              <el-form-item prop="actionName" label="action名">
                <el-input
                  v-model="generateCodeForm.actionName"
                  prefix-icon="iconfont icon-user"
                  placeholder="例如输入 Test 则生成的java类名为TestAction。"
                ></el-input>
              </el-form-item>
              <el-form-item prop="actionPackageName" label="action包名">
                <el-input
                  v-model="generateCodeForm.actionPackageName"
                  prefix-icon="iconfont icon-user"
                  placeholder="一般为 com.shandy.***.*** 会再该路径下生成Java文件"
                ></el-input>
              </el-form-item>
              <el-form-item prop="controllerName" label="控制器名">
                <el-input
                  v-model="generateCodeForm.controllerName"
                  prefix-icon="iconfont icon-user"
                  placeholder="例如输入 aa/bb 对应的action上的注解为  @Controller(aa/bb)"
                ></el-input>
              </el-form-item>

              <el-form-item prop="generateContent" label="生成内容">
                <el-checkbox-group v-model="generateCodeForm.generateContent">
                  <el-checkbox label="java" name="type"></el-checkbox>
                  <el-checkbox label="xml" name="type"></el-checkbox>
                  <el-checkbox label="html" name="type"></el-checkbox>
                </el-checkbox-group>
              </el-form-item>
            </div>
            <div class="w50">
              <el-form-item prop="tableName" label="表名">
                <el-input
                  v-model="generateCodeForm.tableName"
                  prefix-icon="iconfont icon-user"
                ></el-input>
              </el-form-item>

              <el-form-item label="数据类型">
                <el-select
                  v-model="generateCodeForm.typeData"
                  placeholder="请选择数据类型"
                >
                  <el-option label="sqlserver" value="0"></el-option>
                  <el-option label="达梦数据库" value="1"></el-option>
                  <el-option label="oracle数据库" value="2"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item prop="treeSource" label="树来源">
                <el-select
                  v-model="generateCodeForm.treeSource"
                  placeholder="请选择树来源"
                >
                  <el-option label="lui/inc_xzqhTree.html" value="0"></el-option>
                  <el-option label="lui/inc_zTree.html" value="1"></el-option>
                </el-select>
              </el-form-item>


              <el-form-item prop="projectPath" label="项目路径">
                <el-input
                  v-model="generateCodeForm.projectPath"
                  prefix-icon="iconfont icon-user"
                  placeholder="项目所在的绝对位置 例如 D:\workspace\lui-sys"
                ></el-input>
              </el-form-item>
              <el-form-item prop="relativePath" label="页面相对路径">
                <el-input
                  v-model="generateCodeForm.relativePath"
                  prefix-icon="iconfont icon-user"
                  placeholder="一般为  content/***/page/***  会再该目录下生成{action名}.html"
                ></el-input>
              </el-form-item>
              <el-form-item prop="xmlRelativePath" label="xml相对路径">
                <el-input
                  v-model="generateCodeForm.xmlRelativePath"
                  prefix-icon="iconfont icon-user"
                  placeholder="一般为  mappers/sqlserver/*** 将生成{数据库表名}.xml的文件。xml的namespace也是{数据库表名}"
                ></el-input>
              </el-form-item>
              <el-form-item prop="daoKey" label="daoKey">
                <el-input
                  v-model="generateCodeForm.daoKey"
                  prefix-icon="iconfont icon-user"
                  placeholder="数据源别名,如果指定为字符串需要带双引号**dao，或者是常量参数名 ***.***"
                ></el-input>
              </el-form-item>
            </div>
          </div> 
          <el-form-item prop="htmlOptions" label="html选项">
                <el-checkbox-group v-model="generateCodeForm.htmlOptions">
                  <el-checkbox label="树结构" name="type"></el-checkbox>
                  <el-checkbox label="搜索表单" name="type"></el-checkbox>
                  <el-checkbox label="表格编码" name="type"></el-checkbox>
                </el-checkbox-group>
            </el-form-item>
        </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button type="primary" icon="el-icon-check" @click="submitForm('form')">生成</el-button>
        <el-button type="warning" @click="resetForm">重置</el-button>
        <el-button type="warning" @click="previewClick()">预览</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tableData: [
        {
          database: 'zdfsfs',
          tablename: 'T_SYS_DSRW',
          remark: '	子应用表',
        },
      ],
      currentPage: 4,
      multipleSelection: [],
      operatingStatus: '',
      fieldInformationDialog: false,
      generateCodeDialog: false,
      databaseMame: '',
      tableName: '',
      tableInquireData: [
        {
          fieldName: 'zdfsfs',
          fieldComment: '应用代码',
          maximumLength: '32',
          AllowEmpty: '10',
        },
      ],
      generateCodeForm: {
        databaseName: '',
        tableName: '',
        typeData: '',
        primarykey: '',
        replace: '',
        generateContent: '',

        treeSource: '',
        actionName: '',
        actionPackageName: '',
        controllerName: '',
        htmlOptions: '',

        projectPath: '',
        relativePath: '',
        xmlRelativePath: '',
        daoKey: '',
      },

      generateCodeRules: {
        databaseName: [
          { required: true, message: '请输入数据库名', trigger: 'blur' },
        ],
        actionName: [
          { required: true, message: '请输入action名', trigger: 'blur' },
        ],
        actionPackageName: [
          { required: true, message: '请输入action包名', trigger: 'blur' },
        ],
        controllerName: [
          { required: true, message: '请输入控制器名', trigger: 'blur' },
        ],
        generateContent: [
          { required: true, message: '请选择生成内容', trigger: 'change' },
        ],

        tableName: [
          { required: true, message: '请输入表名', trigger: 'blur' },
        ],
        typeData: [
          { required: true, message: '请选择数据类型', trigger: 'change' },
        ],
        treeSource: [
          { required: true, message: '请选择树来源', trigger: 'change' },
        ],
        projectPath: [
          { required: true, message: '请输入项目路径', trigger: 'blur' },
        ],
        relativePath: [
          { required: true, message: '请输入页面相对路径', trigger: 'blur' },
        ],
        xmlRelativePath: [
          { required: true, message: '请输入xml相对路径', trigger: 'blur' },
        ],
        daoKey: [
          { required: true, message: '请选择daoKey', trigger: 'change' },
        ],
        htmlOptions: [
          { required: true, message: '请输入html选项', trigger: 'blur' },
        ],
      },
    }
  },

  created() {
    this.getList()
  },

  methods: {
    getList() {},
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`)
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`)
    },
    handleSelectionChange(val) {
      this.multipleSelection = val
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
    submitForm(){

    },
    close() {
      this.fieldInformationDialog = false
    },
    resetForm() {
      this.$refs.generateCodeForm.resetFields()
      this.generateCodeDialog = false
    },
    fieldInformation() {
      return (this.fieldInformationDialog = true)
    },
    generateCode() {
      return (this.generateCodeDialog = true)
    },
    previewClick(){

    }
  },
}
</script>
<style>
.code-production .el-dialog .el-dialog__body {
  padding: 0 !important;
}
</style>
<style lang='less' scoped>
.dialog_inquire {
}
.dialog_inquire .el-input {
  width: 190px;
  height: 38px;
  line-height: 38px;
  margin-right: 16px;
}
.inquire_btn {
  display: inline-block;
  height: 38px;
  line-height: 38px;
  border: 1px solid transparent;
  padding: 0 18px;
  background-color: #009688;
  color: #fff;
  white-space: nowrap;
  text-align: center;
  font-size: 14px;
  border-radius: 2px;
  cursor: pointer;
}
.inquire_btn:hover {
  background-color: #33aba0;
}
</style>