<template>
  <div class="">
    <div class="d-display">
      <div class="pb-main-right pb-main_pad-fr">
        <div class="pb-main-height">
          <div class="public-card-body">
            <div class="public-card-body-border">
              <div class="public_table_tool">
                <div class="public_table_tool_inline">
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
                max-height="250"
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
                      @click="editTable"
                      >编辑</span
                    >
                    <span
                      class="public-table-btn table-btn-delete"
                      @click="handleDelete(scope.row)"
                      >删除</span
                    >
                    <span class="public-table-btn table-btn-check"
                      >查看菜单权限</span
                    >
                    <span
                      class="public-table-btn table-btn-delete"
                      @click="saveMenuPermission(scope.row)"
                      >保持菜单权限</span
                    >
                  </template>
                </el-table-column>
              </el-table>

              <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page.sync="queryParams.pageNum"
                :page-sizes.sync="queryParams.pageSize"
                class="el_pagination"
                layout="total, sizes, prev, pager, next, jumper"
                :total="total"
              />
              <!-- <el-pagination v-show="total>10"
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
      title="添加角色"
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
import { getRoleData,addRole } from '../../api/role/role'

export default {
  name: 'role',
  components: {
    tableMenutTool,
    getRoleData,
    addRole
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
              id: 4,
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
              ],
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
          id: 5,
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
      addRoleForm: {
        ROLE_ID:'',
        ROLE_STATE: '',
        ROLE_NAME:'',
        ROLE_CODE:'',
        ROLE_REMARK:'',
      },
      
      addRoleRules: {
        ROLE_NAME: [{ required: true, message: '请输入角色名称', trigger: 'blur' }],
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
    // 获取所有的菜单
    async getList() {
      let result = await getRoleData()
      this.tableData = result.data
      this.total = result.data.length
      console.log(this.tableData)
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
      const { data } = await addRole(this.addRoleForm.ROLE_NAME,
      this.addRoleForm.ROLE_CODE,
      this.addRoleForm.ROLE_REMARK)
      console.log(this.data)
      // this.role.key = data.key
      // this.rolesList.push(this.role)
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
    close() {
      this.addRoleForm = []
      this.addRoleDialog = false
    },
    resetForm() {
      this.$refs.addRoleForm.resetFields()
      this.addRoleDialog = false
    },
    editTable() {
      return (this.addRoleDialog = true)
    },
    addRole() {
      return (this.addRoleDialog = true)
    },
    saveMenuPermission(row) {
      const ids = row.id || this.ids
      this.$confirm('确定保存角色权限信息吗?', '信息', {
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