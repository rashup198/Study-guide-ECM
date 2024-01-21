const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    regNo:{
        type:String,
        required:true,
        trim:true,
    },
    email:{
        type:String,
        required:true,
        trim:true
    },
    password:{
        type:String,
        required:true,
    },
    active:{
        type:Boolean,
        default:true,
    },
    approved:{
        type:Boolean,
        default:true,
    },  
    additionalDetails:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'Profile'
    },
    token:{
        type:String,
    },
    resetPasswordExpires:{
        type:Date,
    },
},{timestamps:true});

module.exports = mongoose.model('User',userSchema);