const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')

const index = require('./routes/index.js')
const user = require('./routes/user.js')
const post = require('./routes/post.js')

const app = express()

//处理静态资源文件
app.use('/public', express.static(path.join(__dirname, '/public')))
app.use('/node_modules', express.static(path.join(__dirname, '/node_modules')))

//设置渲染页面的目录
app.set('views', path.join(__dirname, './views/'))

// 配置解析表单 POST 请求体插件（注意：一定要在路由挂载之前 ）
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

//将路由挂载到 app 中
app.use('/', index)
app.use('/user', user)
app.use('/post', post)

app.get('/', (req, res) => {
    res.send('ccc')
})

app.listen(3001, () => {
    console.log('Running')
})