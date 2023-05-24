const isAuthenticated = async(req,res,next) => {
        try{
            const authHeader = req.headers.authorization;

            if(!authHeader){
                res.status(401).json({
                    message:"Authorization headers not found"
                });

            }
            // contains Bearer {Token}
            //need to get token out of it
            // after split ["Bearer","{Token}"]

            const token = authHeader.split(" ") [1];
            if(!token){
                res.status(401).json({
                    err:"token not found"
                })
            }
        }catch(e){
            res.status(500).send(e);
        }


}

