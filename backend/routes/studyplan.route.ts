import { Router } from 'express';
import { createStudyPlan } from '../controllers/studyplan.controller';
import { protect } from '../middlewares/auth.middleware';

const router = Router();

router.post('/generate', protect, createStudyPlan);

export default router;
