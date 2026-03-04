"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = exports.register = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const client_1 = require("../generated/prisma/client");
// @ts-ignore
const prisma = new client_1.PrismaClient();
const register = async (req, res) => {
    try {
        const { email, password, fullName } = req.body;
        // Check if user exists
        const existingUser = await prisma.user.findUnique({ where: { email } });
        if (existingUser) {
            return res.status(400).json({ error: 'User already exists' });
        }
        // Hash password
        const salt = await bcryptjs_1.default.genSalt(10);
        const passwordHash = await bcryptjs_1.default.hash(password, salt);
        // Create user
        const user = await prisma.user.create({
            data: {
                email,
                passwordHash,
                fullName,
            },
        });
        res.status(201).json({ message: 'User registered successfully', userId: user.id });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
};
exports.register = register;
const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        // Check user exists
        const user = await prisma.user.findUnique({ where: { email } });
        if (!user) {
            return res.status(400).json({ error: 'Invalid credentials' });
        }
        // Check password
        const isMatch = await bcryptjs_1.default.compare(password, user.passwordHash);
        if (!isMatch) {
            return res.status(400).json({ error: 'Invalid credentials' });
        }
        // Generate JWT
        const payload = { userId: user.id, role: user.role };
        const token = jsonwebtoken_1.default.sign(payload, process.env.JWT_SECRET, { expiresIn: '1d' });
        res.json({ token, user: { id: user.id, email: user.email, fullName: user.fullName, role: user.role } });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
};
exports.login = login;
