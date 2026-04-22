import express, { Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// ─── Middleware ──────────────────────────────────────────────────────────────
app.use(cors({
    origin: ['http://localhost:3000', 'http://127.0.0.1:3000', 'https://sahil5h4rd4.github.io'],
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
}));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// ─── Routes ──────────────────────────────────────────────────────────────────
import authRoutes from './routes/auth.route';
import notesRoutes from './routes/notes.route';
import quizRoutes from './routes/quiz.route';
import studyPlanRoutes from './routes/studyplan.route';
import chatRoutes from './routes/chat.route';

app.use('/api/auth', authRoutes);
app.use('/api/notes', notesRoutes);
app.use('/api/quiz', quizRoutes);
app.use('/api/studyplan', studyPlanRoutes);
app.use('/api/chat', chatRoutes);

// ─── Health Check ─────────────────────────────────────────────────────────────
app.get('/', (req: Request, res: Response) => {
    res.json({
        message: '🎓 AI Study Companion API is running',
        version: '2.0.0',
        endpoints: ['/api/auth', '/api/notes', '/api/quiz', '/api/studyplan', '/api/chat'],
    });
});

// ─── Start ────────────────────────────────────────────────────────────────────
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
