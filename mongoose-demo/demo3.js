/**
 * mongoose 所有的 API 都支持 promise
 */

let User = mongoose.model('User', userSchema)

//案例：先查找后新增再删除
User.find({username: 'cc'})
    .then((data) => {
        if (data)
            // 用户已存在，不能注册
            return
        else 
            return new User({
                username: 'cc',
                password: '123456',
                email: 'hhhh'
            }).save()
    })
    .then((data) => {
        return User.findOneAndRemove({username: 'cc'})
    })
    .then((data) => {

    })
    .catch((err) => {

    })