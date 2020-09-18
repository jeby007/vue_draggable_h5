import Vue from 'vue'
import App from './App.vue'
Vue.config.productionTip = false

import router from './router'
router.beforeEach((to,from,next)=>{
  if (to.meta.title) document.title = to.meta.title
  store.commit('UNSELECTEDFOOTERNAV',to)
  next()
})

import 'amfe-flexible'
import '@/static/css/reset.css'
import store from "@/store";

import InfiniteLoading from 'vue-infinite-loading'
Vue.component('InfiniteLoading',InfiniteLoading)

import '@/utils/components'

import ajax from "./api/ajax";
Vue.prototype.$ajax = ajax

import {Image as VanImage,Lazyload,Loading } from 'vant'
Vue.use(VanImage)
Vue.use(Loading)
Vue.use(Lazyload,{loading:require('./static/images/Spinner.gif'),error:require('./static/images/broken_image.png'),lazyComponent: true})
new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
