const express = require('express')
const md5 = require('md5')
const User = require('../models/User.js')

const router = express.Router()

/**
 * 登录请求
 */
router.post('/login', (req, res, next) => {
    let params = {
        phone: req.body.phone,
        password: md5(req.body.password)
    }

    User.find(params, (err, user) => {
        if (err) {
            //next('route') 将控制权传递给下一个路由
            next(err)
        }
        //查找不到相应的用户数据
        if (!user) {
            //json() 发送一个 JSON 相应
            res.status(200).json({
                code: -1,
                message: '手机号或密码错误'
            })
        }
        else {
            res.status(200).json({
                code: 0,
                message: '登录成功'
            })
        }
            
    })
})

/**
 * 注册请求
 * 先在数据库查找是否存在该用户
 * 不存在则插入新用户 否则不允许注册
 */
router.post('/register', (req, res, next) => {
    let params = {
        phone: req.body.phone,
        nickname: req.body.nickname,
        password: req.body.password
    }

    User.findOne(params, (err, user) => {
        if (err)
            next(err)
        //用户已存在
        if (user) {
            res.status(200).json({
                code: 1,
                message: '用户已存在'
            })
        } else {
            //向数据库中插入该用户
            User.create(params)

            res.status(200).json({
                code: 0,
                message: '注册成功'
            })
        }
    })
})