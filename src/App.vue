<template>
  <div id="app">
    <div v-show="!globalLoading">
      <keep-alive>
        <router-view v-if="$route.meta.keepAlive" />
      </keep-alive>
      <Footer_nav/>
      <router-view v-if="!$route.meta.keepAlive" />
    </div>
    <div v-if="globalLoading" class="loading">
      <van-loading size="1rem"></van-loading>
    </div>
  </div>
</template>

<script>
  import Footer_nav from "./components/Footer_nav";
  import {mapState} from 'vuex'
  import {Loading} from 'vant'

  export default {
    name: 'App',
    components: {Footer_nav,[Loading.name]:Loading},
    computed:{
      ...mapState(['globalLoading'])
    }
  }
</script>

<style lang="stylus" scoped>
  .loading
    width: 10rem;
    height :100vh;
    display: flex;
    align-items: center;
    justify-content: center
</style>
