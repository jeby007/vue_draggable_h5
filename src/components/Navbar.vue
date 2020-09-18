<template>
  <ul class="navbarWrap">
    <li class="bar" :style="{width:`${100 / navs.showNum}%`}" v-for="(nav,i) in navs.data" @click="linkTo(nav.jumpLink)">
      <img v-lazy="nav.image" alt="icon">
      <p>{{nav.title}}</p>
    </li>
  </ul>
</template>

<script>
  export default {
    name: "Navbar",
    props:['navs'],
    methods:{
      linkTo(url){
        window.location.href = url
      }
    }
  }
</script>

<style lang="stylus" scoped>
  .navbarWrap
    width 100%
    min-height 80px
    position relative
    display flex
    flex-wrap wrap
    justify-content flex-start !important
    padding 6px 0
    .bar
      height 100%
      display flex
      flex-direction column
      align-items center
      justify-content center
      margin 10px  0
      img
        width 40px
        height 40px
        margin-bottom 8px
      .iconfont
        color $bgColor
        font-size 28px
        margin-bottom 10px
        opacity .5
      p
        color #333
        font-size 12px
</style>