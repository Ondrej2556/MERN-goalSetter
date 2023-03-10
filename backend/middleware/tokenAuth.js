var jwt = require('jsonwebtoken');

const User = require('../models/userModel')

const protect = async(req,res,next) => {
    
    try {
        let token;
        if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
            
            token = req.headers.authorization.split(' ')[1];
            
            const decoded = jwt.verify(token, process.env.JWT_SECRET)

            const user = await User.findById(decoded.id).select('-password')

            if(!user) {
                // res.status(400).send("Not authorized")
                throw new Error('Not authorized')

            }
            req.user = user;
            next();
        } else {
            // res.status(400).send("Invalid authorization")
            throw new Error('Invalid authorization')
        }

        if(!token) {
            //res.status(400).send("Not no token")
            throw new Error('No token')
        }
        
    } catch (error) {
        console.log(`TOKEN ERROR: ${error.message}`.red)
        res.status(401).send(error.message)
    }
}

module.exports = protect;