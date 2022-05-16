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
                <div class="public_table_tool_inline" @click="deleteTable()">
                  <i class="el-icon-delete"></i>
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

                <el-table-column prop="ROLE_CODE" label="角色编辑" />
                <el-table-column prop="ROLE_NAME" label="角色名称" />
                <el-table-column prop="ROLE_CREATE_TIME" label="角色时间" />
                <el-table-column fixed="right" label="操作" width="300">
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
                    <span
                      class="public-table-btn table-btn-check"
                      @click="checkMenuPermissions(scope.row.ROLE_ID)"
                      >查看菜单权限</span
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
      <div class="pb-main-left">
        <p class="public_card_header" style="margin: 0 0 16px 0">
          菜单权限
          <span
            class="btn_expand-shrink"
            style="margin-left: 10px"
            @click="getRoleMenuList()"
            >刷新</span
          >
        </p>
        <el-tree
          :data="jsonDataTree"
          show-checkbox
          node-key="id"
          default-expand-all
          highlight-current
          :expand-on-click-node="false"
          @node-click="handleNodeClick"
        >
          <span class="custom_tree_node" slot-scope="{ data }">
            <span class="custom_tree_id">{{ data.MENU_NAME }}</span>
          </span>
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
          <el-form-item prop="ROLE_CODE" label="角色编号">
            <el-input
              v-model="addRoleForm.ROLE_CODE"
              prefix-icon="iconfont icon-user"
              placeholder="请输入角色编号"
            ></el-input>
          </el-form-item>
          <el-form-item prop="ROLE_NAME" label="角色名称">
            <el-input
              v-model="addRoleForm.ROLE_NAME"
              prefix-icon="iconfont icon-user"
              placeholder="请输入角色名称"
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
        <el-button type="primary" @click="submitForm">提交</el-button>
        <el-button @click="resetQuery">重置</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import tableMenutTool from '@/views/tools/tableMenutTool'
import {
  getRoleData,
  addRoleSave,
  deleteRole,
  selectMenuByRoleId,
  saveMenuByRoleId,
  getRoleMenu,
} from '../../api/role/role'

export default {
  name: 'role',
  components: {
    tableMenutTool,
    getRoleData,
    deleteRole,
    selectMenuByRoleId,
    saveMenuByRoleId,
    addRoleSave,
    getRoleMenu,
  },
  data() {
    return {
      // 选中数组
      ids: [],
      // 非单个禁用
      single: true,
      // 非多个禁用
      multiple: true,
      tableData: [],
      total: 0,
      queryParams: {
        page: 1,
        limit: 10,
      },
      loading: false,
      multipleSelection: [],
      addRoleDialog: false,
      dialogType: 'new',
      addRoleFormObj: {},
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
      menuDataList: [],
      tableDeleteChange:'',//勾选选中列表id
      jsonDataTree: [],
      
    }
  },

  created() {
    this.getList()
    this.getRoleMenuList('')
  },

  methods: {
    getList() {
      this.loading = true
      getRoleData(this.queryParams).then((response) => {
        this.tableData = response.data
        this.total = response.count
        this.loading = false
      })
    },
    //获取角色 菜单权限
    getRoleMenuList(data) {
      getRoleMenu(data).then((response) => {
        this.menuDataList = response
        this.jsonDataTree = this.transData(
          this.menuDataList,
          'MENU_ID',
          'MENU_PID',
          'children'
        )
        console.log(this.menuTreeData)
      })
    },
    handleSizeChange(newSize) {
      this.queryParams.limit = newSize
      this.getList()
    },
    handleCurrentChange(newPage) {
      this.queryParams.page = newPage
      this.getList()
    },
    submitForm: function () {
      this.$refs['addRoleForm'].validate((valid) => {
        if (valid) {
          addRoleSave(this.addRoleForm)
            .then((res) => {
              if (res.statusCode == 200) {
                this.$notify.success({ title: '提示', message: '保存成功' })
              } else {
                this.$notify.error({ title: '错误', message: res.message })
              }
              this.loading = false
              this.addRoleDialog = false
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
      this.$confirm('此操作将永久删除该用户, 是否继续?', '信息', {
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
    resetQuery() {
      this.resetForm('addRoleForm')
      this.addRoleDialog = false
    },
    editTable(from) {
      this.dialogType = 'edit'
      this.addRoleDialog = true
      this.addRoleForm = from.row
    },
    addRole() {
      this.dialogType = 'new'
      return (this.addRoleDialog = true)
    },
    checkMenuPermissions(id) {
      selectMenuByRoleId(id).then((response) => {
        let selectMenu = response
        console.log(selectMenu)
      })
    },

    koopMenuPermissions(row, mwnu_id) {
      const ids = row.id || this.ids
      this.$confirm('确定保存角色权限信息吗?', '信息', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      })
        .then(async () => {
          await saveMenuByRoleId(row.ROLE_ID, mwnu_id)
          this.$message({
            type: 'success',
            message: '保存成功!',
          })
        })
        .catch(function () {})
    },
    // 多选框选中数据
    handleSelectionChange(val) {
      const that = this;
      that.tableDeleteChange = ''
      that.multipleSelection = val
      that.multipleSelection.forEach(function(e) {
        that.tableDeleteChange += e.ROLE_ID + ",";
      });
    },
    //删除勾选的列表用户
    deleteTable(){
      const that = this;
      if(that.multipleSelection == undefined || that.multipleSelection.length <= 0){
        that.$message({message: '请勾选择要删除的数据',type: 'warning',center: true});
      }else{
        that.$confirm('此操作将永久删除该用户, 是否继续?', '信息', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
        })
          .then(async () => {
            await deleteRole(that.tableDeleteChange)
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
    handleNodeClick(data) {
      
      console.log(data.MENU_ID)
    },
    /**
     * 存放的最终结果树数组
     * 遍历得到以id为键名的对象(建立整棵树的索引)
     * hashItem当前项还没有children属性，则添加该属性并设置为空数组
    */
    transData(jsonArr, idStr, pidStr, childrenStr) {
      const result = []
      const id = idStr
      const pid = pidStr
      const children = childrenStr
      const len = jsonArr.length
      const hash = {}
      jsonArr.forEach((item) => {
        hash[item[id]] = item
      })
      for (let j = 0; j < len; j++) {
        const jsonArrItem = jsonArr[j]
        const hashItem = hash[jsonArrItem[pid]]
        if (hashItem) {
          !hashItem[children] && (hashItem[children] = [])
          hashItem[children].push(jsonArrItem)
        } else {
          result.push(jsonArrItem)
        }
      }
      return result
    },
  },
}
</script>

<style lang='less' scoped>
</style>