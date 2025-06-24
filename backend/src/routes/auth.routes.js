import express from 'express';
import loginController from '../controller/authController.controller';

const router = express.Router();

router.post('/login',loginController) // Login route