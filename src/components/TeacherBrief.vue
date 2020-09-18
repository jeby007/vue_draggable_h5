<template>
  <div class="view_card teacherWrap">
    <div class="teacherWrap_header" v-if="teachers.showTitle">
      <span>师资介绍</span>
      <div class="more" v-if="teachers.more" @click="$router.push({name:'teacherlist'})">更多<i class="iconfont icon-right"></i></div>
    </div>
    <div class="teacherList">
      <div class="teacherItem" v-for="(vo,i) in teachers.data" v-if="!teachers.autoUpdate" @click="$router.push({name:'teacherdetails',query:{id:vo.id}})">
        <van-image
          width="2.5rem"
          height="2.5rem"
          shape="square"
          :size="100"
          :src="vo.photo"
          v-show="vo.model"
          fit="cover"
          lazy-load
        >
          <template v-slot:loading>
            <van-loading type="spinner" size="20" />
          </template>
        </van-image>
        <p class="name">{{vo.full_name}}</p>
        <p v-show="vo.teach_age">{{vo.teach_age}}年教龄</p>
        <div class="hint" v-if="!vo.model">请选择老师</div>
      </div>
      <div class="teacherItem" v-for="(vo,i) in teachers.filterList" v-if="teachers.autoUpdate" @click="$router.push({name:'teacherdetails',query:{id:vo.id}})">
        <van-image
          width="2.5rem"
          height="2.5rem"
          shape="square"
          :size="100"
          :src="vo.photo"
          fit="cover"
          lazy-load
        >
          <template v-slot:loading>
            <van-loading type="spinner" size="20" />
          </template>
        </van-image>
        <p class="name">{{vo.full_name}}</p>
        <p>{{vo.teach_age}}年教龄</p>
      </div>
      <div class="noData" v-if="teachers.data.length === 0 && !teachers.autoUpdate">暂无数据</div>
    </div>
  </div>
</template>

<script>
  import {Image} from 'vant'
  export default {
    props:['teachers'],
    name: "TeacherBrief",
    components:{[Image.name]:Image}
  }
</script>

<style lang="stylus" scoped>
  .teacherWrap
    color #333
    padding 10px
    font-size 14px
    flex-direction column
    .teacherWrap_header
      width 100%
      display flex
      align-items center
      justify-content space-between
      margin 10px 0
      >span
        font-weight 700
        font-size 16px
      .more
        font-size 14px
        color #999
        display flex
        cursor: pointer;
        align-items center
        .iconfont
          line-height 14px
    .teacherList
      width 100%
      display -webkit-box
      overflow-x auto
      .noData
        min-height 30px
        width 100%
      .teacherItem
        padding-bottom 6px
        width 100px
        display flex
        margin-right 10px
        flex-direction column
        .name
          margin 6px 0
          font-size 14px
          color #666
          font-weight 700
        >p
          color #999
          font-size 14px

</style>