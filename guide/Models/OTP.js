const mongoose = require('mongoose');
const mailSender = require('../utils/mailSender');

const OTPSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    otp: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        expires: 600,
        default: Date.now
    }
});

// funtion to genereate and send OTP to the user
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