<template>
  <el-container class="home-container">
    <el-aside :width="isCollapse ? '64px' : '230px'">
      <div class="aside-logo" :width="isCollapse ? '64px' : '230px'">
        <img src="../assets/logo.png" class="logo" />
        <span class="title">盛鼎科技</span>
      </div>

      <el-menu
        :default-active="activePath"
        class="el-menu-vertical-demo"
        router
        unique-opened
        background-color="#28333E"
        text-color="#fff"
        active-text-color="#28333E"
        :collapse="isCollapse"
        :collapse-transition="false"
      >
        <el-submenu index="1">
          <template slot="title">
            <i class="el-icon-s-tools"></i>
            <span>系统管理</span>
          </template>

          <el-submenu index="1-1">
            <template slot="title">
              <i class="el-icon-setting"></i>
              <span>系统管理</span>
            </template>
            <el-menu-item :index="'/' + 'user'">
              <i class="el-icon-user-solid"></i>
              <span>用户管理</span>
            </el-menu-item>
            <el-menu-item :index="'/' + 'authority'">
              <i class="el-icon-s-platform"></i>
              <span>权限管理</span>
            </el-menu-item>
            <el-menu-item :index="'/' + 'role'">
              <i class="el-icon-s-custom"></i>
              <span>角色管理</span>
            </el-menu-item>
            <el-menu-item :index="'/' + 'log'">
              <i class="el-icon-s-order"></i>
              <span>日志管理</span>
            </el-menu-item>
            <el-menu-item :index="'/' + 'datadictionary'">
              <i class="el-icon-date"></i>
              <span>数据字典</span>
            </el-menu-item>
            <el-menu-item :index="'/' + 'menu'">
              <i class="el-icon-menu"></i>
              <span>菜单管理</span>
            </el-menu-item>
          </el-submenu>

          <el-menu-item :index="'/' + 'parametersettings'">
            <i class="el-icon-location"></i>
            <span>参数设置</span>
          </el-menu-item>
          <el-menu-item :index="'/' + 'attachmentmanagement'">
            <i class="el-icon-bank-card"></i>
            <span>附件管理</span>
          </el-menu-item>
          <el-menu-item :index="'/' + 'timedtask'">
            <i class="el-icon-timer"></i>
            <span>定时任务</span>
          </el-menu-item>
          <el-menu-item :index="'/' + 'applicationmanagement'">
            <i class="el-icon-warning"></i>
            <span>应用管理</span>
          </el-menu-item>
          <el-menu-item :index="'/' + 'codeproduction'">
            <i class="el-icon-eleme"></i>
            <span>代码生产</span>
          </el-menu-item>
        </el-submenu>
      </el-menu>

      <!-- <el-menu
        :collapse="isOpen"
        :router="true"
        :collapse-transition="false"
        unique-opened
        @open="handleOpen"
        @close="handleClose"
        background-color="#272c33"
        text-color="#fff"
        active-text-color="#ffd04b"
      >
        <Menu :menuData="menulist"></Menu>
      </el-menu> -->
    </el-aside>
    <el-main>
      <div class="content-width-Fluid">
        <div class="header-index-left">
          <span class="hd-nav-item">
            <i class="el-icon-s-fold" @click="toggleCollapse"></i>
            <span class="hd-nav-bar"></span>
          </span>
          <span class="hd-nav-item" @click="routerUrlClick('home', '')">
            <i class="el-icon-refresh"></i>
            <span class="hd-nav-bar"></span>
          </span>
        </div>
        <user-menu class="header-index-right" />
      </div>
      <router-view class="public_main_p"></router-view>
    </el-main>
  </el-container>
</template>

<script>
import Menu from '../components/Menu.vue'
import { getMenuList } from '../api/menu'

import UserMenu from '../views/tools/UserMenu'
export default {
  name: 'Home',
  components: {
    UserMenu,
    Menu,
  },
  data() {
    return {
      menulist: [],
      isCollapse: false,
      activePath: '',
    }
  },

  created() {
    this.getMenus()
  },

  methods: {
    routerUrlClick(url, params) {
      let path = params != '' ? { name: url, params: params } : { name: url }
      this.$router.push(path)
    },

    // 获取所有的菜单
    async getMenus() {
      let result = await getMenuList()
      this.menulist = result
      // console.log(this.menulist)
    },
    // 点击按钮，切换菜单的折叠与展开
    toggleCollapse() {
      this.isCollapse = !this.isCollapse
    },
    // 保存链接的激活状态
    // saveNavState(activePath) {
    //   window.sessionStorage.setItem('activePath', activePath)
    //   this.activePath = activePath
    // }
  },
}
</script>

<style>
.home-container {
  height: 100%;
}
.el-aside {
  background-color: #28333e;
}

.el-main {
  padding: 0;
  background: #f5f5f5;
}
.el-aside .aside-logo {
  height: 60px;
  line-height: 60px;
  background-color: #28333e;
  border-bottom: 1px solid rgba(0, 0, 0, 0.12);
  overflow: hidden;
}
.el-aside .aside-logo .logo {
  width: 34px;
  height: 34px;
  vertical-align: middle;
  margin: 0 0 6px 0;
}
.el-aside .aside-logo .title {
  color: #fff;
  font-weight: bold;
  font-size: 22px;
  margin-left: 16px;
}
/* 导航菜单 */
.el-menu-vertical-demo {
  background-color: #28333e !important;
  border: none;
}
.el-menu-vertical-demo .el-menu-item,
.el-menu-vertical-demo .el-menu-item .el-tooltip,
.el-menu-vertical-demo .el-submenu .el-submenu__title {
  padding-left: 15px !important;
}

.el-menu-vertical-demo .submenu-title-noDropdown,
.el-menu-vertical-demo .el-submenu__title:hover {
  background-color: #2d8cf0 !important;
}
.el-menu-vertical-demo .is-active > .el-submenu__title {
  color: #fff !important;
  font-weight: bold !important;
}
.el-menu-vertical-demo .el-submenu .el-submenu__title i,
.el-menu-vertical-demo .el-submenu .el-submenu__title .is-active i {
  color: #fff;
}

.el-menu-vertical-demo .el-submenu .el-submenu > .el-submenu__title,
.el-menu-vertical-demo .el-submenu .el-menu-item {
  /* min-width: 230px !important; */
}
.el-menu-vertical-demo .el-submenu .el-menu-item:hover,
.el-menu-vertical-demo .el-submenu .el-submenu__title:hover {
  background-color: #2d8cf0 !important;
}

.el-submenu .el-menu--inline .el-menu-item.is-active {
  color: #fff !important;
  background: #2d8cf0 !important;
}
</style>