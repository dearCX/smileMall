<template>
  <div>
    <div class="search-bar">
      <van-row gutter="5">
          <van-col span="3"><img :src="locationIcon" width="50%" class="location-icon" /></van-col>
          <van-col span="16">
            <input type="text" class="search-input"/>
          </van-col>
          <van-col span="5"><van-button size="mini">查找</van-button></van-col>
      </van-row>
    </div>
    <div class="swiper-area">
      <van-swipe :autoplay="1000">
        <van-swipe-item v-for="(banner,index) in bannerPicArray" :key="index">
          <img width="100%" v-lazy="banner.image"/>
        </van-swipe-item>
      </van-swipe>
    </div>
    <div class="type-bar">
      <div  v-for="(cate,index) in category" :key="index" >
        <img v-lazy="cate.image" width="90%" />
        <span>{{cate.mallCategoryName}}</span>
      </div>
    </div>
    <div class="ad-banner">
      <img v-lazy="adBanner.PICTURE_ADDRESS" width="100%">
    </div>
    <div class="recommend-area">
      <div class="recommend-title">
          商品推荐
      </div>
      <div class="recommend-body">
        <swiperDefault></swiperDefault>
        <!-- <swiper :options="swiperOption">
          <swiper-slide v-for=" (item ,index) in recommendGoods" :key="index">
            <div class="recommend-item">
              <img :src="item.image" width="80%" />
              <div>{{item.goodsName}}</div>
              <div>￥{{item.price}} (￥{{item.mallPrice}})</div>
            </div>
          </swiper-slide>
        </swiper> -->
      </div>
    </div>
    <floor-component :floorData="floor1" :floorNum="1" :floorTitle="floorName.floor1"></floor-component>
    <floor-component :floorData="floor2" :floorNum="2" :floorTitle="floorName.floor2"></floor-component>
    <floor-component :floorData="floor3" :floorNum="3" :floorTitle="floorName.floor3"></floor-component>
    <div class="hot-area">
      <div class="hot-title">热卖商品</div>
      <div class="hot-goods">
        <!--这里需要一个list组件-->
        <van-list>
          <van-row gutter="20">
            <van-col span="12" v-for="( item, index) in hotGoods" :key="index">
              <goods-info :goodsImage="item.image" :goodsName="item.name" :goodsPrice="item.price" :goodsId="item.goodsId"></goods-info>
            </van-col>
          </van-row>
        </van-list>
      </div>
    </div>
  </div>
</template>
<script>
import { mapActions } from 'vuex'
import axios from 'axios'
import url from '@/api/serviceAPI'
import 'swiper/dist/css/swiper.css'
import { swiper, swiperSlide } from 'vue-awesome-swiper'
import swiperDefault from '@/components/Swiper'
import floorComponent from '@/components/floorComponent'
import goodsInfo from '@/components/goodsInfoComponent'
export default {
  name: 'ShoppingMall',
  components: {
    swiper,
    swiperSlide,
    swiperDefault,
    floorComponent,
    goodsInfo
  },
  data () {
    return {
      locationIcon: require('./../assets/imgs/location.png'),
      bannerPicArray: [
        {imageUrl: require('./../assets/imgs/simleVueDemoPic001.jpg')},
        {imageUrl: require('./../assets/imgs/simleVueDemoPic002.jpg')},
        {imageUrl: require('./../assets/imgs/simleVueDemoPic003.jpg')}
      ],
      category: [],
      adBanner: {},
      recommendGoods: [],
      floor1: [],
      floor2: [],
      floor3: [],
      floorName: '',
      hotGoods: []
    }
  },
  methods: {
    productList () {
      // https://www.easy-mock.com/mock/5b84cf91f7615d46c8184b1e/smailMall/productList
      this.getProductList().then(res => {
        console.log(res)
      })
    }
  },
  created () {
    axios({
      url: url.getShoppingMallInfo,
      method: 'get'
    }).then(res => {
      if (res.status === 200) {
        this.category = res.data.data.category
        this.adBanner = res.data.data.advertesPicture
        this.bannerPicArray = res.data.data.slides
        this.recommendGoods = res.data.data.recommend
        this.floor1 = res.data.data.floor1
        this.floor2 = res.data.data.floor2
        this.floor3 = res.data.data.floor3
        this.floorName = res.data.data.floorName
        this.hotGoods = res.data.data.hotGoods
      }
    }).catch(error => {
      console.log(error)
    })
  },
  ...mapActions([
    'getProductList'
  ])
}
</script>
<style lang="less" scoped>
  .search-bar{
    height: 2.2rem;
    line-height:2.2rem;
    background-color: #e5017d;
  }
  .search-input{
    width:100%;
    height: 1.3rem;
    border-top:0px;
    border-left:0px;
    border-right:0px;
    border-bottom: 1px solid #fff !important ;
    background-color: #e5017d;
    color:#fff;
  }
  .location-icon{
    padding-top: .2rem;
    padding-left: .6rem;
  }
  .swiper-area{
    overflow: hidden;
    width:20rem;
  }
  .type-bar{
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    margin:0 .3rem .3rem .3rem;
    border-radius: .3rem;
    background-color: #fff;
    font-size:14px;
  }
  .type-bar div{
    padding: .3rem;
    font-size: 12px;
    text-align: center;
  }
  .recommend-area{
    background-color: #fff;
    margin-top: .3rem;
  }
  .recommend-title{
    border-bottom:1px solid #eee;
    font-size:14px;
    padding:.2rem;
    color:#e5017d;
  }
  .recommend-body{
    border-bottom: 1px solid #eee;
  }
  .recommend-item{
    width:99%;
    border-right: 1px solid #eee;
    font-size: 12px;
    text-align: center;
  }
  .hot-area{
    text-align: center;
    font-size:14px;
    height: 1.8rem;
    line-height:1.9rem;
  }
  .hot-goods{
    height: 130rem;
    overflow: hidden;
    background-color: #fff;
  }
</style>
