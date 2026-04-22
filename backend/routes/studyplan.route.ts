import { Router } from 'express';
import { createStudyPlan, createStudyPlanPublic, getStudyPlans, updateTask } from '../controllers/studyplan.controller';
import { protect } from '../middlewares/auth.middleware';

const router = Router();

router.get('/', getStudyPlans);                            // GET all plans
router.post('/generate', protect, createStudyPlan);        // with auth
router.post('/generate-public', createStudyPlanPublic);    // public
router.patch('/task/:taskId', updateTask);                 // toggle task completion

export default router;
