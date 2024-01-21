const jwt= require('jsonwebtoken');
const User = require("../Models/User")
require('dotenv').config();

exports.auth= async(req, res, next)=>{

    try {
        // get the token header from the user
        const token = req.header('Authorization').replace('Bearer ', '')|| req.body.token || req.query.token;
        console.log(token);
    // if there is no token
    if(!token){
        return res.status(401).json({
            message:"No token, authorization denied",
        })
    }
    // verify the token

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log(decoded);
        req.user = decoded
    } catch (error) {
        console.log("there is some error in verifying the token", error);
        return res.status(401).json({
            message:"Token is not valid",
        })
    }
    next();

    } catch (error) {
        console.log("there is some error in auth middleware", error);
        return res.status(500).json({
            success:false,
            message:"Internal Server Error",
        })
    }
}