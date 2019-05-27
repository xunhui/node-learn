const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')

// 连接数据库
mongoose.connect('mongodb://127.0.0.1:27017/blog', { useNewUrlParser: true })

//渲染根页面
router.get('/', (req, res) => {
    res.send('index.html')
})

module.exports = router