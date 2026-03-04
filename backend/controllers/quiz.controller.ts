import { PrismaClient } from '@prisma/client';
import { generateQuiz } from '../services/ai.service';
import { Response } from 'express';
import { AuthRequest } from '../middlewares/auth.middleware';

const prisma = new PrismaClient();

export const createQuiz = async (req: AuthRequest, res: Response): Promise<any> => {
    try {
        const { noteId, title } = req.body;
        const userId = req.user.userId;

        // Fetch note
        const note = await prisma.note.findUnique({ where: { id: noteId } });
        if (!note) {
            return res.status(404).json({ error: 'Note not found' });
        }

        // Generate Quiz using AI based on note content
        const generatedQuestions = await generateQuiz(note.content || note.summary || '');

        // Save to Database
        const quiz = await prisma.quiz.create({
            data: {
                title: title || `Quiz: ${note.title}`,
                userId,
                noteId,
                questions: {
                    create: generatedQuestions.map((q: any) => ({
                        text: q.text,
                        options: q.options,
                        correctOptionIndex: q.correctOptionIndex
                    }))
                }
            },
            include: {
                questions: true
            }
        });

        res.status(201).json({ message: 'Quiz generated successfully', quiz });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error during quiz generation' });
    }
};
