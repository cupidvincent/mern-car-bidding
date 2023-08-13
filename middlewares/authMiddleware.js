import jwt  from "jsonwebtoken";
import asyncHandler from 'express-async-handler'
import UserModel from "../models/userModel.js";

const protect = asyncHandler( async(req, res, next) => {
    let token;

    token = req.cookies.authToken;
    if(token) {
        try {
            const decoded = jwt.verify(
                token,
                process.env.JWT_SECRET
            )
            req.user = await UserModel.findById(decoded.userId)
            next()
            
        } catch (error) {
            res.status(401).json({
                message: 'Not authorized, no token'
            });
            throw new Error('Not authorized, no token')
        }
    } else {
        res.status(401).json({
            message: 'Not authorized, no token'
        });
        throw new Error('Not authorized, no token')
    }
})

export {
    protect
}