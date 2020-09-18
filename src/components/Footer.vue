<template>
  <ul class="footer">
    <li v-for="(val,key,i) in footers" @click="jump(val)">{{ key }}</li>
    <li v-if="copyright && copyright.copy == 1" @click="jump(copyright.outside)">{{ copyright.copyright }}</li>
  </ul>
</template>

<script>
import {mapState} from 'vuex'

export default {
  name: "Footer",
  data(){
    return {
      copyright:''
    }
  },
  mounted() {
    let params = new FormData()
    params.append('orgid',this.orgid)
    this.$ajax('/Home/FrontConfig/getCopyRight',params,'POST').then(res=>{
      if (res) this.copyright = res
    })
  },
  methods:{
    jump(url){
      url.indexOf('http') === -1 ? this.$router.push({path:url}) : window.location.href = url
    }
  },
  computed:{
    ...mapState({
      footers:state=>state.footerData,
      orgid:state=>state.orgId
    })
  }
}
</script>

<style lang="stylus" scoped>
.footer
  height 130px
  padding 50px 30px
  background #f9f9f9
  display flex
  align-items center
  justify-content center
  flex-wrap wrap
  color #adadad

  > li
    width 25%
    text-align center
    line-height 12px
    border-right 1px solid #adadad
    white-space nowrap
    font-size 12px
    &:nth-child(5)
      margin-top 20px
      width auto
      border-right none

    &:nth-child(4)
      border-right none

</style>
