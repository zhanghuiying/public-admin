<template>
  <div class="d-display">
    <div class="pb-main-right pb-main_pad-fr">
      <div class="pb-main-height">
        <div class="public-card-body">
          <div class="public-card-body-border">
            <div class="public_table_tool">
              <div class="public_table_tool_inline">
                <i class="el-icon-refresh"></i>
              </div>
              <div class="public_table_tool_inline" >
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

              <el-table-column prop="roleEdit" label="角色编辑" />
              <el-table-column prop="name" label="角色名称" />
              <el-table-column prop="roleTime" label="角色时间" />
              <el-table-column fixed="right" label="操作" width="300">
                <template slot-scope="scope">
                  <span class="public-table-btn table-btn-edit" @click="editTable">编辑</span>
                  <span class="public-table-btn table-btn-delete" @click="handleDelete(scope.row)">删除</span>
                  <span class="public-table-btn table-btn-check">查看菜单权限</span>
                  <span class="public-table-btn table-btn-delete">保持菜单权限</span>

                </template>
              </el-table-column>
            </el-table>

            <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="currentPage"
              :page-sizes="[100, 200, 300, 400]"
              :page-size="1"
              class="el_pagination"
              layout="total, sizes, prev, pager, next, jumper"
              :total="1"
            >
            </el-pagination>
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
        :props="defaultProps">
      </el-tree>
    </div>
  </div>
</template>

<script>
import tableMenutTool from '@/views/tools/tableMenutTool'

export default {
  name: 'roleManagement',
  components: {
    tableMenutTool,
  },
  data () {
    return {
      tableData: [
        {
          roleEdit: 'zhy',
          name: '	县级普通用户',
          roleTime: '2021-05-28 22:01:59',
        },
      ],
      currentPage: 4,
      multipleSelection: [],
      editTableDialog: false,
      menuTreeData: [{
          id: 1,
          label: '系统管理',
          children: [{
            id: 4,
            label: '系统管理',
            children: [{
              id: 9,
              label: '用户管理'
            }, {
              id: 10,
              label: '权限管理'
            }, {
              id: 11,
              label: '角色管理'
            }]
          }]
        }, {
          id: 2,
          label: '参数设置',
        }, {
          id: 3,
          label: '附件管理',
          
        }, {
          id: 4,
          label: '定时任务',
        }, {
          id: 5,
          label: '应用管理',
        }, {
          id: 6,
          label: '代码生成',
        }],
        defaultProps: {
          children: 'children',
          label: 'label'
        }

    };
  },

  created: {},

  methods:  {
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`)
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`)
    },
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    submitForm(){

    },
    handleDelete(row) {
        const ids = row.id || this.ids
        this.$confirm('是否确认删除该用户?', '信息', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(function() {
          // return delCRestaurants(ids)
        }).then(() => {
          this.getList()
          this.msgSuccess('删除成功')
        }).catch(function() {
        })
    },
    close() {
      this.editForm = []
      this.editTableDialog = false
    },
    resetForm() {
      this.$refs.editForm.resetFields()
      this.editTableDialog = false
    },
    editTable() {
      return this.editTableDialog = true
    },

  },
}
</script>

<style lang='less' scoped>

</style>