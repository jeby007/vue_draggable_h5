<template>
  <ul class="navList" v-if="footerNav">
    <li
        class="nav_item"
        @click.prevent="tabChange(vo)"
        v-for="(vo,i) in footerNav.data"
        :style="[{width: 100 / footerNav.data.length + '%'},{color:vo.checked ? footerNav.checkedColor : defaultColor}]"
    >
      <i class="iconfont" :class="vo.icon"></i>
      <span class="nav_name">{{ vo.title }}</span>
    </li>
  </ul>
</template>

<script>
import {mapState} from 'vuex'
import {Notify} from 'vant'

export default {
  name: "Footer_nav",
  data() {
    return {
      defaultColor: '#999',
      p_org: ''
    }
  },
  created() {
    const orgid = this.$route.query.orgid || 2188
    this.$store.commit('SETORGID', orgid)
    console.log('orgid:', orgid);
  },
  mounted() {
    this.getLocations().then(res => {
      const data = {type: 'all', oid: this.orgId, longitude: res.lng, latitude: res.lat}
      let formData = new FormData()
      Object.keys(data).forEach((key) => {
        formData.append(key, data[key])
      })
      this.$ajax('/Home/StoresList/getStores', formData, 'POST')
          .then(res => {
            if (res.status === 1) {
              this.p_org = res.p_org_id
              this.$store.commit('GETSTORES', res.orgs)
              // if (localStorage.getItem(`new_${res.p_org_id}`) != this.orgId){
              if (!localStorage.getItem(`new_${res.p_org_id}`)) {
                this.$store.commit('CHANGESTOREMODELSTATUS', true)
              } else {
                this.getHomeData()
              }
            }
          })
    })
  },
  methods: {
    tabChange(vo) {
      vo.jumpLink.indexOf('http') === 0 ? window.location.href = vo.jumpLink : this.$router.push({path:vo.jumpLink})
    },
    getLocations() {
      return new Promise((resolve, reject) => {
        const locationCity = new BMap.Geolocation();
        locationCity.getCurrentPosition(function (point) {
          resolve(point)
        })
      })
          .then(res => {
            localStorage.setItem('location', JSON.stringify({lng: res.longitude, lat: res.latitude}))
            return {lng: res.longitude, lat: res.latitude}
          })
    },
    //获取home数据
    getHomeData() {
      this.$store.commit('CHANGELOADING', true)
      const location = JSON.parse(localStorage.getItem('location'))
      const org_id = localStorage.getItem(`new_${this.orgId}`)
      this.$store.dispatch('getViewData', {org_id, longitude: location.lng, latitude: location.lat}).then(() => {
        this.$store.commit('CHANGELOADING', false)
        this.$router.push({name: 'home'})
      })
    }
  },
  computed: {
    ...mapState({
      org: state => state.org.org_id,
      footerNav: state => state.footer_nav,
      orgId: state => state.orgId,
    })
  },
  components: {[Notify.name]: Notify}
}
</script>

<style lang="stylus" scoped>
@import "../static/css/global.styl";
.navList {
  width: 100%;
  height: 60px;
  display: flex;
  box-shadow: $shadow;
  background: #fff;
  border-top: 1px solid rgba(0, 0, 0, .1);
  position: fixed;
  bottom: 0
  z-index 100
}

.nav_item {
  width: 20%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: #999
}

.iconfont {
  font-size: 22px;
  margin-bottom: 2px
}

&.active {
  color: $bgColor
}

.nav_name {
  font-size: 12px
}
</style>
