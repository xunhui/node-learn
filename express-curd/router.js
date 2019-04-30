const express = require('express')
const Student = require('./dataOperation.js')

let router = express.Router()

/**
 * 请求学生列表信息页面
 */
router.get('/', (req, res) => {
    Student.fetch((err, data) => {
        if (err)
            res.status(500).send(err)
        else {
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
    Student.add(req.body, (err) => {
        if (err)
            res.send(err)
        //添加成功后访问新的数据
        res.redirect(301, '/')
    })
})

/**
 * 渲染编辑学生页面
 */
router.get('/students/edit', (req, res) => {
    Student.find(req.query.id, (err, data) => {
        if (err)
            res.status(500).send(err)
        res.render('edit.html', {
            student: data
        })
    })
})

/**
 * 编辑学生POST请求
 */
router.post('/students/edit', (req, res) => {
    Student.modify(req.body, (err) => {
        if (err)
            res.status(500).send(err)
        res.redirect(301, '/')
    })
})

//删除学生POST请求
router.get('/students/delete', (req, res) => {
    Student.find(req.query.id, (err, data) => {
        if (err)
            res.status(500).send(err)
        else {
            console.log(req.query.id, data)
            //删除该学生信息
            Student.delete(data, (err) => {
                if (err)
                    res.status(500).send(err)
                console.log('delete success')
                res.redirect('/')
            })
        }
    })
})

module.exports = router