const mongoose= require('mongoose')

const courseSchema= new mongoose.Schema(
    {
        courseId:{
            type:String,
            required:true
        },
        courseName:{
            type:String,
            required:true
        },
        courseType:{
            type:String,
            required:true
        },
        courseCredit:{
            type:String,
            required:true
        },
        courseContent:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"CourseContent"
        }
    },{timestamps:true}
)

module.exports=mongoose.model("Course", courseSchema)