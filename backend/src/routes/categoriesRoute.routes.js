

import express from 'express';
import { verifyToken } from '../middleware/jwtToken.middleware.js';
import { createCategoryController, deleteCategoryController, getAllCategoriesController, updateCategoryController } from '../controller/categoryController.controller.js';

const router = express.Router();

router.post('/category',verifyToken,createCategoryController) // Create a new category

router.get('/categories', verifyToken, getAllCategoriesController); // Get all categories with pagination

router.put('/category/:categoryId',verifyToken,updateCategoryController); // Update a single category by ID

router.delete('/category/:categoryId',verifyToken,deleteCategoryController); // Delete a single category by ID

// Export the router to be used in the main app file
export const categoriesRoute = router;
