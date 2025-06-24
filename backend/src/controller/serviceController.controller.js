import { where } from "sequelize";
import db from "../model/index.model.js";

const Service=db.Service // Importing the Service model from the index.model.js file
const ServicePrice=db.ServicePrice // Importing the ServicePrice model from the index.model.js file

// Controller function to create a new service
export const createServiceController = async (req, res) => {
try {
    const {serviceName,type,priceOptions}=req.body
    const {categoryId} = req.params;
    const service=await Service.create({serviceName,type,categoryId}) // Create a new service with the provided details
    if(priceOptions && priceOptions?.length > 0) {
        // If priceOptions are provided, create ServicePrice entries for each option
        const servicePrices = priceOptions.map(option => ({
            ...option,
            serviceId: service.id // Associate the price with the created service
        }));
        await ServicePrice.bulkCreate(servicePrices); // Bulk create ServicePrice entries
    }
    return res.status(201).json({ message: "Service created successfully", service });

} catch (error) {
    console.error("Error creating service:", error);
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
    
}

// Controller function to get all services by category ID
export const getAllServicesByCategoryController = async (req, res) => {
    try {
        
        const {categoryId} = req.params; // Extract categoryId from request parameters

        const page= parseInt(req.query.page) || 1; // Default to page 1 if not provided
        const limit= parseInt(req.query.limit) || 10; // Default to 10 items per page if not provided
        const offset= (page - 1) * limit; // Calculate the offset for pagination
        const result = await Service.findAndCountAll({
            where: { categoryId }, // Filter services by categoryId
            include: [{
                model: ServicePrice, // Include ServicePrice model to get price options                
            }],
            limit: limit, // Limit the number of results per page
            offset: offset, // Apply the offset for pagination
            order: [['createdAt', 'DESC']], // Order by createdAt in descending order
        });
        const totalPages = Math.ceil(result.count / limit); // Calculate total pages
        const services = result.rows; // Get the rows of services   
        return res.status(200).json({
            message: "Services fetched successfully",
            services,
            totalCount: result.count, // Total number of services
            totalPages, // Total number of pages
            currentPage: page // Current page number
        });
    } catch (error) {
        console.error("Error fetching services by category:", error);
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
}

// Controller function to update a service by ID
export const updateServiceController = async (req, res) => {
    try {
        const { serviceId } = req.params; // Extract serviceId from request parameters
        const { serviceName, type, priceOptions } = req.body; // Extract service details from request body

        const updateService=await Service.update({serviceName,type},{where: { serviceId }}); // Update the service with the provided details

        await ServicePrice.destroy({ where: { serviceId } }); // Delete existing price options for the service
        if (priceOptions && priceOptions?.length > 0) { // i also check if priceOptions are provided and handle the case where they they be null or empty
            // If priceOptions are provided, create ServicePrice entries for each option
            const servicePrices = priceOptions.map(option => ({
                ...option,
                serviceId: serviceId // Associate the price with the updated service
            }));
            await ServicePrice.bulkCreate(servicePrices); // Bulk create new ServicePrice entries
        }

        return res.status(200).json({ message: "Service updated successfully", serviceId, updateService:updateService });
    } catch (error) {
        console.error("Error updating service:", error);
        res.status(500).json({ message: "Internal server error", error: error.message });
        
    }
}

// Controller function to delete a service by ID
export const deleteServiceController = async (req, res) => {
    try {
        const { serviceId } = req.params; // Extract serviceId from request parameters

        // First, delete all associated ServicePrice entries
        await ServicePrice.destroy({ where: { serviceId } });

        // Then, delete the service itself
        const deletedService = await Service.destroy({ where: { serviceId } });

        if (deletedService) {
            return res.status(200).json({ message: "Service deleted successfully", serviceId });
        } else {
            return res.status(404).json({ message: "Service not found" });
        }
    } catch (error) {
        console.error("Error deleting service:", error);
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
}