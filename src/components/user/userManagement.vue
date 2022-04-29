<template>
  <div class="public_main_app d-display">
    <div class="pb_main_left">
      <p class="public_card_header">用户列表</p>

      <el-tree
        :data="data"
        show-checkbox
        node-key="id"
        default-expand-all
        :expand-on-click-node="false"
        :render-content="renderContent"
      >
      </el-tree>
    </div>
  

    <div class="pb_main_right">
      <div class="" style="background: #fff;padding-bottom: 30px;height: 100%;">
        <p class="public_card_header">用户列表</p>

        <div class="public_card_body">
          <div class="public_card_body_border">
            <div class="public_table_tool">
          <div class="public_table_tool_inline">
            <i class="el-icon-refresh"></i>
          </div>
          <div class="public_table_tool_inline">
            <i class="el-icon-circle-plus-outline"></i>
          </div>

          <div class="public_table_tool_inline">
            <i class="el-icon-delete"></i>
          </div>
          <div class="public_table_tool_inline">
            <i class="el-icon-close"></i>
          </div>
          <div class="public_table_tool_inline">
            <i class="el-icon-check"></i>
          </div>

          <div class="public_table_tool_inline">
            <i class="el-icon-unlock"></i>
          </div>
          <div class="public_table_tool_inline">
            <i class="el-icon-coordinate"></i>
          </div>
          <div class="public_table_tool_inline">
            <i class="el-icon-document"></i>
          </div>
          <div class="public_table_tool_inline">
            <i class="el-icon-s-check"></i>
          </div>

          <div class="pos_tool_tb">
            <div class="public_table_tool_inline">
              <i class="el-icon-s-check"></i>
            </div>
            <div class="public_table_tool_inline">
              <i class="el-icon-s-check"></i>
            </div>
            <div class="public_table_tool_inline">
              <i class="el-icon-s-check"></i>
            </div>
          </div>
        </div>
        <el-table :data="tableData" style="width: 100%" max-height="250"
          @selection-change="handleSelectionChange">
            <el-table-column fixed="left" type="selection" width="45"/>
            
            <el-table-column prop="account" label="登录账号" />
            <el-table-column prop="name" label="姓名" />

            <el-table-column prop="mechanism" label="机构" />

            <el-table-column prop="state" label="状态" />
            <el-table-column prop="role" label="拥有角色" width="90"/>
            <el-table-column prop="unctiongroup" label="拥有功能组" width="110"/>

            <el-table-column prop="failures" label="登录失败次数" width="120"/>
            <el-table-column prop="data" label="最后登录时间"  width="150" />
            
            <el-table-column fixed="right" label="操作" width="120">
              <template slot-scope="scope">
                <span class="table_user_btn table_user_add_edit">编辑</span>
                <span class="table_user_btn table_user_delete">删除</span>
              </template>
            </el-table-column>
          </el-table>

          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="currentPage"
            :page-sizes="[100, 200, 300, 400]"
            :page-size="100"
            class="el_pagination"
            layout="total, sizes, prev, pager, next, jumper"
            :total="400">
          </el-pagination>

          </div>
          

        </div>
        
      </div>

      
    </div>
  </div>
</template>

<script>
let id = 1000
export default {
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
      tableData: [
        {
          account: 'zhy',
          name: '王小虎',
          mechanism: '顶级机构',
          state: '0',
          role: '超级管理员',
          unctiongroup: '安全测试',
          failures: '1',
          data: '2021-05-28 22:01:59',
        },
      ],
      currentPage: 4,
      multipleSelection: []
    }
  },

  created: {},

  methods: {
    append(data) {
      const newChild = { id: id++, label: 'new node1', children: [] }
      if (!data.children) {
        this.$set(data, 'children', [])
      }
      data.children.push(newChild)
    },

    remove(node, data) {
      const parent = node.parent
      const children = parent.data.children || parent.data
      const index = children.findIndex((d) => d.id === data.id)
      children.splice(index, 1)
    },

    modify(node, data) {
      
    },

    renderContent(h, { node, data, store }) {
      return (
        <span class="custom_tree_node">
          <span>{node.label}</span>
          <span>
            <i style="color: #333;margin-left: 6px;" class="el-icon-folder-add" on-click={() => this.append(data)}></i>
            <i style="color: #333;margin-left: 6px;" class="el-icon-edit" on-click={() => this.modify(node, data)}></i>
            <i style="color: #333;margin-left: 6px;" class="el-icon-delete" on-click={() => this.remove(node, data)}></i>
          </span>
        </span>
      )
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    }
  },
}
</script>

<style >
  .el-table thead,
  .el-table .el-table__cell{
    font-weight: 500!important;
    color: #333!important;
}
</style>
<style lang='less' scoped>
.table_user_btn{
  display: inline-block;
  height: 22px;
  line-height: 22px;
  padding: 0 6px;
  font-size: 12px;
  background: blue;
  border-radius: 3px;
  color: #fff;
  margin-left: 10px;
  cursor: pointer;
}
.table_user_add_edit{
  background: #1E9FFF;
}
.table_user_delete{
  background: #FF5722;
}
.el_pagination{
  margin-top: 30px;
}
</style>