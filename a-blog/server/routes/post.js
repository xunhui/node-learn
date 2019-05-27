const express = require('express')
const Post = require('../models/Post')
const User = require('../models/User')

const router = express.Router()

/**
 * 获取评论列表
 */
router.get('/getPostList', (req, res, next) => {
    Post.find({}, (err, data) => {
        if (err) 
            return next(err)
        if (data)
            return res.status(200).json({
                code: 0,
                message: '获取评论列表成功',
                postLists: data
            })
    })
})


/**
 * 发表评论
 */
router.post('/commitPost', (req, res, next) => {
    let userId = req.body.userId

    console.log(req.body)
    //先将该用户的基本信息查出来 再插入 POST collection
    User.findById(userId, (err, user) => {
        if (err)
            // res.status(500).json({
            //     code: -1,
            //     message: err
            // })
            return next(err)

        if (user) {
            let params = {
                user_id: userId,
                user_name: user.nickname,
                title: req.body.title,
                content: req.body.content,
                created_time: Date.now()
            }
            console.log(params)
            //存入数据库
            new Post(params).save((err, post) => {
                if (err)
                    return next(err)
                
                res.status(200).json({
                    code: 1,
                    message: 'OJBK'
                })
            })
        }
    })
})

/**
 * 修改评论
 */
router.post('/modifyPost', (req, res, next) => {
    let userId = req.body.userId
    let params = {
        title: req.body.title,
        content: req.body.content
    }

    Post.findByIdAndUpdate(userId, params, (err, data) => {
        if (err)
            return next(err)

        res.status(200).json({
            code: 0,
            message: 'Modify success'
        })
    })
})

/**
 * 删除评论
 */
router.post('/deletePost', (req, res, next) => {
    let post_id = req.body.postId

    Post.findByIdAndDelete(post_id, (err, data) => {
        if (err)
            return next(err)
        
        res.status(200).json({
            code: 0,
            message: 'Delete sucess'
        })
    })
})

module.exports = router