const fs = require('fs')

//封装 promise
function pReadFile(path) {
    return new Promise((resolve, reject) => {
        fs.readFile(path, (err, data) => {
            if (err)
                reject(err)
            else
                resolve(data.toString())                
        })
    })
}

pReadFile('./file/1.txt')
    .then((data1) => {
        console.log(data1)
        return pReadFile('./file/2.txt')
    })
    .then((data2) => {
        console.log(data2)
    }).catch((err) => {
        console.log(err)
    })