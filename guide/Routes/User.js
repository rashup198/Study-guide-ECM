const express = require('express');
const router = express.Router();

// import the required controllers
const {
    login,
    signup,
    sendOtp,
} = require('../Controllers/Auth');

const{auth}=require('../middelwares/auth')

// auth routes

router.post('/signup', signup);
router.post('/login', login);
router.post('/sendOtp', sendOtp);

module.exports = router;