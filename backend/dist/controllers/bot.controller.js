"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BotController = void 0;
const bot_service_1 = require("../services/bot.service");
const apiResponse_1 = require("../utils/apiResponse");
const botService = new bot_service_1.BotService();
class BotController {
    async createBot(req, res) {
        try {
            const { name, type, config } = req.body;
            const userId = req.user?.id;
            if (!userId)
                return res.status(401).json(apiResponse_1.ApiResponse.error('Unauthorized'));
            const bot = await botService.createBot(userId, { name, type, config });
            res.status(201).json(apiResponse_1.ApiResponse.success('Bot created successfully', bot));
        }
        catch (error) {
            res.status(500).json(apiResponse_1.ApiResponse.error('Failed to create bot'));
        }
    }
    async getBots(req, res) {
        try {
            const userId = req.user?.id;
            if (!userId)
                return res.status(401).json(apiResponse_1.ApiResponse.error('Unauthorized'));
            const bots = await botService.getBotsByUser(userId);
            res.json(apiResponse_1.ApiResponse.success('Bots retrieved successfully', bots));
        }
        catch (error) {
            res.status(500).json(apiResponse_1.ApiResponse.error('Failed to retrieve bots'));
        }
    }
    async updateBot(req, res) {
        try {
            const { id } = req.params;
            const { name, type, config } = req.body;
            const userId = req.user?.id;
            if (!userId)
                return res.status(401).json(apiResponse_1.ApiResponse.error('Unauthorized'));
            const bot = await botService.updateBot(id, userId, { name, type, config });
            res.json(apiResponse_1.ApiResponse.success('Bot updated successfully', bot));
        }
        catch (error) {
            res.status(500).json(apiResponse_1.ApiResponse.error('Failed to update bot'));
        }
    }
    async deleteBot(req, res) {
        try {
            const { id } = req.params;
            const userId = req.user?.id;
            if (!userId)
                return res.status(401).json(apiResponse_1.ApiResponse.error('Unauthorized'));
            await botService.deleteBot(id, userId);
            res.json(apiResponse_1.ApiResponse.success('Bot deleted successfully'));
        }
        catch (error) {
            res.status(500).json(apiResponse_1.ApiResponse.error('Failed to delete bot'));
        }
    }
}
exports.BotController = BotController;
