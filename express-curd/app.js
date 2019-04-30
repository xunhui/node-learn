const express = require('express')
const router = require('./router.js')
const bodyParser = require('body-parser')

let app = express()

//处理静态资源文件
app.use('/public', express.static('./public'))
app.use('/node_modules', express.static('./node_modules'))

//配置模板引擎
app.engine('html', require('express-art-template'));

// 配置模板引擎和 body-parser 一定要在 app.use(router) 挂载路由之前
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

//配置路由容器
app.use(router)

app.listen(3000, () => {
    console.log('Server is running on 3000')
})