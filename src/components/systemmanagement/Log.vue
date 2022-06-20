<template>
<div>
  <div class="pb-bg">
    <div class="public_table_tool">
      <el-popover placement="top" title="刷新" trigger="hover" width="36">
        <div slot="reference" class="public_table_tool_inline" @click="getList()">
          <i :class="[isRefreshRouter? 'el-icon-refresh refresh-go' : 'el-icon-refresh']"></i>
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
      @selection-change="handleSelectionChange"
    >
      <el-table-column fixed="left" label="#" type="index" width="45" />
      <el-table-column prop="LOG_CONTENT" sortable label="登录账号" :render-header="(element,obj) => renderSpecNameHeader(element, obj, {componentType: 'input'})"/>
      <el-table-column prop="LOG_CONTENT" label="操作日志" width="700" :render-header="(element,obj) => renderSpecNameHeader(element, obj, {componentType: 'input'})"/>
      <el-table-column prop="LOG_OPERATE_TIME" label="操作时间" :render-header="(element,obj) => renderSpecNameHeader(element, obj, {componentType: 'date'})"/>

      <el-table-column fixed="right" label="备注" width="120">
        <template slot-scope="scope"> </template>
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
</template>

<script>
import tableMenutTool from '@/views/tools/tableMenutTool'
import { getLogsData } from '../../api/logs/logs'
import SelectHeader from '../../components/Pagination/SelectHeader'
export default {
  name: 'Log',
  components: {
    tableMenutTool,
    getLogsData,
    SelectHeader
  },
  data() {
    return {
      loading: false,
      isRefreshRouter: false,
      tableData: [],
      total: 0,
      queryParams: {
        page: 1,
        limit: 10,
        LOG_CONTENT: '',
        LOG_CONTENT:'',
        LOG_OPERATE_TIME:'',
      },
      multipleSelection: [],
    }
  },

  created() {
    this.getList()
  },

  methods: {
    getList() {
      this.isRefreshRouter = !this.isRefreshRouter;
      setTimeout(() => {
        this.isRefreshRouter = !this.isRefreshRouter;
      },1000)
      getLogsData(this.queryParams).then((response) => {
        this.tableData = response.data
        this.total = response.count
      })
    },
    exportData() {
      this.download('/lui_sys/pim/logs/listJson.do', { ...this.tableData }, `日志管理信息`)
      // this.download(this.tableData, `日志信息.xlsx`)
    },
    printJson() {
      this.$print(this.$refs.tableJson);
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
    renderSpecNameHeader (createElement, { column, $index }, mold) {
      const self = this
      return createElement(
        'div',{
          style: 'display:inline-flex;'
        },[
          createElement('div', {
            domProps: {
              innerHTML: column.label
            }
          }),
          createElement(SelectHeader, {
            style: 'cursor: pointer;position: absolute;right: 16px;top: 0;',
            props: {
              componentModule: mold.componentType,
              type: column.property,
              options: self.specIdOptions, // 下拉框选项
              defaultValue: self.examinerFieldChname, // 默认值
              defaultProps: {
                value: 'examinerFieldName',
                label: 'examinerFieldChname'
              }
            },
            on: {
              selectChange: self.selectChange,
              resetChange: self.resetChange
            },
            nativeOn: {
            }
          })
        ]
      )
    },
    selectChange (data) {
        const type = data['type']
        const value = data['value']
        this.queryParams[type] = value
        this.queryParams[data.type] = data.value;
        this.getList();
      },
    resetChange (data) {
      delete this.queryParams[data['type']]
      this.queryParams[data.type] = data.value;
      this.getList();
    },
  },
}
</script>

<style>
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