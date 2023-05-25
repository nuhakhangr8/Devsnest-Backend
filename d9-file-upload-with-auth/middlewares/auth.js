const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

const isAuthenticated = async(req,res,next) => {
        try{
            const authHeader = req.headers.authorization;

            if(!authHeader){
                return res.status(401).json({
                    message:"Authorization headers not found"
                });

            }
            // contains Bearer {Token}
            //need to get token out of it
            // after split ["Bearer","{Token}"]

            const token = authHeader.split(" ") [1];
            if(!token){
                return res.status(401).json({
                    err:"token not found"
                })
            }

            const decoded = jwt.verify(token,"SECRET MESSAGE");
            const user = await User.findOne({where:{id:decoded.user.id}});

            if(!user){
                return res.status(404).json({
                    err:"user not found"
                })
            }

            //we are extending req.user as the user
            req.user = user;
            next();
        }catch(e){
            res.status(500).send(e);
        }


}

// const a = {}
// a.eggss = 123
// we have extended the object a
// a={eggss:123}
const isSeller = async (req,res,next) => {
   
        if(req.user.dataValues.isSeller){
            next();
        }else{
            return res.status(401).json({
                err:"You are not seller"
            })
    }    
}

module.exports = {isAuthenticated,isSeller};



