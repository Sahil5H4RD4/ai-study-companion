import { Router } from 'express';
import multer from 'multer';
import { uploadNote, summarizeText, getNotes } from '../controllers/notes.controller';
import { protect } from '../middlewares/auth.middleware';

const router = Router();
const upload = multer({ dest: 'uploads/' });

router.get('/', getNotes);                                  // GET all notes
router.post('/upload', protect, upload.single('file'), uploadNote);  // file upload (auth)
router.post('/summarize-text', summarizeText);              // text input (public)

export default router;
