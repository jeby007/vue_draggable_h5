<template>
  <div class="swpWrap">
    <van-swipe :autoplay="3000" ref="mySwiper">
      <van-swipe-item v-for="(vo, index) in swp.data" :key="index">
        <van-image :src="vo.image" @click.stop="jump(vo.jumpLink)" fit="cover" lazy-load>
          <template v-slot:loading>
            <van-loading type="spinner" size="20" />
          </template>
        </van-image>
      </van-swipe-item>
    </van-swipe>
    <!--<div class="view_card defalutSwp">
      <i class="iconfont icon-drxx70"></i>
      <p class="">轮播图<p/>
    </div>-->
  </div>
</template>

<script>
  import { Swipe, SwipeItem } from 'vant'
  export default {
    name: "Swp",
    props:['swp'],
    data(){
      return {
        //showSwp:false
      }
    },
    mounted() {
      //解决vant-swipe初始不显示的问题
      setTimeout(()=>{
        this.$refs.mySwiper.resize()
      },0)
    },
    methods:{
      jump(url){
        window.location.href = url
      },
    },
    components:{[Swipe.name]: Swipe, [SwipeItem.name]: SwipeItem,}
  }
</script>

<style lang="stylus" scoped>
  .swpWrap
    width 100%
    height 220px
    & >>> .van-swipe-item
      width 10rem
      height 220px
      overflow height
      display flex
      align-items center
      justify-content center
      & img
        width 100%
        height auto
      & img[lazy='error'],img[lazy='loading']
        width 50px
        height 50px
</style>