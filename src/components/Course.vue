<template>
  <div class="view_card courseWrap">
    <div class="courseWrap_header" v-if="courses.showTitle">
      <span>课程介绍</span>
      <div class="more" v-if="courses.more" @click="$router.push({name:'courselist'})">更多<i class="iconfont icon-right"></i></div>
    </div>
    <ul class="courseList" v-if="courses.showType === 0">
      <li class="left" v-for="(course,i) in courses.filterList" v-if="courses.autoUpdate && i < 6" @click="$router.push({name:'coursedetails',query:{id:course.id}})">
        <div class="imgWrap">
          <van-image fit="cover" :src="course.cover_img" alt="" lazy-load>
            <template v-slot:loading>
              <van-loading type="spinner" size="20" />
            </template>
          </van-image>
        </div>
        <div class="courseList_info">
          <p class="courseList_info-title ellipsis" :title="course.title">{{course.title}}</p>
          <p class="explain">适合月龄：{{course.minimum_month_age}}-{{course.maximum_month_age}}</p>
          <p class="intro" :title="course.brie">{{course.brief}}</p>
        </div>
      </li>
      <li class="left" v-for="(course,i) in courses.data" v-if="!courses.autoUpdate" @click="$router.push({name:'coursedetails',query:{id:course.id}})">
        <div class="imgWrap">
          <van-image :src="course.cover_img" alt="" v-show="course.cover_img" fit="cover" lazy-load>
            <template v-slot:loading>
              <van-loading type="spinner" size="20" />
            </template>
          </van-image>
        </div>
        <div class="courseList_info">
          <p class="courseList_info-title ellipsis">{{course.title}}</p>
          <p class="explain" v-show="course.maximum_month_age">适合月龄：{{course.minimum_month_age}}-{{course.maximum_month_age}}</p>
          <p class="intro">{{course.brief}}</p>
        </div>
        <p class="hint" v-if="!course.title">请选择课程</p>
      </li>
    </ul>
    <ul class="course_vtc" v-if="courses.showType === 1">
      <li v-for="(vo,i) in courses.filterList" v-if="courses.autoUpdate && i < 6" @click="$router.push({name:'coursedetails',query:{id:vo.id}})">
        <div class="topImg">
          <van-image fit="cover" :src="vo.cover_img" alt="" lazy-load>
            <template v-slot:loading>
              <van-loading type="spinner" size="20" />
            </template>
          </van-image>
        </div>
        <p class="name ellipsis" :title="vo.title">{{vo.title}}</p>
        <p class="age">适合月龄：{{vo.minimum_month_age}}-{{vo.maximum_month_age}}</p>
      </li>
      <li v-for="(vo,i) in courses.data" v-if="!courses.autoUpdate" @click="$router.push({name:'coursedetails',query:{id:vo.id}})">
        <div class="topImg">
          <van-image :src="vo.cover_img" alt="" v-show="vo.cover_img" fit="cover" lazy-load>
            <template v-slot:loading>
              <van-loading type="spinner" size="20" />
            </template>
          </van-image>
        </div>
        <p class="name ellipsis">{{vo.title}}</p>
        <p class="age" v-show="vo.maximum_month_age">适合月龄：{{vo.minimum_month_age}}-{{vo.maximum_month_age}}</p>
        <p class="hint" v-show="!vo.title">请选择课程</p>
      </li>
    </ul>
    <div class="noData" v-if="courses.data.length === 0 && !courses.autoUpdate">暂无数据</div>
  </div>
</template>

<script>
  export default {
    name: "Course",
    props:['courses']
  }
</script>

<style lang="stylus" scoped>
  @import "../static/css/global.styl"
  .courseWrap
    color #333
    padding 10px
    font-size 14px
    flex-direction column
    .noData
      height 40px
    .courseWrap_header
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
    .courseList
      margin-top 10px
      width 100%
      li
        display flex
        justify-content space-between
        width 100%
        height 120px
        margin-bottom 14px
        &:last-child
          margin-bottom 0
        >div
          width 182px
          height 104px
        .imgWrap
          overflow hidden
          display flex
          align-items center
          justify-content center
          img
            width auto
            height 100%
          img[lazy='error'],img[lazy='loading']
            width 50px
            height 50px
        .courseList_info
          padding 2px 0 0 10px
          .courseList_info-title
            font-size 15px
            color #666
            font-weight 700
          .explain
            line-height 22px
          .intro
            color #999
            font-size 12px
            line-height 17px
            margin-top 6px
            max-height 70px
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 4;
            -webkit-box-orient: vertical;
    .course_vtc
      display flex
      flex-wrap wrap
      width 100%
      justify-content space-between
      li
        width 175px
        margin-top 10px
        .topImg
          width 100%
          height 100px
          overflow hidden
          margin-bottom 4px
          display flex
          align-items center
          justify-content center
          img
            width auto
            height 100%
          img[lazy='error'],img[lazy='loading']
            width 50px
            height 50px
        .name,.age,.brief
          padding 0 6px
        .age
          color #999
          font-size 12px
          margin 8px 0
        .brief
          margin-bottom 10px
          color #999
          font-size 12px
          line-height 16px
        .ellipsis
          max-width 100%
          overflow hidden
          white-space nowrap
          text-overflow ellipsis

</style>