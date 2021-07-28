const mongoose = require('mongoose')
const Joi = require('joi')

const registerSchema = new mongoose.Schema({
    email:{
        type:String,
        required:true,
        unique:true,
        lowercase:true
    },
    password:{
        type:String,
        required:true,
        minlength:5
    },
    Date:{
        type:Date,
        default:Date.now
    },
    isLogout:{
        type:Boolean,
        default:false
    }
})

function Validate(register){
   const schema = Joi.object({
       email:Joi.string().email().required(),
       password:Joi.string().min(5).required()
   })
   return schema.validate(register)
}

const register = mongoose.model('register',registerSchema)

exports.Validate = Validate;
exports.Register = register;

