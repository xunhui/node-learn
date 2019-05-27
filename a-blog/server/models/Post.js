const mongoose = require('mongoose')

const PostSchema = new mongoose.Schema({
    //作者的信息
    user_id: {
        type: String,
        required: true
    },
    user_name: {
        type: String,
        required: false
    },
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    created_time: {
        type: Date,
        default: Date.now
    },
    modified_time: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('Post', PostSchema)

