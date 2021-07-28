const jwt = require('jsonwebtoken')
const config = require('config')

function Auth(req,res,next){
    const token = req.header('x-auth-token')
    if(!token){
        return res.status(401).send('access denied')
    }
    try{
     const verify = jwt.verify(token,config.get('jwtKey'))
     req.user = verify;
     next()
    }catch(err){
     res.status(400).send(err)
    }
}

module.exports = Auth;
