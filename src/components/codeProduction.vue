<template>
  <div >
    <el-table
        :data="tableData"
        style="width: 100%"
        max-height="250"
        @selection-change="handleSelectionChange"
      >
        <el-table-column fixed="left" type="selection" width="45" />
        <el-table-column label="#" type="index" width="45" />
        <el-table-column prop="database" label="数据库" />
        <el-table-column prop="tablename" label="表名" />
        <el-table-column prop="remark" label="备注" />

        <el-table-column fixed="right" label="操作" width="200">
          <template slot-scope="scope">
            <span class="public-table-btn table-btn-edit" @click="reviseTable"
              >字段信息</span
            >
            <span
              class="public-table-btn table-btn-generate"
              @click="handleDelete(scope.row)"
              >生成代码</span
            >
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
</template>

<script>
export default {
  data () {
    return {
      tableData: [
        {
          database: 'zdfsfs',
          tablename: 'T_SYS_DSRW',
          remark: '	子应用表',
        },
      ],
      currentPage: 4,
      multipleSelection: [],
      operatingStatus:'',

    };
  },

  created() {
    this.getList()
  },

  methods:  {
    getList() {},
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`)
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`)
    },
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    handleDelete(row) {
      const ids = row.id || this.ids
      this.$confirm('是否确认删除该用户?', '信息', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      })
        .then(function () {
          // return delCRestaurants(ids)
        })
        .then(() => {
          this.getList()
          this.msgSuccess('删除成功')
        })
        .catch(function () {})
    },
    reviseTable(){

    }

  },
}
</script>

<style lang='less' scoped>

</style>