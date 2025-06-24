import db from "../model/index.model";
import dotenv from "dotenv";
import { generateToken } from "../utils/tokenUtils.utils";
dotenv.config();

const User=db.User

export const loginController=async(req,res)=>{
    const {email,password}=req.body;
    console.log("Login request received with email:", email);
    console.log("Login request received with password:", password);

    const fixedEmail =process.env.Email || 'admin@codesfortommorrow.com'
    const fixedPassword =process.env.Password || 'Admin123!@#'

    if(email!==fixedEmail || password!==fixedPassword){
        console.log("Invalid email or password provided");
        return res.status(401).json({message:"Invalid email or password"});
    }
 
    const token =generateToken({ email: fixedEmail });
    return res.status(200).json({ message: "Login successful", token });
}
