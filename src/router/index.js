import Vue from 'vue'
import VueRouter from 'vue-router'

// 首页内容直接加载，用户能频繁访问到
import Layout from '@/views/layout'
import Cart from '@/views/layout/cart.vue'
import Category from '@/views/layout/category.vue'
import User from '@/views/layout/user.vue'
import Home from '@/views/layout/home.vue'
// 如果目录下要访问 index.vue 文件，直接写到目录即可，会自动找index.vue

import store from '@/store'

// 非首页内容按需加载
const Login = () => import('@/views/login')
const Search = () => import('@/views/search')
const SearchList = () => import('@/views/search/list.vue')
const ProDetail = () => import('@/views/prodetail')
const Pay = () => import('@/views/pay')
const MyOrder = () => import('@/views/myorder')

Vue.use(VueRouter)

const router = new VueRouter({
  routes: [
    { path: '/login', component: Login },
    {
      path: '/',
      component: Layout,
      redirect: '/home',
      children: [
        { path: '/home', component: Home },
        { path: '/category', component: Category },
        { path: '/cart', component: Cart },
        { path: '/user', component: User }
      ]
    },
    { path: '/search', component: Search },
    { path: '/searchlist', component: SearchList },
    { path: '/prodetail/:id', component: ProDetail },
    { path: '/pay', component: Pay },
    { path: '/myorder', component: MyOrder }
  ]
})

// 全局前置导航守卫
// next() 是否放行
// next() 直接放行，放行到 to
// next(路径) 进行拦截，拦截到 next 里配置的路径
// 定义数组，存放所有需要权限访问的页面
const authUrls = ['/pay', '/myorder']

router.beforeEach((to, from, next) => {
  if (!authUrls.includes(to.path)) {
    // 非权限页面
    next()
    return
  }
  // 权限页面，需要判断 token
  const token = store.getters.token
  if (token) {
    next()
  } else {
    next('/login')
  }
})

export default router
