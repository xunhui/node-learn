const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
    phone: {
        type: String,
        required: true
    },
    nickname: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    //创建时间
    created_time: {
        type: Date,
        default: Date.now //new Model 的时候，如果没有传递 create_time ，则 mongoose 就会调用 default 指定的Date.now 方法，使用其返回值作为默认值
    },
    last_modified_time: {
        type: Date,
        default: Date.now
    },
    //个人简历
    bio: {
        type: String,
        default: ''
    },
    gender: {
        type: Number,
        enum: [-1, 0, 1],//未知， 男， 女
        default: -1
    },
    status: {
        type: Number,
        // 0 没有权限限制
        // 1 不可以评论
        // 2 不可以登录
        enum: [0, 1, 2],
        default: 0
    }
})

const User = mongoose.model('User', userSchema)

module.exports = User