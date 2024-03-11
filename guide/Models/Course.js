const mongoose= require('mongoose')

const courseSchema= new mongoose.Schema(
    {
       domain:{
        type:String,
       },
       content:[
        {
            courseTitle:{
                type:String,
                required:true,
                trim:true
            },
            credits:{
                type:String,
                required:true
            },
            syllabus:{
                type:String
            },
            studyMaterials:[
                {
                    moduleNo:{
                        type:Number
                    },
                    moduleName:{
                        type:String
                    },
                    moduleDiscription:{
                        type:String
                    },
                    materialLink:{
                        type:String
                    }
                }
            ],
        
        prevPaper:[
        {
            examType:{
                type:String
            },
            slot:{
                type:String
            },
            year:{
                type:String
            },
            paperLink:{
                type:String
            }
        }
       ],
       refVideos:[
        {
            moduleNo:{
                type:Number
            } ,
            videos:[
                {
                    topic:{
                        type:String
                    },
                    videoLink:{
                        type:String
                    }
                }
            ]
        }
       ]
    }
],
    },{timestamps:true}
)

module.exports=mongoose.model("Course", courseSchema)