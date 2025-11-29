"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConversationService = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
class ConversationService {
    async createConversation(userId, contactId, messages = []) {
        const cleanMessages = messages.filter((msg) => msg !== null);
        return prisma.conversation.create({
            data: {
                contactId,
                messages: cleanMessages,
                userId,
            },
        });
    }
    async getConversations(userId) {
        return prisma.conversation.findMany({
            where: { userId },
            orderBy: { updatedAt: 'desc' },
            include: {
                contact: true,
            },
        });
    }
    async getConversationById(id, userId) {
        return prisma.conversation.findFirst({
            where: { id, userId },
            include: {
                contact: true,
            },
        });
    }
    async updateConversation(id, userId, messages) {
        const conversation = await prisma.conversation.findFirst({ where: { id, userId } });
        if (!conversation) {
            throw new Error('Conversation not found');
        }
        const cleanMessages = (messages ?? []).filter((msg) => msg !== null);
        return prisma.conversation.update({
            where: { id },
            data: { messages: cleanMessages },
        });
    }
    async appendMessage(id, userId, message) {
        const conversation = await prisma.conversation.findFirst({ where: { id, userId } });
        if (!conversation) {
            throw new Error('Conversation not found');
        }
        const existingMessages = Array.isArray(conversation.messages)
            ? conversation.messages.filter((msg) => msg !== null)
            : [];
        const messages = [...existingMessages, message];
        return prisma.conversation.update({
            where: { id },
            data: { messages },
        });
    }
    async deleteConversation(id, userId) {
        const conversation = await prisma.conversation.findFirst({ where: { id, userId } });
        if (!conversation) {
            throw new Error('Conversation not found');
        }
        return prisma.conversation.delete({
            where: { id },
        });
    }
}
exports.ConversationService = ConversationService;
