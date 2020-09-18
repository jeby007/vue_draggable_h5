<template>
  <div class="courseListWrap">
    <Header />
    <ul class="courseList">
      <li class="left"
          @click="$router.push({name:'coursedetails',query:{id:vo.id}})"
          v-for="(vo,i) in courseList.list"
      >
        <div class="imgWrap">
          <van-image fit="cover" :src="vo.cover_img" alt="" lazy-load>
            <template v-slot:loading>
              <van-loading type="spinner" size="20" />
            </template>
          </van-image>
        </div>
        <div class="courseList_info">
          <p class="courseList_info-title ellipsis">{{vo.title}}</p>
          <p class="explain">适合月龄：{{ vo.minimum_month_age }} - {{vo.maximum_month_age}}</p>
          <p class="intro">{{ vo.brief }}</p>
        </div>
      </li>
      <InfiniteLoading @infinite="pullUpLoad">
        <div slot="spinner" class="onInfiniteMsg">加载中...</div>
        <div slot="no-more" class="onInfiniteMsg">已加载全部数据</div>
        <div slot="no-results" class="onInfiniteMsg">暂无更多数据</div>
      </InfiniteLoading>
    </ul>
    <Footer />
  </div>
</template>

<script>
  import {mapState} from 'vuex'
  import state from "@/store/state";
  export default {
    name: "courseList",
    created() {
      this.$store.dispatch('getCourseList',{org_id:this.orgId})
    },
    methods:{
      pullUpLoad($state){
        const page = this.courseList.page + 1 || 1
        this.$ajax('/Home/CourseInpro/index',{page,org_id:this.orgId}).then(res=>{
          if (res.code === 200){
            const totalSize = res.data.total
            const hasNext = this.courseList.list && this.courseList.list.length == totalSize ? false : true
            this.$store.commit('GETCOURSELIST',{data:res.data.list,concat:true,page})
            hasNext ? $state.loaded() : $state.complete()
          }
        })
      },
    },
    computed:{
      ...mapState({
        courseList:state=>state.coursList,
        orgId:state=>state.orgId
      })
    }
  }
</script>

<style lang="stylus" scoped>
  @import "../static/css/global.styl"
.courseListWrap
  color #333
  font-size 14px
  height calc(100vh - 60px)
  overflow-y auto
  .courseList
    margin-top 10px
    width 100%
    min-height calc(100vh - 60px - 130px - 40px)
    li
      display flex
      background #fff
      padding 0 10px
      justify-content space-between
      width 100%
      margin-bottom 14px
      &:last-child
        margin-bottom 0
      >div
        width 49%
      .imgWrap
        width 168px
        height 96px
        overflow hidden
        display flex
        align-items center
        justify-content center
        border 1px solid #f9f9f9
        img
          width auto
          height 100%
        img[lazy='error'],img[lazy='loading']
          width 50px
          height 50px
      .courseList_info
        padding-top 2px
        .courseList_info-title
          font-size 15px
          color #666
          font-weight 700
        .explain
          line-height 22px
        .intro
          color #999
          font-size 12px
          line-height 17px
          margin-top 6px
          max-height 70px
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 4;
          -webkit-box-orient: vertical;

</style>