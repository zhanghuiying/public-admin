<template>
  <div class="d-display menu_div">
    <div class="pb-main-menu-left">
      <div class="menu_column">
        菜单树
        <el-popover placement="bottom" width="100" trigger="click">
          <span slot="reference" class="menu_btn"
            >菜单操作<i class="el-icon-arrow-down"></i
          ></span>
          <div :key="index" v-for="(item, index) in menuOptions">
            <p class="hd-nav-btn">{{ item.label }}</p>
          </div>
        </el-popover>
        <span class="btn_expand-shrink">展开/收缩</span>
      </div>

      <el-tree
        :data="menuTreeData"
        show-checkbox
        node-key="id"
        default-expand-all
        :expand-on-click-node="false"
        @node-click="handleNodeClick"
      >
        <span class="custom_tree_node" slot-scope="{ data }">
          <span>{{ data.MENU_NAME }}</span>
        </span>
      </el-tree>
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
              <el-form-item prop="name" label="分组代码">
                <el-input
                  v-model="munuForm.name"
                  prefix-icon="iconfont icon-user"
                ></el-input>
              </el-form-item>
            </div>
            <div class="w25">
              <el-form-item prop="address" label="访问地址">
                <el-popover placement="bottom" width="100" trigger="click">
                  <el-input
                    slot="reference"
                    v-model="addressText[munuForm.address]"
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
              <el-form-item prop="number" label="排序号">
                <el-input
                  v-model="munuForm.number"
                  prefix-icon="iconfont icon-user"
                ></el-input>
              </el-form-item>
            </div>
            <div class="w25">
              <el-form-item prop="code" label="菜单编码">
                <el-input
                  v-model="munuForm.code"
                  prefix-icon="iconfont icon-user"
                ></el-input>
              </el-form-item>
            </div>
          </div>
          <div class="d-display pb-main-padding-fr">
            <div class="w25">
              <el-form-item label="分组状态">
                <el-select v-model="munuForm.state" placeholder="菜单状态">
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
                    v-model="munuForm.icon"
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
            <div class="w50">
              <el-form-item prop="remark" label="备注">
                <el-input
                  v-model="munuForm.remark"
                  prefix-icon="iconfont icon-user"
                ></el-input>
              </el-form-item>
            </div>
          </div>
          <div>
            <el-button type="primary" @click="submitFor">保存</el-button>
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
              :data="tableData"
              style="width: 100%"
              @selection-change="handleSelectionChange"
            >
              <el-table-column fixed="left" type="selection" width="45" />
              <el-table-column label="#" type="index" width="45" />

              <el-table-column prop="name" label="菜单名称" />
              <el-table-column prop="address" label="菜单地址" />
              <el-table-column prop="sort" label="排序" />
              <el-table-column prop="icon" label="图标" />

              <el-table-column label="状态">
                <template slot-scope="scope">
                  {{ stateText[scope.row.state] }}
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
import { getMenuData, getMenu, addMenuSave } from '../../api/menu/menu'
export default {
  name: 'datadictionary',
  components: {
    getMenu,
    addMenuSave,
  },
  components: {
    tableMenutTool,
  },
  data() {
    return {
      menuOptions: [
        {
          label: '添加根菜单',
        },
        {
          label: '添加子菜单',
        },
        {
          label: '删除选中',
        },
        {
          label: '禁用选中',
        },
        {
          label: '启用选中',
        },
      ],
      menuValue: '',
      tableData: [
        {
          name: 'CBDKXXZT',
          address: '23',
          sort: '1',
          state: '1',
          icon: '',
        },
      ],
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
        name: '',
        address: '',
        number: '',
        code: '',
        state: '1',
        icon: '',
        remark: '',
      },
      munuRules: {
        code: [{ required: true, message: '请输入分组代码', trigger: 'blur' }],
        name: [
          { required: true, message: '请输入分组名称', trigger: 'blur' },
          {
            min: 3,
            max: 10,
            message: '长度在 3 到 10 个字符',
            trigger: 'blur',
          },
        ],
        remark: [{ required: true, message: '请输入备注', trigger: 'blur' }],
        state: [{ required: true, message: '请选择状态', trigger: 'change' }],
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
      menuTreeData: [],
    }
  },

  created() {
    this.getList()
    this.getMenuList('')
  },

  methods: {
    getList() {
      this.loading = true
      getMenuData(this.queryParams).then((response) => {
        this.tableData = response.data
        this.total = response.count
        this.loading = false
      })
    },
    getMenuList() {
      getMenu(this.queryParams).then((response) => {
        this.menuTreeData = response
        console.log(this.menuTreeData)
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
    close() {
      this.munuForm = []
    },
    resetQuery() {
      this.resetForm('munuForm')
    },
    addressOptionsClick(index) {
      this.munuForm.address = index
    },
    handleNodeClick(data) {
      console.log(data.MENU_ID)
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
  padding: 0 10px;
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