const User = require('../models/userModel')
const generateToken = require('../utils/generateToken')
exports.register = async(req,res) => {
    const {name, email, password} = req.body;

    if(!name || !email || !password){
        res.status(401).json({message:"Please fields can not be empty"})
    }
    try {
        const userEmail = await User.findOne({email});
        if(userEmail){
            res.status(401).json({message:'Email already exist'})
        }
        else{
            const user = await User.create({name, email, password});
            res.json({
                _id:user._id,
                name:user.name,
                email:user.email,
                token:generateToken(user._id)
            })
        }
    } catch (error) {
        res.status(400).json({message:"Failed"})
    }

}
exports.login = async(req,res)=> {
    const {email, password} = req.body;

    if(!email || !password){
        res.status(400).json({message:"Please enter email and password"})
    }
    try {
        const user = await User.findOne({email}).select('+passord')
        if(!user){
            res.status(400).json({message:"User does not exist"})
        }
        const isMatched = await user.matchPasswords(password)
        if(!isMatched){
            res.status(401).json({message:"Invalid password"})
        }
        else{
            res.json({
                _id:user._id,
                name:user.name,
                email:user.email,
                token:generateToken(user._id)
            })
        }
    } catch (error) {
        res.status(401).json({message:"Failed"})
    }

}