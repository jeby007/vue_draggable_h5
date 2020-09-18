import Vue from 'vue'
const components = require.context('@/components',false,/\.vue$/)
components.keys().forEach(filename=>{
  let componentEntity = components(filename).default
  Vue.component(componentEntity.name,componentEntity)
})
