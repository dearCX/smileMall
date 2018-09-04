const Koa = require('koa')
const app = new Koa()

const Router = require('koa-router')
const bodyParser = require('koa-bodyparser')
const cors = require('koa2-cors')

const mongoose = require('mongoose')
// 引入connect
const {connect, initSchemas} = require('./database/init.js')

const user = require('./appApi/user.js')
const goods = require('./appApi/goods.js')

let router = new Router();
router.use('/user', user.routes())
router.use('/goods', goods.routes())
 
// 立即执行函数
;(async () => {
  await connect()
  initSchemas()
  // const User = mongoose.model('User')
  // let oneUser = new User({userName: 'connie', password: '123456'})
  // oneUser.save().then(() => {
  //   console.log('插入成功')
  // })
  // let users = await User.findOne({}).exec()
  // console.log('------------------')
  // console.log(users)
  // console.log('------------------') 
})()

app.use(cors())
app.use(bodyParser())
app.use(router.routes()).use(router.allowedMethods())

app.use(async(ctx) => {
  ctx.body = '<h1>hello Koa2</h1>'
})
app.listen(3000, () => {
  console.log('[Server] starting at port 3000')
})
