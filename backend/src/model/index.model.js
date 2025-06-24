import { DataTypes} from "sequelize";


// This file initializes the Sequelize ORM and imports the models.
import { UserModel } from "./UserDB.js";
import { CategoryModel } from "./CategoryDB.js";
import {ServiceModel} from "./ServiceDB.js";
import { ServicePriceModel } from "./ServicePriceDb.js";
import { sequelize } from "../config/dbConfig.js";

const db={}


db.sequelize=sequelize


// initializing the models
db.User=UserModel(sequelize,DataTypes)
db.Category=CategoryModel(sequelize,DataTypes)
db.Service=ServiceModel(sequelize,DataTypes)
db.ServicePrice=ServicePriceModel(sequelize,DataTypes)


// defining the associations and relationships

db.Category.hasMany(db.Service,{foreignKey:"categoryId",onDelete:'CASCADE'})
db.Service.belongsTo(db.Category,{foreignKey:"categoryId"})

db.Service.hasMany(db.ServicePrice,{foreignKey:"servicePriceId",onDelete:'CASCADE'})
db.ServicePrice.belongsTo(db.Service,{foreignKey:"serviceId"})

export default db;