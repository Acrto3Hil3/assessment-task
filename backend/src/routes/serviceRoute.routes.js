import express from 'express';
import { verifyToken } from '../middleware/jwtToken.middleware.js';
import { createServiceController, deleteServiceController, getAllServicesByCategoryController, updateServiceController } from '../controller/serviceController.controller.js';

const router = express.Router();

router.post('/category/:categoryId/service',verifyToken,createServiceController) // Create a new service under a specific category, requires authentication

router.get('/category/:categoryId/services',verifyToken,getAllServicesByCategoryController) // Get all services by category ID, requires authentication

router.put('/category/:categoryId/service/:serviceId', verifyToken, updateServiceController) // Update a service by ID under a specific category, requires authentication

router.delete('/category/:categoryId/service/:serviceId', verifyToken, deleteServiceController) // Delete a service by ID under a specific category, requires authentication

// Export the serviceRoute for use in the main application
export const serviceRoute = router;