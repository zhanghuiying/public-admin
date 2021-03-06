import Vue from 'vue'
import Router from 'vue-router'

const Login = () => import(/* webpackChunkName: "login_home_welcome" */ '../views/Login.vue')
const Home = () => import('../views/Home.vue')
const mainModule = () => import('../views/mainModule.vue')

const User = () => import( '../components/systemmanagement/User.vue')
const Authority = () => import('../components/systemmanagement/Authority.vue')
const Role = () => import('../components/systemmanagement/Role.vue')
const Log = () => import('../components/systemmanagement/Log.vue')
const DataDictionary = () => import('../components/systemmanagement/DataDictionary.vue')
const Menu = () => import('../components/systemmanagement/Menu.vue')

const parameterSettings = () => import('../components/parameterSettings.vue')
const attachmentManagement = () => import('../components/attachmentManagement.vue')
const timedTask = () => import('../components/timedTask.vue')
const applicationManagement = () => import('../components/applicationManagement.vue')
const codeProduction = () => import('../components/codeProduction.vue')


Vue.use(Router)

const router = new Router({
  routes: [
    { path: '/', redirect: '/login' },
    { path: '/login', component: Login },
    {
      path: '/home',
      component: Home,
      redirect: '/mainmodule',
      children: [
        {
          path: '/refresh',
          component: () => import('../refresh')
        },
        { path: '/mainmodule', component: mainModule },
        { path: '/authority', component: Authority },
        { path: '/user', component: User },
        { path: '/role', component: Role },
        { path: '/log', component: Log },
        { path: '/datadictionary', component: DataDictionary },
        { path: '/menu', component: Menu },
        { path: '/parametersettings', component: parameterSettings },
        { path: '/attachmentmanagement', component: attachmentManagement },
        { path: '/timedtask', component: timedTask },
        { path: '/applicationmanagement', component: applicationManagement },
        { path: '/codeproduction', component: codeProduction },
       
      ]
    }
  ]
})

// router.beforeEach((to, from, next) => {
//   if (to.path === '/login') return next()
//   const tokenStr = window.sessionStorage.getItem('token')
//   if (!tokenStr) return next('/login')
//   next()
// })

export default router
