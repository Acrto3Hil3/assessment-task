// This file defines the ServicePrice model for a Sequelize ORM setup.

export const ServicePriceModel=(sequelize,DataTypes)=>{
 const ServicePrice=sequelize.define("ServicePrice", 
    {
        servicePriceId:{
            type:DataTypes.UUID,
            primaryKey:true,
            defaultValue:DataTypes.UUIDV4,
            allowNull:false
        },        
        price:{
            type:DataTypes.DOUBLE,
            allowNull:false
        },
        duration:{
            type:DataTypes.STRING, // not clear the duration format, so assuming it's a string
            allowNull:false // 
        },
        type:{
            type:DataTypes.ENUM('Hourly','Weekly','Monthly'),
            defaultValue: 'Hourly', // default value is Hourly
            allowNull:false // cannot be null
        },
        serviceId:{
            type:DataTypes.UUID,
            allowNull:false // cannot be null
        }
    },{timestamps:true})
    return ServicePrice;
} 