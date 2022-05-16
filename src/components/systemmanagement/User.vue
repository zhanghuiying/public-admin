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

      <div class="public-card-body">
        <el-tree
          :data="jsonDataTree"
          :expand-on-click-node="false"
          show-checkbox
          ref="tree"
          node-key="ORG_ID"
          default-expand-all
          highlight-current
          @node-click="handleNodeClick"
        >

          <span class="custom_tree_node" slot-scope="{ node, data }">
            <template v-if="data.ORG_ID != modifyTreeInput">
              <span class="custom_tree_id">{{ data.ORG_NAME }}</span>
              <span>
                <i
                  style="color: #333; margin-left: 6px"
                  class="el-icon-folder-add"
                  @click="() => append(data)"
                ></i>
                <i
                  style="color: #333; margin-left: 6px"
                  class="el-icon-edit"
                  @click="() => modify(data)"
                ></i>
                <i
                  style="color: #333; margin-left: 6px"
                  class="el-icon-delete"
                  @click="() => remove(node, data)"
                ></i>
              </span>
            </template>
            <span v-else>
              <el-input
                style="width: 90px; height: 22px"
                size="mini"
                ref="inputVal"
                :value="data.ORG_NAME"
                @blur="sureChange(data)"
                @input="(a) => treeInputInp(a, data)"
              >
              </el-input>
              <span
                style="margin-left: 20px"
                v-if="data.ORG_ID != 100 ? true : false"
              >
                <i
                  style="color: #333; margin-left: 6px"
                  class="el-icon-circle-check"
                  @click="() => sureChange(data)"
                ></i>
                <i
                  style="color: #333; margin-left: 6px"
                  class="el-icon-circle-close"
                  @click="() => chancelChange()"
                ></i>
              </span>
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
              <div
                class="public_table_tool_inline"
                @click="rechargePasswordTable()"
              >
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

              <el-table-column
                prop="USER_ACCOUNT"
                label="登录账号"
                width="100"
              />
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
            <div style="text-align: left">
              <span
                class="checkbox_span"
                v-for="(item, index) in userRoleList"
                :key="index"
              >
                <input
                  type="checkbox"
                  :id="index"
                  :value="item.ROLE_ID"
                  v-model="userRoleSelection"
                />
                <label for="item">{{ item.ROLE_NAME }}</label>
              </span>
            </div>
          </el-form-item>

          <el-form-item label="权限绑定">
            <div style="text-align: left">
              <span
                class="checkbox_span"
                v-for="(item, index) in userOpgList"
                :key="index"
              >
                <input
                  type="checkbox"
                  :id="index"
                  :value="item.RES_ID"
                  v-model="userOpgSelection"
                />
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
        <div style="text-align: left">
          <span
            class="checkbox_span"
            v-for="(item, index) in userRoleList"
            :key="index"
          >
            <input
              type="checkbox"
              :id="index"
              :value="item.ROLE_ID"
              v-model="userRoleSelection"
            />
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
        <div style="text-align: left">
          <span
            class="checkbox_span"
            v-for="(item, index) in userOpgList"
            :key="index"
          >
            <input
              type="checkbox"
              :id="index"
              :value="item.RES_ID"
              v-model="userOpgSelection"
            />
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
          :data="jsonDataTree"
          :expand-on-click-node="false"
          show-checkbox
          ref="tree"
          node-key="ORG_ID"
          default-expand-all
          highlight-current
          @node-click="handleNodeClick"
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
import { v4 as uuidv4 } from 'uuid'
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
    return {
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
        ],
      },
      pageDataList: {},
      userOpgList: [], //权限绑定
      userRoleList: [], //角色绑定
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
      modifyTreeInput: false,
      org_id: '',
      tableDeleteChange: '', //勾选选中列表id
      userRoleSelection: [], //角色绑定表单选中id
      userOpgSelection: [], //权限绑定表单选中id
      queryParamsRole: {
        USER_IDS: '',
        roleIds: '',
      },
      queryParamsFeatures: {
        USER_IDS: '',
        operateIds: '',
      },
      queryParamsSaveUserOrg: {
        ids: '',
        OLDORG_ID: '',
        ORG_ID: '',
      },
      jsonDataTree: [],
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
        this.userOpgList = response.opgList
        this.userRoleList = response.roleList
      })
    },
    getFollowNodList() {
      getFollowNod(this.followNodData).then((response) => {
        this.followNodData = response
        this.jsonDataTree = this.transData(
          this.followNodData,
          'ORG_ID',
          'ORG_PID',
          'children'
        )
      })
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
    // tree节点单击事件
    handleNodeClick(data) {
      this.queryParams.ORG_ID = data.ORG_ID
      getUserData(this.queryParams).then((response) => {
        this.org_id = response.ORG_ID
      })
    },
    addFollowNode() {
      var timestamp = uuidv4()
      this.equeryAddfollowParams.ORG_CODE = timestamp
      this.equeryAddfollowParams.ORG_ID = timestamp
      this.equeryAddfollowParams.ORG_PID = 0
      this.equeryAddfollowParams.ORG_NAME = 'new node'
      addFollowNod(this.equeryAddfollowParams).then((response) => {
        this.getFollowNodList()
      })
    },
    append(data) {
      var timestamp = uuidv4()
      const newChild = {
        ORG_ID: timestamp,
        ORG_NAME: timestamp,
        ORG_PID: data.ORG_PID,
        children: [],
      }
      this.equeryAddfollowParams.ORG_CODE = timestamp
      this.equeryAddfollowParams.ORG_ID = timestamp
      this.equeryAddfollowParams.ORG_PID = data.ORG_ID
      this.equeryAddfollowParams.ORG_NAME = 'new node'
      addFollowNod(this.equeryAddfollowParams).then((response) => {
        this.getFollowNodList()
      })
      if (!data.children) {
        this.$set(data, 'children', [])
      }
      data.children.push(newChild)
    },
    modify(data) {
      this.modifyTreeInput = data.ORG_ID
    },
    treeInputInp(value, data) {
      data.ORG_NAME = value
    },
    sureChange(data) {
      this.equeryUpdatefollowParams = data
      updateFollowNod(this.equeryUpdatefollowParams).then((response) => {
        if (response.statusCode == 200) {
          this.$notify.success({ title: '提示', message: '修改成功' })
          this.modifyTreeInput = ''
          this.getFollowNodList()
        }
      })
    },
    // 取消修改按钮
    chancelChange() {
      this.modifyTreeInput = false
    },
    remove(node, data) {
      this.$confirm(
        '确认删除部门 "' +
          data.ORG_NAME +
          '" 吗（该组织机构下的用户也会被删除）?',
        '警告',
        {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
        }
      )
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
      const that = this
      that.tableDeleteChange = ''
      that.queryParamsSaveUserOrg.ids = ''
      that.multipleSelection = val
      that.multipleSelection.forEach(function (e) {
        that.tableDeleteChange += e.USER_ID + ','
        that.queryParamsSaveUserOrg.ids += e.USER_ID + ','
      })
    },
    submitForm: function () {
      const that = this
      that.editForm.roleIds = ''
      that.editForm.operateIds = ''
      that.userRoleSelection.forEach(function (e) {
        that.editForm.roleIds += e + ','
      })
      that.userOpgSelection.forEach(function (e) {
        that.editForm.operateIds += e + ','
      })
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
      if (index == 0) {
        this.resetForm('editForm')
        this.editTableDialog = false
      } else if (index == 1) {
        this.queryParamsRole.roleIds = ''
        this.userRoleSelection = ''
        this.bindRoleDialog = false
      } else if (index == 2) {
        this.queryParamsRole.operateIds = ''
        this.userOpgSelection = ''
        this.bindFeaturesDialog = false
      } else if (index == 3) {
        this.bindMechanismDialog = false
      }
    },
    editTable(from) {
      this.dialogType = 'edit'
      this.editTableDialog = true
      this.editForm = from.row
    },

    addNameList() {
      if (this.org_id === '') {
        this.$message({
          message: '请先选择组织机构',
          type: 'warning',
          center: true,
        })
      } else {
        this.dialogType = 'new'
        // this.userRoleSelection = ''
        // this.userOpgSelection = ''
        this.editTableDialog = true
      }
    },
    bindRole() {
      if (this.org_id === '') {
        this.$message({
          message: '请先选择组织机构',
          type: 'warning',
          center: true,
        })
      } else {
        // this.userRoleSelection = ''
        this.bindRoleDialog = true
      }
    },
    bindFeatures() {
      if (this.org_id === '') {
        this.$message({
          message: '请先选择组织机构',
          type: 'warning',
          center: true,
        })
      } else {
        // this.userOpgSelection = ''
        this.bindFeaturesDialog = true
      }
    },
    bindMechanism() {
      if (this.org_id === '') {
        this.$message({
          message: '请先选择组织机构',
          type: 'warning',
          center: true,
        })
      } else {
        getFollowNod(this.followNodData).then((response) => {
          this.followNodData = response
        })
        this.bindMechanismDialog = true
      }
    },
    //删除勾选的列表用户
    deleteTable() {
      const that = this
      if (
        that.multipleSelection == undefined ||
        that.multipleSelection.length <= 0
      ) {
        that.$message({
          message: '请勾选择要删除的数据',
          type: 'warning',
          center: true,
        })
      } else {
        that
          .$confirm('此操作将永久删除该用户, 是否继续?', '信息', {
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
    disabledTable() {
      const that = this
      if (
        that.multipleSelection == undefined ||
        that.multipleSelection.length <= 0
      ) {
        that.$message({
          message: '请先勾选择要操作的数据',
          type: 'warning',
          center: true,
        })
      } else {
        that
          .$confirm('禁用该用户, 是否继续?', '信息', {
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
    enableTable() {
      const that = this
      if (
        that.multipleSelection == undefined ||
        that.multipleSelection.length <= 0
      ) {
        that.$message({
          message: '请先勾选择要操作的数据',
          type: 'warning',
          center: true,
        })
      } else {
        that
          .$confirm('启用该用户, 是否继续?', '信息', {
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
    rechargePasswordTable() {
      const that = this
      if (
        that.multipleSelection == undefined ||
        that.multipleSelection.length <= 0
      ) {
        that.$message({
          message: '请先勾选择要操作的数据',
          type: 'warning',
          center: true,
        })
      } else {
        that
          .$confirm('重置密码该用户, 是否继续?', '信息', {
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
              message:
                '密码重置成功！新密码为Qq123456用户首次登陆后需要修改密码!',
            })
          })
          .catch((err) => {
            console.error(err)
          })
      }
    },

    submitBindRole() {
      const that = this
      that.queryParamsRole.roleIds = ''
      that.userRoleSelection.forEach(function (e) {
        that.queryParamsRole.roleIds += e + ','
      })
      saveUserRoles(that.queryParamsRole).then((response) => {
        that.userRoleSelection = ''
        that.getList()
        that.bindRoleDialog = false
      })
    },
    submitBindFeatures() {
      const that = this
      that.queryParamsFeatures.operateIds = ''
      that.userOpgSelection.forEach(function (e) {
        that.queryParamsFeatures.operateIds += e + ','
      })
      saveUserOperate(this.queryParamsFeatures).then((response) => {
        that.userOpgSelection = ''
        that.getList()
        that.bindFeaturesDialog = false
      })
    },
    submitBindMechanism() {
      saveUserOrg(this.queryParamsSaveUserOrg).then((response) => {
        that.getList()
        that.bindMechanismDialog = false
      })
    },
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
.checkbox_span {
  display: inline-block;
  height: 34px;
  margin: 0 16px 10px 0;
  padding: 0 10px 0 0;
}
.checkbox_span input {
  width: 14px;
  height: 14px;
}
.checkbox_span label {
  margin-left: 6px;
}
</style>