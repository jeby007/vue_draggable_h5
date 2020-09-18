<template>
  <div class="envWrap">
    <ul class="images">
      <li class="ambientItem" v-for="(ev,i) in env.data.list" v-if="i < env.showNum" @click="preview(i)">
        <van-image :src="ev.envimg_path" alt="环境照片" fit="contain" lazy-load>
          <template v-slot:loading>
            <van-loading type="spinner" size="20" />
          </template>
        </van-image>
      </li>
    </ul>
    <div class="total">
      <i class="iconfont icon-fengcaizhanshi"></i>
      <span>{{env.data.total}}</span>
    </div>
    <!--<van-image-preview v-model="isShowPreview" :images="previewList" :startPosition="index"></van-image-preview>-->
  </div>
</template>

<script>
import {ImagePreview} from 'vant'

export default {
    name: "Env_imgs",
    props:['env'],
    data(){
      return {
        index:0,
        isShowPreview:false
      }
    },
    methods:{
      preview(index){
        //this.isShowPreview = true
        this.index = index
        window.location.href = this.env['env_link']
      }
    },
    computed:{
      previewList(){
        const list = this.env['data']['list']
        return list.reduce((pre, cur,i) => i <= this.env['showNum'] - 1 ? pre.concat(cur.envimg_path) : pre.concat([]),[])
      }
    },
    components:{[ImagePreview.Component.name]:ImagePreview.Component}
  }
</script>

<style lang="stylus" scoped>
  .envWrap
    position relative
    padding 0 10px
    .total
      width 50px
      height 20px
      position absolute
      right 30px
      bottom 16px
      background rgba(0, 0, 0, .5)
      color #fff
      border-radius 20px
      display flex
      align-items center
      justify-content center
      font-size 12px
      .iconfont
        margin-right 2px
        font-size 14px
        line-height 14px
  .images
    display -webkit-box
    align-items center
    justify-content center
    -webkit-box-align center;
    width 100%
    height 240px
    overflow-x auto
    position relative
    &.mid
      display flex
    li
      width 100%
      height 220px
      display flex
      align-items center
      justify-content center
      overflow hidden
      border-radius 14px
      margin-right 10px
      img
        width auto
        height 100%
      img[lazy='error'],img[lazy='loading']
        width 50px
        height 50px

</style>
