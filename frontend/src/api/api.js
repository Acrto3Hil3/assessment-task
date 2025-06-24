import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:5000' });

export const createCategory = (data) => API.post('/category', data);
export const getCategories = (page = 1, limit = 10) => API.get(`/category?page=${page}&limit=${limit}`);
export const updateCategory = (id, data) => API.put(`/category/${id}`, data);
export const deleteCategory = (id) => API.delete(`/category/${id}`);

export const createService = (categoryId, data) => API.post(`/service/${categoryId}`, data);
export const getServices = (categoryId, page = 1, limit = 10) => API.get(`/service/${categoryId}?page=${page}&limit=${limit}`);
export const updateService = (id, data) => API.put(`/service/${id}`, data);
export const deleteService = (id) => API.delete(`/service/${id}`);