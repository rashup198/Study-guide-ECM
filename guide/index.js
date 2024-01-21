const express = require('express');
const app = express();
require("dotenv").config
const database = require("./Config/database")

const PORT = process.env.PORT ||4000

// connecting the database
database.connect();

app.get('/', (req,res)=>{
    res.send("Wellcome to the study guide server!")
})

app.listen(PORT,()=>{
    console.log(`The server is running at ${PORT}`);
})
