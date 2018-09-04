// const Koa = require('koa')
// const app = new Koa()
const Router = require('koa-router')
const router = new Router()
const mongoose = require('mongoose')
const fs = require('fs')
// 将所有的商品插入数据库
router.get('/insertAllGoodsInfo', async(ctx) => {
  fs.readFile('./datajson/newGoods.json', 'utf8', (err, data) => {
    console.log(data)
    data = JSON.parse(data)
    let saveCount = 0
    const Goods = mongoose.model('Goods')
    data.map((value, index) => {
      // console.log(value)
      let newGoods = new Goods(value)
      newGoods.save().then(() => {
        saveCount++
        console.log('成功' + saveCount)
      }).catch(error=>{
        console.log('失败：' + error)
      })
    })
  })
  ctx.body = "开始导入数据"
})
// 将所有的商品分类插入数据库
router.get('/insertCategory', async(ctx) => {
  fs.readFile('./datajson/newCategory.json', 'utf8', (err, data) => {
    console.log(data)
    data = JSON.parse(data)
    let saveCount = 0
    const Category = mongoose.model('Category')
    data.map(value => {
      let newCategory = new Category(value)
      newCategory.save().then(() => {
        saveCount++
        console.log('成功' + saveCount)
      }).catch(error => {
        console.log('失败：' + error)
      })
    })
  })
  ctx.body = "开始导入数据"
})
// 将所有商品的子分类插入数据库
router.get('/insertCategorySub', async(ctx) => {
  fs.readFile('./datajson/newCategorySub.json', 'utf8', (err, data) => {
    console.log(data)
    data = JSON.parse(data)
    let saveCount = 0
    const CategorySub = mongoose.model('CategorySub')
    data.map(value => {
      let newCategorySub = new CategorySub(value)
      newCategorySub.save().then(() => {
        saveCount++
        console.log('成功' + saveCount)
      }).catch(error => {
        console.log('失败：' + error)
      })
    })
  })
  ctx.body = "开始导入数据"
})
// 获取商品详情API
router.post('/getDetailGoodsInfo', async(ctx) => {
  try{
    let goodsId = ctx.request.body.goodsId
    const Goods = mongoose.model('Goods')
    let result = await Goods.findOne({ID:goodsId}).exec()
    ctx.body = {code:200, message: result}
  }catch(err){
    ctx.body = {code:500, message: err}
  }
  // let goodsId = ctx.request.body.goodsId
  // const Goods = mongoose.model('Goods')
  // await Goods.findOne({ID: goodsId}).exec().then(async(res) => {
  //   ctx.body = {code: 200, message: res}
  // }).catch(error => {
  //   console.log(error)
  //   ctx.body = {code: 500, message: error}
  // })
})
// 获取商品类别API
router.get('/getCategoryList', async(ctx) => {
  try{
    const Category = mongoose.model('Category')
    let result = await Category.find().exec()
    ctx.body = {code:200, message: result}
  }catch(err){
    ctx.body = {code:500, message: err}
  }
})
// 获取商品子分类API
router.post('/getCategorySubList', async(ctx) => {
  try{
    let categoryId = ctx.request.body.categoryId
    const CategorySub = mongoose.model('CategorySub')
    let result = await CategorySub.find({MALL_CATEGORY_ID:categoryId}).exec()
    ctx.body = {code:200, message: result}
  }catch(err){
    ctx.body = {code:500, message: err}
  }
})
// 商品类别获取商品列表
router.post('/getGoodsListByCategorySubID',async(ctx)=>{
  try{
    let categorySubId = ctx.request.body.categorySubId
    let page = ctx.request.body.page
    let num = 10
    let start = (page - 1) * num
    const Goods = mongoose.model('Goods')
    let result = await Goods.find({SUB_ID:categorySubId}).skip(start).limit(num).exec()
    ctx.body={code:200,message:result}
  }catch(err){
    ctx.body={code:500,message:err}
  }
})
module.exports = router