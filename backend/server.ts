import express, { Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
import authRoutes from './routes/auth.route';
import notesRoutes from './routes/notes.route';
import quizRoutes from './routes/quiz.route';
import studyPlanRoutes from './routes/studyplan.route';

app.use('/api/auth', authRoutes);
app.use('/api/notes', notesRoutes);
app.use('/api/quiz', quizRoutes);
app.use('/api/studyplan', studyPlanRoutes);

// Basic Route for testing
app.get('/', (req: Request, res: Response) => {
    res.json({ message: 'Welcome to the AI Study Companion API' });
});

// Start Server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
