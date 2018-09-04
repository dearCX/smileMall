const fs = require('fs')
fs.readFile('./datajson/goods.json', 'utf8', function(err, data){
  let newData= JSON.parse(data)
  let i = 0
  let pushData = []
  newData.RECORDS.map((value, index) => {
    if(value.IMAGE1 != null){
      i++
      // console.log(value.NAME)
      pushData.push(value)
    }  
  })
  // console.log(i)
  // console.log(pushData)
  fs.writeFile('./datajson/newGoods.json', JSON.stringify(pushData), function(err){
    if(err) console.log('写文件操作失败');
    else console.log('写文件操作成功');
  })
})
fs.readFile('./datajson/category.json', 'utf8', function(err, data){
  let newData= JSON.parse(data)
  let i = 0
  let pushData = []
  newData.RECORDS.map((value, index) => {
    i++
    // console.log(value.NAME)
    pushData.push(value)
  })
  fs.writeFile('./datajson/newCategory.json', JSON.stringify(pushData), function(err){
    if(err) console.log('写文件操作失败');
    else console.log('写文件操作成功');
  })
})
fs.readFile('./datajson/category_sub.json', 'utf8', function(err, data){
  let newData= JSON.parse(data)
  let i = 0
  let pushData = []
  newData.RECORDS.map((value, index) => {
    i++
    // console.log(value.NAME)
    pushData.push(value) 
  })
  // console.log(i)
  // console.log(pushData)
  fs.writeFile('./datajson/newCategorySub.json', JSON.stringify(pushData), function(err){
    if(err) console.log('写文件操作失败');
    else console.log('写文件操作成功');
  })
})
