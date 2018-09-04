const mongoose = require('mongoose')
mongoose.set('useFindAndModify', false)
mongoose.set('useCreateIndex', true)
const db = 'mongodb://localhost/smile-db'
// const db = 'mongodb://localhost:27017/smile-db'
const opts = { useNewUrlParser: true }

const glob = require('glob')
const {resolve} = require('path')

mongoose.Promise =  global.Promise

exports.connect = () => {
  // 连接数据库
  // mongoose.connect(db)
  mongoose.connect(db, opts)
  // mongoose.set('useCreateIndex', true)
  let maxConnectTimes = 0
  return new Promise((resolve, reject) => {
    // 增加数据库连接的事件监听
    mongoose.connection.on('disconnected', () => {
      console.log('***********数据库断开***********')
      if (maxConnectTimes < 3) {
        maxConnectTimes++
        mongoose.connect(db)    
      } else {
        reject()
        throw new Error('数据库出现问题，程序无法搞定，请人为修理......')
      }
    })
    // 数据库出现错误的时候
    mongoose.connection.on('error', err => {
      console.log('***********数据库错误***********')
      if(maxConnectTimes < 3){
        maxConnectTimes++
        mongoose.connect(db)   
      }else{
        reject(err)
        throw new Error('数据库出现问题，程序无法搞定，请人为修理......')
      }
    })
    // 链接打开的时候
    mongoose.connection.once('open', () => {
      console.log('MongoDB Connected successfully!')
      resolve()
    })
  })
}
exports.initSchemas = () => {
  glob.sync(resolve(__dirname,'./schema/','**/*.js')).forEach(require)
}
