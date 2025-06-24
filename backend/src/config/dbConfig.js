import dotenv from "dotenv";
import { Sequelize } from "sequelize";

dotenv.config();

const DB_NAME = process.env.DATABASE_NAME;
const DB_USER_NAME = process.env.DATABASE_USER_NAME;
const DB_USER_PASSWORD = process.env.DATABASE_USER_PASSWORD;
const DB_HOST_NAME = process.env.DATABASE_HOST_NAME;
const DB_PORT_NO = parseInt(process.env.DATABASE_PORT_NO, 10);

export const sequelize = new Sequelize(DB_NAME, DB_USER_NAME, DB_USER_PASSWORD, {
    host: DB_HOST_NAME,
    port: DB_PORT_NO,
    dialect: 'mysql',
    logging: false,
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
});