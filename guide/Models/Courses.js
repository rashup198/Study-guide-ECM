const mongoose = require("mongoose");

const coursesSchema = new mongoose.Schema(
    {
    categoryName:{
        type:String,
        required:true,
    },
    totalCredits:{
        type:String,
        required:true
    },
    courses:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Course"
    }
},{timestamps:true})

module.exports= mongoose.model("Courses",coursesSchema)