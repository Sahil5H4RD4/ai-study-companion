const express = require('express');
const multer = require('multer');
const { uploadNote } = require('../controllers/notes.controller');
const { protect } = require('../middlewares/auth.middleware');

const router = express.Router();

// Configure Multer for local storage
const upload = multer({ dest: 'uploads/' });

router.post('/upload', protect, upload.single('file'), uploadNote);

module.exports = router;
