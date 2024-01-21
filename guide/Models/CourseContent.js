const mongoose = require('mongoose');

const CourseContentSchema = new mongoose.Schema({

    course_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course'
    },
    videoRef: {
        type:String,
    },
    notesRef: {
        type:String,
    },
    assignmentRef: {
        type:String,
    },

});

module.exports = mongoose.model('CourseContent', CourseContentSchema);