/**
 * student-fs.js
 * 数据操作文件模块
 * 职责：操作文件中的数据，只处理数据，不关心业务
 *
 * 封装异步 API
 */

let fs = require('fs')

const path = './db.json'

/**
 * 从文件读取学生列表数据
 * @param {Function} callback 回调函数
 */
exports.fetch = (callback) => {
    //利用回调函数返回异步操作API的获得的数据
    fs.readFile(path, (err, data) => {
        if (err)
            callback(err)
        callback(null, JSON.parse(data.toString()).students)
    })
}

/**
 * 将新增信息写入文件
 * @param {Object} obj 写入的对象数据
 * @param {Function} callback 回调函数
 */
exports.add = (obj, callback) => {
    fs.readFile(path, (err, data) => {
        if (err)
            callback(err)
        else {
            let stuDataArr = JSON.parse(data.toString()).students
            if (stuDataArr.length != 0)
                obj.id = stuDataArr[stuDataArr.length - 1].id + 1
            else
                obj.id = 1
                
            stuDataArr.push(obj)

            let resultStr = JSON.stringify({
                students: stuDataArr
            })

            //该方法只接收字符串
            fs.writeFile(path, resultStr, (err) => {
                if (err)
                    callback(err)
                callback(null)
            })
        }
    })
}

/**
 * 从文件中拿到该id对应的学生信息
 * @param {Number} id
 * @param {Function} callback
 */
exports.find = (id, callback) => {
    fs.readFile(path, (err, data) => {
        if (err)
            callback(err)
        let stuArr = JSON.parse(data.toString()).students
        for (let i = 0; i < stuArr.length; i++) {
            if (stuArr[i].id == id)
                callback(null, stuArr[i])
        }
    })
}

/**
 * 修改编辑学生的相关信息
 * @param {Object} obj
 * @param {Function} callback
 */
exports.modify = (obj, callback) => {
    fs.readFile(path, (err, data) => {
        if (err)
            callback(err)
        let stuArr = JSON.parse(data.toString()).students
        for (let i = 0; i < stuArr.length; i++) {
            if (stuArr[i].id == obj.id) {
                stuArr[i] = obj
                break
            }
        }

        let resultStr = JSON.stringify({
            students: stuArr
        })

        //该方法只接收字符串
        fs.writeFile(path, resultStr, (err) => {
            if (err)
                callback(err)
            callback(null)
        })
    })
}

/**
 * 删除该学生信息
 * @param {Object} obj
 * @param {Function} callback
 */
exports.delete = (obj, callback) => {
    fs.readFile(path, (err, data) => {
        if (err)
            callback(err)
        let stuArr = JSON.parse(data.toString()).students
        let i
        for (i = 0; i < stuArr.length; i++) {
            if (stuArr[i].id == obj.id) {
                stuArr[i] = obj
                break
            }
        }
        //删除该学生信息
        stuArr.splice(i, 1)
        console.log(stuArr)

        let resultStr = JSON.stringify({
            students: stuArr
        })

        //该方法只接收字符串
        fs.writeFile(path, resultStr, (err) => {
            if (err)
                callback(err)
            callback(null)
        })
    })
}