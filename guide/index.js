const express = require('express');
const app = express();
require("dotenv").config
const database = require('./config/database');
const cookieParser = require('cookie-parser');

const PORT = process.env.PORT ||4000

// import the routes
const userRoutes = require("./Routes/User");
const courseRoutes = require("./Routes/Course")

// connecting the database
database.connect();

// middlewares
app.use(express.json());
app.use(cookieParser());

// routes
app.use("/api/v1/auth", userRoutes);
app.use("/api/v1/course",courseRoutes)

app.get('/', (req,res)=>{
    res.send("Wellcome to the study guide server!")
})

app.listen(PORT,()=>{
    console.log(`The server is running at ${PORT}`);
})
