import dotenv from 'dotenv';
dotenv.config();
import jwt from 'jsonwebtoken';
import { JWT_SECRET, JWT_EXPIRATION } from '../config/jwtConfig.js';

export const generateToken = (email) => {
    return jwt.sign({email:email }, JWT_SECRET, { expiresIn: JWT_EXPIRATION });
};
