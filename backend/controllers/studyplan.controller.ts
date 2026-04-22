import { PrismaClient } from '../generated/prisma/client';
import { generateStudyPlan } from '../services/ai.service';
import { Response, Request } from 'express';
import { AuthRequest } from '../middlewares/auth.middleware';

// @ts-ignore
const prisma = new PrismaClient();

/**
 * StudyPlanService — encapsulates study plan DB operations (OOP: Single Responsibility)
 */
class StudyPlanService {
    async createPlan(data: {
        userId?: string;
        examDate: Date;
        tasks: { title: string; description: string; dueDate: Date }[];
    }) {
        return prisma.studyPlan.create({
            data: {
                userId: data.userId,
                examDate: data.examDate,
                tasks: {
                    create: data.tasks.map((t) => ({
                        title: t.title,
                        description: t.description,
                        dueDate: t.dueDate,
                    })),
                },
            },
            include: { tasks: true },
        });
    }

    async getAllPlans() {
        return prisma.studyPlan.findMany({
            orderBy: { createdAt: 'desc' },
            include: { tasks: true },
            take: 20,
        });
    }

    async updateTaskCompletion(taskId: string, isCompleted: boolean) {
        return prisma.task.update({
            where: { id: taskId },
            data: { isCompleted },
        });
    }
}

const studyPlanService = new StudyPlanService();

// POST /api/studyplan/generate — with auth
export const createStudyPlan = async (req: AuthRequest, res: Response): Promise<any> => {
    try {
        const { topics, examDate } = req.body;
        const userId = req.user.userId;

        if (!topics || !Array.isArray(topics) || !examDate) {
            return res.status(400).json({ error: 'Topics array and examDate are required' });
        }

        const generatedTasks = await generateStudyPlan(topics, examDate);
        const studyPlan = await studyPlanService.createPlan({
            userId,
            examDate: new Date(examDate),
            tasks: generatedTasks.map((t: any) => ({
                title: t.title,
                description: t.description,
                dueDate: new Date(t.dueDate),
            })),
        });

        res.status(201).json({ message: 'Study Plan generated successfully', studyPlan });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error during study plan generation' });
    }
};

// POST /api/studyplan/generate-public — no auth
export const createStudyPlanPublic = async (req: Request, res: Response): Promise<any> => {
    try {
        const { topics, examDate } = req.body;

        if (!topics || !Array.isArray(topics) || !examDate) {
            return res.status(400).json({ error: 'Topics array and examDate are required' });
        }

        const generatedTasks = await generateStudyPlan(topics, examDate);
        const studyPlan = await studyPlanService.createPlan({
            examDate: new Date(examDate),
            tasks: generatedTasks.map((t: any) => ({
                title: t.title,
                description: t.description,
                dueDate: new Date(t.dueDate),
            })),
        });

        res.status(201).json({ message: 'Study Plan generated successfully', studyPlan });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error during study plan generation' });
    }
};

// GET /api/studyplan
export const getStudyPlans = async (req: Request, res: Response): Promise<any> => {
    try {
        const plans = await studyPlanService.getAllPlans();
        res.json({ plans });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error fetching study plans' });
    }
};

// PATCH /api/studyplan/task/:taskId
export const updateTask = async (req: Request, res: Response): Promise<any> => {
    try {
        const taskId = req.params.taskId as string;
        const { isCompleted } = req.body;
        const task = await studyPlanService.updateTaskCompletion(taskId, isCompleted);
        res.json({ task });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error updating task' });
    }
};
