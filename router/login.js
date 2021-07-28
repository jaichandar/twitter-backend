const express = require('express')
const router = express.Router()
const {Register} = require('../models/Register')
const {check,validationResult} = require('express-validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const Auth = require('../middleware/Auth')
const config = require('config')


router.get('/',async(req,res)=>{
    const user = await Register.find().select('-date')
    res.status(200).send(user)
})


router.get('/me',Auth,async(req,res)=>{
    const users = await Register.findById(req.user)
    res.status(200).send(users)
})


router.post('/login',[
    check('email','please enter the valid email')
       .exists()
       .isEmail(),
    check('password','please enter the valid password')
       .isLength({min:5})
],async(req,res)=>{
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).send(errors.array())
    }
    const user = await Register.findOne({email:req.body.email})
    if(!user){
        return res.status(400).send('invalid username/password')
    }
    const comparePassword = await bcrypt.compare(req.body.password,user.password)
    if(!comparePassword){
        return res.status(400).json({
            message:'invalid username/password'
        })
    }
    const payload = {
        _id:user._id
    }
    // await Register.updateOne({_id:user._id}, {islogin: true});
    const signature = await jwt.sign(payload,config.get('jwtKey'),{
        expiresIn:'3h'
    })
    res.header('x-auth-token',signature).json({
        token:signature
    })
})

router.put('/logout',Auth,async(req,res)=>{
    let logouts = await Register.updateOne({_id:req.user._id},{$set:{
        isLogout:true
    }})
    res.status(200).send(logouts)
})



module.exports = router;
