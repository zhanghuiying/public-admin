<template>
  <div class="d-display h100">
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

      <div class="public-card-body authority-tree-id">
        <el-tree
          :data="opgTreeDataList"
          node-key="RES_ID"
          ref="tree"
          default-expand-all
          highlight-current
          :expand-on-click-node="false"
          @node-click="permissionClick"
        >
          <span class="custom_tree_node" slot-scope="{ node, data }">
            <span v-if="data.RES_ID" :class="folder"></span>
            <template v-if="data.RES_ID != modifyTreeInput">
              <span class="custom_tree_id">{{ data.RES_NAME }}</span>
              <span>
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
                :value="data.RES_NAME"
                @blur="sureChange(data)"
                @input="(a) => treeInputInp(a, data)"
              >
              </el-input>
              <span
                style="margin-left: 20px"
                v-if="data.RES_ID != 100 ? true : false"
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
    <div class="pb-main-mid">
      <div class="h100 pb-bg">
        <p class="public_card_header">
          功能点(点击菜单树节点切换选中菜单下的权限
          ，右键菜单节点追加选中菜单下的权限)
          <span class="preservat_btn" @click="saveCheckboxPermission">保存</span>
        </p>
        <div class="authority_checkbox">
          <el-checkbox v-model="checkAll" @change="pushUserCheckAll">全选</el-checkbox>
            
          <div class="checkbox_group">
            <el-checkbox-group v-model="opgSelection" @change="handleCheckedCitiesChange">
              <el-checkbox v-for="(item, index) in opsDataList"
                :key="index" :label="item.OP_CODE">{{item.OP_NAME}}</el-checkbox>
            </el-checkbox-group>
          </div>
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
      <div class="authority-tree" style="margin: 0 16px;">
        <el-tree
        :data="jsonDataTree"
        node-key="id"
        default-expand-all
        highlight-current
        :expand-on-click-node="false"
        @node-click="handleNodeClick"
      >
        <span class="custom_tree_node" slot-scope="{ data }">
          <span class="custom_tree_id">{{ data.MENU_NAME }}</span>
        </span>
      </el-tree>
      </div>
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
import { v4 as uuidv4 } from 'uuid'
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
    return {
      folder:'iconFolder',
      opgTreeDataList: [],
      opsDataList: [],
      menuDataList: [],
      checkAll: false,
      opgSelection: [], //权限选中id
      opsChecked: [],
      RES_ID: '',
      queryParamsSave: {
        RES_ID: '',
        OP_CODE: '',
      },
      jsonDataTree: [],
      equeryAddfollowParams: {
        ORG_CODE: '',
        RES_ID: '',
        RES_PID: '',
        RES_NAME: '',
      },
      modifyTreeInput: false,
      equeryUpdatefollowParams: {
        RES_ID: '',
        RES_PID: '',
        RES_NAME: '',
      },
      findOperateData: [], //id查看选中接口
      checkedList: [], //选中
    }
  },

  created() {
    this.getList()
    this.getMenuList()
  },
  computed: {
  },

  methods: {
    getList(data) {
      getPageData(data).then((response) => {
        this.opgTreeDataList = response.opg
        this.opsDataList = response.ops
      })
    },
    //全选、反选
    pushUserCheckAll(checkAll) {
      if (checkAll) {
        this.opsDataList.forEach(value => {
          if (this.opgSelection.indexOf(value.OP_CODE) < 0) {
            this.opgSelection.push(value.OP_CODE);
          }
        })
      } else {
        this.opgSelection = [];
      }
    },
    handleCheckedCitiesChange(value) {
      const that = this
      that.queryParamsSave.OP_CODE = value
      this.queryParamsSave.OP_CODE.forEach(value => {
        if (this.opgSelection.indexOf(value.OP_CODE) < 0) {
          this.checkAll = false;
        }
        if (this.queryParamsSave.OP_CODE.length === this.opsDataList.length) {
          this.checkAll = true;
        }
      })
      that.checkedList = value
      // for (var arry in that.checkedList) {
      //   that.queryParamsSave.OP_CODE = that.checkedList[arry]
      // }
      // console.log(that.queryParamsSave.OP_CODE);

      that.queryParamsSave.OP_CODE = []
      that.checkedList.forEach(function (e) {
        that.queryParamsSave.OP_CODE += e + ','
      })
      this.queryParamsSave.OP_CODE = this.queryParamsSave.OP_CODE.substr(0, this.queryParamsSave.OP_CODE.length-1)
      
      // that.queryParamsSave.OP_CODE = []
      // that.checkedList.forEach(function (e) {
      //   that.queryParamsSave.OP_CODE.push(e);
      // })
    },
    permissionClick(data) {
      const that = this
      this.RES_ID = data.RES_ID
      this.queryParamsSave.RES_ID = data.RES_ID

      findOperate(this.RES_ID).then((response) => {
        this.findOperateData = response
        this.opgSelection = []
        this.findOperateData.forEach(function (e) {
          that.opgSelection.push(e.OP_CODE);
        })

        that.opgSelection.forEach(value => {
          if (this.opgSelection.indexOf(value.OP_CODE) < 0) {
            this.checkAll = false;
          }
          if (this.opgSelection.length === this.opsDataList.length) {
            this.checkAll = true;
          }
        })
      })
    }, 
    handleNodeClick(data) {
      // console.log(data)
    },
    
    getMenuList(data) {
      getSelectallMenu(data).then((response) => {
        this.menuDataList = response
        this.jsonDataTree = this.transData(
          this.menuDataList,
          'MENU_ID',
          'MENU_PID',
          'children'
        )
      })
    },

    saveCheckboxPermission() {
      const that = this
      if (this.RES_ID === '') {
        this.$message({
          message: '请在左边选择功能组！',
          type: 'warning',
          center: true,
        })
      } else {
        this.$confirm('确认保存相关权限吗？', '信息', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
        })
          .then(async () => {
            await saveOperations(this.queryParamsSave)
            this.opgSelection = []
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
    addPermission() {
      var timestamp = uuidv4()
      this.equeryAddfollowParams.ORG_CODE = timestamp
      this.equeryAddfollowParams.RES_ID = timestamp
      this.equeryAddfollowParams.RES_PID = 0
      this.equeryAddfollowParams.RES_NAME = '权限组'
      insertGroup(this.equeryAddfollowParams).then((response) => {
        this.getList()
      })
    },
    modify(data) {
      this.modifyTreeInput = data.RES_ID
    },
    treeInputInp(value, data) {
      data.RES_NAME = value
    },
    sureChange(data) {
      this.equeryUpdatefollowParams = data
      saveGroup(this.equeryUpdatefollowParams).then((response) => {
        if (response.length!==null) {
            this.$notify.success({ title: '提示', message: '修改成功' })
            this.modifyTreeInput = ''
            this.getList()
        }
      })
    },
    // 取消修改按钮
    chancelChange() {
      this.modifyTreeInput = false
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
  },
}
</script>
<style>
.custom_tree_node .el-input .el-input__inner{
  width: 90px; 
  height: 22px
}
.custom_tree_node{
  padding-right: 16px;
}
.authority-tree-id .iconFolder::before{              
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
.authority-tree-id .el-tree .is-expanded .el-tree-node__content .is-leaf{
  width: 24px!important;
  height: 15px!important;
  background-position: -106px -24px!important;
}
.authority-tree .el-tree--highlight-current .el-tree-node.is-current>.el-tree-node__content {
    background-color: #e5e5e5;
}
.authority-tree .is-expanded .el-tree-node__content .expanded{
  width: 24px!important;
  height: 15px!important;
  background-position: -106px -24px!important;
}
.authority-tree .el-tree-node__content .is-leaf{
  width: 21px!important;
  height: 46px!important;
  background-position: -84px -32px!important;
}
.authority-tree .el-tree-node__expand-icon.expanded {
    transform: rotate(0);
}
.authority-tree .el-tree-node__expand-icon.expanded:before {
    content: "";
}
.authority-tree .el-tree-node__content .el-tree-node__expand-icon{
  width: 24px;
  height: 15px;
  background-position: -127px -3px;
}
.authority-tree .el-tree-node__content .el-tree-node__expand-icon:before{
  content: "";
}
.authority-tree .el-tree-node__content .el-tree-node__expand-icon,
.authority-tree-id .el-tree-node__content .el-tree-node__expand-icon{
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
</style>
<style lang='less' scoped>
.authority_checkbox {
  padding: 10px 0 30px 30px;
  text-align: left;
}
.checkbox_group{
  padding: 20px 0;
}
.checkbox_group .el-checkbox{
  margin: 0 30px 0 0;
  display: inline-block;
  width: 190px;
  height: 34px;
  font-size: 16px!important;
  color: #666;
}
</style>