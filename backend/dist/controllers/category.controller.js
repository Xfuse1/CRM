"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryController = void 0;
const category_service_1 = require("../services/category.service");
const apiResponse_1 = require("../utils/apiResponse");
const categoryService = new category_service_1.CategoryService();
class CategoryController {
    async createCategory(req, res) {
        try {
            const { name } = req.body;
            const userId = req.user?.id;
            const category = await categoryService.createCategory(userId, name);
            return res.status(201).json(apiResponse_1.ApiResponse.success('Category created successfully', category));
        }
        catch (error) {
            return res.status(500).json(apiResponse_1.ApiResponse.error('Failed to create category', error.message));
        }
    }
    async getCategories(req, res) {
        try {
            const userId = req.user?.id;
            const categories = await categoryService.getCategories(userId);
            return res.json(apiResponse_1.ApiResponse.success('Categories retrieved successfully', categories));
        }
        catch (error) {
            return res.status(500).json(apiResponse_1.ApiResponse.error('Failed to retrieve categories'));
        }
    }
    async updateCategory(req, res) {
        try {
            const { id } = req.params;
            const { name } = req.body;
            const userId = req.user?.id;
            const category = await categoryService.updateCategory(id, userId, name);
            return res.json(apiResponse_1.ApiResponse.success('Category updated successfully', category));
        }
        catch (error) {
            return res.status(500).json(apiResponse_1.ApiResponse.error('Failed to update category', error.message));
        }
    }
    async deleteCategory(req, res) {
        try {
            const { id } = req.params;
            const userId = req.user?.id;
            await categoryService.deleteCategory(id, userId);
            return res.json(apiResponse_1.ApiResponse.success('Category deleted successfully'));
        }
        catch (error) {
            return res.status(500).json(apiResponse_1.ApiResponse.error('Failed to delete category', error.message));
        }
    }
}
exports.CategoryController = CategoryController;
