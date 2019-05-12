/**
 * student-mongo.js
 * 数据库操作模块
 * 职责：操作数据库的数据，只处理数据，不关心业务
 *
 * 封装异步 API
 */

//创建并连接数据库
let mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/demo', {useNewUrlParser: true})

//创建 schema 和 model
let Schema = mongoose.Schema
let studentSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    gender: {
        type: Number,
        required: true
    },
    age: {
        type: Number
    },
    hobbies: {
        type: String
    }
})

let Student = mongoose.model('Student', studentSchema)

module.exports = Student