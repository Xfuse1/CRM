"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConversationController = void 0;
const conversation_service_1 = require("../services/conversation.service");
const apiResponse_1 = require("../utils/apiResponse");
const ai_service_1 = require("../services/ai.service");
const conversationService = new conversation_service_1.ConversationService();
const aiService = new ai_service_1.AIService();
class ConversationController {
    async createConversation(req, res) {
        try {
            const { contactId, messages } = req.body;
            const userId = req.user?.id;
            const conversation = await conversationService.createConversation(userId, contactId, messages);
            return res.status(201).json(apiResponse_1.ApiResponse.success('Conversation created successfully', conversation));
        }
        catch (error) {
            return res.status(500).json(apiResponse_1.ApiResponse.error('Failed to create conversation', error.message));
        }
    }
    async getConversations(req, res) {
        try {
            const userId = req.user?.id;
            const conversations = await conversationService.getConversations(userId);
            return res.json(apiResponse_1.ApiResponse.success('Conversations retrieved successfully', conversations));
        }
        catch (error) {
            return res.status(500).json(apiResponse_1.ApiResponse.error('Failed to retrieve conversations'));
        }
    }
    async updateConversation(req, res) {
        try {
            const { id } = req.params;
            const { messages } = req.body;
            const userId = req.user?.id;
            const conversation = await conversationService.updateConversation(id, userId, messages);
            return res.json(apiResponse_1.ApiResponse.success('Conversation updated successfully', conversation));
        }
        catch (error) {
            return res.status(500).json(apiResponse_1.ApiResponse.error('Failed to update conversation', error.message));
        }
    }
    async appendMessage(req, res) {
        try {
            const { id } = req.params;
            const { message } = req.body;
            const userId = req.user?.id;
            const conversation = await conversationService.appendMessage(id, userId, message);
            return res.json(apiResponse_1.ApiResponse.success('Message added successfully', conversation));
        }
        catch (error) {
            return res.status(500).json(apiResponse_1.ApiResponse.error('Failed to add message', error.message));
        }
    }
    async deleteConversation(req, res) {
        try {
            const { id } = req.params;
            const userId = req.user?.id;
            await conversationService.deleteConversation(id, userId);
            return res.json(apiResponse_1.ApiResponse.success('Conversation deleted successfully'));
        }
        catch (error) {
            return res.status(500).json(apiResponse_1.ApiResponse.error('Failed to delete conversation', error.message));
        }
    }
    async generateAIReply(req, res) {
        try {
            const { id } = req.params;
            const { prompt } = req.body;
            const userId = req.user?.id;
            const conversation = await conversationService.getConversationById(id, userId);
            if (!conversation) {
                return res.status(404).json(apiResponse_1.ApiResponse.error('Conversation not found'));
            }
            const history = Array.isArray(conversation.messages) ? conversation.messages : [];
            const reply = await aiService.generateReply(prompt ?? '', history);
            const updatedConversation = await conversationService.appendMessage(id, userId, {
                role: 'assistant',
                content: reply,
            });
            return res.json(apiResponse_1.ApiResponse.success('AI reply generated', {
                reply,
                conversation: updatedConversation,
            }));
        }
        catch (error) {
            return res.status(500).json(apiResponse_1.ApiResponse.error('Failed to generate AI reply', error.message));
        }
    }
}
exports.ConversationController = ConversationController;
