<template>
  <div class="teacherListWrap">
    <Header />
    <ul class="listWrap">
      <li
          @click="$router.push({name:'teacherdetails',query:{id:vo.id}})"
          v-for="(vo,i) in teacherList.list"
      >
        <div class="topAvatar">
          <van-image :src="vo.photo" alt="" fit="cover" lazy-load>
            <template v-slot:loading>
              <van-loading type="spinner" size="20" />
            </template>
          </van-image>
        </div>
        <div class="teacherInfo">
          <p class="title">{{ vo.full_name }}</p>
          <p class="explain">{{ vo.teach_ag }}</p>
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
    name: "teacherList",
    created() {
      this.$store.dispatch('getTeacherList',{org_id:this.orgId})
    },
    methods:{
      pullUpLoad($state){
        const page = this.teacherList.page + 1 || 1
        this.$ajax('/Home/TeachInpro/index',{page,org_id:this.orgId}).then(res=>{
          if (res.code === 200){
            const totalSize = res.data.total
            const hasNext = this.teacherList.list && this.teacherList.list.length == totalSize ? false : true
            this.$store.commit('GETTEACHERLIST',{data:res.data.list,concat:true,page})
            hasNext ? $state.loaded() : $state.complete()
          }
        })
      },
    },
    computed:{
      ...mapState({
        teacherList:state=>state.teacherList,
        orgId:state=>state.orgId
      })
    }
  }
</script>

<style lang="stylus" scoped>
@import "../static/css/global.styl"
.teacherListWrap
  height calc(100vh - 60px)
  overflow-y auto
.listWrap
  padding 0 10px 10px
  display flex
  flex-wrap wrap
  min-height calc(100vh - 60px - 130px - 40px)
  li
    width 49%
    margin-top 10px
    &:nth-child(odd)
      margin-right 2%
    .topAvatar
      height calc((100vw - 20px) / 100 * 49)
      width 100%
      overflow hidden
      display flex
      align-items center
      justify-content center
      .van-image
        width auto
        height 100%
      img[lazy='error'],img[lazy='loading']
        width 50px
        height 50px
    .teacherInfo
      padding 10px
  .infinite-loading-container
    width 100%

</style>