import jwt from "jsonwebtoken"
require("dotenv").config();

const authToken = async(req, res, next) => {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    // if token not found, send error message
    if(!token){
        res.status(400).json({
            errors: [
                {
                    msg: "Token not found"
                }
            ]
        })
    }

    // Authenticate token
    try{
        const user = await jwt.verify(token, process.env.JWT_SECRET)
        req.user = user.email;
        next();
    }catch(error){
        res.status(403).json({
            errors:[
                {
                    msg:"Invalid token"
                }
            ]
        })
    }
}
