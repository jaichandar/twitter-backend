const {Register,Validate} = require('../models/Register')
const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')
const _ = require('lodash')
const {check,validationResult} = require('express-validator')


router.post('/register',[
    check('email','please enter the valid email')
       .isEmail()
       .isEmail()
       .exists(),
    check('password','please enter the valid password')
       .isLength({min:5})
],async(req,res)=>{
    // const {error} = Validate(req.body)
    // if(error){
    //     return res.status(400).send(error.details[0].message)
    // }
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).send(errors.array())
    }
    const emailExist = await Register.findOne({email:req.body.email})
    if(emailExist){
        return res.status(400).send('email already taken')
    }
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(req.body.password,salt)
    
    let user = await new Register({
        email:req.body.email,
        password:hashedPassword
    })
    user = await user.save()
    res.status(200).send(_.pick(user,['_id','email']))
})

module.exports = router;

