<template>
    <div>
        <div v-for="(item, index) in menuData" :key="index">
            <el-submenu  :index="item.id+''" v-if="item.children && item.children.length > 0" :key="item.id+''">
                <template slot="title">
                    <i :class="item.icon"></i>
                    <span slot="title">{{ item.title}}</span>
                </template>
                <Menu :menuData="item.children"></Menu>
            </el-submenu>
            <el-menu-item
                    v-else
                    :index="item.href+''"
                    :route="item.href"
                    :key="item.id+''">
                <i :class="item.icon"></i>
                <span>{{item.title}}</span>
            </el-menu-item>
        </div>
    </div>
</template>

<script>
    export default {
        //递归 这个名称要保持驼峰转短横线链接规则
        name: "Menu",
        props: {
            menuData: {
                type: Array,
                default: () => {
                    return [];
                }
            }
        },
        components: {},
        data() {
            return {};
        },
        created() {
        },
        mounted() {},
        methods: {}
    };
</script>
<style lang='less' scoped>
    .el-menu--collapse span,
    .el-menu--collapse i.el-submenu__icon-arrow {
        height: 0;
        width: 0;
        overflow: hidden;
        visibility: hidden;
        display: inline-block;
    }
</style>
<style>
/* 导航菜单 */
.el-menu-vertical-demo{
    background-color: #28333E !important;
    border: none;
}
.el-menu-vertical-demo .el-menu-item,
.el-menu-vertical-demo .el-menu-item .el-tooltip,
.el-menu-vertical-demo .el-submenu .el-submenu__title{
    padding-left: 15px !important;
}

.el-menu-vertical-demo .submenu-title-noDropdown,
.el-menu-vertical-demo .el-submenu__title:hover {
    background-color: #2d8cf0!important;
}
.el-menu-vertical-demo .is-active>.el-submenu__title {
    color: #fff !important;
    font-weight: bold!important;
}
.el-menu-vertical-demo .el-submenu .el-submenu__title i ,
.el-menu-vertical-demo .el-submenu .el-submenu__title .is-active i{
    color: #fff;
}

.el-menu-vertical-demo .el-submenu .el-submenu>.el-submenu__title,
.el-menu-vertical-demo .el-submenu .el-menu-item {
    /* min-width: 230px !important; */
}
.el-menu-vertical-demo .el-submenu .el-menu-item:hover,
.el-menu-vertical-demo .el-submenu .el-submenu__title:hover {
    background-color: #2d8cf0 !important;
}

.el-submenu .el-menu--inline .el-menu-item.is-active {
    color: #fff!important;
    background: #2d8cf0!important;
}

</style>

