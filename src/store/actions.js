import Vue from 'vue'
import {Notify } from 'vant'
Vue.use(Notify)
import {getViewData,getOlCourseList,getCourseList,getTeacherList} from '@/api'
export default {
  async getViewData({commit},payload){
    const result = await getViewData(payload)
    if (result.code === 200 || result.code === 400){
      commit('GETVIEWDATA',{data:result.data})
      if (result.code === 400) Notify({type:"warning",message:`${result.message}`})
    }
  },
  async getOlCourseList({commit},payload){
    const result = await getOlCourseList(payload)
    if (result.code === 200){
      commit('GETOLCOURSES',{data:result.data})
    }
  },
  async getCourseList({commit},payload){
    const result = await getCourseList(payload)
    if (result.code === 200){
      commit('GETCOURSELIST', {data:result.data})
    }
  },
  async getTeacherList({commit},payload){
    const result = await getTeacherList(payload)
    if (result.code === 200){
      commit('GETTEACHERLIST',{data:result.data})
    }
  }
}