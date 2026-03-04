"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const studyplan_controller_1 = require("../controllers/studyplan.controller");
const auth_middleware_1 = require("../middlewares/auth.middleware");
const router = (0, express_1.Router)();
router.post('/generate', auth_middleware_1.protect, studyplan_controller_1.createStudyPlan);
exports.default = router;
