import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import {sequelize} from './src/config/dbConfig.js';
import { categoriesRoute } from './src/routes/categoriesRoute.routes.js';
import { serviceRoute } from './src/routes/serviceRoute.routes.js';
dotenv.config();

const app = express();

// it enables the cross-origin resource sharing (CORS) for the server, allowing the frontend to access the backend
app.use(express.urlencoded({ extended: true })) // parse the incoming reponse from form

app.use(cookieParser()) // it parse the cookies from the browser

app.use(express.json()) // it parse the json format

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "Cookie"],
    exposedHeaders: ["Set-Cookie"],
  })
)

app.use('/api', categoriesRoute);  // Categories routes
app.use('/api-v1', serviceRoute); // Service routes

app.get('/', (req, res) => {
    res.send('Hello World!');
})

const PORT = process.env.PORT || 5000;  
// Database connection and server start
const startServer = async () => {
    try {
        await sequelize.authenticate();
        console.log('Database connected successfully');
        
        await sequelize.sync({ alter: true });
        console.log('Database tables synchronized');
        
        app.listen(PORT, () => {
            console.log(`Server started at http://localhost:${PORT}`);
        });
    } catch (error) {
        console.error('Unable to connect to database:', error);
        console.log('Retrying connection in 5 seconds...');
        setTimeout(startServer, 5000);
    }
};

startServer();