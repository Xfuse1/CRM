"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BotService = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
class BotService {
    async createBot(userId, data) {
        return await prisma.bot.create({
            data: {
                ...data,
                userId,
            },
        });
    }
    async getBotsByUser(userId) {
        return await prisma.bot.findMany({
            where: { userId },
        });
    }
    async updateBot(id, userId, data) {
        const bot = await prisma.bot.findFirst({ where: { id, userId } });
        if (!bot) {
            throw new Error('Bot not found');
        }
        return await prisma.bot.update({
            where: { id },
            data,
        });
    }
    async deleteBot(id, userId) {
        const bot = await prisma.bot.findFirst({ where: { id, userId } });
        if (!bot) {
            throw new Error('Bot not found');
        }
        return await prisma.bot.delete({
            where: { id },
        });
    }
}
exports.BotService = BotService;
