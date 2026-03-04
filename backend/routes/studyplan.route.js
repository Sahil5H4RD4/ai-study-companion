const express = require('express');
const { createStudyPlan } = require('../controllers/studyplan.controller');
const { protect } = require('../middlewares/auth.middleware');

const router = express.Router();

router.post('/generate', protect, createStudyPlan);

module.exports = router;
