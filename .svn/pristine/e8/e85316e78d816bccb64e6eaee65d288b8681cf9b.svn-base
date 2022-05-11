import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
// import { VueAxios } from './../utils/request'
import Pagination from './components/Pagination'
import 'element-ui/lib/theme-chalk/index.css'
import './views/style/global.less'
import { parseTime, resetForm, addDateRange, selectDictLabel, download, handleTree } from './../utils/ruoyi'


// 全局方法挂载
Vue.prototype.parseTime = parseTime
Vue.prototype.resetForm = resetForm
Vue.prototype.addDateRange = addDateRange
Vue.prototype.handleTree = handleTree
Vue.prototype.selectDictLabel = selectDictLabel

Vue.config.productionTip = false

Vue.use(ElementUI)
// Vue.use(VueAxios)
// 全局组件挂载
Vue.component('Pagination', Pagination)
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
