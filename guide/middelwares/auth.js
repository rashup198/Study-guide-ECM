const jwt= require("jsonwebtoken");
const User = require("../Models/User");
require("dotenv").config();

// auth middelware

exports.auth = async (req,res,next) => {

    try {
        //get token from header
        const token =
			req.cookies.token ||
			req.body.token ||
			req.header("Authorization").replace("Bearer ", "");
        //if no token
        if(!token){
            return res.status(401).json({
                success:false,
                message:"No token found"
            })
        }
        
        //verify token
        try {
            const decode = jwt.verify(token,process.env.JWT_SECRET);
            console.log("decode: ",decode);
            req.user =decode;

        } catch (error) {
            console.log("error in verifying token",error);
            return res.status(401).json({
                success:false,
                message:"Invalid token"
            })
        }
        next();
    } catch (error) {
        console.log("error in auth",error);
        return res.status(401).json({
            success:false,
            message:"Something went wrong in auth plese try again later"
        })
    }
}
