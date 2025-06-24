//  Service model for Sequelize ORM

export const ServiceModel = (sequelize, DataTypes) => {
    const Service = sequelize.define(
        "Service",
        {
            serviceId: {
                type: DataTypes.UUID,
                primaryKey: true, // primary key
                defaultValue: DataTypes.UUIDV4, // auto generate UUID
                allowNull: false, // cannot be null
            },
            serviceName: {
                type: DataTypes.STRING,
                allowNull: false, // cannot be null
            },
            type: {
                type: DataTypes.ENUM("Normal", "VIP"),
                defaultValue: "Normal", // default value is Normal
                allowNull: false, // cannot be null
            },
            categoryId:{
                type:DataTypes.UUID,
                allowNull: false, // cannot be null
            },
            priceOptions: {
                type: DataTypes.JSONB, // assuming priceOptions is a JSON object
                allowNull: true, // can be null if not provided
            },
        },
        { timestamps: true }
    );
    return Service;
};
