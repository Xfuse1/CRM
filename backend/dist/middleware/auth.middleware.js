"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddleware = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const JWT_SECRET = process.env.JWT_SECRET || 'your-super-secret-key';
const authMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader?.startsWith('Bearer ')) {
        return res.status(401).json({
            success: false,
            message: 'Unauthorized: missing or invalid token',
        });
    }
    const token = authHeader.slice('Bearer '.length).trim();
    try {
        const payload = jsonwebtoken_1.default.verify(token, JWT_SECRET);
        if (!payload?.userId) {
            return res.status(401).json({
                success: false,
                message: 'Unauthorized: invalid token payload',
            });
        }
        req.user = { id: payload.userId };
        return next();
    }
    catch (error) {
        return res.status(401).json({
            success: false,
            message: 'Unauthorized: invalid or expired token',
        });
    }
};
exports.authMiddleware = authMiddleware;
