<template>
  <div>
    <div class="main-div">
      <router-view/>
    </div>
    <van-tabbar v-model="active" @change="changeTabbar(active)">
      <van-tabbar-item icon="shop">首页</van-tabbar-item>
      <van-tabbar-item icon="records">列表页</van-tabbar-item>
      <van-tabbar-item icon="cart">购物车页</van-tabbar-item>
      <van-tabbar-item icon="contact" info="20">会员中心</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  name: 'Main',
  data () {
    return {
      active: 0
    }
  },
  created () {
    this.changeTabbar()
  },
  methods: {
    changeTabbar (active) {
      this.nowPath = this.$route.path
      if (this.nowPath === '/cart') {
        this.active = 2
      }
      switch (active) {
        case 0:
          this.$router.push({name: 'ShoppingMall'})
          break
        case 1:
          this.$router.push({name: 'CategoryList'})
          break
        case 2:
          this.$router.push({name: 'Cart'})
          break
        case 3:
          break
      }
    }
  }
}
</script>

<style lang="less" scoped>

</style>
