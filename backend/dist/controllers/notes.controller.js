"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadNote = void 0;
const client_1 = require("../generated/prisma/client");
const ai_service_1 = require("../services/ai.service");
const fs_1 = __importDefault(require("fs"));
const readline_1 = __importDefault(require("readline"));
const prisma = new client_1.PrismaClient({});
const uploadNote = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: 'No file uploaded' });
        }
        const { title } = req.body;
        const userId = req.user.userId;
        // Basic text extraction from uploaded file (assuming .txt for now)
        let content = '';
        const fileStream = fs_1.default.createReadStream(req.file.path);
        const rl = readline_1.default.createInterface({
            input: fileStream,
            crlfDelay: Infinity
        });
        for await (const line of rl) {
            content += line + '\n';
        }
        // Generate Summary using AI
        const summary = await (0, ai_service_1.generateSummary)(content);
        // Save to Database
        const note = await prisma.note.create({
            data: {
                title: title || req.file.originalname,
                content,
                summary,
                fileUrl: req.file.path,
                userId
            }
        });
        res.status(201).json({ message: 'Note uploaded and summarized', note });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error during note upload' });
    }
};
exports.uploadNote = uploadNote;
