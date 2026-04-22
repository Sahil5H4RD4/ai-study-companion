import { PrismaClient } from '../generated/prisma/client';
import { generateQuiz } from '../services/ai.service';
import { Response, Request } from 'express';
import { AuthRequest } from '../middlewares/auth.middleware';

// @ts-ignore
const prisma = new PrismaClient();

/**
 * QuizService — encapsulates quiz DB operations (OOP: Single Responsibility)
 */
class QuizService {
    async createQuiz(data: {
        title: string;
        userId?: string;
        noteId?: string;
        questions: { text: string; options: any; correctOptionIndex: number }[];
    }) {
        return prisma.quiz.create({
            data: {
                title: data.title,
                userId: data.userId,
                noteId: data.noteId,
                questions: {
                    create: data.questions.map((q) => ({
                        text: q.text,
                        options: q.options,
                        correctOptionIndex: q.correctOptionIndex,
                    })),
                },
            },
            include: { questions: true },
        });
    }

    async getAllQuizzes() {
        return prisma.quiz.findMany({
            orderBy: { createdAt: 'desc' },
            include: { questions: true },
            take: 20,
        });
    }
}

const quizService = new QuizService();

// POST /api/quiz/generate — from note (auth protected)
export const createQuiz = async (req: AuthRequest, res: Response): Promise<any> => {
    try {
        const { noteId, title } = req.body;
        const userId = req.user.userId;

        const note = await prisma.note.findUnique({ where: { id: noteId } });
        if (!note) return res.status(404).json({ error: 'Note not found' });

        const generatedQuestions = await generateQuiz(note.content || note.summary || '');
        const quiz = await quizService.createQuiz({
            title: title || `Quiz: ${note.title}`,
            userId,
            noteId,
            questions: generatedQuestions,
        });

        res.status(201).json({ message: 'Quiz generated successfully', quiz });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error during quiz generation' });
    }
};

// POST /api/quiz/generate-from-text — no auth required
export const generateQuizFromText = async (req: Request, res: Response): Promise<any> => {
    try {
        const { text, title } = req.body;
        if (!text || text.trim().length < 10) {
            return res.status(400).json({ error: 'Please provide text with at least 10 characters' });
        }

        const generatedQuestions = await generateQuiz(text);
        const quiz = await quizService.createQuiz({
            title: title || 'Quick Quiz',
            questions: generatedQuestions,
        });

        res.status(201).json({ message: 'Quiz generated successfully', quiz });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error during quiz generation' });
    }
};

// GET /api/quiz — list all quizzes
export const getQuizzes = async (req: Request, res: Response): Promise<any> => {
    try {
        const quizzes = await quizService.getAllQuizzes();
        res.json({ quizzes });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error fetching quizzes' });
    }
};
