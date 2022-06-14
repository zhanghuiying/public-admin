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
          <span class="preservat_btn" @click="saveCheckboxPermission"
            >保存</span
          >
        </p>
        <div class="authority_checkbox">
          <div style="margin: 0 0 10px 0">
           <!-- <el-checkbox
              :indeterminate="isIndeterminate"
              v-model="checkAll"
              @change="handleCheckAllChange"
              >全选</el-checkbox
            > -->
            <span class="checkbox_span">
              <input type="checkbox" v-model="checkAll" @click="selectAll()"/>
              <label>全选</label>
            </span>
          </div>

           <span
            class="checkbox_span"
            v-for="(item, index) in opsDataList"
            :key="index"
          >
            <input
              :checked="opgSelection"
              type="checkbox"
              :id="index"
              :value="item.OP_CODE"
              v-model="opgSelection"
              @change="handleChange(item.OP_CODE)"
            />
            <label for="item.OP_CODE">{{ item.OP_NAME }}</label>
          </span>
          <!-- <el-checkbox-group v-model="opgSelection" @change="handleCheckedCitiesChange">
            <el-checkbox v-for="(item, index) in opsDataList" :key="index"
             :label="item.OP_CODE" >{{item.OP_NAME}}</el-checkbox>
          </el-checkbox-group> -->
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
      opgSelection: [], //权限选中id
      // checkAll: false,
      opsChecked: [],
      isIndeterminate: true,
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
    }
  },

  created() {
    this.getList()
    this.getMenuList()
  },
  computed: {
    checkAll: {
      //全选影响小选
      set(val) {
        //set(val) 设置全选的状态(true/ false)
        //我们手动设置了全选框的状态,就遍历数组里的每个对象的c属性, 也就是遍历看每个小选框的状态,让它的状态改为 val 全选框的状态
        this.opsDataList.forEach((OP_NAME) => (this.opgSelection = val));
      },
      //小选框影响全选框
      get() {
        //判断数组里的每一个对象的c属性 它是不是等于true, 就是判断每一个小选框的状态, 只要有一个小选框的状态不为true 就是没有被勾上, 那就返回false , 全选框的状态就是false
        // every口诀: 查找数组里"不符合"条件, 直接原地返回false
        return this.opsDataList.every((OP_NAME) => this.opgSelection === true);
      },
    },
  },

  methods: {
    selectAll() {
      //实现反选遍历数组里的每一项,  让数组里对象的属性取反再赋值回去
      this.opsDataList.forEach((OP_NAME) => (this.opgSelection = !this.opgSelection));
    },

    getList(data) {
      getPageData(data).then((response) => {
        this.opgTreeDataList = response.opg
        this.opsDataList = response.ops
        // console.log(this.opgTreeDataList)
        // console.log(this.opsDataList)
      })
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
        that.queryParamsSave.OP_CODE = ''
        this.opgSelection.forEach(function (e) {
          that.queryParamsSave.OP_CODE += e + ','
        })
        that.queryParamsSave.OP_CODE = that.queryParamsSave.OP_CODE.substr(0, that.queryParamsSave.OP_CODE.length-1)
      
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
      // handleCheckedCitiesChange(value) {
      //   let checkedCount = value.length;
      //   this.checkAll = checkedCount === this.opsDataList.length;
      //   this.isIndeterminate = checkedCount > 0 && checkedCount < this.opsDataList.length;
      // },

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
        this.modifyTreeInput = ''
        this.getList()
      })
    },
    // 取消修改按钮
    chancelChange() {
      this.modifyTreeInput = false
    },

    permissionClick(data) {
      const that = this
      this.RES_ID = data.RES_ID
      this.queryParamsSave.RES_ID = data.RES_ID
      

      findOperate(this.RES_ID).then((response) => {
        this.findOperateData = response
        console.log(this.findOperateData);
        // this.opgSelection = ''
        // that.findOperateData.forEach(function (e) {
        //   that.opgSelection += e.OP_CODE + ','
        // })
        // that.opgSelection = that.opgSelection.substr(0, that.opgSelection.length-1)
      })

    },
    handleChange(e){
      // console.log("___________"+e);
      // console.log(this.opgSelection);
    },
    handleNodeClick(data) {
      console.log(data)
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

.auth_ck_box .el-checkbox {
  margin: 0 50px 30px 0;
}
.authority_checkbox .el-checkbox .el-checkbox__label{
  font-size: 16px!important;
  color: #666;
}
/*.authority_checkbox .el-checkbox__inner{
  width: 16px!important;
  height: 16px!important;
} */
</style>
<style lang='less' scoped>
.authority_checkbox {
  padding: 10px 0 30px 30px;
  text-align: left;
}
.auth_ck_box {
  margin-top: 30px;
  margin-bottom: 15px;
}

.checkbox_span {
  position: relative;
  display: inline-block;
  width: 140px;
  height: 34px;
  line-height: 34px;
  margin: 0 60px 0 0;
  padding: 0 10px 0 28px;
}
.checkbox_span input {
  position: absolute;
  left: 0;
  top: 6px;
  width: 15px;
  height: 15px;
  background-color: #409EFF!important;
  border-color: #409EFF!important;
}
.checkbox_span input:hover {
  background-color: #409EFF!important;
  border-color: #409EFF!important;
}
.checkbox_span label {
  font-size: 14px;
  color: #666;
}
</style>