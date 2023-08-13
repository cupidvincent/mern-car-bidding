import asyncHandler from "express-async-handler";
import UserModel from "../models/userModel.js";
import generateJwt from "../utils/generateJwt.js";

const registerUser = asyncHandler( async(req, res) => {

    const { fullName, email, phoneNumber } = req.body;

    const isExisting = await UserModel.findOne({email})
    
    if(isExisting) {
        res.status(403).json({
            message: `${email} email is already in use`
        })
        throw new Error(`${email} email is already in use`)
    }

    try {
        const result = await UserModel.create({
            fullName, email, phoneNumber
        })    
        if(result) {
            res.status(201).json({
                message: `User created, you may login using ${email}`
            })
        }
    } catch (error) {
        res.status(400).json({
            message: error.message || error.error || error
        })
        throw new Error(error.message || error.error || error)
    }


})

const loginUser = asyncHandler( async(req, res) => {
   const { email } = req.body;
    const user = await UserModel.findOne({ email })
    
    if(user){
        generateJwt(res, user._id)
        res.status(201).json({
            _id: user._id,
            fullName: user.fullName,
            email:user.email,
            phoneNumber: user.phoneNumber,
            isAdmin: user.isAdmin
        })
    } else {
        res.status(404).json({
            message: 'invalid credentials'
        })
        throw new Error('invalid credentials')
    }
})

const logoutUser = asyncHandler (async (req, res) => {
    res.cookie('authToken', '', {
        httpOnly: true,
        expires: new Date(0)
    })
    res.status(200).json({message: 'user logged out'})
})

const updateUser = asyncHandler( async(req, res) => {

    const { fullName, email, phoneNumber } = req.body;
    
    const { _id } = req.user;
    generateJwt(res, _id)
    try {
        let currentProfile = await UserModel.findById(_id)
        currentProfile.fullName = fullName
        currentProfile.email = email
        currentProfile.phoneNumber = phoneNumber

        const result = await currentProfile.save()

        if(result) {
            res.status(201).json({
                message: `User ${email}  updated`,
                newData: result
            })
        }
    } catch (error) {
        res.status(400).json({
            message: error.message || error.error || error
        })
        throw new Error(error.message || error.error || error)
    }


})

export {
    registerUser,
    loginUser,
    logoutUser,
    updateUser
}