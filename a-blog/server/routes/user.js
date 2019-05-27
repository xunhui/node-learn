const express = require('express')
const md5 = require('md5')
const User = require('../models/User.js')
const multer = require('multer')

const router = express.Router()
const upload = multer({ dest: '../assets/pic' })

/**
 * 登录请求
 */
router.post('/login', (req, res, next) => {
    let params = {
        phone: req.body.phone,
        password: req.body.password
    }
    console.log(req.session)
    User.findOne(params, (err, user) => {
        if (err) {
            //next('route') 将控制权传递给下一个路由
            return next(err)
        }
        // console.log(user)
        //查找不到相应的用户数据
        if (!user) {
            //json() 发送一个 JSON 相应
            return res.status(200).json({
                code: -1,
                message: '手机号或密码错误'
            })
        } else {
            //把用户信息存入 session 中
            req.session.user = user

            return res.status(200).json({
                code: 0,
                message: '登录成功',
                result: user
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
    User.findOne({
        //筛选条件 两者之一有一个满足即可
        $or: [
            {
                phone: req.body.phone
            },
            {
                nickname: req.body.nickname
            }
        ]
    }, (err, user) => {
        if (err)
            return next(err)
        //用户已存在
        if (user) {
            return res.status(200).json({
                code: 1,
                message: '手机号或昵称已存在'
            })
        } else {
            //向数据库中插入该用户
            // User.create(params)
            let userDetail

            new User(params).save()
                .then(() => {
                    User.findOne(params, (err, userInfo) => {
                        if (err)
                            return next(err)
                        else {
                            userDetail = userInfo

                            res.status(200).json({
                                code: 0,
                                message: '注册成功',
                                result: userDetail
                            })
                        }
                    })
                })
                .catch((err) => {
                    return next(err)
                })
        }
    })
})

/**
 * 修改个人信息
 */
router.post('/edit', (req, res) => {
    let userID = req.body.id
    let params = {
        nickname: req.body.nickname,
        bio: req.body.bio,
        gender: req.body.gender,
        last_modified_time: Date.now()
    }

    User.findByIdAndUpdate(userID, params,(err, data) => {
        if (err)
            // return res.status(500).json({
            //     code: -1,
            //     message: err
            // })
            return next(err)
        
        console.log(data)
        return res.status(200).json({
            code: 0,
            message: '个人信息修改成功'
        })
    })
})

/**
 * 修改密码
 */
router.post('/changePSW', (req, res) => {
    let prePSW = req.body.prePSW
    let newPSW = req.body.newPSW

    User.findById(req.body.id, (err, doc) => {
        if (err)
            // return res.status(500).json({
            //     code: -1,
            //     message: err
            // })
            return next(err)

        if (prePSW !== doc.password) {
            res.json({
                code: 1,
                message: '原密码错误'
            })
        } else {
            //查找到该用户并修改密码
            User.findByIdAndUpdate(req.body.id, { password: newPSW },(err, doc1) => {
                if (err)
                    // res.status(500).json({
                    //     code: -1,
                    //     message: err
                    // })
                    return next(err)

                if (doc1) 
                    res.status(200).json({
                        code: 0,
                        message: '修改密码成功'
                    })
            })
        }

    })
})

/**
 * 上传头像
 * 单图上传
 */
router.post('/uploadAvatar', upload.single('avatar'), (req, res, next) => {
    console.log(req.file)
    res.status(200).json({
        code: 0,
        message: '上传成功'
    })
})


module.exports = router