<template>
  <div class="home_container">
    <Header/>
    <template v-if="viewData && viewData.length > 0">
      <ul class="componetsWrap">
        <li v-for="item in viewData">
          <Env_imgs v-if="item.type == 'env'" :env="item"/>
          <Navbar v-if="item.type == 'nav'" :navs="item"/>
          <Course v-if="item.type == 'course'" :courses="item" />
          <Activity v-if="item.type == 'activity'" :activities="item" />
          <TeacherBrief v-if="item.type == 'teacher'" :teachers="item" />
          <Enrollment v-if="item.type == 'enrollment'" :enroll="item" />
          <Swp v-if="item.type == 'swp'" :swp="item" />
          <Online_course v-if="item.type == 'online_course'" :olCourse="item" />
          <Coupon v-if="item.type == 'coupon'" :coupon="item" />
          <Audition v-if="item.type == 'audition'" :audition="item" />
          <Contact_us v-if="item.type == 'contact'" :item="item" />
        </li>
      </ul>
      <Footer/>
    </template>
    <van-empty description="暂无数据" v-if="viewData && viewData.length === 0 && isShowNoData" class="noData"/>
  </div>
</template>

<script>
  import {mapState} from 'vuex'
  import {Empty} from 'vant'
  export default {
    name: "home",
    mounted() {
      window.addEventListener('pageshow',this.refrash)
    },
    methods:{
      refrash(){
        this.$router.replace({name:'home'})
        this.$store.commit('CHANGEFOOTERNAV')
      }
    },
    beforeDestroy() {
      window.removeEventListener('pageshow',this.refrash)
    },
    computed: {
      ...mapState({
        viewData: state => state.viewData,
        footerNav: state => state.footer_nav,
        isShowNoData:state => state.isShowNoData
      }),
    },
    components: {[Empty.name]:Empty}
  }
</script>

<style lang="stylus" scoped>
  .home_container
    width 375px
    height calc(100vh - 60px);
    overflow-y auto
    >.componetsWrap
      overflow-x hidden
      min-height: calc(100vh - 100px - 130px);
  .noData
    position fixed
    top 50%
    left 50%
    transform translate(-50%,-50%)
</style>
