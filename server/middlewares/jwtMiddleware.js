const jwt = require('jsonwebtoken')

const generatejwtToken = (req,res,next) =>{

    const {email} = req.body;

    if(email){
        const token = jwt.sign({email}, process.env.JWT_SECRET, {expiresIn: "1h"})
        res.cookies("token", token, {httpOnly:true});
        req.token = token;
        next();
    }else {
        res.status(400).json({ message: "Email is required to generate token" });
    }
}


const validateToken = (req,res,next)=>{
    const token = req.cookies.token;

    if(!token){
        res.status(401).send({message:"token not found"})
    }
    else{
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        req.decodedToken = decodedToken;
        next();
    }
}

module.exports = {generatejwtToken, validateToken};