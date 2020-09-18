import Vue from 'vue'
import Router from 'vue-router'

const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}
const VueRouterReplace = Router.prototype.replace
Router.prototype.replace = function replace (to) {
  return VueRouterReplace.call(this, to).catch(err => err)
}
Vue.use(Router)
const routes = [
  {
    path:'*',
    redirect:{name:'home'}
  },
  {
    name:'home',
    path: '/web',
    component:()=>import("@/pages/home.vue"),
    meta:{
      title:'首页',
      keepAlive:true
    }
  },
  {
    name:'courselist',
    path: '/courselist',
    component:()=>import("@/pages/courseList.vue"),
    meta: {
      title: '课程介绍',
      keepAlive:false
    },
  },
  {
    name:'coursedetails',
    path: '/courselist/coursedetails',
    component:()=>import("@/pages/courseDetails.vue"),
    meta: {
      title: '课程详情',
      keepAlive:false
    }
  },
  {
    name:'teacherlist',
    path: '/teacherlist',
    component:()=>import("@/pages/teacherList.vue"),
    meta: {
      title: '师资列表',
      keepAlive:false
    },
  },
  {
    name:'teacherdetails',
    path: '/teacherlist/teacherdetails',
    component:()=>import("@/pages/teacherDetails.vue"),
    meta: {
      title: '师资介绍',
      keepAlive:false
    }
  },
  {
    name:'olcourselist',
    path: '/olcourselist',
    component:()=>import("@/pages/olCourseList.vue"),
    meta: {
      title: '线上课程列表',
      keepAlive:false
    }
  }
]
const router = new Router({
  mode:'history',
  routes
})
export default router
