const express = require('express')
const Student = require('./student-mongo.js')

let router = express.Router()

/**
 * 请求学生列表信息页面
 */
router.get('/', (req, res) => {
    Student.find((err, data) => {
        if (err)
            res.status(500).send(err)
        else {
            console.log(data)
            res.render('index.html', {
                students: data
            })
        }
    })
})

/**
 * 请求添加学生页面
 */
router.get('/students/new', (req, res) => {
    res.render('new.html')
})

/**
 * 添加学生post请求
 */
router.post('/students/new', (req, res) => {
    console.log(req.body)
    new Student(req.body).save(req.body, (err) => {
        if (err)
            return res.status(500).send(err)
        //添加成功后访问新的数据
        console.log('added!')
        res.redirect(301, '/')
    })
})

/**
 * 渲染编辑学生页面
 */
router.get('/students/edit', (req, res) => {
    Student.findById(req.query.id, (err, data) => {
        if (err)
            return res.status(500).send(err)
        res.render('edit.html', {
            student: data
        })
    })
})

/**
 * 编辑学生POST请求
 */
router.post('/students/edit', (req, res) => {
    Student.findByIdAndUpdate(req.body.id, req.body, (err) => {
        if (err)
            return res.status(500).send(err)
        res.redirect(301, '/')
        console.log('edited!')
    })
})

//删除学生POST请求
router.get('/students/delete', (req, res) => {
    Student.findByIdAndDelete(req.query.id, (err, data) => {
        if (err)
            return res.status(500).send(err)
        else {
            console.log('deleted!')
            //删除该学生信息
                res.redirect('/')
        }
    })
})

module.exports = router