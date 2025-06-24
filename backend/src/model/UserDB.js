// This model is extra if another user details are need to store


export const UserModel=(sequelize,DataTypes)=>{

const User=sequelize.define("User",{
    id:{
        type:DataTypes.UUID,
        primaryKey:true, // primary key
        defaultValue:DataTypes.UUIDV4, // auto generate UUID
        allowNull:false, // cannot be null
    },
    email:{
        type:DataTypes.STRING,
        allowNull:false, // cannot be null
        unique:true, // must be unique
        validate: {
            isEmail: true, // must be a valid email
            notEmpty: true,
        }
    },
    password:{
        type:DataTypes.STRING,
        allowNull:false, // cannot be null
        validate: {
            notEmpty: true,
            len: [6, 100], // password must be between 6 and 100 characters
            
        }
    }
},{
    timestamps: true,
})
return User
}


