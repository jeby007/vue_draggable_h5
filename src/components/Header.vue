<template>
  <div class="headerWrap">
    <div class="left">
      <i class="iconfont icon-switch" @click="switchStore" v-if="!isShowHomeIcon"></i>
      <!--<i class="iconfont icon-home1" v-else @click="$router.push({name:'home'})"></i>-->
      <p class="orgName">{{ stores.length > 1 ? (org.org_name || '请选择机构') : (stores[0] && stores[0].org_name) }}</p>
    </div>
    <div class="rightBtn">
      <div @click="isShowQR = true">关注</div>|
      <div @click="toMine">我的</div>|
      <div @click="$router.push({name:'home'})">主页</div>
    </div>
    <SelectMechanism :stores="stores" v-if="isShowStoreModel"/>
    <Attention_QR v-if="isShowQR" />
  </div>
</template>

<script>
  import {mapState} from 'vuex'
  export default {
    name: "Header",
    data(){
      return {
        isShowModel:true,
        isShowQR:false,
        insName:'',
        isShowHomeIcon:false
      }
    },
    mounted() {
      this.$route.name == 'home' ? this.isShowHomeIcon = false : this.isShowHomeIcon = true
      //外链跳回后回显数据
      this.$nextTick(()=>{
        const insId = localStorage.getItem(`new_${this.orgId}`) || ""
        const loaction = JSON.parse(localStorage.getItem('location'))
        if (localStorage.getItem(`new_${this.orgId}`)){
          this.$ajax("/Home/TinyWebsite/org",{org_id:insId,longitude:loaction.lng,latitude:loaction.lat}).then(res=>{
            this.insName = res.data.org_name
            this.$store.commit('GERORG',res)
          })
        }
      })

    },
    methods:{
      toMine(){
        window.location.href = this.mineLink
      },
      switchStore(){
        this.$store.commit('CHANGESTOREMODELSTATUS',true)
      },
    },
    computed:{
      ...mapState({
        org:state=>state.org,
        orgId:state=>state.orgId,
        stores:state=>state.stores,
        isShowStoreModel:state=>state.isShowStoreModel,
        mineLink:state=>state.footer_nav.data.find(vo=>vo.type == 'mine').jumpLink
      })
    },
  }
</script>

<style lang="stylus" scoped>
@import "../static/css/global.styl"
.headerWrap
  width :100%;
  height: 40px;
  padding: 0 10px;
  display: flex;
  justify-content: space-between;
  align-items :center;
  .left
    display flex
    align-items center
    .iconfont
      color: $bgColor;
      font-size :20px;
      margin-right 8px
      padding-top 2px
    .orgName
      max-width: 200px;
      overflow: hidden;
      white-space: nowrap;
      text-overflow :ellipsis;
  .rightBtn
    display :flex;
    align-items: center;
    >div
      margin 0 5px;
    >div:last-child
      //margin-right: 0;
      margin-left: 5px;
</style>
