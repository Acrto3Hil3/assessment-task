//  category model
export const CategoryModel=(sequelize,DataTypes)=>{
    const Category=sequelize.define("Category", 
        {
            categoryId:{
                type:DataTypes.UUID,
                primaryKey:true,
                defaultValue:DataTypes.UUIDV4,
                allowNull:false
            },        
            categoryName:{
                type:DataTypes.STRING,
                allowNull:false
            },
            
        },{timestamps:true})
    return Category;
}