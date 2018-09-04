<template>
  <div>
    <div class="navbar-div">
      <van-nav-bar title="类别列表"></van-nav-bar>
    </div>
    <div>
      <van-row>
        <van-col span="6">
          <div id="leftNav">
            <ul>
              <li v-for="(item,index) in category" :key="index" @click="clickCategory(index, item.ID)" :class="{categoryActive:categoryIndex === index}">
                {{item.MALL_CATEGORY_NAME}}
              </li>
            </ul>
          </div>
        </van-col>
        <van-col span="18">
          <div class="tabCategorySub">
            <van-tabs v-model="active" @click="onClickCategorySub">
                <van-tab v-for="(item, index) in subCategory" :key="index" :title="item.MALL_SUB_NAME">
                </van-tab>
            </van-tabs>
          </div>
          <div id="list-div">
            <van-pull-refresh v-model="isRefresh" @refresh="onRefresh">
              <van-list
                v-model="loading"
                :finished="finished"
                @load="onLoad"
                >
                <div class="list-item" v-for="(item,index) in goodsList" :key="index" @click="goGoodsInfo(item.ID)">
                  <div class="list-item-img">
                    <img :src="item.IMAGE1" width="100%" :onerror="errorImg"/>
                  </div>
                  <div class="list-item-text">
                    <div>{{item.NAME}}</div>
                    <div>￥{{item.ORI_PRICE | moneyFilter}}</div>
                  </div>
                </div>
                <!-- <div class="list-item" v-for="item in list" :key="item">
                  {{item}}
                </div> -->
              </van-list>
            </van-pull-refresh>
          </div>
        </van-col>
      </van-row>
    </div>
  </div>
</template>

<script>
import axois from 'axios'
import url from '@/api/serviceAPI'
import { Toast } from 'vant'
import { toMoney } from '@/filter/moneyFilter.js'
export default {
  name: 'CategoryList',
  data () {
    return {
      errorImg: 'this.src="' + require('@/assets/imgs/errorimg.png') + '"',
      category: [],
      categoryIndex: 0,
      subCategory: [],
      active: 0,
      list: [],
      loading: false, // 上拉加载使用
      finished: false, // 下拉加载是否没有数据了
      isRefresh: false, // 下拉加载
      page: 1,
      categorySubId: '',
      goodsList: []
    }
  },
  filters: {
    moneyFilter (money) {
      return toMoney(money)
    }
  },
  created () {
    this.categoryList()
  },
  mounted () {
    let winHeight = document.documentElement.clientHeight
    document.getElementById('leftNav').style.height = winHeight - 46 - 50 + 'px'
    document.getElementById('list-div').style.height = winHeight - 90 - 50 + 'px'
  },
  methods: {
    onRefresh () {
      setTimeout(() => {
        this.isRefresh = false
        this.finished = false
        this.page = 1
        this.goodsList = []
        this.onLoad()
      }, 500)
    },
    onLoad () {
      setTimeout(() => {
        this.categorySubId = this.categorySubId ? this.categorySubId : this.subCategory[0].ID
        this.getGoodsList()
      }, 1000)
    },
    clickCategory (index, categoryId) {
      this.categoryIndex = index
      this.page = 1
      this.finished = false
      this.goodsList = []
      this.subCategoryListById(categoryId)
    },
    categoryList () {
      axois({
        url: url.getCategoryList,
        method: 'get'
      }).then(res => {
        if (res.data.code === 200 && res.data.message.length > 0) {
          this.category = res.data.message
          this.subCategoryListById(this.category[0].ID)
        } else {
          Toast('服务器错误，数据取得失败')
        }
      }).catch(err => {
        console.log(err)
      })
    },
    subCategoryListById (categoryId) {
      axois({
        url: url.getCategorySubList,
        method: 'post',
        data: {
          categoryId: categoryId
        }
      }).then(res => {
        if (res.data.code === 200 && res.data.message.length > 0) {
          this.subCategory = res.data.message
          this.active = 0
          this.categorySubId = this.subCategory[0].ID
          this.onLoad()
        } else {
          Toast('服务器错误，数据取得失败')
        }
      }).catch(err => {
        console.log(err)
      })
    },
    getGoodsList () {
      axois({
        url: url.getGoodsListByCategorySubID,
        method: 'post',
        data: {
          categorySubId: this.categorySubId,
          page: this.page
        }
      }).then(res => {
        if (res.data.code === 200 && res.data.message.length > 0) {
          this.goodsList = res.data.message
          this.page++
        } else {
          this.finished = true
        }
        this.loading = false
      }).catch(err => {
        console.log(err)
      })
    },
    onClickCategorySub (index, title) {
      this.categorySubId = this.subCategory[index].ID
      this.goodsList = []
      this.finished = false
      this.page = 1
      this.onLoad()
    },
    // 跳转到商品详细页
    goGoodsInfo (id) {
      this.$router.push({path: '/goods', query: {goodsId: id}})
    }
  }
}
</script>

<style lang="less" scoped>
  #leftNav{
    background-color: aliceblue;
  }
  #leftNav ul li {
    line-height: 2rem;
    border-bottom:1px solid #E4E7ED;
    padding:3px;
    font-size:0.8rem;
    text-align: center;
  }
  .categoryActive{
    background-color: #fff;
  }
  .list-item{
    display: flex;
    flex-direction: row;
    font-size:0.8rem;
    border-bottom: 1px solid #f0f0f0;
    background-color: #fff;
    padding:5px;
  }
  #list-div{
    overflow: scroll;
  }
  .list-item-img{
    flex:8;
  }
  .list-item-text{
    flex:16;
    margin-top:10px;
    margin-left:10px;
  }
</style>
