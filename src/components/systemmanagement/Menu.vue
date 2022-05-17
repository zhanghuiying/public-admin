<template>
  <div class="d-display menu_div">
    <div class="pb-main-menu-left">
      <div class="menu_column">
        菜单树
        <!-- <el-popover placement="bottom" width="100" trigger="click">
          <span slot="reference" class="menu_btn"
            >菜单操作<i class="el-icon-arrow-down"></i
          ></span>
          <div :key="index" v-for="(item, index) in menuOptions">
            <p class="hd-nav-btn">{{ item.label }}</p>
          </div>
        </el-popover> -->
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

      <div class="public-card-body">
        <el-tree
          :data="jsonDataTree"
          show-checkbox
          node-key="id"
          ref="tree"
          highlight-current
          :expand-on-click-node="false"
          :default-expand-all="expandAll"
          @check="handleNodeClick"
        >
          <span class="custom_tree_node" slot-scope="{ data }">
            <span class="custom_tree_id">{{ data.MENU_NAME }}</span>
          </span>
        </el-tree>
      </div>
    </div>
    <div class="pb-main-menu-right pb-main_pad-lf">
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
                <table-menut-tool />
              </div>
            </div>
            <el-table
              :data="menuDataList"
              style="width: 100%"
              @selection-change="handleSelectionChange"
            >
              <el-table-column fixed="left" type="selection" width="45" />
              <el-table-column label="#" type="index" width="45" />

              <el-table-column prop="MENU_NAME" label="菜单名称" />
              <el-table-column prop="MENU_REMARK" label="菜单地址" />
              <el-table-column prop="MENU_SORT" label="排序" />
              <el-table-column prop="MENU_ICON" label="图标" />

              <el-table-column label="状态">
                <template slot-scope="scope">
                  {{ stateText[scope.row.MENU_STATE] }}
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
      expandAll: false,
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
          this.resetForm('munuForm')
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
      this._IDS = data.MENU_ID
      console.log(this._IDS)
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
.el-form-item__content .el-input,
.el-select,
.el-form-item__content .el-checkbox-group {
  width: 100% !important;
}
.el-popover {
  padding: 10px 0 0 0 !important;
  margin-top: 0 !important;
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
</style>