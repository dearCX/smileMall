<template>
  <div>
    <swiper :options="swiperOption" class="swiper">
      <swiper-slide class="swiper-slide" v-for="(item, index) in slide" :key="index">
        Slide {{item}}
      </swiper-slide>
      <div class="swiper-pagination" slot="pagination"></div>
      <!-- <swiper-slide class="text">
        <div class="centent">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima quasi autem, magni ipsum ullam soluta consectetur nemo mollitia sequi sed cumque quis animi corrupti ab veritatis at, suscipit modi? Magni!
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Velit soluta, suscipit deserunt eveniet corporis, iusto quis, quaerat molestias fugit cupiditate sed numquam. Impedit earum voluptatem amet consectetur tempora minima quam.
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Doloremque similique dolore omnis placeat. Ad saepe neque minus voluptatibus numquam. Deleniti, sint nulla. Ex, reiciendis esse cum mollitia sequi libero eveniet?
        </div>
      </swiper-slide> -->
    </swiper>
  </div>
</template>
<script>
import 'swiper/dist/css/swiper.css'
import {swiper, swiperSlide} from 'vue-awesome-swiper'
export default {
  components: {swiper, swiperSlide},
  data () {
    return {
      slide: [1, 2, 3, 4, 5, 6],
      swiperOption: {
        loop: true,
        pagination: {
          direction: 'vertical',
          el: '.swiper-pagination',
          clickable: true
        }
      }
      // swiperOption: {
      //   pagination: {
      //     el:'.swiper-pagination',
      //     clickable:true
      //   },
      //   direction: 'vertical',
      //   slidesPerView: 'auto',
      //   freeMode: true,
      //   mousewheel: true
      // }
    }
  }
}
</script>
<style lang="less" scoped>
  .swiper-slide{
    height: 4rem;
    text-align: center;
    padding-top: 3rem;
    border-bottom: 1px solid #ccc;
  }
  .swiper{
    height: 7rem;
    border-top:1px solid #ccc;
    border-bottom:1px solid #ccc;
  }
  // .swiper{
  //   height: 300px;
  //   overflow: hidden;
  // }
  .text{
    font-size: 18px !important;
    text-align: left;
    padding:30px;
    height: auto;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
  }
</style>
