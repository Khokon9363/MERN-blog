// External dependencies
const jwt = require('jsonwebtoken')

function auth(req, res, next) {
    const decoded = jwt.verify(req.headers.authorization.replace('Bearer ', ''), process.env.JWT_SECRET)
    if(decoded){
        req.user = decoded
        next()
    }else{
        res.status(401).json({
            errors: {
                common: {
                    msg: 'Not authenticated !'
                }
            }
        })
    }
}

function guest(req, res, next) {
    if(!req.headers.authorization){
        next()
    }else{
        res.status(401).json({
            errors: {
                common: {
                    msg: 'You are an authenticated user !'
                }
            }
        })
    }
}

module.exports = {
    auth,
    guest
}