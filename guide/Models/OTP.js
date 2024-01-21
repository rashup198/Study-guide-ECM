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

async function sendVerificationMail(email, otp) {
    try {
       const mailResponse= await mailSender(email, "OTP FROM VITERN",`Your otp is ${otp}`);
       console.log("mailResponse",mailResponse);
    } catch (err) {
        console.log("There is some error sending mail", err);

    }
}

OTPSchema.pre('save', async function (next) {
    if(!this.isNew){
        await sendVerificationMail(this.email, this.otp);

    }next();
});

module.exports = mongoose.model('OTP', OTPSchema);