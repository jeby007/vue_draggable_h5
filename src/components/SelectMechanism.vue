<template>
  <div class="mask" @click.self="changeModelStatus">
    <van-loading size="1rem" v-show="stores.length <= 1"></van-loading>
    <div class="container" v-show="stores.length > 1">
      <p>选择门店</p>
      <ul>
        <li v-for="store in stores" @click="getStore(store)">
          <span class="name">{{ store.org_name }}</span>
          <span class="location">{{ store.address }}<span>(距离{{store.distance}})</span></span>
        </li>
      </ul>
      <i class="iconfont icon-baseline-close-px" @click="changeModelStatus"></i>
    </div>
  </div>
</template>

<script>
import {Loading} from 'vant'
import {mapState} from 'vuex'
export default {
  name: "SelectMechanism",
  props:['stores'],
  mounted() {
    document.body.style.overflow = 'hidden'
  },
  methods:{
    getStore(store){
      this.$store.commit('GERORG',{data:store})
      localStorage.setItem(`new_${this.orgId}`,store.org_id)
      this.$store.commit('CHANGELOADING',true)
      const location = JSON.parse(localStorage.getItem('location'))
      this.$store.dispatch('getViewData', {org_id: store.org_id, longitude: location.lng, latitude: location.lat}).then(()=>{
        this.$store.commit('CHANGELOADING',false)
        this.$router.push({name: 'home'})
      })

      this.changeModelStatus()
    },
    changeModelStatus(){
      this.$store.commit('CHANGESTOREMODELSTATUS',false)
      document.body.style.overflow = 'auto'
    },
  },
  components:{[Loading.name]:Loading},
  computed:{
    ...mapState(['orgId'])
  }
}
</script>

<style lang="stylus" scoped>
@import "../static/css/global.styl"
.mask
  width 100%
  height 100%
  background rgba(0,0,0,.6)
  position fixed
  top: 0
  left 0
  z-index 200
  display flex
  align-items center
  justify-content center
  .container
    width 8rem
    min-height 50%
    background #fff
    border 1px solid #eee
    padding 10px
    border-radius 6px
    position relative
    p
      text-align center
      line-height 40px
      border-bottom 1px solid #eee
    ul
      max-height 60vh
      overflow-y auto
      li
        display flex
        flex-direction column
        justify-content center
        min-height 60px
        border-bottom 1px solid #eee
        padding 4px 0
        .location
          font-size 12px
          margin-top 4px
          >span
            color $bgColor
    .iconfont
      position absolute
      top 10px
      right 10px
      font-size 18px
</style>
