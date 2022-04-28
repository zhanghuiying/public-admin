import Vue from 'vue'
import Router from 'vue-router'

const Login = () => import(/* webpackChunkName: "login_home_welcome" */ '../views/Login.vue')
const Home = () => import('../views/Home.vue')
const mainModule = () => import('../views/mainModule.vue')

const userManagement = () => import( '../components/user/userManagement.vue')
const authorityManagement = () => import('../components/authority/authorityManagement.vue')

const roleManagement = () => import('../components/role/roleManagement.vue')



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
        { path: '/mainmodule', component: mainModule },
        { path: '/authoritymanagement', component: authorityManagement },
        { path: '/usermanagement', component: userManagement },
        { path: '/rolemanagement', component: roleManagement },

       
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
