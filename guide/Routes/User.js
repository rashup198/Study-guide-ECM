const express = require('express');
const router = express.Router();

// import the required controllers
const {
    login,
    signup,
    sendOtp,
} = require('../Controllers/User');

const{auth}=require('../Middlewares/auth')

// auth routes

router.post('/signup', signup);
router.post('/login', login);
router.post('/sendOtp', sendOtp);

module.exports = router;