const mongoose = require('mongoose');
const mailSender = require('../utils/mailSender');

const OTPSchema = mongoose.Schema({

    email:{
        type:String,
        required:true,
        trim:true,
    },
    otp:{
        type:String,
        required:true,
        trim:true,
    },
    createdAt:{
        type:Date,
        default:Date.now,
        expires:300,
    }

})

// function to generate OTP

async function sendVerificationEmail(email,otp){
    try {
        const mailResponse = await mailSender(email, "OTP from SAGE", `Your OTP is ${otp}`);
        console.log("Mail Response: ", mailResponse);
    } catch (error) {
        console.log("Error in sending verification email",error);
        throw new Error(error);
    }
}

OTPSchema.pre('save',async function(next){
    // sending mail when OTP is created in db

    if(!this.isNew){
        await sendVerificationEmail(this.email,this.otp);
    }next();
})

module.exports = mongoose.model('OTP',OTPSchema);
