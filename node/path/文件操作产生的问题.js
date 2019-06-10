const fs = require('fs')
const path = require('path')

/**
 *  在文件操作中，相对路径并不是指当前文件的所在路径的目录
 *  而是相对于执行 node 命令所处的路径
*/

//eg1: C:\Users\Lianglab\Desktop\nodeLearn\path>node 文件操作产生的问题.js
//result:  I am 1.txt

//eg2: C:\Users\Lianglab\Desktop\nodeLearn>node path/文件操作产生的问题.js
//result: Error: ENOENT: no such file or directory, open 'C:\Users\Lianglab\Desktop\nodeLearn\file\1.txt'

//即执行 node 命令时命令行的目录是什么，相对路径(.)就是什么，这是 node 的设计不是 bug

// fs.readFile('./file/1.txt', (err, data) => {
//     if (err)
//         throw err
//     else
//         console.log(data.toString())
// })

/**
 * 将相对路径改为绝对路径来解决该问题
 * 采用 path.join(__dirname, 'xxx file') 来实现
 */
fs.readFile(path.join(__dirname, '/file/1.txt'), (err, data) => {
    if (err)
        throw err
    else 
        console.log(data.toString())
})