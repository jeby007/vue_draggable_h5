<template>
  <div class="applyAudWrap">
    <div class="btn" :style="{background:audition.theme || '#03a9f4'}" @click="toAudition">{{audition.btnName || '申请试听'}}</div>
  </div>
</template>

<script>
  export default {
    name: "Audition",
    props:['audition'],
    methods:{
      toAudition(){
        window.location.href = this.audition.jumplink || this.audition.booking
      }
    }
  }
</script>

<style lang="stylus" scoped>
  .applyAudWrap
    position relative
    height 90px
    display flex
    align-items center
    justify-content center
    .btn
      display flex
      align-items center
      justify-content center
      color #fff
      width 100px
      height 35px
      font-size 14px
      border-radius 4px
      cursor: pointer;
</style>