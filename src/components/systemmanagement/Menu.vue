<template>
  <div class="d-display menu_div">
    <div class="pb-main-menu-left">
      <div class="menu_column">
        菜单树
        <el-dropdown @command="handleCommand">
          <span class="menu_btn">
            菜单操作<i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="add">添加根菜单</el-dropdown-item>
            <el-dropdown-item command="addchildren"
              >添加子菜单</el-dropdown-item
            >
            <el-dropdown-item command="delete">删除选中</el-dropdown-item>
            <el-dropdown-item command="disabled">禁用选中</el-dropdown-item>
            <el-dropdown-item command="enable">启用选中</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>

        <span class="btn_expand-shrink" @click="expandHandle">展开/收缩</span>
      </div>

      <div class="public-card-body menu-tree" style="margin: 0 6px">
        <el-tree
          :data="jsonDataTree"
          show-checkbox
          node-key="id"
          ref="tree"
          highlight-current
          :expand-on-click-node="false"
          :default-expand-all="expandAll"
          @node-click="handleNodeClick"
          @check="handleNodeClick"
        >
          <span class="custom_tree_node" slot-scope="{ data }">
            <span class="custom_tree_id">{{ data.MENU_NAME }}</span>
          </span>
        </el-tree>
      </div>
    </div>
    <div class="pb-main-menu-right pb-main_pad-lf form_input">
      <div class="pb-bg pb-main-padding-bt pb-main-margin-b">
        <p class="public_card_header">菜单详情</p>
        <el-form
          :model="munuForm"
          ref="munuForm"
          :rules="munuRules"
          label-width="90px"
        >
          <div class="d-display pb-main-padding-t pb-main-padding-fr">
            <div class="w25">
              <el-form-item prop="MENU_NAME" label="菜单名称">
                <el-input
                  v-model="munuForm.MENU_NAME"
                  prefix-icon="iconfont icon-user"
                ></el-input>
              </el-form-item>
            </div>
            <div class="w25">
              <el-form-item prop="MENU_URL" label="访问地址">
                <template v-if="!addchildrenfl">
                  <el-input
                    v-model="munuForm.MENU_URL"
                    prefix-icon="iconfont icon-user"></el-input>
                </template>
                <template v-else>
                  <el-popover placement="bottom" width="100" trigger="click">
                    <el-input
                      slot="reference"
                      v-model="addressText[munuForm.MENU_URL]"
                      prefix-icon="iconfont icon-user"
                    ></el-input>
                    <div :key="index" v-for="(item, index) in addressOptions">
                      <p class="hd-nav-btn" @click="addressOptionsClick(index)">
                        {{ item.label }}
                      </p>
                    </div>
                  </el-popover>
                </template>
              </el-form-item>
            </div>
            <div class="w25">
              <el-form-item prop="MENU_SORT" label="排序号">
                <el-input
                  v-model="munuForm.MENU_SORT"
                  prefix-icon="iconfont icon-user"
                ></el-input>
              </el-form-item>
            </div>
            <div class="w25">
              <el-form-item prop="APP_CODE" label="菜单编码">
                <el-input
                  v-model="munuForm.APP_CODE"
                  prefix-icon="iconfont icon-user"
                ></el-input>
              </el-form-item>
            </div>
          </div>
          <div class="d-display pb-main-padding-fr">
            <div class="w25">
              <el-form-item label="菜单状态">
                <el-select v-model="munuForm.MENU_STATE" placeholder="菜单状态">
                  <el-option label="停用" value="0"></el-option>
                  <el-option label="启用" value="1"></el-option>
                  <el-option label="初始" value="2"></el-option>
                </el-select>
              </el-form-item>
            </div>
            <div class="w25">
              <el-form-item label="图标">
                <el-popover placement="bottom" width="100" trigger="click">
                  <el-input
                    slot="reference"
                    v-model="munuForm.MENU_ICON"
                    prefix-icon="iconfont icon-user"
                  ></el-input>
                  <!-- <div :key="index" v-for="(item, index) in addressOptions">
                    <p class="hd-nav-btn" @click="addressOptionsClick(index)">
                      {{ item.label }}
                    </p>
                  </div> -->
                </el-popover>
              </el-form-item>
            </div>
            <div class="w50">
              <el-form-item prop="MENU_REMARK" label="备注">
                <el-input
                  v-model="munuForm.MENU_REMARK"
                  prefix-icon="iconfont icon-user"
                ></el-input>
              </el-form-item>
            </div>
          </div>
          <div>
            <el-button type="primary" @click="submitForm">保存</el-button>
            <el-button @click="resetQuery">重置</el-button>
          </div>
        </el-form>
      </div>

      <div class="pb-bg pb-main-margin-b">
        <div class="public-card-body">
          <div class="public-card-body-border">
            <div class="public_table_tool">
              <div
                :class="
                  isShowCheckbox === true
                    ? 'public_editing_checkbox pb-checked-bg'
                    : 'public_editing_checkbox'
                "
                @click="editingCheckbox()"
              >
                开启编辑
                <i
                  :class="
                    isShowCheckbox === true
                      ? 'el-icon-check pb-checked-i'
                      : 'el-icon-check'
                  "
                ></i>
              </div>
              <div class="pos_tool_tb">
                <div class="pos_table_tool">
                  <el-tooltip class="item" effect="dark" content="筛选列" placement="top">
                    <div class="public_table_tool_inline">
                      <i class="el-icon-data-analysis"></i>
                    </div>
                  </el-tooltip>
                  <el-tooltip class="item" effect="dark" content="导出" placement="top">
                    <div class="public_table_tool_inline" @click="exportData">
                      <i class="el-icon-receiving"></i>
                    </div>
                  </el-tooltip>
                  <el-tooltip class="item" effect="dark" content="打印" placement="top">
                    <div class="public_table_tool_inline" @click="printJson">
                      <i class="el-icon-printer"></i>
                    </div>
                  </el-tooltip>
                </div>
              </div>
            </div>
            <el-table
              ref="tableJson"
              :data="menuDataList"
              style="width: 100%"
              @selection-change="handleSelectionChange"
            >
              <el-table-column fixed="left" type="selection" width="45" />
              <el-table-column label="#" type="index" width="45" />

              <el-table-column prop="MENU_NAME" label="菜单名称" />
              <el-table-column prop="MENU_REMARK" label="菜单地址" />
              <el-table-column prop="MENU_SORT" sortable label="排序" />
              <el-table-column prop="MENU_ICON" label="图标" />

              <el-table-column
                prop="MENU_STATE"
                label="状态"
                :filters="[{ text: '停用', value: '0' }, { text: '启用', value: '1' }]"
                :filter-method="filterTag"
                filter-placement="bottom-end">
                <template slot-scope="scope">
                  <span
                    :type="scope.row.MENU_STATE === '初始' ? 'primary' : 'success'"
                    disable-transitions>
                    <span style="color: #1e9fff" v-if="(scope.row.MENU_STATE == 1)">启用</span>
                    <span style="color: #ff5722" v-else>停用</span></span>
                </template>
              </el-table-column>
            </el-table>
          </div>

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
</template>

<script>
import tableMenutTool from '@/views/tools/tableMenutTool'
import {
  getMenu,
  addMenuSave,
  updateSta,
  deleteMenu,
} from '../../api/menu/menu'
export default {
  name: 'datadictionary',
  components: {
    getMenu,
    addMenuSave,
    updateSta,
    deleteMenu,
  },
  components: {
    tableMenutTool,
  },
  data() {
    return {
      total: 0,
      addchildrenfl:false,
      queryParams: {
        page: 1,
        limit: 10,
      },
      multipleSelection: [],
      stateText: { 0: '停用', 1: '启用', 2: '初始' },
      defaultProps: {
        children: 'children',
        label: 'label',
      },
      munuForm: {
        MENU_ID: '',
        MENU_PID: '',
        MENU_NAME: '',
        MENU_URL: '',
        MENU_SORT: '',
        APP_CODE: '',
        MENU_STATE: '1',
        MENU_ICON: '',
        MENU_REMARK: '',
      },
      munuRules: {
        MENU_NAME: [
          { required: true, message: '请输入菜单名称', trigger: 'blur' },
        ],
        MENU_REMARK: [
          { required: true, message: '请输入备注', trigger: 'blur' },
        ],
        MENU_STATE: [
          { required: true, message: '请选择状态', trigger: 'change' },
        ],
      },
      addressOptions: [
        {
          label: '参数设置',
        },
        {
          label: '定时任务',
        },
        {
          label: '附件管理',
        },
      ],
      addressText: {
        0: 'xtgl/info/listPage.do',
        1: 'xtgl/dsrw/listPage.do',
        2: 'xtgl/file/listPage.do',
      },
      isShowCheckbox: false,
      loading: false,
      expandAll: true,
      menuDataList: [],
      jsonDataTree: [],
      updateStaqueryParams: {
        ids: '',
        MENU_STATE: '',
      },
      _IDS: '',
    }
  },

  created() {
    this.getList()
  },

  methods: {
    getList() {
      getMenu(this.queryParams).then((response) => {
        this.menuDataList = response
        this.jsonDataTree = this.transData(
          this.menuDataList,
          'MENU_ID',
          'MENU_PID',
          'children'
        )
      })
    },
    filterTag(value, row) {
      return row.MENU_STATE === value
    },
    exportData() {
      this.download('/lui_sys/pim/menu/selectall.do', { ...this.menuDataList }, `菜单管理信息`)
      // this.download(this.tableData, `用户信息.xlsx`)
    },
    printJson() {
      this.$print(this.$refs.tableJson);
    },

    editingCheckbox() {
      this.isShowCheckbox = !this.isShowCheckbox
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
      if (this._IDS != '' || this._IDS != undefined) {
        this.munuForm.MENU_PID = this._IDS
      }

      this.$refs['munuForm'].validate((valid) => {
        if (valid) {
          addMenuSave(this.munuForm)
            .then((res) => {
              if (res.statusCode == 200) {
                this.$notify.success({ title: '提示', message: '保存成功' })
              } else {
                this.$notify.error({ title: '错误', message: res.message })
              }
              this.loading = false
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
    handleCommand(index) {
      let command = index

      if (command == 'add') {
        this.resetForm('munuForm')
      } else if (command == 'addchildren') {
        if (this._IDS == '' || this._IDS == undefined) {
          this.$message({
            message: '请勾选菜单节点',
            type: 'warning',
            center: true,
          })
        } else {
          this.addchildrenfl = true
          this.resetForm('munuForm')
          this.getList()
        }
      } else if (command == 'delete') {
        if (this._IDS == '' || this._IDS == undefined) {
          this.$message({
            message: '请勾选菜单节点',
            type: 'warning',
            center: true,
          })
        } else {
          deleteMenu(this._IDS).then((response) => {
            this.getList()
          })
        }
      } else if (command == 'disabled') {
        if (this._IDS == '' || this._IDS == undefined) {
          this.$message({
            message: '请勾选菜单节点',
            type: 'warning',
            center: true,
          })
        } else {
          this.updateStaqueryParams.ids = this._IDS
          this.updateStaqueryParams.MENU_STATE = '0'
          updateSta(this.updateStaqueryParams).then((response) => {
            this.getList()
          })
        }
      } else if (command == 'enable') {
        if (this._IDS == '' || this._IDS == undefined) {
          this.$message({
            message: '请勾选菜单节点',
            type: 'warning',
            center: true,
          })
        } else {
          this.updateStaqueryParams.ids = this._IDS
          this.updateStaqueryParams.MENU_STATE = '1'
          updateSta(this.updateStaqueryParams).then((response) => {
            this.getList()
          })
        }
      }
    },
    close() {
      this.munuForm = []
    },
    resetQuery() {
      this.resetForm('munuForm')
    },
    addressOptionsClick(index) {
      this.munuForm.MENU_URL = index
    },
    handleNodeClick(data) {
      this.munuForm = data
      console.log(this.munuForm);
      this._IDS = data.MENU_ID
      // console.log(this._IDS)
    },
    expandHandle() {
      // console.log(this.$refs.tree.store);
      this.expandAll = !this.expandAll;
      this.expandNodes(this.$refs.tree.store.root);
    },
    // 遍历树形数据，设置每一项的expanded属性，实现展开收起
    expandNodes(node) {
      node.expanded = this.expandAll;
      for (let i = 0; i < node.childNodes.length; i++) {
        node.childNodes[i].expanded = this.expandAll;
        if (node.childNodes[i].childNodes.length > 0) {
          this.expandNodes(node.childNodes[i]);
        }
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
.menu-tree .custom_tree_node .el-input .el-input__inner{
  width: 90px; 
  height: 22px
}
.menu-tree .custom_tree_node{
  padding-right: 16px;
}
.menu-tree .iconFolder::before{              
  content:'';
  display: inline-block;
  width: 15px;
  height: 15px;
  background-color: transparent;
  background-repeat: no-repeat;
  background-attachment: scroll;
  background-image: url(../../assets/images/sprite.png);
  background-position: -151px -46px;
}
.menu-tree .el-tree .is-expanded .el-tree-node__content .el-tree-node__children 
.is-expanded .el-tree-node__content .is-expanded .el-tree-node__children .el-tree-node__content .is-leaf{
  width: 24px!important;
  height: 15px!important;
  background-position: -106px -24px!important;
}
.menu-tree .el-tree--highlight-current .el-tree-node.is-current>.el-tree-node__content {
    background-color: #e5e5e5;
}
.menu-tree .is-expanded .el-tree-node__content .expanded{
  width: 24px!important;
  height: 15px!important;
  background-position: -106px -24px!important;
}
.menu-tree .el-tree-node__content .is-leaf{
  width: 21px!important;
  height: 46px!important;
  background-position: -84px -32px!important;
}
.menu-tree .el-tree-node__expand-icon.expanded {
    transform: rotate(0);
}
.menu-tree .el-tree-node__expand-icon.expanded:before {
    content: "";
}
.menu-tree .el-tree-node__content .el-tree-node__expand-icon{
  width: 24px;
  height: 15px;
  background-position: -127px -3px;
}
.menu-tree .el-tree-node__content .el-tree-node__expand-icon:before{
  content: "";
}
.menu-tree .el-tree-node__content .el-tree-node__expand-icon{
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

.el-form-item__content .el-input,
.el-select,
.el-form-item__content .el-checkbox-group {
  width: 100% !important;
}
</style>
<style lang='less' scoped>
.menu_column {
  height: 40px;
  line-height: 40px;
  padding: 0 15px;
  text-align: left;
}
.menu_column .menu_btn {
  display: inline-block;
  height: 40px;
  line-height: 40px;
  padding: 0 20px;
  color: #01aaed;
  cursor: pointer;
}
.menu_column .menu_btn .el-icon-arrow-down {
  margin-left: 6px;
}
.menu_column .menu_btn:hover {
  font-weight: bold;
}
.form_input .el-input--prefix .el-input__inner{
  padding-left: 15px;
}
</style>