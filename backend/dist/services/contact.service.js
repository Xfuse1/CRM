"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContactService = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
class ContactService {
    async createContact(userId, data) {
        return prisma.contact.create({
            data: { ...data, userId },
        });
    }
    async getContacts(userId) {
        return prisma.contact.findMany({
            where: { userId },
            orderBy: { createdAt: 'desc' },
        });
    }
    async updateContact(id, userId, data) {
        const contact = await prisma.contact.findFirst({ where: { id, userId } });
        if (!contact) {
            throw new Error('Contact not found');
        }
        return prisma.contact.update({
            where: { id },
            data,
        });
    }
    async deleteContact(id, userId) {
        const contact = await prisma.contact.findFirst({ where: { id, userId } });
        if (!contact) {
            throw new Error('Contact not found');
        }
        return prisma.contact.delete({
            where: { id },
        });
    }
}
exports.ContactService = ContactService;
