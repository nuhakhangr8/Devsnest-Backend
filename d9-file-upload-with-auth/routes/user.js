const express = require("express");
const router = express.Router();

const validators{
    validateName,
    validateEmail,
    validatePassword
} = require("../utils/validators");

router.post("/signup",async(req,res)=>{
    try{
        const { name, email, password, isSeller} = req.body;
        
        const existingUser = await 

    } catch(e){
        res.status(500).send(e);
    }

})


module.exports = router;