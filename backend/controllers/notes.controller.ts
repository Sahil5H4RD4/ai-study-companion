import { PrismaClient } from '../generated/prisma/client';
import { generateSummary } from '../services/ai.service';
import fs from 'fs';
import readline from 'readline';
import { Response, Request } from 'express';
import { AuthRequest } from '../middlewares/auth.middleware';

// @ts-ignore
const prisma = new PrismaClient();

/**
 * NoteService — encapsulates note-related DB operations (OOP principle: Single Responsibility)
 */
class NoteService {
    async createNote(data: { title: string; content: string; summary: string; fileUrl?: string; userId?: string }) {
        return prisma.note.create({ data });
    }

    async getNotesByUser(userId: string) {
        return prisma.note.findMany({
            where: { userId },
            orderBy: { createdAt: 'desc' },
        });
    }

    async getNoteById(id: string) {
        return prisma.note.findUnique({ where: { id } });
    }
}

const noteService = new NoteService();

// POST /api/notes/upload — file upload
export const uploadNote = async (req: AuthRequest, res: Response): Promise<any> => {
    try {
        if (!req.file) return res.status(400).json({ error: 'No file uploaded' });

        const { title } = req.body;
        const userId = req.user.userId;

        let content = '';
        const fileStream = fs.createReadStream(req.file.path);
        const rl = readline.createInterface({ input: fileStream, crlfDelay: Infinity });
        for await (const line of rl) content += line + '\n';

        const summary = await generateSummary(content);
        const note = await noteService.createNote({
            title: title || req.file.originalname,
            content,
            summary,
            fileUrl: req.file.path,
            userId,
        });

        res.status(201).json({ message: 'Note uploaded and summarized', note });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error during note upload' });
    }
};

// POST /api/notes/summarize-text — direct text input (no auth, no file upload)
export const summarizeText = async (req: Request, res: Response): Promise<any> => {
    try {
        const { text, title } = req.body;
        if (!text || text.trim().length < 10) {
            return res.status(400).json({ error: 'Please provide text with at least 10 characters' });
        }

        const summary = await generateSummary(text);

        // Save without userId (guest/public usage — userId is optional in schema)
        const note = await noteService.createNote({
            title: title || 'Untitled Note',
            content: text,
            summary,
        });

        res.status(201).json({ message: 'Text summarized successfully', note });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error during summarization' });
    }
};

// GET /api/notes — list all notes (guest + user)
export const getNotes = async (req: Request, res: Response): Promise<any> => {
    try {
        const notes = await prisma.note.findMany({
            orderBy: { createdAt: 'desc' },
            take: 20,
        });
        res.json({ notes });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error fetching notes' });
    }
};
