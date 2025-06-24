import db from "../model/index.model.js"

const Category =db.Category // Importing the Category model
const Service=db.Service // Importing the Service model


// Controller function to create a new category
export const createCategoryController = async (req, res) =>{
    try {
        
        const {categoryName}= req.body;
        console.log("Category data received:", category);

        if(!categoryName){
            return res.status(400).json({ message: "Category name is required" });
        }

        const category=await Category.create({categoryName: categoryName});
        return res.status(201).json({ message: "Category created successfully", category });

    } catch (error) {
        console.error("Error creating category:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
}

// Controller function to get all categories list
export  const getAllCategoriesController = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1; // Default to page 1 if not provided
        const limit=parseInt(req.query.limit) || 10 // Default to 10 items per page if not provided
        const offset= (page - 1) * limit; // Calculate the offset for pagination

        const result = await Category.findAndCountAll({
            limit: limit,
            offset: offset,
            order: [['createdAt', 'DESC']], // Order by createdAt in descending order
        });
        res.status(200).json({
            totalItems: result.count,
            totalPages: Math.ceil(result.count / limit),
            currentPage: page,
            categories: result.rows
        });
    } catch (error) {
        console.error("Error fetching categories:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

// Controller function to update a single category by ID
export const updateCategoryController = async (req, res) => {
    try {
        const { categoryId } = req.params;
        const { categoryName } = req.body;

        if (!categoryName) {
            return res.status(400).json({ message: "Category name is required" });
        }

        const category = await Category.findByPk(categoryId);
        if (!category ) {
            return res.status(404).json({ message: "Category not found" });
        }
        if(category.categoryName.length === 0){
            return res.status(400).json({ message: "Category name cannot be empty" });
        }

        category.categoryName = categoryName;
        await category.save();

        res.status(200).json({ message: "Category updated successfully", category });
    } catch (error) {
        console.error("Error updating category:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

// Controller function to delete a single category by ID
export const deleteCategoryController = async (req, res) => {
    try {
        const { categoryId } = req.params;
        const service = await Service.findAll({where: { categoryId: categoryId }});
        if (service.length > 0) {
            return res.status(400).json({ message: "Cannot delete category with associated services" });
        }
         await Category.destroy({
            where: { categoryId: categoryId }
        });
        
        res.status(200).json({ message: "Category deleted successfully" });
    } catch (error) {
        console.error("Error deleting category:", error);
        res.status(500).json({ message: "Internal server error", error: error.message });

    }
}
