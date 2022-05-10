<template>
  <div class="">
    <div class="d-display">
      <div class="pb-main-right pb-main_pad-fr">
        <div class="pb-main-height">
          <div class="public-card-body">
            <div class="public-card-body-border">
              <div class="public_table_tool">
                <div class="public_table_tool_inline" @click="getList()">
                  <i class="el-icon-refresh"></i>
                </div>
                <div class="public_table_tool_inline" @click="addRole()">
                  <i class="el-icon-circle-plus-outline"></i>
                </div>
                <div class="public_table_tool_inline">
                  <i class="el-icon-delete"></i>
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

                <el-table-column prop="ROLE_CODE" label="角色编辑" />
                <el-table-column prop="ROLE_NAME" label="角色名称" />
                <el-table-column prop="ROLE_CREATE_TIME" label="角色时间" />
                <el-table-column fixed="right" label="操作" width="300">
                  <template slot-scope="scope">
                    <span
                      class="public-table-btn table-btn-edit"
                      @click="
                        editTable(scope.row.ROLE_ID, scope.row.ROLE_STATE)
                      "
                      >编辑</span
                    >
                    <span
                      class="public-table-btn table-btn-delete"
                      @click="handleDelete(scope)"
                      >删除</span
                    >
                    <span class="public-table-btn table-btn-check"
                      @click="checkMenuPermissions(scope.row.ROLE_ID)">查看菜单权限</span
                    >
                    <span
                      class="public-table-btn table-btn-delete"
                      @click="koopMenuPermissions(scope)"
                      >保持菜单权限</span
                    >
                  </template>
                </el-table-column>
              </el-table>

              <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page.sync="queryParams.pageNum"
                class="el_pagination"
                layout="total, sizes, prev, pager, next, jumper"
                :total="total"
              />
              <!-- :page-sizes.sync="queryParams.pageSize"
                <el-pagination v-show="total>10"
                    :total="total"
                    :page.sync="queryParams.pageNum"
                    :limit.sync="queryParams.pageSize"
                    @pagination="getList" /> -->
            </div>
          </div>
        </div>
      </div>
      <div class="pb-main-left">
        <p class="public_card_header">菜单权限</p>
        <el-tree
          :data="menuTreeData"
          show-checkbox
          node-key="id"
          :default-expanded-keys="[2, 3]"
          :default-checked-keys="[5]"
          :props="defaultProps"
        >
        </el-tree>
      </div>
    </div>
    <el-dialog
      :title="dialogType === 'edit' ? '修改角色' : '添加角色'"
      :visible.sync="addRoleDialog"
      width="50%"
      append-to-body
      @close="close"
    >
      <div style="width: 100%; text-align: center">
        <el-form
          :model="addRoleForm"
          ref="addRoleForm"
          :rules="addRoleRules"
          label-width="120px"
        >
          <el-form-item prop="ROLE_NAME" label="角色名称">
            <el-input
              v-model="addRoleForm.ROLE_NAME"
              prefix-icon="iconfont icon-user"
              placeholder="请输入角色名称"
            ></el-input>
          </el-form-item>
          <el-form-item prop="ROLE_CODE" label="角色编号">
            <el-input
              v-model="addRoleForm.ROLE_CODE"
              prefix-icon="iconfont icon-user"
              placeholder="请输入角色编号"
            ></el-input>
          </el-form-item>
          <el-form-item prop="ROLE_REMARK" label="角色备注">
            <el-input
              type="textarea"
              v-model="addRoleForm.ROLE_REMARK"
              placeholder="请输入角色备注"
            ></el-input>
          </el-form-item>
        </el-form>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm()">提交</el-button>
        <el-button @click="resetForm">重置</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import tableMenutTool from '@/views/tools/tableMenutTool'
import {
  getRoleData,
  addRole,
  updateRole,
  deleteRole,
  selectMenuByRoleId,
  saveMenuByRoleId
} from '../../api/role/role'

export default {
  name: 'role',
  components: {
    tableMenutTool,
    getRoleData,
    addRole,
    updateRole,
    deleteRole,
    selectMenuByRoleId,
    saveMenuByRoleId
  },
  data() {
    return {
      tableData: [],
      // currentPage: '',
      // pageSizes: {
      //   type: Array,
      //   default () {
      //     return [10, 20, 30, 50]
      //   }
      // },
      total: 0,
      queryParams: {
        pageNum: 1,
        pageSize: 10,
      },

      multipleSelection: [],
      addRoleDialog: false,
      menuTreeData: [
        {
          id: 1,
          label: '系统管理',
          children: [
            {
              id: 5,
              label: '系统管理',
              children: [
                {
                  id: 9,
                  label: '用户管理',
                },
                {
                  id: 10,
                  label: '权限管理',
                },
                {
                  id: 11,
                  label: '角色管理',
                },
                {
                  id: 11,
                  label: '日志管理',
                },
                {
                  id: 11,
                  label: '数据字典',
                },
                {
                  id: 11,
                  label: '菜单管理',
                },
              ],
            },
          ],
        },
        {
          id: 2,
          label: '消息管理',
          children: [
            {
              id: 5,
              label: '消息通知',
            },
            {
              id: 5,
              label: '我的消息',
            },
          ],
        },
        {
          id: 2,
          label: '参数设置',
        },
        {
          id: 3,
          label: '附件管理',
        },
        {
          id: 4,
          label: '定时任务',
        },
        {
          id: 11,
          label: '应用管理',
        },
        {
          id: 6,
          label: '代码生成',
        },
      ],
      defaultProps: {
        children: 'children',
        label: 'label',
      },
      dialogType: 'new',
      addRoleForm: {
        ROLE_ID: '',
        ROLE_STATE: '',
        ROLE_NAME: '',
        ROLE_CODE: '',
        ROLE_REMARK: '',
      },
      addRoleRules: {
        ROLE_NAME: [
          { required: true, message: '请输入角色名称', trigger: 'blur' },
        ],
        ROLE_CODE: [
          { required: true, message: '请输入角色编号', trigger: 'blur' },
        ],
        ROLE_REMARK: [
          { required: true, message: '请输入角色备注', trigger: 'blur' },
        ],
      },
    }
  },

  created() {
    this.getList()
  },

  methods: {
    async getList() {
      let result = await getRoleData()
      this.tableData = result.data
      // for (let i = 0; i < this.tableData.length; i++) {
      //   this.addRoleForm.ROLE_NAME = this.tableData[i].ROLE_NAME;
      //   this.addRoleForm.ROLE_CODE = this.tableData[i].ROLE_CODE;
      //   this.addRoleForm.ROLE_REMARK = this.tableData[i].ROLE_REMARK;
      // }
      console.log(this.tableData)
      this.total = result.count
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
    async submitForm() {
      const isEdit = this.dialogType === 'edit'
      // const checkedKeys = this.$refs.tree.getCheckedKeys()
      // this.role.routes = this.generateTree(deepClone(this.serviceRoutes), '/', checkedKeys)
      if (isEdit) {
        const { data } = await updateRole(
          this.addRoleForm.ROLE_ID,
          this.addRoleForm.ROLE_STATE,
          this.addRoleForm.ROLE_NAME,
          this.addRoleForm.ROLE_CODE,
          this.addRoleForm.ROLE_REMARK
        )
        console.log(this.data)
        // for (let index = 0; index < this.rolesList.length; index++) {
        //   if (this.rolesList[index].key === this.role.key) {
        //     this.rolesList.splice(index, 1, Object.assign({}, this.role))
        //     break
        //   }
        // }
      } else {
        const { data } = await addRole(
          this.addRoleForm.ROLE_NAME,
          this.addRoleForm.ROLE_CODE,
          this.addRoleForm.ROLE_REMARK
        )
        console.log(this.data)
      }
      this.addRoleDialog = false
      this.getList()
    },
    handleDelete({ $index, row }) {
      this.$confirm('是否确认删除该用户?', '信息', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      })
        .then(async () => {
          await deleteRole(row.ROLE_ID)
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
      this.addRoleForm = []
      this.addRoleDialog = false
    },
    resetForm() {
      this.$refs.addRoleForm.resetFields()
      const isEdit = this.dialogType === 'edit'
      this.addRoleDialog = false
    },
    editTable(editId, atate) {
      this.dialogType = 'edit'
      this.addRoleDialog = true
      this.addRoleForm.ROLE_ID = editId
      this.addRoleForm.ROLE_STATE = atate
      // for (let index = 0; index < this.tableData.length; index++) {
      //     // if (this.tableData[index].ROLE_ID === this.editId) {
      //       // this.tableData.splice(index, 1, Object.assign({}, this.role))
      //       // break
      //       // console.log(this.tableData[1].ROLE_ID);
      //     // }
      //     console.log(this.tableData[index].ROLE_ID);
      //   }
      console.log(editId)
    },
    addRole() {
      this.dialogType = 'new'
      return (this.addRoleDialog = true)
    },
    async checkMenuPermissions(id){
      let selectMenu = await selectMenuByRoleId(id)
      console.log(selectMenu)

    },
    koopMenuPermissions(row,mwnu_id) {
      const ids = row.id || this.ids
      this.$confirm('确定保存角色权限信息吗?', '信息', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      })
        .then(async () => {
          await saveMenuByRoleId(row.ROLE_ID,mwnu_id)
          this.$message({
            type: 'success',
            message: '保存成功!',
          })
        })
        .catch(function () {})
    },
  },
}
</script>

<style lang='less' scoped>
</style>