function pAjax(method, url, callback) {
    return new Promise((resolve, reject) => {
        var xhr = new XMLHttpRequest()

        xhr.open(method, url)
        xhr.onload = function () {
            resolve(xhr.responseText)
        }
        xhr.onerror = function (err) {
            reject(err)
        }
        xhr.send(null)
    })
}

var obj = {}
pAjax('Get', 'xxx')
    .then((data1) => {
        obj.data1 = data1
        return pAjax('Post', 'yyy')
    })
    .then((data2) => {
        obj.data2 = data2
    })

console.log(obj)