import { generateChatResponse } from '../services/ai.service';
import { Request, Response } from 'express';

/**
 * ChatController — handles AI Chat Tutor interactions (OOP: Single Responsibility)
 */
class ChatController {
    async chat(req: Request, res: Response): Promise<any> {
        try {
            const { message, history = [] } = req.body;

            if (!message || message.trim().length === 0) {
                return res.status(400).json({ error: 'Message is required' });
            }

            const reply = await generateChatResponse(message, history);
            res.json({ reply });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'AI chat service error' });
        }
    }
}

const chatController = new ChatController();

export const chat = chatController.chat.bind(chatController);
