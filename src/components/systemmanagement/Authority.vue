<template>
  <div class="d-display">
    <div class="pb-main-left">
      <p class="public_card_header">
        权限组
        <span
          class="btn_expand-shrink"
          style="margin-left: 10px"
          @click="addPermission()"
          >添加权限组</span
        >
      </p>

      <div class="public-card-body">
        <el-tree
          :data="opgDataList"
          show-checkbox
          node-key="id"
          default-expand-all
          :expand-on-click-node="false"
          @node-click="treeClick"
        >
          <span class="custom_tree_node" slot-scope="{ node, data }">
            <span>{{ data.RES_NAME }}</span>
            <span>
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
    <div class="pb-main_pad-lf pb-main_pad-fr pb-main-mid">
      <div style="background: #fff; padding-bottom: 30px; height: 100%">
        <p class="public_card_header">
          功能点(点击菜单树节点切换选中菜单下的权限
          ，右键菜单节点追加选中菜单下的权限)
          <span class="preservat_btn" @click="saveCheckboxPermission"
            >保存</span
          >
        </p>
        <div class="authority_checkbox">
          <div style="margin: 0 0 30px 0">
            <el-checkbox
              :indeterminate="isIndeterminate"
              v-model="checkAll"
              @change="handleCheckAllChange"
              >全选</el-checkbox
            >
          </div>

          <span
            class="checkbox_span"
            v-for="(item, index) in opsDataList"
            :key="index"
          >
            <input
              type="checkbox"
              :id="index"
              :value="item.OP_CODE"
              v-model="opgSelection"
            />
            <label for="item.OP_CODE">{{ item.OP_NAME }}</label>
          </span>
        </div>
      </div>
    </div>
    <div class="pb-main-left">
      <p class="public_card_header" style="margin: 0 0 16px 0">
        菜单权限
        <span
          class="btn_expand-shrink"
          style="margin-left: 10px"
          @click="getMenuList()"
          >刷新</span
        >
      </p>

      <el-tree
        :data="menuDataList"
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
  </div>
</template>

<script>
import {
  getPageData,
  findOperate,
  saveOperations,
  insertGroup,
  saveGroup,
  deleteGroup,
  getSelectallMenu,
} from '../../api/authority/authority'

let id = 1000
export default {
  components: {
    getPageData,
    findOperate,
    saveOperations,
    insertGroup,
    saveGroup,
    deleteGroup,
    getSelectallMenu,
  },
  data() {
    const data = [
      {
        id: 1,
        label: '顶级机构',
      },
      {
        id: 2,
        label: '高级',
      },
      {
        id: 3,
        label: '安全测试',
      },
      {
        id: 4,
        label: '所有权限',
      },
    ]
    return {
      data: JSON.parse(JSON.stringify(data)),
      data: JSON.parse(JSON.stringify(data)),

      opgDataList: [],
      opsDataList: [],
      menuDataList: [],
      opgSelection: [], //权限选中id

      checkAll: false,
      opsChecked: [],
      isIndeterminate: true,
      defaultProps: {
        // children: 'children',
        MENU_NAME: 'MENU_NAME',
      },
      res_id: '',
      queryParamsSave: {
        RES_ID: '',
        OP_CODE: '',
      },
    }
  },

  created() {
    this.getList()
    this.getMenuList()
  },

  methods: {
    getList(data) {
      getPageData(data).then((response) => {
        this.opgDataList = response.opg
        this.opsDataList = response.ops
        // console.log(this.opgDataList)
        // console.log(this.opsDataList)
      })
    },
    getMenuList(data) {
      getSelectallMenu(data).then((response) => {
        this.menuDataList = response
        // console.log(this.menuDataList)
      })
    },
    addPermission() {
      // const newChild = { id: id++, label: 'new node' + `${id}`, children: [] }
      // if (!data.children) {
      //   this.$set(data, 'children', [])
      // }
      // data.children.push(newChild)
    },

    remove(node, data) {
      this.$confirm('确认删除权限 "' + data.RES_NAME + '" 吗', '警告', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      })
        .then(async () => {
          await deleteGroup(data.RES_ID)
          this.getList()
          this.$message({
            type: 'success',
            message: '删除成功!',
          })
        })
        .catch((err) => {
          console.error(err)
        })
    },

    modify(node, data) {},

    treeClick(data) {
      this.res_id = data.RES_ID
      this.queryParamsSave.RES_ID = data.RES_ID
      findOperate(this.res_id).then((response) => {})
    },
    handleNodeClick(data) {
      console.log(data)
    },
    saveCheckboxPermission() {
      const that = this

      if (this.res_id === '') {
        this.$message({
          message: '请在左边选择功能组！',
          type: 'warning',
          center: true,
        })
      } else {
        that.queryParamsSave.OP_CODE = ''
        this.opgSelection.forEach(function (e) {
          that.queryParamsSave.OP_CODE += e + ','
        })
        this.$confirm('确认保存相关权限吗？', '信息', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
        })
          .then(async () => {
            await saveOperations(this.queryParamsSave)
            this.opgSelection = ''
            this.getList()
            this.$message({
              type: 'success',
              message: '保存成功!',
            })
          })
          .catch((err) => {
            console.error(err)
          })
      }
    },
    handleCheckAllChange(val) {
      this.opsDataList = val ? this.opsDataList : []
      this.isIndeterminate = false
      this.getList()
    },
  },
}
</script>
<style>
.auth_ck_box .el-checkbox {
  margin: 0 50px 30px 0;
}
</style>
<style lang='less' scoped>
.authority_checkbox {
  padding: 30px;
  text-align: left;
}
.auth_ck_box {
  margin-top: 30px;
  margin-bottom: 15px;
}
.checkbox_span {
  display: inline-block;
  height: 34px;
  margin: 0 60px 10px 0;
  padding: 0 10px 0 0;
  font-size: 14px;
  color: #606266;
}
.checkbox_span input {
  width: 14px;
  height: 14px;
}
.checkbox_span label {
  margin-left: 6px;
}
</style>