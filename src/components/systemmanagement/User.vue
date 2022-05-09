<template>
  <div class="public_main_app d-display">
    <div class="pb-main-left">
      <p class="public_card_header">用户列表</p>

      <el-tree
        :data="data"
        show-checkbox
        node-key="id"
        default-expand-all
        :expand-on-click-node="false"
        :render-content="renderContent"
      >
      </el-tree>
    </div>

    <div class="pb-main-right pb-main_pad-lf">
      <div class="pb-main-height">
        <p class="public_card_header">组织结构</p>

        <div class="public-card-body">
          <div class="public-card-body-border">
            <div class="public_table_tool">
              <div class="public_table_tool_inline">
                <i class="el-icon-refresh"></i>
              </div>
              <div class="public_table_tool_inline" @click="addNameList()">
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

              <div class="public_table_tool_inline">
                <i class="el-icon-unlock"></i>
              </div>
              <div class="public_table_tool_inline">
                <i class="el-icon-coordinate"></i>
              </div>
              <div class="public_table_tool_inline">
                <i class="el-icon-document"></i>
              </div>
              <div class="public_table_tool_inline">
                <i class="el-icon-s-check"></i>
              </div>

              <div class="pos_tool_tb">
                 <table-menut-tool />
              </div>
            </div>

            <el-table
              :data="tableData"
              style="width: 100%"
              @selection-change="handleSelectionChange"
            >
              <el-table-column fixed="left" type="selection" width="45" />

              <el-table-column prop="account" label="登录账号" />
              <el-table-column prop="name" label="姓名" />

              <el-table-column prop="mechanism" label="机构" />

              <el-table-column prop="state" label="状态" />
              <el-table-column prop="role" label="拥有角色" width="90" />
              <el-table-column
                prop="unctiongroup"
                label="拥有功能组"
                width="110"
              />

              <el-table-column
                prop="failures"
                label="登录失败次数"
                width="120"
              />
              <el-table-column prop="data" label="最后登录时间" width="150" />

              <el-table-column fixed="right" label="操作" width="120">
                <template slot-scope="scope">
                  <span class="public-table-btn table-btn-edit" @click="editTable">编辑</span>
                  <span class="public-table-btn table-btn-delete" @click="handleDelete(scope.row)">删除</span>
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
        </div>
      </div>
    </div>

    <el-dialog title="信息修改" :visible.sync="editTableDialog" width="50%" append-to-body @close="close">
      <div  style="width:100%;text-align:center">
        <el-form :model="editForm" ref="editForm" :rules="editRules" label-width="120px">
          <el-form-item prop="username" label="登录账号">
            <el-input v-model="editForm.username" prefix-icon="iconfont icon-user"></el-input>
          </el-form-item>
          <el-form-item prop="username" label="姓名">
            <el-input v-model="editForm.name" prefix-icon="iconfont icon-user"></el-input>
          </el-form-item>
          <el-form-item prop="username" label="联系电话">
            <el-input v-model="editForm.phone" prefix-icon="iconfont icon-user"></el-input>
          </el-form-item>
          <el-form-item label="性别">
            <el-select v-model="editForm.gender" placeholder="请选择性别">
              <el-option label="男" value="0"></el-option>
              <el-option label="女" value="1"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="状态">
            <el-select v-model="editForm.state" placeholder="请选择状态">
              <el-option label="停用" value="0"></el-option>
              <el-option label="启用" value="1"></el-option>
              <el-option label="初始" value="2"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="角色绑定">
            <el-checkbox-group v-model="editForm.roleBinding">
              <el-checkbox label="超级管理员" name="roleBinding"></el-checkbox>
              <el-checkbox label="县级普通用户" name="roleBinding"></el-checkbox>
              <el-checkbox label="县级管理员" name="roleBinding"></el-checkbox>
            </el-checkbox-group>
          </el-form-item>
          <el-form-item label="权限绑定">
            <el-checkbox-group v-model="editForm.permissionBinding">
              <el-checkbox label="高级" name="permissionBinding"></el-checkbox>
              <el-checkbox label="安全测试" name="permissionBinding"></el-checkbox>
              <el-checkbox label="普通权限" name="permissionBinding"></el-checkbox>
              <el-checkbox label="所有权限" name="permissionBinding"></el-checkbox>
            </el-checkbox-group>
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

let id = 1000
export default {
  name: 'userManagement',
  components: {
    tableMenutTool,
  },
  data() {
    const data = [
      {
        id: 1,
        label: '顶级机构',
        children: [
          {
            id: 4,
            label: '盛鼎科技',
            children: [
              {
                id: 9,
                label: '超级管理员',
              },
              {
                id: 10,
                label: '普通用户',
              },
            ],
          },
        ],
      },
    ]
    return {
      data: JSON.parse(JSON.stringify(data)),
      data: JSON.parse(JSON.stringify(data)),
      tableData: [
        {
          account: 'zhy',
          name: '王小虎',
          mechanism: '顶级机构',
          state: '0',
          role: '超级管理员',
          unctiongroup: '安全测试',
          failures: '1',
          data: '2021-05-28 22:01:59',
        },
      ],
      currentPage: 4,
      multipleSelection: [],
      editTableDialog: false,
      editForm: {
        username: 'sdadmin',
        name: 'sdadmin',
        phone: '15644982256',
        gender: '0',
        state: '1',
        roleBinding:[],
        permissionBinding:[],
      },
      editRules: {
        username: [
          { required: true, message: '请输入登录账号', trigger: 'blur' },
          { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
        ],
        name: [
          { required: true, message: '请输入姓名', trigger: 'blur' },
          { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
        ],
        phone: [
          { required: true, message: '请输入联系电话', trigger: 'blur' },
        ],
        gender: [
            { required: true, message: '请选择性别', trigger: 'change' }
        ],
        state: [
            { required: true, message: '请选择状态', trigger: 'change' }
        ],
        roleBinding: [
            { roleBinding: 'array', required: true, message: '请至少选择一个角色绑定', trigger: 'change' }
        ],
        permissionBinding: [
            { permissionBinding: 'array', required: true, message: '请至少选择一个权限绑定', trigger: 'change' }
        ]
      }
    }
  },

  created() {
    this.getList()
  },

  methods: {
    getList(){

    },
    append(data) {
      const newChild = { id: id++, label: 'new node1', children: [] }
      if (!data.children) {
        this.$set(data, 'children', [])
      }
      data.children.push(newChild)
    },

    remove(node, data) {
      const parent = node.parent
      const children = parent.data.children || parent.data
      const index = children.findIndex((d) => d.id === data.id)
      children.splice(index, 1)
    },

    modify(node, data) {},

    renderContent(h, { node, data, store }) {
      return (
        <span class="custom_tree_node">
          <span>{node.label}</span>
          <span>
            <i
              style="color: #333;margin-left: 6px;"
              class="el-icon-folder-add"
              on-click={() => this.append(data)}
            ></i>
            <i
              style="color: #333;margin-left: 6px;"
              class="el-icon-edit"
              on-click={() => this.modify(node, data)}
            ></i>
            <i
              style="color: #333;margin-left: 6px;"
              class="el-icon-delete"
              on-click={() => this.remove(node, data)}
            ></i>
          </span>
        </span>
      )
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
    submitForm(){

    },
    handleDelete(row) {
        const ids = row.id || this.ids
        this.$confirm('是否确认删除该用户?', '信息', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(function() {
          // return delCRestaurants(ids)
        }).then(() => {
          this.getList()
          this.msgSuccess('删除成功')
        }).catch(function() {
        })
    },
    close() {
      this.editForm = []
      this.editTableDialog = false
    },
    resetForm() {
      this.$refs.editForm.resetFields()
      this.editTableDialog = false
    },
    editTable() {
      return this.editTableDialog = true
    },
    addNameList() {
      return this.editTableDialog = true
      this.$refs.editForm.resetFields()
    }

  },
}
</script>

<style >
.el-form-item__content .el-input,
.el-select,
.el-form-item__content .el-checkbox-group{
  width: 100%!important;
}
/* .el-form-item__content .el-checkbox-group{
  text-align: left;
} */

</style>
<style lang='less' scoped>
.el_pagination {
  margin-top: 30px;
}

</style>