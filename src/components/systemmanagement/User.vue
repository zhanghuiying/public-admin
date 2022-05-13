<template>
  <div class="public_main_app d-display">
    <div class="pb-main-left">
      <p class="public_card_header">
        组织结构
        <span
          class="btn_expand-shrink"
          style="margin-left: 10px"
          @click="addFollowNode()"
          >添加跟节点</span
        >
      </p>

      <div class="tree_body">
        <el-tree
          :data="followNodData"
          show-checkbox
          node-key="id"
          default-expand-all
          :expand-on-click-node="false"
        >
        <!-- :class="queryParams.ORG_ID != ''?'tree_checked custom_tree_node' : 'custom_tree_node'" -->
          <span class="custom_tree_node"
            slot-scope="{ node, data }"
          @click="() => treeChecked(node, data)">
            <el-input v-if="modifyTreeInput"
            v-model="treeInput"
            @blur="treeInputBlur"
            @change="treeInputChange"></el-input>
            <span v-else>{{ data.ORG_NAME }}</span>
            <span>
              <i
                style="color: #333; margin-left: 6px"
                class="el-icon-folder-add"
                @click="() => append(data)"
              ></i>
              <i
                style="color: #333; margin-left: 6px"
                class="el-icon-edit"
                @click="() => modify(node, data)"
              ></i>
              <i
                style="color: #333; margin-left: 6px"
                class="el-icon-delete"
                @click="() => remove(node, data)"
              ></i>
            </span>
          </span>
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
              <div class="public_table_tool_inline" @click="deleteTable()">
                <i class="el-icon-delete"></i>
              </div>
              <div class="public_table_tool_inline" @click="disabledTable()">
                <i class="el-icon-close"></i>
              </div>
              <div class="public_table_tool_inline" @click="enableTable()">
                <i class="el-icon-check"></i>
              </div>
              <div class="public_table_tool_inline" @click="rechargePasswordTable()">
                <i class="el-icon-unlock"></i>
              </div>

              <div class="public_table_tool_inline" @click="bindRole()">
                <i class="el-icon-coordinate"></i>
              </div>
              <div class="public_table_tool_inline" @click="bindFeatures()">
                <i class="el-icon-document"></i>
              </div>
              <div class="public_table_tool_inline" @click="bindMechanism()">
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
              tooltip-effect="dark"
              @selection-change="handleSelectionChange"
            >
              <el-table-column fixed="left" type="selection" width="45" />

              <el-table-column prop="USER_ACCOUNT" label="登录账号" width="100"/>
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
          ref="editForm"
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
            <div style="text-align: left;">
              <span class="checkbox_span" v-for="(item, index) in userRoleList" :key="index">
                <input type="checkbox" :id="index" :value='item.ROLE_ID' v-model="userRoleSelection">
                <label for="item">{{ item.ROLE_NAME }}</label>
              </span>
            </div>
          </el-form-item>

          <el-form-item label="权限绑定">
            <div style="text-align: left;">
              <span class="checkbox_span" v-for="(item, index) in userOpgList" :key="index">
                <input type="checkbox" :id="index" :value='item.RES_ID' v-model="userOpgSelection">
                <label for="item.RES_ID">{{ item.RES_NAME }}</label>
              </span>
            </div>           
          </el-form-item>
        </el-form>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm">提交</el-button>
        <el-button @click="resetQuery(0)">重置</el-button>
      </div>
    </el-dialog>


    <el-dialog
      title="绑定角色"
      :visible.sync="bindRoleDialog"
      width="50%"
      append-to-body
    >
      <div style="width: 100%; text-align: center">
        <div style="text-align: left;">
          <span class="checkbox_span" v-for="(item, index) in userRoleList" :key="index">
            <input type="checkbox" :id="index" :value='item.ROLE_ID' v-model="userRoleSelection">
            <label for="item">{{ item.ROLE_NAME }}</label>
          </span>
        </div>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitBindRole">提交</el-button>
        <el-button @click="resetQuery(1)">重置</el-button>
      </div>
    </el-dialog>

    <el-dialog
      title="绑定功能组"
      :visible.sync="bindFeaturesDialog"
      width="50%"
      append-to-body
    >
      <div style="width: 100%; text-align: center">
        <div style="text-align: left;">
          <span class="checkbox_span" v-for="(item, index) in userOpgList" :key="index">
            <input type="checkbox" :id="index" :value='item.RES_ID' v-model="userOpgSelection">
            <label for="item.RES_ID">{{ item.RES_NAME }}</label>
          </span>
        </div>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitBindFeatures">提交</el-button>
        <el-button @click="resetQuery(2)">重置</el-button>
      </div>
    </el-dialog>

    <el-dialog
      title="更换机构"
      :visible.sync="bindMechanismDialog"
      width="50%"
      append-to-body
    >
      <div style="width: 100%; text-align: center">
        <el-tree
          :data="followNodData"
          show-checkbox
          node-key="id"
          default-expand-all
          :expand-on-click-node="false"
          >
          <span class="custom_tree_node" slot-scope="{ data }">
            <span>{{ data.ORG_NAME }}</span>
          </span>
        </el-tree>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitBindMechanism">提交</el-button>
        <el-button @click="resetQuery(3)">重置</el-button>
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
  disableUser,
  enableUser,
  resetPasswordUser,
  saveUserRoles,
  saveUserOperate,
  saveUserOrg,
  getUserPageData,
  getFollowNod,
  addFollowNod,
  addFollowNodPost,
  updateFollowNod,
  deleteFollowNod,
} from '../../api/user/user'

let id = 0
export default {
  name: 'userManagement',
  components: {
    tableMenutTool,
    getUserData,
    addUserSave,
    deleteUser,
    disableUser,
    enableUser,
    resetPasswordUser,
    saveUserRoles,
    saveUserOperate,
    saveUserOrg,
    getUserPageData,
    getFollowNod,
    addFollowNod,
    addFollowNodPost,
    updateFollowNod,
    deleteFollowNod,
    
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
      bindRoleDialog: false,
      bindFeaturesDialog: false,
      bindMechanismDialog: false,
      editForm: {
        USER_ID: '',
        ORG_ID: '',
        USER_ACCOUNT: '',
        USER_NAME: '',
        USER_PHONE: '',
        USER_SEX: '',
        USER_STATE: '',
        roleIds: '',
        operateIds: '',
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
        ]
      },
      pageDataList: {},
      userOpgList: [],//权限绑定
      userRoleList: [],//角色绑定
      followNodData: [], //获取菜单跟节点
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
      treeInput: '',
      modifyTreeInput: false,
      org_id:'',
      tableDeleteChange:'',//勾选选中列表id
      userRoleSelection: [],//角色绑定表单选中id
      userOpgSelection: [],//权限绑定表单选中id
      queryParamsRole: {
        USER_IDS: '',
        roleIds: '',
      },
      queryParamsFeatures: {
        USER_IDS: '',
        operateIds: '',
      },
    }
  },

  created() {
    this.modifyTreeInput = false
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
        this.userOpgList = response.opgList
        this.userRoleList = response.roleList
        // console.log(this.userOpgList)
        // console.log(this.userRoleList)
      })
    },
    getFollowNodList() {
      getFollowNod(this.followNodData).then((response) => {
        this.followNodData = response
      })
    },
    treeChecked(node, data){
      this.queryParams.ORG_ID = data.ORG_ID
      getUserData(this.queryParams).then((response) => {
        this.org_id = response.ORG_ID
      })
    },
    append(data) {
      this.equeryAddfollowParams = data
      this.equeryAddfollowParams.ORG_CODE = data.ORG_ID
      // console.log(this.equeryAddfollowParams);
      addFollowNod(this.equeryAddfollowParams).then((response) => {})

      // data.children.push(newChild)
      // data.ORG_ID data.ORG_NAME data.ORG_PID this.ORG_ID
      // const newChild = { id: id++, label: 'new node' + `${id}`, children: [] }
      // if (!data.children) {
      //   this.$set(data, 'children', [])
      // }
      // data.children.push(newChild)
    },
    remove(node, data) {
      this.$confirm('确认删除部门 "' + data.ORG_NAME + '" 吗（该组织机构下的用户也会被删除）?', "警告", {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      })
        .then(async () => {
          await deleteFollowNod(data.ORG_ID)
          this.getFollowNodList()
          this.$message({
            type: 'success',
            message: '删除成功!',
          })
        })
        .catch((err) => {
          console.error(err)
        })
      // const parent = node.parent
      // const children = parent.data.children || parent.data
      // const index = children.findIndex((d) => d.id === data.id)
      // children.splice(index, 1)
    },

    modify(node, data) {
      this.modifyTreeInput = true
      this.treeInput = data.ORG_NAME
      // console.log(this.modifyTreeInput,this.treeInput);
      // console.log("000000"+this.modifyTreeInput);
    },
    treeInputChange(){
      this.modifyTreeInput = false
      // console.log("1111111"+this.modifyTreeInput);
    },
    treeInputBlur(){
      this.modifyTreeInput = false
      // console.log("222222"+this.modifyTreeInput);
    },
    // renderContent(h, { node, data, store }) {
    //   return (
    //     <span class="custom_tree_node">
    //       <span>{node.label}</span>
    //       <span>
    //         <i
    //           style="color: #333;margin-left: 6px;"
    //           class="el-icon-folder-add"
    //           on-click={() => this.append(data)}
    //         ></i>
    //         <i
    //           style="color: #333;margin-left: 6px;"
    //           class="el-icon-edit"
    //           on-click={() => this.modify(node, data)}
    //         ></i>
    //         <i
    //           style="color: #333;margin-left: 6px;"
    //           class="el-icon-delete"
    //           on-click={() => this.remove(node, data)}
    //         ></i>
    //       </span>
    //     </span>
    //   )
    // },
    
    handleSizeChange(newSize) {
      this.queryParams.limit = newSize
      this.getList()
    },
    handleCurrentChange(newPage) {
      this.queryParams.page = newPage
      this.getList()
    },
    handleSelectionChange(val) {
      const that = this;
      that.tableDeleteChange = ''
      that.multipleSelection = val
      that.multipleSelection.forEach(function(e) {
        that.tableDeleteChange += e.USER_ID + ",";
      });
    },
    submitForm: function () {
      const that = this;
      that.editForm.roleIds = ''
      that.editForm.operateIds = ''
      that.userRoleSelection.forEach(function(e) {
        that.editForm.roleIds += e + ",";
      });
      that.userOpgSelection.forEach(function(e) {
        that.editForm.operateIds += e + ",";
      });
      that.$refs['editForm'].validate((valid) => {
        if (valid) {
          addUserSave(that.editForm)
            .then((res) => {
              if (res.statusCode == 200) {
                that.$notify.success({ title: '提示', message: '保存成功' })
              } else {
                that.$notify.error({ title: '错误', message: res.message })
              }
              that.userRoleSelection = ''
              that.userOpgSelection = ''
              that.loading = false
              that.editTableDialog = false
              that.getList()
            })
            .catch((error) => {
              that.loading = false
            })
        } else {
          that.loading = false
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
          await deleteUser(row.USER_ID)
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
    resetQuery(index) {
      if(index == 0){
        this.resetForm('editForm')
        this.editTableDialog = false
      }else if(index == 1){
        this.queryParamsRole.roleIds = ''
        this.userRoleSelection = ''
        this.bindRoleDialog = false
      }else if(index == 2){
        this.queryParamsRole.operateIds = ''
        this.userOpgSelection = ''
        this.bindFeaturesDialog = false
      }else if(index == 3){
        this.bindMechanismDialog = false
      }
    },
    editTable(from) {
      this.dialogType = 'edit'
      this.editTableDialog = true
      this.editForm = from.row
    },

    addNameList() {
      if(this.org_id ===''){
        this.$message({message: '请先选择组织机构',type: 'warning',center: true});
      }else{
        this.dialogType = 'new'
        // this.userRoleSelection = ''
        // this.userOpgSelection = ''
        this.editTableDialog = true
      }
    },
    bindRole() {
      if(this.org_id ===''){
        this.$message({message: '请先选择组织机构',type: 'warning',center: true});
      }else{
        // this.userRoleSelection = ''
        this.bindRoleDialog = true
      }
    },
    bindFeatures() {
      if(this.org_id ===''){
        this.$message({message: '请先选择组织机构',type: 'warning',center: true});
      }else{
        // this.userOpgSelection = ''
        this.bindFeaturesDialog = true
      }
    },
    bindMechanism() {
      if(this.org_id ===''){
        this.$message({message: '请先选择组织机构',type: 'warning',center: true});
      }else{
        getFollowNod(this.followNodData).then((response) => {
          this.followNodData = response
        })
        this.bindMechanismDialog = true
      }
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
            await deleteUser(that.tableDeleteChange)
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
    //禁用勾选的列表用户
    disabledTable(){
      const that = this;
      if(that.multipleSelection == undefined || that.multipleSelection.length <= 0){
        that.$message({message: '请先勾选择要操作的数据',type: 'warning',center: true});
      }else{
        that.$confirm('禁用该用户, 是否继续?', '信息', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
        })
          .then(async () => {
            await disableUser(that.tableDeleteChange)
            that.tableDeleteChange = ''
            that.getList()
            that.$message({
              type: 'success',
              message: '禁用成功!',
            })
          })
          .catch((err) => {
            console.error(err)
          })
      }
    },
    //启用勾选的列表用户
    enableTable(){
      const that = this;
      if(that.multipleSelection == undefined || that.multipleSelection.length <= 0){
        that.$message({message: '请先勾选择要操作的数据',type: 'warning',center: true});
      }else{
        that.$confirm('启用该用户, 是否继续?', '信息', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
        })
          .then(async () => {
            await enableUser(that.tableDeleteChange)
            that.tableDeleteChange = ''
            that.getList()
            that.$message({
              type: 'success',
              message: '启用成功!',
            })
          })
          .catch((err) => {
            console.error(err)
          })
      }
    },
    //重置密码勾选的列表用户
    rechargePasswordTable(){
      const that = this;
      if(that.multipleSelection == undefined || that.multipleSelection.length <= 0){
        that.$message({message: '请先勾选择要操作的数据',type: 'warning',center: true});
      }else{
        that.$confirm('重置密码该用户, 是否继续?', '信息', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
        })
          .then(async (res) => {
            await resetPasswordUser(that.tableDeleteChange)
            that.tableDeleteChange = ''
            that.getList()
            that.$message({
              type: 'success',
              message: '密码重置成功！新密码为Qq123456用户首次登陆后需要修改密码!',
            })
          })
          .catch((err) => {
            console.error(err)
          })
      }
    },

    submitBindRole(){
      const that = this;
      that.queryParamsRole.roleIds = ''
      console.log(that.userRoleSelection);
      that.userRoleSelection.forEach(function(e) {
        that.queryParamsRole.roleIds += e + ",";
      });
      saveUserRoles(that.queryParamsRole).then((response) => {
        that.userRoleSelection = ''
        that.getList()
        that.bindRoleDialog = false
      })
    },
    submitBindFeatures(){
      const that = this;
      that.queryParamsFeatures.operateIds = ''
      that.userOpgSelection.forEach(function(e) {
        that.queryParamsFeatures.operateIds += e + ",";
      });
      saveUserOperate(this.queryParamsFeatures).then((response) => {
        that.userOpgSelection = ''
        that.getList()
        that.bindFeaturesDialog = false
      })
    },
    submitBindMechanism(){
      
      // this.getList()
      // this.bindMechanismDialog = false
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
.custom_tree_node .el-input__inner,
.tree_checked .el-input__inner{
  height: 24px;
  line-height: 24px;
}

</style>
<style lang='less' scoped>
.el_pagination {
  margin-top: 30px;
  
}
.custom_tree_node{
  // background-color: #fff;
}
.tree_checked{
  background-color: #e5e5e5;
}
.tree_body{
  padding: 16px;
  // overflow:auto;
}
.checkbox_span{
  display: inline-block;
  height: 34px;
  margin: 0 16px 10px 0;
  padding: 0 10px 0 0;
}
.checkbox_span input{
  width: 14px;
  height: 14px;
}
.checkbox_span label{
  margin-left:6px;
}
</style>