import { Router } from 'express';
import { createQuiz } from '../controllers/quiz.controller';
import { protect } from '../middlewares/auth.middleware';

const router = Router();

router.post('/generate', protect, createQuiz);

export default router;
