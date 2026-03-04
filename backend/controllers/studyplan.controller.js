const { PrismaClient } = require('@prisma/client');
const { generateStudyPlan } = require('../services/ai.service');

const prisma = new PrismaClient();

const createStudyPlan = async (req, res) => {
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
                    create: generatedTasks.map(t => ({
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

module.exports = { createStudyPlan };
