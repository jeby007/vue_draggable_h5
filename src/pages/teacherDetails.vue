<template>
  <div class="teacherDetailWrap">
    <Header />
    <div>
      <div class="topImgWrap">
        <van-image :src="teacherDetails.photo" alt="" fit="cover" lazy-load>
          <template v-slot:loading>
            <van-loading type="spinner" size="20" />
          </template>
        </van-image>
      </div>
      <div class="teacherName">
        <div class="avatar">
          <van-image :src="teacherDetails.photo" alt="" fit="cover" lazy-load radius="50%">
            <template v-slot:loading>
              <van-loading type="spinner" size="20" />
            </template>
          </van-image>
        </div>
        <div>
          <div class="name">{{ teacherDetails.full_name }}</div>
          <div class="teachAge">{{ teacherDetails.teach_age }}年教龄</div>
        </div>
      </div>
      <div class="brief" v-html="teacherDetails.content">{{ teacherDetails.content }}</div>
    </div>
    <Footer />
  </div>
</template>

<script>
  import {mapState} from 'vuex'
  export default {
    name: "teacherDetails",
    data(){
      return {
        teacherDetails:{}
      }
    },
    mounted() {
      this.$ajax('/Home/TeachInpro/detail',{org_id:this.orgId,id:this.$route.query.id}).then(async res=>{
        if (res.code === 200){
          this.teacherDetails = await res.data
          document.title = `${res.data['full_name']}师资介绍`
        }
      })
    },
    computed:{
      ...mapState(['orgId'])
    }
  }
</script>

<style lang="stylus" scoped>
.teacherDetailWrap
  height calc(100vh - 60px)
  overflow-y auto
  .brief
    padding 10px
  .topImgWrap
    width 100%
    height 350px
    overflow hidden
    display flex
    align-items center
    justify-content center
    .van-image
      width 100%
      height 100%
    img[lazy='error'],img[lazy='loading']
      width 50px
      height 50px
  .teacherName
    display flex
    align-items center
    padding 10px 14px
    .avatar
      width 80px
      height 80px
      overflow hidden
      display flex
      align-items center
      justify-content center
      margin -40px 10px 0 0
      .van-image
        border 2px solid #fff
        width 100%
        height 100%
    .name
      font-weight 700
      margin-bottom 6px
    .teachAge
      font-size 10px
      line-height 12px
      color #999
      padding 1px 4px
      border 1px solid #999
</style>