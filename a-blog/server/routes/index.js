const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')

// 连接数据库
mongoose.connect('mongodb://localhost/test', { useMongoClient: true })

//渲染根页面
router.get('/', (req, res) => {
    res.send('index.html')
})

module.exports = router