const express = require('express');
const router = express.Router();

const {
    createCourse,
    getCourse,
    deleteCourse,
    getAllCourses
}= require("../Controllers/Course");

const{auth}=require('../middelwares/auth')

router.post("/create-course", auth,createCourse);
router.get("/get-course", auth, getCourse);
router.delete("/deleteCourse", auth, deleteCourse);
router.get("/getAllCourse", auth, getAllCourses);


module.exports = router;