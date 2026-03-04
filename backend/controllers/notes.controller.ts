import { PrismaClient } from '../generated/prisma/client';
import { generateSummary } from '../services/ai.service';
import fs from 'fs';
import readline from 'readline';
import { Response } from 'express';
import { AuthRequest } from '../middlewares/auth.middleware';

// @ts-ignore
const prisma = new PrismaClient();

export const uploadNote = async (req: AuthRequest, res: Response): Promise<any> => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: 'No file uploaded' });
        }

        const { title } = req.body;
        const userId = req.user.userId;

        // Basic text extraction from uploaded file (assuming .txt for now)
        let content = '';
        const fileStream = fs.createReadStream(req.file.path);
        const rl = readline.createInterface({
            input: fileStream,
            crlfDelay: Infinity
        });

        for await (const line of rl) {
            content += line + '\n';
        }

        // Generate Summary using AI
        const summary = await generateSummary(content);

        // Save to Database
        const note = await prisma.note.create({
            data: {
                title: title || req.file.originalname,
                content,
                summary,
                fileUrl: req.file.path,
                userId
            }
        });

        res.status(201).json({ message: 'Note uploaded and summarized', note });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error during note upload' });
    }
};
