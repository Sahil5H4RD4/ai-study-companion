import { Router } from 'express';
import { chat } from '../controllers/chat.controller';

const router = Router();

router.post('/', chat);  // POST /api/chat

export default router;
