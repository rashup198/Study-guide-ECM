const bcrypt = require('bcrypt'); 
const jwt = require('jsonwebtoken');
const OTP = require('../Models/OTP');
const otpGenerator = require('otp-generator');
const User = require('../Models/User');
const mailSender= require('../utils/mailSender');
const Profile = require('../Models/Profile');
require('dotenv').config();


// signup controller to register a new user

exports.signup = async (req,res)=>{
    try {
        // destructuring the request body

        const {
            regNo,
            email,
            password,
            confirmPassword,
            otp,
        } = req.body;

        // checking if all details are entered 

        if(!regNo || !email || !password || !confirmPassword || !otp){
            return res.status(400).json({
                message:"Please enter all details",
            })
        }

        // check if password and confirm password are same

        if(password !== confirmPassword){
            return res.status(400).json({
                message:"Password and confirm password are not same",
            })
        }

        // check if user already exists
        const existingUser= await User.findOne({email});
        if(existingUser){
            return res.status(400).json({
                message:"User already exists",
            })
        }

        // check if otp is correct
        const response = await OTP.find({email}).sort({createdAt:-1}).limit(1);
        console.log("response",response);
        if(response.length === 0){
            return res.status(400).json({
                message:"Please enter a valid otp",
            })
        } else if (otp !== response[0].otp){
            return res.status(400).json({
                message:"Please enter a valid otp",
            })
        }

        // hash the password

        const hasedPassword = await bcrypt.hash(password,10);

        // create a new user

        const profileDetails = await Profile.create({
            gender:null,
            dateOfBirth:null,
            about:null,
            contactNumber:null,
        });
        const user = await User.create({
            regNo,
            email,
            password:hasedPassword,
            additionalDetails:profileDetails._id,
            image:""
        });

        return res.status(200).json({
            message:"User created successfully",
            user,
        })
    
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"There is some error registering the user please try again later",
        })
    }
}

/// login controller to login a user

exports.login = async (req, res) => {

    try {
        // destructuring the request body
        const {
            email,
            password,
        } = req.body;

        // checking if all details are entered

        if (!email || !password) {
            return res.status(400).json({
                message: "Please enter all details",
            })
        }

        // find the user with the email
        const user = await User.findOne({ email }).populate('additionalDetails');
        if (!user) {
            return res.status(400).json({
                message: "User Is not registered with this email",
            })
        }

        // generate a token and compare the password
        if(await bcrypt.compare(password,user.password)){
            const token = jwt.sign({email:user.email, id:user._id},process.env.JWT_SECRET,{expiresIn:"24h"})
            
            // save the token in the database
            user.token = token;
            user.password = undefined;

            // set the cookie in the browser

            const options={
                expires:new Date(Date.now()+ 24*60*60*1000),
                httpOnly:true,
            }

            res.cookie("token", token, options).status(200).json({
                success: true,
                token,
                user,
                message: `User Login Success`,
              })
        } else {
            return res.status(400).json({
                message: "Please enter correct password",
            })
        }
    
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "There is some error logging in the user please try again later",
        })
    }
}

// send otp for email verification

exports.sendOtp = async (req,res)=>{

    try {
        const { email } = req.body
    
        // Check if user is already present
        // Find user with provided email
        const checkUserPresent = await User.findOne({ email })
        // to be used in case of signup
    
        // If user found with provided email
        if (checkUserPresent) {
          // Return 401 Unauthorized status code with error message
          return res.status(401).json({
            success: false,
            message: `User is Already Registered`,
          })
        }
    
        var otp = otpGenerator.generate(6, {
          upperCaseAlphabets: false,
          lowerCaseAlphabets: false,
          specialChars: false,
        })
        const result = await OTP.findOne({ otp: otp })
        console.log("Result is Generate OTP Func")
        console.log("OTP", otp)
        console.log("Result", result)
        while (result) {
          otp = otpGenerator.generate(6, {
            upperCaseAlphabets: false,
          })
        }
        const otpPayload = { email, otp }
        const otpBody = await OTP.create(otpPayload)
        console.log("OTP Body", otpBody)
        res.status(200).json({
          success: true,
          message: `OTP Sent Successfully`,
          otp,
        })
      } catch (error) {
        console.log(error.message)
        return res.status(500).json({ success: false, error: error.message })
      }
    }