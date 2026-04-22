import { Router } from 'express';
import { createQuiz, generateQuizFromText, getQuizzes } from '../controllers/quiz.controller';
import { protect } from '../middlewares/auth.middleware';

const router = Router();

router.get('/', getQuizzes);                               // GET all quizzes
router.post('/generate', protect, createQuiz);             // from note (auth)
router.post('/generate-from-text', generateQuizFromText);  // from text (public)

export default router;
