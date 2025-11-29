"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const express_1 = __importDefault(require("express"));
const bot_routes_1 = __importDefault(require("./routes/bot.routes"));
const contact_routes_1 = __importDefault(require("./routes/contact.routes"));
const category_routes_1 = __importDefault(require("./routes/category.routes"));
const conversation_routes_1 = __importDefault(require("./routes/conversation.routes"));
const auth_routes_1 = __importDefault(require("./routes/auth.routes"));
const whatsapp_routes_1 = __importDefault(require("./routes/whatsapp.routes"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.get('/health', (_req, res) => res.json({ status: 'ok' }));
app.use('/api/auth', auth_routes_1.default);
app.use('/api/bots', bot_routes_1.default);
app.use('/api/contacts', contact_routes_1.default);
app.use('/api/categories', category_routes_1.default);
app.use('/api/conversations', conversation_routes_1.default);
app.use('/api/whatsapp', whatsapp_routes_1.default);
// Add error handling middleware as last middleware
const error_middleware_1 = require("./middleware/error.middleware");
app.use(error_middleware_1.errorMiddleware);
exports.default = app;
