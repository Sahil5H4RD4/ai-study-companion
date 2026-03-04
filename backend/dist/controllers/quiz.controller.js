"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createQuiz = void 0;
const client_1 = require("@prisma/client");
const ai_service_1 = require("../services/ai.service");
const prisma = new client_1.PrismaClient();
const createQuiz = async (req, res) => {
    try {
        const { noteId, title } = req.body;
        const userId = req.user.userId;
        // Fetch note
        const note = await prisma.note.findUnique({ where: { id: noteId } });
        if (!note) {
            return res.status(404).json({ error: 'Note not found' });
        }
        // Generate Quiz using AI based on note content
        const generatedQuestions = await (0, ai_service_1.generateQuiz)(note.content || note.summary || '');
        // Save to Database
        const quiz = await prisma.quiz.create({
            data: {
                title: title || `Quiz: ${note.title}`,
                userId,
                noteId,
                questions: {
                    create: generatedQuestions.map((q) => ({
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
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error during quiz generation' });
    }
};
exports.createQuiz = createQuiz;
