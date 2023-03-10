const jwt = require('jsonwebtoken');
const User = require('../models/userModel')
const bcrypt = require('bcryptjs');


//@desc Register new user to DB
// /api/user POST
// PUBLIC - EVERYBODY
const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        if (!name || !email || !password){
            res.status(400).json({ message: 'Please provide all information'})
        }
        const userExits = await User.findOne({email})
        if(userExits) {
            res.status(400).json({ message: 'User already exists!'})
            throw new Error('user exists');
        }

        const hashedPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10))

        const user = await User.create({
            name,
            email,
            password: hashedPassword
        })
        if(user) {
            res.status(201).json({
                id: user.id,
                name: user.name,
                email: user.email,
                token: generateToken(user._id)
            })
        } else {
            res.status(500).json({ message: 'something went wrong' })
            throw new Error('Invalid credentials');

        }
    } catch (error) {
        console.log(error)    
    }
    
}


//@desc Login user
// /api/user/login POST
// PUBLIC - EVERYBODY
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        if(!email || !password) {
            res.status(401)
            throw new Error('Please provide all info')
        } 
        const user = await User.findOne({email});
        if(!user){
            res.status(401)
            throw new Error('This user does not exists')
        }
        if(user && (bcrypt.compareSync(password, user.password))) {
            res.json({
                id: user._id,
                name:user.name,
                email: user.email,
                token: generateToken(user._id)
            })
        } else {
            res.status(401)
            throw new Error('Bad password')
        }

         
    } catch (error) {
        res.send(error.message)
    }


}

//@desc Get logged user
// /api/user GET
// PRIVATE
const getMe = (req, res) => {
    try {
        const { id, name, email} = req.user;
        
        res.status(200).json({id,name,email})
    } catch (error) {
        console.log(error.message)
    }


}


const generateToken = (id) => {
    return jwt.sign({id},process.env.JWT_SECRET, {
        expiresIn: '30d'
    })
}
module.exports = {registerUser, loginUser, getMe}