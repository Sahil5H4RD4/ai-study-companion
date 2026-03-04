"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const multer_1 = __importDefault(require("multer"));
const notes_controller_1 = require("../controllers/notes.controller");
const auth_middleware_1 = require("../middlewares/auth.middleware");
const router = (0, express_1.Router)();
// Configure Multer for local storage
const upload = (0, multer_1.default)({ dest: 'uploads/' });
router.post('/upload', auth_middleware_1.protect, upload.single('file'), notes_controller_1.uploadNote);
exports.default = router;
