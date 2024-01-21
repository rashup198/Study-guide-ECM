const mongoose = require('mongoose')
require("dotenv").config();

exports.connect=()=>{
    mongoose.connect(process.env.MONGO,{
        }).then(()=>{
            console.log("Connected to MongoDB Successfully");
        }).catch((err)=>{
            console.log("Error in connecting to MongoDB exiting now..",err);
            process.exit();
        });

}