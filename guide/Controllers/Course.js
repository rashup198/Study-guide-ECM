const Course = require("../Models/Course");

// create course
exports.createCourse= async(req,res)=>{
    try {
        const{domain, content}= req.body;

        if(!domain || !content){
            return res.status(400).json({
                success:false,
                error:"Fill all the domain and content filed"
            })
        }

        const course= await Course.create(req.body);

        return res.status(200).json({
            success:true,
            data:course
        })
    } catch (error) {
        console.log(error);
        return res.status(400).json({
            success: false,
            error: err.message 
        });
    }
}

// get course by id

exports.getCourse= async(req,res)=>{
    try {
        const {courseId}= req.body;
        
        const getCourseDetail = await Course.findById(courseId);
        if(!getCourseDetail){
            return res.status(404).json({
                success: false,
                error: 'Course not found' }); 
        }

        return res.status(200).json({
            success:true,
            data:getCourseDetail
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
        success: false,
        error: err.message 
    }); 
    }
}

// delete course

exports.deleteCourse= async (req,res)=>{

    try {
        const {courseId}= req.body;
        const courseDetail = await Course.findById(courseId)
        if(!courseDetail){
            return res.status(400).json({
                success:false,
                error:"Course not found"
            })
        }

        await Course.findByIdAndDelete(courseId)

        return res.status(200).json({
            success :true,
            message:"Course Deleted SuccessFully"
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message:"Something went wrong",
        })
    }
}

// get all course

exports.getAllCourses = async (req, res) => {
    try {
        const courses = await Course.find();
        res.status(200).json({ 
            success: true, 
            data: courses });
    } catch (err) {
        res.status(500).json({ 
            success: false, 
            error: err.message });
    }
};


