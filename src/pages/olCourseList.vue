<template>
  <div class="olCourseListWrap">
    <Header />
    <ul class="courseList">
      <li v-for="(vo,i) in olCourseList.list" @click="toOlCourseDetail(vo.jump_url)">
        <div class="imgWrap">
          <van-image fit="cover" :src="vo.img_url" lazy-load>
            <template v-slot:loading>
              <van-loading type="spinner" size="20" />
            </template>
          </van-image>
          <span class="typeName">{{vo.type_name}}</span>
        </div>
        <div class="courseList_info">
          <p class="courseList_info-title ellipsis">{{vo.name}}</p>
          <!--<p class="explain">{{vo.ctime}}</p>-->
          <p class="intro">{{vo.description}}</p>
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
  export default {
    name: "olCourseList",
    created() {
      this.$store.dispatch('getOlCourseList',{org_id:this.orgId})
    },
    methods:{
      pullUpLoad($state){
        const page = this.olCourseList.page + 1 || 1
        this.$ajax('/Home/JwWeike/index',{page,org_id:this.orgId}).then(res=>{
          if (res.code === 200){
            const totalSize = res.data.total
            const hasNext = this.olCourseList.list && this.olCourseList.list.length == totalSize ? false : true
            this.$store.commit('GETOLCOURSES',{data:res.data.list,concat:true,page})
            hasNext ? $state.loaded() : $state.complete()
          }
        })
      },
      toOlCourseDetail(url){
        window.location.href = url
      }
    },
    computed:{
      ...mapState({
        olCourseList:state=>state.olCourseList,
        orgId:state=>state.orgId
      })
    }
  }
</script>

<style lang="stylus" scoped>
  @import "../static/css/global.styl"
.olCourseListWrap
  height calc(100vh - 60px)
  overflow-y auto
  .courseList
    width 100%
    min-height calc(100vh - 60px - 40px - 130px)
    padding 10px
    li
      display flex
      justify-content space-between
      width 100%
      margin-bottom 14px
      &:last-child
        margin-bottom 0
      >div
        width 182px
        height 104px
      .imgWrap
        overflow hidden
        display flex
        align-items center
        justify-content center
        position relative
        .typeName
          position absolute
          bottom 10px
          right 10px
          color #fff
          font-size 12px
          padding 2px 4px
          border-radius 4px
          line-height 15px
          background rgba(0,0,0,.4)
        img
          width 100%
          height auto
        img[lazy='error'],img[lazy='loading']
          width 50px
          height 50px
      .courseList_info
        padding 10px 0 0 10px
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