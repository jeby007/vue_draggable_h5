import ajax from "./ajax";
const BASE = '/Home'
export const getViewData = (data)=>ajax(`${BASE}/TinyWebsite/index`,{...data})  //获取数据
export const getOlCourseList = (data)=>ajax(`${BASE}/JwWeike/index`,{...data}) //获取线上课堂列表
export const getCourseList = (data)=>ajax(`${BASE}/CourseInpro/index`,{...data})  //获取课程列表
export const getTeacherList = (data)=>ajax(`${BASE}/TeachInpro/index`,{...data})  //获取师资列表