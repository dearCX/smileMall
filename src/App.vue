<template>
  <div id="app">
    <!-- <img src="./assets/logo.png"> -->
    <router-view/>
  </div>
</template>

<script>
// 得到手机屏幕的宽度
let htmlWidth = document.documentElement.clientWidth || document.body.clientWidth
// 得到html的Dom元素
let htmlDom = document.getElementsByTagName('html')[0]
if (htmlWidth > 750) { htmlWidth = 750 }
// 设置根元素字体大小
htmlDom.style.fontSize = htmlWidth / 20 + 'px'
export default {
  name: 'App'
}
</script>
<style lang='less'>
// @import './assets/less/reset';
// @import './assets/less/global';
</style>
<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center; */
  background-color: #eee;
  color: #2c3e50;
}
</style>
