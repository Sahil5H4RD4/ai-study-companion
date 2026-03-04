import { PrismaClient } from '../generated/prisma/client';
import { generateStudyPlan } from '../services/ai.service';
import { Response } from 'express';
import { AuthRequest } from '../middlewares/auth.middleware';

// @ts-ignore
const prisma = new PrismaClient();

export const createStudyPlan = async (req: AuthRequest, res: Response): Promise<any> => {
    try {
        const { topics, examDate } = req.body;
        const userId = req.user.userId;

        if (!topics || !Array.isArray(topics) || !examDate) {
            return res.status(400).json({ error: 'Topics array and examDate are required' });
        }

        // Generate Plan using AI
        const generatedTasks = await generateStudyPlan(topics, examDate);

        // Save to Database
        const studyPlan = await prisma.studyPlan.create({
            data: {
                userId,
                examDate: new Date(examDate),
                tasks: {
                    create: generatedTasks.map((t: any) => ({
                        title: t.title,
                        description: t.description,
                        dueDate: new Date(t.dueDate)
                    }))
                }
            },
            include: {
                tasks: true
            }
        });

        res.status(201).json({ message: 'Study Plan generated successfully', studyPlan });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error during study plan generation' });
    }
};
