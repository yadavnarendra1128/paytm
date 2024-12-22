const jwt = require('jsonwebtoken')
const { JWT_SECRET } = require("./config");

const authenticateToken = (req, res, next)=>{
    const authHeader = req.headers.authorization;
    if(!authHeader || !authHeader.startsWith('Bearer ')){
        return res.status(401).json({msg: 'Invalid Bearer token'})
    }
    const token = authHeader.split(' ')[1];

    try{
        const decoded = jwt.verify(token,JWT_SECRET)

        if(decoded.userId){
            req.userId = decoded.userId;
            next()
        }
        else{
            return res.status(403).json({msg: 'UserId required in token'});
        }
    }
    catch(err){
        return res.status(403).json({msg: 'Token is not valid'},
            console.log(err.message), console.log(token)

        )
    }
}

module.exports = {authenticateToken};