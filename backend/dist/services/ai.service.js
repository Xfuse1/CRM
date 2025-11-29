"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AIService = void 0;
const openai_1 = __importDefault(require("openai"));
class AIService {
    constructor(apiKey = process.env.OPENAI_API_KEY) {
        this.client = apiKey ? new openai_1.default({ apiKey }) : null;
    }
    /**
     * Generate a reply for a bot/agent conversation.
     * Falls back to a friendly static response when OpenAI is not configured.
     */
    async generateReply(prompt, history = []) {
        if (!this.client) {
            return 'AI agent not configured yet. Set OPENAI_API_KEY to enable responses.';
        }
        const completion = await this.client.chat.completions.create({
            model: 'gpt-4o-mini',
            messages: [
                { role: 'system', content: 'You are a helpful WhatsApp CRM assistant.' },
                ...history,
                { role: 'user', content: prompt },
            ],
            temperature: 0.7,
        });
        return completion.choices[0]?.message?.content ?? '';
    }
}
exports.AIService = AIService;
