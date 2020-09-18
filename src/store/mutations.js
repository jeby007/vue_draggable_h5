export default {
  CHANGELOADING(state,Bool){
    state.globalLoading = Bool
  },
  GETVIEWDATA(state,payload){
    state.viewData = payload.data.view_list || []
    state.footerData = payload.data.footer_btn || []
    state.footer_nav = payload.data.footer_nav || []
    payload.data && payload.data.length === 0 ? state.isShowNoData = true : state.isShowNoData = false
  },
  GETOLCOURSES(state,payload){
    if (payload.concat){
      state.olCourseList.list = payload.page === 1 ? state.olCourseList.list : state.olCourseList.list.concat(payload.data)
      state.olCourseList.page = payload.page
    }else{
      state.olCourseList = payload.data
    }
  },
  GETCOURSELIST(state,payload){
    if (payload.concat){
      state.coursList.list = payload.page === 1 ? state.coursList.list : state.coursList.list.concat(payload.data)
      state.coursList.page = payload.page
    }else {
      state.coursList = payload.data
    }
  },
  GETTEACHERLIST(state,payload){
    if (payload.concat){
      state.teacherList.list = payload.page === 1 ? state.teacherList.list : state.teacherList.list.concat(payload.data)
      state.teacherList.page = payload.page
    }else {
      state.teacherList = payload.data
    }
  },
  GERORG(state,payload){
    state.org = payload.data
    state.orgId = payload.data['org_id']
  },
  CHANGESTOREMODELSTATUS(state,payload){
    state.isShowStoreModel = payload
  },
  //获取机构列表
  GETSTORES(state,payload){
    state.stores = payload
  },
  //获取orgId
  SETORGID(state,payload){
    state.orgId = payload
  },
  CHANGEFOOTERNAV(state){
    !Array.isArray(state.footer_nav) && state.footer_nav['data'].forEach(vo=>vo.id === 0 ? vo.checked = true : vo.checked = false)
  },
  //守卫钩子
  UNSELECTEDFOOTERNAV(state,to){
    if (!Array.isArray(state.footer_nav)){
      state.footer_nav['data'].forEach(vo=> {
        (to.path == '/web' && vo.title == '首页') || to.path == vo.jumpLink.split('?')[0] ? vo.checked = true : vo.checked = false
      })
    }
  }
}
