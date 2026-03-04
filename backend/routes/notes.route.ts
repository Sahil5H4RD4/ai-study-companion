import { Router } from 'express';
import multer from 'multer';
import { uploadNote } from '../controllers/notes.controller';
import { protect } from '../middlewares/auth.middleware';

const router = Router();

// Configure Multer for local storage
const upload = multer({ dest: 'uploads/' });

router.post('/upload', protect, upload.single('file'), uploadNote);

export default router;
