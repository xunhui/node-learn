/**
 * Promise 用于解决回调地狱
 * new Promise((resolve, reject) => {})
 * pending -> fulfilled 一般表示异步操作成功完成
 * pending -> rejected 一般表示异步操作失败
 */

const fs = require('fs')

let p1 = new Promise((resolve, reject) => {
    fs.readFile('./file/1.txt', (err, data) => {
        if (err)
            reject(err)
        else
            resolve(data.toString())
    })
})

let p2 = new Promise((resolve, reject) => {
    fs.readFile('./file/222.txt', (err, data) => {
        if (err)
            reject(err)
        else
            resolve(data.toString())
    })
})

p1.then((data) => {
    console.log(data)
    return p2
}).then((data) => {
    console.log(data)
}).catch((err) => {
    console.log(err)
})