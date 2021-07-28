
function logout(req,res,next){
        if(req.user.isLogout){
            return res.status(400).send('logout out')
        }
        next()
}

exports.Logout = logout;
