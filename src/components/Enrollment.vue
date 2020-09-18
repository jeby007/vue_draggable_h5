<template>
  <div class="enrollmentWrap">
    <div v-for="vo in enroll.data">
      <div class="topBanner">
        <van-image :src="vo.banner || ''" alt="" fit="contain" lazy-load>
          <template v-slot:loading>
            <van-loading type="spinner" size="20" />
          </template>
        </van-image>
      </div>
      <p>{{vo.name}}</p>
    </div>
    <div class="noData" v-if="enroll.data.length === 0">暂无数据(请先选择招生活动)</div>
  </div>
</template>

<script>
  export default {
    name: "Enrollment",
    props:['enroll'],
  }
</script>

<style lang="stylus" scoped>
  .enrollmentWrap
    position relative
    padding 10px
    .noData
      min-height 90px
    .topBanner
      width 100%
      height 190px
      overflow hidden
      display flex
      align-items center
      justify-content center
      img
        width auto
        height 100%
      img[lazy='error'],img[lazy='loading']
        width 60px
        height 60px
    p
      font-size 14px
      color #666
      font-weight 700
      margin 10px 0 10px 0
      line-height 18px
</style>