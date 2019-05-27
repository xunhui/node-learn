import axios from 'axios'

function aGet(url) {
    return new Promise((resolve, reject) => {
        axios.get(url)
            .then((data) => {
                resolve(data)
            })
            .catch(function (error) {
                reject(error)
            })
    })
}

function aPost(url, params, config) {
    return new Promise((resolve, reject) => {
        axios.post(url, params, config)
            .then((data) => {
                resolve(data)
            })
            .catch(function (error) {
                reject(error)
            })
    })
}

export default {
    aGet: aGet,
    aPost: aPost
}