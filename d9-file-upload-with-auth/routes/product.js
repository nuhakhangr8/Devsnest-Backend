const express = require('express');
const router = express.Router();
const {isAuthenticated,isSeller} = require("../utils/auth");

router.post("/create",isAuthenticated,isSeller,async(req,res)=>{
    
} );

module.exports = router;