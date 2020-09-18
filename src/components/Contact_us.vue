<template>
  <div class="view_card">
    <p class="title" v-if="item.showTitle">联系我们</p>
    <div class="contact_item">
      <i class="iconfont icon-dizhi"></i>
      <a :href="`http://api.map.baidu.com/marker?location=${item.data['latitude']},${item.data['longitude']}&title=${item.data.address}&output=html`" style="color:#666">
        {{ item.data.address }}（距离<span class="dist">{{ item.data.distance }}</span>）
      </a>
      <!--<a :href="`https://uri.amap.com/marker?position=${item.data['longitude']},${item.data['latitude']}&name=${item.data.address}`">{{ item.data.address }}（距离<span class="dist">{{ item.data.distance }}</span>）</a>-->
    </div>
    <div class="contact_item">
      <i class="iconfont icon-phone"></i>
      <a :href="'tel:'+item.data.tel"  style="color:#666">{{ item.data.tel }}</a>
    </div>
  </div>
</template>

<script>
export default {
  name: "Contact_us",
  props:['item']
}
</script>

<style lang="stylus" scoped>
@import "../static/css/global.styl"
.view_card
  color #333 !important
  padding 20px 10px
  flex-direction column
  align-items flex-start !important

  .title
    margin-bottom 10px

  .contact_item
    margin-top 10px
    display flex
    align-items center
    > span
      line-height 20px
      font-size 14px

    .iconfont
      margin-top 3px
      color #999
      margin-right 10px

    .dist
      color $bgColor
</style>