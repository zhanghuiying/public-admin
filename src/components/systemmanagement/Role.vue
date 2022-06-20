<template>
  <div class="">
    <div class="h100 d-display">
      <div class="pb-main-right pb-main_pad-fr">
        <div class="pb-main-height">
          <div class="public-card-body">
            <div class="public-card-body-border">
              <div class="public_table_tool">
                <el-popover placement="top" title="刷新" trigger="hover" width="36">
                  <div slot="reference" class="public_table_tool_inline" @click="getList()">
                    <i :class="[isRefreshRouter? 'el-icon-refresh refresh-go' : 'el-icon-refresh']"></i>
                  </div>
                </el-popover>
                <el-popover placement="top" title="添加" trigger="hover" width="36">
                  <div slot="reference" class="public_table_tool_inline" @click="addRole()">
                    <i class="el-icon-circle-plus-outline"></i>
                  </div>
                </el-popover>
                <el-popover placement="top" title="删除" trigger="hover" width="36">
                  <div slot="reference" class="public_table_tool_inline" @click="deleteTable()">
                    <i class="el-icon-delete"></i>
                  </div>
                </el-popover>
                <div class="pos_tool_tb">
                  <div class="pos_table_tool">
                    <el-popover placement="top" title="筛选列" trigger="hover" width="45">
                      <div slot="reference" class="public_table_tool_inline">
                        <i class="el-icon-data-analysis"></i>
                      </div>
                    </el-popover>
                    <el-popover placement="top" title="导出" trigger="hover" width="36">
                      <div slot="reference" class="public_table_tool_inline" @click="exportData">
                        <i class="el-icon-receiving"></i>
                      </div>
                    </el-popover>
                    <el-popover placement="top" title="打印" trigger="hover" width="36">
                      <div slot="reference" class="public_table_tool_inline" @click="printJson">
                        <i class="el-icon-printer"></i>
                      </div>
                    </el-popover>
                  </div>
                </div>
              </div>

              <el-table
                ref="tableJson"
                :data="tableData"
                style="width: 100%"
                v-loading="loading"
                @selection-change="handleSelectionChange"
              >
                <el-table-column fixed="left" type="selection" width="45" />

                <el-table-column prop="ROLE_CODE" label="角色编辑" />
                <el-table-column prop="ROLE_NAME" label="角色名称" />
                <el-table-column prop="ROLE_CREATE_TIME" label="创建时间" />
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
                      @click="checkMenuPermissions(scope.row)"
                      >查看菜单权限</span
                    >
                    <span
                      class="public-table-btn table-btn-delete"
                      @click="koopMenuPermissions(scope.row.ROLE_ID)"
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
        <!-- :default-checked-keys="defKeys" -->
        <div class="role-tree" style="margin: 0 16px">
          <el-tree
          :data="jsonDataTree"
          show-checkbox
          default-expand-all
          highlight-current
          node-key="id"
          ref="rightsTree"
          :expand-on-click-node="false"
          @check="handleNodeClick"
          :default-checked-keys="defKeys"
        >
          <span class="custom_tree_node" slot-scope="{ data }">
            <span class="custom_tree_id">{{ data.MENU_NAME }}</span>
          </span>
        </el-tree>
        </div>
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
      loading: false,
      isRefreshRouter: false,
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
      menu_id:'',
      saveMenuParams: {
        ROLE_ID: '',
        MENU_ID: '',
      },
      defKeys: [],
      selectMenu: [],
    }
  },

  created() {
    this.getList()
    this.getRoleMenuList('')
  },

  methods: {
    getList() {
      this.isRefreshRouter = !this.isRefreshRouter;
      setTimeout(() => {
        this.isRefreshRouter = !this.isRefreshRouter;
      },1000)
      getRoleData(this.queryParams).then((response) => {
        this.tableData = response.data
        this.total = response.count
      })
    },
    exportData() {
      this.download('/lui_sys/pim/role/listJson.do', { ...this.tableData }, `角色管理信息`)
      // this.download(this.tableData, `角色信息.xlsx`)
    },
    printJson() {
      this.$print(this.$refs.tableJson);
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
    checkMenuPermissions(role) {
      const that = this;
      // this.getLeafKeys(role.ROLE_ID,this.defKeys)
      that.defKeys = []
      selectMenuByRoleId(role.ROLE_ID).then((response) => {
        that.selectMenu = response
        that.selectMenu.map((item) => {
          that.defKeys.push(item.MENU_ID)
        })
          that.$nextTick(() =>{
          that.$refs.rightsTree.setCheckedKeys(this.defKeys)
        })

        // that.selectMenu.forEach(function(e) {
        //   that.defKeys += e.MENU_ID + ",";
        // });
        // that.defKeys = that.defKeys.substr(0, that.defKeys.length-1)
        // this.getLeafKeys(role.ROLE_ID,this.defKeys)

        console.log(that.defKeys)
      })
    },
    getLeafKeys(node,arr){
      // node.forEach(item=> 
      //   this.getLeafKeys(item,arr))
        console.log(node,arr);
      // return arr.push(node.MENU_ID)
    },

    koopMenuPermissions(id) {
      this.saveMenuParams.ROLE_ID = id

      this.saveMenuParams.MENU_ID = this.menu_id
      console.log(this.saveMenuParams);

      this.$confirm('确定保存角色权限信息吗?', '信息', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      })
        .then(async () => {
          await saveMenuByRoleId(this.saveMenuParams)
          this.$message({
            type: 'success',
            message: '保存成功!',
          })
        })
        .catch(function () {})
    },

    handleNodeClick(data, checkData) {
      const that = this;
      that.menu_id = ''
      checkData.checkedNodes.forEach(function(e) {
        that.menu_id += e.MENU_ID + ",";
      });
      that.menu_id = that.menu_id.substr(0, that.menu_id.length - 1)
    },
    // 多选框选中数据
    handleSelectionChange(val) {
      const that = this;
      that.tableDeleteChange = ''
      that.multipleSelection = val
      that.multipleSelection.forEach(function(e) {
        that.tableDeleteChange += e.ROLE_ID + ",";
      });
      that.tableDeleteChange = that.tableDeleteChange.substr(0, that.tableDeleteChange.length-1)
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

<style>
.role-tree .el-tree .is-expanded .el-tree-node__content .is-leaf{
  width: 24px!important;
  height: 15px!important;
  background-position: -106px -24px!important;
}
.role-tree .el-tree--highlight-current .el-tree-node.is-current>.el-tree-node__content {
    background-color: #e5e5e5;
}
.role-tree .is-expanded .el-tree-node__content .expanded{
  width: 24px!important;
  height: 15px!important;
  background-position: -106px -24px!important;
}
.role-tree .el-tree-node__content .is-leaf{
  width: 21px!important;
  height: 46px!important;
  background-position: -84px -32px!important;
}
.role-tree .el-tree-node__expand-icon.expanded {
    transform: rotate(0);
}
.role-tree .el-tree-node__expand-icon.expanded:before {
    content: "";
}
.role-tree .el-tree-node__content .el-tree-node__expand-icon{
  width: 24px;
  height: 15px;
  background-position: -127px -3px;
}
.role-tree .el-tree-node__content .el-tree-node__expand-icon:before{
  content: "";
}
.role-tree .el-tree-node__content .el-tree-node__expand-icon{
    line-height: 0;
    margin: 0;
    padding: 0;
    display: inline-block;
    vertical-align: middle;
    border: 0 none;
    cursor: pointer;
    outline: none;
    background-color: transparent;
    background-repeat: no-repeat;
    background-attachment: scroll;
    background-image: url(../../assets/images/sprite.png);
}
/* .el-popover{
  min-width: 36px!important;
  text-align: center!important;
  padding:6px 0!important;
  border: 1px solid #ccc!important;
}
.el-popover .el-popover__title{
  font-size: 12px!important;
  margin: 0!important;
  color: #333!important;
} */
</style>