const express = require('express');
const { createQuiz } = require('../controllers/quiz.controller');
const { protect } = require('../middlewares/auth.middleware');

const router = express.Router();

router.post('/generate', protect, createQuiz);

module.exports = router;
