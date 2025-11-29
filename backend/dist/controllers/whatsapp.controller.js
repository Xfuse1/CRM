"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WhatsAppController = void 0;
const apiResponse_1 = require("../utils/apiResponse");
// In-memory placeholder store; replace with real WhatsApp session management.
const sessionStore = new Map();
class WhatsAppController {
    createSession(req, res) {
        const userId = req.user?.id;
        if (!userId)
            return res.status(401).json(apiResponse_1.ApiResponse.error('Unauthorized'));
        const existing = sessionStore.get(userId);
        if (existing) {
            existing.lastChecked = new Date();
            return res.json(apiResponse_1.ApiResponse.success('WhatsApp session already active', { status: existing.status }));
        }
        const session = {
            status: 'connected',
            createdAt: new Date(),
            lastChecked: new Date(),
        };
        sessionStore.set(userId, session);
        return res.status(201).json(apiResponse_1.ApiResponse.success('WhatsApp session created', { status: session.status }));
    }
    getStatus(req, res) {
        const userId = req.user?.id;
        if (!userId)
            return res.status(401).json(apiResponse_1.ApiResponse.error('Unauthorized'));
        const session = sessionStore.get(userId);
        if (!session) {
            return res.status(404).json(apiResponse_1.ApiResponse.error('No active WhatsApp session'));
        }
        session.lastChecked = new Date();
        return res.json(apiResponse_1.ApiResponse.success('WhatsApp session status retrieved', {
            status: session.status,
            lastChecked: session.lastChecked,
        }));
    }
}
exports.WhatsAppController = WhatsAppController;
