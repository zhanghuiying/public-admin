<template>
  <div class="pb-main-height">
    <div class="public_table_tool">
      <div class="public_table_tool_inline">
        <i class="el-icon-refresh"></i>
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
      <el-table-column fixed="left" label="#" type="index" width="45" />
      <el-table-column prop="account" label="登录账号" />
      <el-table-column prop="operationlog" label="操作日志" width="700" />
      <el-table-column prop="data" label="操作时间" />

      <el-table-column fixed="right" label="备注" width="120">
        <template slot-scope="scope"> </template>
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
</template>

<script>
import tableMenutTool from '@/views/tools/tableMenutTool'
export default {
  name: 'Log',
  components: {
    tableMenutTool,
  },
  data() {
    return {
      tableData: [
        {
          account: 'zhy',
          operationlog: '登录系统',
          data: '2021-05-28 22:01:59',
        },
      ],
      currentPage: 4,
      multipleSelection: [],
    }
  },

  created() {
  },

  methods: {
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`)
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`)
    },
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
  },
}
</script>

<style lang='less' scoped>
</style>