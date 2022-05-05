<template>
  <div class="d-display">
    <div class="pb-main-left">
      <p class="public_card_header">权限组</p>
      <span class="" >添加权限组</span>

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
    <div class="pb-main-mid">
      <div style="background: #fff;padding-bottom: 30px;height: 100%;">
        <p class="public_card_header">功能点(点击菜单树节点切换选中菜单下的权限 ，右键菜单节点追加选中菜单下的权限)
          <span class="preservat_btn">保存</span>
        </p>
        <div class="authority_checkbox">
          <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>
          <div class="auth_ck_box">
              <el-checkbox-group v-model="checkedCities" @change="handleCheckedCitiesChange">
                <el-checkbox v-for="city in cities" :label="city" :key="city">{{city}}</el-checkbox>
              </el-checkbox-group>
          </div>
            <el-checkbox-group v-model="checkedCities2" @change="handleCheckedCitiesChange2">
              <el-checkbox v-for="city in cities2" :label="city" :key="city">{{city}}</el-checkbox>
            </el-checkbox-group>
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
const cityOptions = ['日志刪除', '日志修改', '日志管理'];
const cityOptions2 = ['菜单刪除', '菜单编辑', '菜单管理'];

let id = 1000
export default {
  data () {
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
      }
    ]
    return {
      data: JSON.parse(JSON.stringify(data)),
      data: JSON.parse(JSON.stringify(data)),
      checkAll: false,
      checkAll2: false,

      checkedCities: ['日志刪除', '日志管理'],
      cities: cityOptions,
      isIndeterminate: true,
      checkedCities2: [],
      cities2: cityOptions2,

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
            <i style="color: #333;margin-left: 6px;" class="el-icon-edit" on-click={() => this.modify(node, data)}></i>
            <i style="color: #333;margin-left: 6px;" class="el-icon-delete" on-click={() => this.remove(node, data)}></i>
          </span>
        </span>
      )
    },
    handleCheckAllChange(val) {
        this.checkedCities = val ? cityOptions : [];
        this.isIndeterminate = false;
      },
      handleCheckedCitiesChange(value) {
        let checkedCount = value.length;
        this.checkAll = checkedCount === this.cities.length;
        this.isIndeterminate = checkedCount > 0 && checkedCount < this.cities.length;
      },
      handleCheckedCitiesChange2(value) {
        let checkedCount = value.length;
        this.checkAll2 = checkedCount === this.cities2.length;
        this.isIndeterminate = checkedCount > 0 && checkedCount < this.cities2.length;
      }

  },
}
</script>

<style lang='less' scoped>
.authority_checkbox{
  padding: 30px;
  text-align: left;
}
.auth_ck_box{
  margin-top: 30px;
  margin-bottom: 15px;
}
</style>