const express = require("express");
const router = express.Router();
const User = require("../models/userModel");
const bcrypt = require("bcrypt");

const validators={
    validateName,
    validateEmail,
    validatePassword
} = require("../utils/validators");

router.post("/signup",async(req,res)=>{
    try{
        const { name, email, password, isSeller} = req.body;
        
        const existingUser = await User.findOne({ where: email})
        if(existingUser){
            return res.status(403).json({
                err:"User exists",
            })
        }

        if (!validateName(name)){
            return res.status(400).json({err:"name validate fails"})
        }
        if (!validateEmail(email)){
            return res.status(400).json({err:"email validate fails"})
        }
        if (!validatePassword(password)){
            return res.status(400).json({err:"password validate fails"})
        }

        const hashedPassword = await bcrypt.hash(password);

        const user = {
            name,
            email,
            isSeller,
            password:hashedPassword,
        }

        const createdUser = await User.create(user);

        return res.status(201).json({
            message:`welcome ${createdUser.name}`,
        })
    } catch(e){
        res.status(500).send(e);
    }

})


module.exports = router;