const mongoose = require('mongoose')
//连接数据库
mongoose.connect('mongodb://localhost/test', {useNewUrlParser: true});

//定义集合结构(表结构)
//约束是为了保证数据的完整性，避免脏数据
let Schema = mongoose.Schema

let userSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String
    }
})

//将 Schema 转换成 model
//第一个参数名为 model 名称，传递一个首字母大写的字符串， mongoose 自动将其转换成 users
//一个 model 就是一个数据库中的一个集合 

/**
 * model 构造函数提供了操作集合的接口和创建文档实例
 */
let User = mongoose.model('User', userSchema)

/**
 * 往集合中插入数据
 * save() 方法进行保存
 */

let admin = new User({
    username: 'cc',
    password: '123456',
    email: 'hhhh'
})
admin.save(function (err) {
    if (err)
        return console.log(err)
    console.log('add success')
})

// let user1 = new User({
//     username: 'dd',
//     password: '123456',
//     email: 'hhhh'
// })
// user1.save((err) => {
//     if (err)
//         return console.log(err)
//     console.log('add success')
// })

/**
 * 删除数据
 * deleteOne()
 * deleteMany()
 * findByIdAndRemove()
 * findByIdAndDelete()
 * findOneAndRemove()
 * findeOneAndDelete()
 */
User.findOneAndRemove({username: 'cc'}, (err, res) => {
    if (err)
        return console.log(err)
    console.log(res)
})

/**
 * 更新数据
 * findByIdAndUpdate()
 * findOneAndUpdate()
 * updateMany()
 * updateOne()
 */
User.findByIdAndUpdate('5ccfad802311e18d1ce17801', {username: 'lily'}, (err, res) => {
    if (err)
        return console.log(err)
    return res
})

