"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryService = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
class CategoryService {
    async createCategory(userId, name) {
        return prisma.category.create({
            data: { name, userId },
        });
    }
    async getCategories(userId) {
        return prisma.category.findMany({
            where: { userId },
            orderBy: { createdAt: 'desc' },
        });
    }
    async updateCategory(id, userId, name) {
        const category = await prisma.category.findFirst({ where: { id, userId } });
        if (!category) {
            throw new Error('Category not found');
        }
        return prisma.category.update({
            where: { id },
            data: { name },
        });
    }
    async deleteCategory(id, userId) {
        const category = await prisma.category.findFirst({ where: { id, userId } });
        if (!category) {
            throw new Error('Category not found');
        }
        return prisma.category.delete({
            where: { id },
        });
    }
}
exports.CategoryService = CategoryService;
