<template>
  <div class="public_main_app d-display">
    <div class="pb-main-left">
      <p class="public_card_header">组织结构
        <span class="btn_expand-shrink" style="margin-left: 10px;" @click="addFollowNode()">添加跟节点</span>
      </p>

      <div class="public-card-body">
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
    </div>

    <div class="pb-main-right pb-main_pad-lf">
      <div class="pb-main-height">
        <p class="public_card_header">用户列表</p>

        <div class="public-card-body">
          <div class="public-card-body-border">
            <div class="public_table_tool">
              <div class="public_table_tool_inline" @click="getList">
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
              v-loading="loading"
              @selection-change="handleSelectionChange"
            >
              <el-table-column fixed="left" type="selection" width="45" />

              <el-table-column prop="USER_ACCOUNT" label="登录账号" />
              <el-table-column prop="USER_NAME" label="姓名" />

              <el-table-column prop="ORG_NAME" label="机构" />

              <el-table-column label="状态">
                <template slot-scope="scope">
                  <span style="color: #1e9fff" v-if="(scope.row.USER_STATE = 1)"
                    >启用</span
                  >
                  <span style="color: #ff5722" v-else>停用</span>
                </template>
              </el-table-column>

              <el-table-column prop="ROLE_NAMES" label="拥有角色" width="160" />
              <el-table-column
                prop="RES_NAMES"
                label="拥有功能组"
                width="110"
              />

              <el-table-column prop="DLSBCS" width="110" label="登录失败次数" />
              <el-table-column
                prop="USER_LAST_LOGIN"
                label="最后登录时间"
                width="150"
              />

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
        </div>
      </div>
    </div>

    <el-dialog
      :title="dialogType === 'edit' ? '修改用户信息' : '添加用户信息'"
      :visible.sync="editTableDialog"
      width="50%"
      append-to-body
      @close="close"
    >
      <div style="width: 100%; text-align: center">
        <el-form
          :model="editForm"
          ref="queryForm"
          :rules="editRules"
          label-width="120px"
        >
          <el-form-item prop="USER_ACCOUNT" label="登录账号">
            <el-input
              v-model="editForm.USER_ACCOUNT"
              prefix-icon="iconfont icon-user"
            ></el-input>
          </el-form-item>
          <el-form-item prop="USER_NAME" label="姓名">
            <el-input
              v-model="editForm.USER_NAME"
              prefix-icon="iconfont icon-user"
            ></el-input>
          </el-form-item>
          <el-form-item prop="USER_PHONE" label="联系电话">
            <el-input
              v-model="editForm.USER_PHONE"
              prefix-icon="iconfont icon-user"
            ></el-input>
          </el-form-item>
          <el-form-item label="性别">
            <el-select v-model="editForm.USER_SEX" placeholder="请选择性别">
              <el-option label="男" value="0"></el-option>
              <el-option label="女" value="1"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="状态">
            <el-select v-model="editForm.USER_STATE" placeholder="请选择状态">
              <el-option label="停用" :value="0"></el-option>
              <el-option label="启用" :value="1"></el-option>
              <el-option label="初始" :value="2"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="角色绑定">
            <el-checkbox-group v-model="editForm.roleIds" >
              <el-checkbox v-for="(item, index) in userRole"
                :key="index"
                :label="index"
                @change="changeUserRole(item.ROLE_ID)"
                >{{ item.ROLE_NAME }}</el-checkbox
              >
            </el-checkbox-group>
          </el-form-item>

          <el-form-item label="权限绑定">
            <el-checkbox-group v-model="editForm.operateIds" v-if="userOpg.length>0">
              <el-checkbox v-for="(item, index) in userOpg"
                :key="index"
                :label="index"
                @change="changeUserOpg(index.RES_ID)"
                >{{ item.RES_NAME }}</el-checkbox
              >
            </el-checkbox-group>
          </el-form-item>
        </el-form>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm"
          >提交</el-button
        >
        <el-button @click="resetQuery">重置</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import tableMenutTool from '@/views/tools/tableMenutTool'
import {
  getUserData,
  addUserSave,
  deleteUser,
  getUserPageData,
  getFollowNod,
  addFollowNod,
  updateFollowNod,
  deleteFollowNod
} from '../../api/user/user'

let id = 1000
export default {
  name: 'userManagement',
  components: {
    tableMenutTool,
    getUserData,
    addUserSave,
    deleteUser,
    getUserPageData,
    getFollowNod,
    addFollowNod,
    updateFollowNod,
    deleteFollowNod
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
      dialogType: 'new',
      loading: false,
      tableData: [],
      total: 0,
      queryParams: {
        page: 1,
        limit: 10,
        ORG_ID: '',
      },
      multipleSelection: [],
      editTableDialog: false,
      editForm: {
        USER_ID: '',
        ORG_ID: '',
        USER_ACCOUNT: '',
        USER_NAME: '',
        USER_PHONE: '',
        USER_SEX: '',
        USER_STATE: '',
        roleIds: [],
        operateIds: [],
      },
      editRules: {
        USER_ACCOUNT: [
          { required: true, message: '请输入登录账号', trigger: 'blur' },
          {
            min: 3,
            max: 10,
            message: '长度在 3 到 10 个字符',
            trigger: 'blur',
          },
        ],
        USER_NAME: [
          { required: true, message: '请输入姓名', trigger: 'blur' },
          {
            min: 3,
            max: 10,
            message: '长度在 3 到 10 个字符',
            trigger: 'blur',
          },
        ],
        USER_PHONE: [
          { required: true, message: '请输入联系电话', trigger: 'blur' },
        ],
        USER_SEX: [
          { required: true, message: '请选择性别', trigger: 'change' },
        ],
        USER_STATE: [
          { required: true, message: '请选择状态', trigger: 'change' },
        ],
        roleIds: [
          {
            roleIds: 'array',
            required: true,
            message: '请至少选择一个角色绑定',
            trigger: 'change',
          },
        ],
        operateIds: [
          {
            operateIds: 'array',
            required: true,
            message: '请至少选择一个权限绑定',
            trigger: 'change',
          },
        ],
      },
      pageDataList: {},
      userOpg: [],
      userRole: [],
      followNodData: [],//获取菜单跟节点
      equeryAddfollowParams: {
        ORG_CODE: '',
        ORG_ID: '',
        ORG_PID: '',
        ORG_NAME: '',
      },
      equeryUpdatefollowParams: {
        ORG_ID: '',
        ORG_PID: '',
        ORG_NAME: '',
      },
    }
  },

  created() {
    this.getList()
    this.getPageDataList()
    this.getFollowNodList()
  },

  methods: {
    getList() {
      this.loading = true
      getUserData(this.queryParams).then((response) => {
        this.tableData = response.data
        this.total = response.count
        this.loading = false
      })
    },
    getPageDataList() {
      getUserPageData(this.pageDataList).then((response) => {
        this.userOpg = response.opgList
        this.userRole = response.roleList

        console.log(this.userOpg)
        console.log(this.userRole)
      })
    },
    getFollowNodList() {
      getFollowNod(this.followNodData).then((response) => {
        this.followNodData = response
      })
    },
    changeUserOpg(val) {
      this.editForm.roleIds = val
      console.log(this.editForm.roleIds);
    },
    changeUserRole(val) {
      this.editForm.operateIds = val
      console.log(this.editForm.operateIds);
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
    submitForm: function () {
      this.$refs['editForm'].validate((valid) => {
        if (valid) {
          addUserSave(this.editForm)
            .then((res) => {
              if (res.statusCode == 200) {
                this.$notify.success({ title: '提示', message: '保存成功' })
              } else {
                this.$notify.error({ title: '错误', message: res.message })
              }
              this.loading = false
              this.editTableDialog = false
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
    handleDelete({ $index, row }) {
      this.$confirm('是否确认删除该用户?', '信息', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      })
        .then(async () => {
          await deleteUser(row.ROLE_ID)
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

    close() {
      this.editForm = []
      this.editTableDialog = false
    },
    resetQuery() {
      this.resetForm('editForm')
      this.editTableDialog = false
    },
    editTable(from) {
      this.dialogType = 'edit'
      this.editTableDialog = true
      this.editForm = from.row
    },

    addNameList() {
      this.dialogType = 'new'
      return (this.editTableDialog = true)
    },
    addFollowNode(){
      addFollowNod(this.equeryAddfollowParams).then((response) => {})
    }
  },
}
</script>

<style >
.el-form-item__content .el-input,
.el-select,
.el-form-item__content .el-checkbox-group {
  width: 100% !important;
}
.el-checkbox-group {
  text-align: left;
}
</style>
<style lang='less' scoped>
.el_pagination {
  margin-top: 30px;
}
</style>