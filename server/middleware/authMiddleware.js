const jwt = require('jsonwebtoken')
const asyncHandler = require('express-async-handler')
const User = require('../model/userModel')

const protect = asyncHandler(async(req, res, next)=>{
    let token

    if(
        req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')
    ){
        
        try {
            token = req.headers.authorization.split(' ')[1]
            const decode = jwt.verify(token, process.env.JWT_SECRET)
            req.user = await User.findById(decode.id).select('-password')
            next()

        } catch (error) {
            console.error('Error verifying token:', error);
            res.status(401).json({ error: 'Not authorized' });
        
    }
    }
    if (!token) {
        res.status(401).json({ error: 'Not Authorized, no token' });
    }
})

module.exports = {protect}