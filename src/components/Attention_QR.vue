<template>
  <div class="mask" @click.self="close">
    <van-loading size="1rem" v-if="!qr_url"></van-loading>
    <template v-else>
      <img v-lazy="qr_url" alt="" />
      <p class="discernHint">长按识别二维码即可关注</p>
    </template>
  </div>
</template>

<script>
import {mapState} from 'vuex'
import {Loading} from 'vant'
export default {
  name: "Attention_QR",
  data(){
    return {
      qr_url:''
    }
  },
  created() {
    document.body.style.overflow = 'hidden'
    this.$ajax('/Home/TinyWebsite/follow',{org_id:this.orgId}).then(res=>{
      if (res.code === 200){
        this.qr_url = res.data.qrcode_url
      }
    })
  },
  methods:{
    close(){
      this.$parent.isShowQR = false
      document.body.style.overflow = 'auto'
    }
  },
  computed:{
    ...mapState(['orgId'])
  },
  components:{[Loading.name]:Loading}
}
</script>

<style lang="stylus" scoped>
.mask
  width 100%
  height 100%
  background rgba(0,0,0,.6)
  position fixed
  top: 0
  left: 0
  display flex
  flex-direction column
  align-items center
  justify-content center
  z-index 202
  img
    display block
    width 6rem
    height 6rem
    background #fff
  .discernHint
    color #fff
    font-size 12px
    margin-top 6px
</style>