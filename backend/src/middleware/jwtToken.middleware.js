import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../config/jwtConfig.js';


export const verifyToken=(req,res,next)=>{
    const header=req.headers['authorization'];
    console.log("Authorization header:", header);
    // Check if the header is present and starts with 'Bearer '
    const token=header && header.split(' ')[1];

    console.log("Extracted token:", token);
    if(!token){
        return res.status(401).json({message:"Access denied, no token provided"});
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.user=decoded;
        console.log("Decoded user:", req.user);
        next()

    } catch (error) {
        console.error("Error decoding token:", error);
        return res.status(401).json({message:"Invalid token"});
    }
}