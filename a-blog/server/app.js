const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const session = require('express-session')

//路由模块
const index = require('./routes/index.js')
const user = require('./routes/user.js')
const post = require('./routes/post.js')

const app = express()

//处理静态资源文件
app.use('/public', express.static(path.join(__dirname, '/public')))
app.use('/node_modules', express.static(path.join(__dirname, '/node_modules')))

//设置渲染页面的目录 默认即 views 文件夹
app.set('views', path.join(__dirname, './views/'))

// 配置解析表单 POST 请求体插件（注意：一定要在路由挂载之前 ）
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

// session 配置
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true
}))

//将路由挂载到 app 中
app.use('/', index)
app.use('/user', user)
app.use('/post', post)

//配置 404 中间件
app.use(function(req, res) {
    res.send('404.html')
})

//配置错误处理中间件 
//统一处理服务器错误信息 
//当调用 next(err) 时，将直接将控制权交到传递了4个参数的中间件
//避免书写过多重复的服务器错误代码
app.use(function(err, req, res, next) {
    res.status(500).send(err.message)
})

app.listen(5000, () => {
    console.log('Running')
})