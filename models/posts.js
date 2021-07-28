const mongoose = require('mongoose')

const postSchema = new mongoose.Schema({
    comment:{
        type:String,
        requried:true
    },
    like:{
        type:Number,
        default:0
    },
    date:{
        type:Date,
        default:Date.now
    }
})
const post = mongoose.model('post',postSchema)
exports.Post = post;
