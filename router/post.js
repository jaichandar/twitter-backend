const {Post} = require('../models/posts')
const express = require('express')
const router = express.Router()
const Auth = require('../middleware/Auth')
const {Logout} = require('../middleware/logout')


router.get('/post',async(req,res)=>{
    const post = await Post.find().select('-date')
    res.status(200).send(post)
})

router.post('/comment',[Auth,Logout],async(req,res)=>{
    let comment = await new Post({
        comment:req.body.comment,
        like:req.body.like
    })
    comment = await comment.save()
    res.status(200).send(comment)
})

module.exports = router;