const express = require("express");
const app = require(app);
const {connectToDB} = require("./config/db.js");

connectToDB();

const PORT = 1338;

//middlewares
app.use(express.json());
app.use(express.static("content"));
app.use(express.urlencoded({extended:false}));



app.listen(PORT, ()=>{
    console.log("server is running");
})