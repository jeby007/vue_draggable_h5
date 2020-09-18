<template>
  <div class="courseDetailWrap">
    <Header />
    <div class="courseDetail">
      <div class="topImgWrap">
        <van-image fit="cover" :src="courseInfo.cover_img" alt="" lazy-load>
          <template v-slot:loading>
            <van-loading type="spinner" size="20" />
          </template>
        </van-image>
      </div>
      <div class="btmCourseInfo shadow">
        <div class="topTt">
          <p class="title">{{ courseInfo.title }}</p>
          <p class="explain">适合月龄：{{ courseInfo.minimum_month_age }} - {{courseInfo.maximum_month_age}}</p>
        </div>
        <div class="btmBrief brief" v-html="courseInfo.content">{{courseInfo.content}}</div>
      </div>
      <Audition :audition="audition || courseInfo"/>
    </div>
    <Footer />
  </div>
</template>

<script>
  import {mapState} from 'vuex'
  import Audition from "@/components/Audition";
  export default {
    name: "CourseDetail",
    components: {Audition},
    data(){
      return {
        courseInfo:{}
      }
    },
    mounted() {
      this.$ajax('/Home/CourseInpro/detail',{org_id:this.orgId,id:this.$route.query.id}).then(async res=>{
        if (res.code === 200){
          this.courseInfo = await res.data
          document.title = `${res.data['title']}课程介绍`
        }
      })
    },
    computed:{
      ...mapState({
        orgId:state=>state.orgId,
        audition:state=>state.viewData.find(vo=>vo.type == 'audition')
      })
    }
  }
</script>

<style lang="stylus" scoped>
  @import "../static/css/global.styl"
  .courseDetailWrap
    overflow-y auto
    height calc(100vh - 60px)
  .courseDetail
    display flex
    flex-direction column
    align-items center
    width 100%
    background #fff
    min-height calc(100vh - 60px - 150px)
    .topImgWrap
      width 100%
      height 214px
      overflow hidden
      display flex
      align-items center
      justify-content center
      img
        width 100%
        height auto
      img[lazy='error'],img[lazy='loading']
        width 50px
        height 50px
    .btmCourseInfo
      margin-top -38px
      width 350px
      border-radius 10px
      background #fff
      padding 10px
      z-index 1
      .topTt
        height 90px
        display flex
        align-items center
        justify-content center
        flex-direction column
        border-bottom 1px solid #e4e4e4
        .title
          margin-bottom 10px
      .btmBrief
        padding 10px 0
        line-height 20px

</style>