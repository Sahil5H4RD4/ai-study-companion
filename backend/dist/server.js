"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = process.env.PORT || 5000;
// Middleware
app.use((0, cors_1.default)());
app.use(express_1.default.json());
// Routes
const auth_route_1 = __importDefault(require("./routes/auth.route"));
const notes_route_1 = __importDefault(require("./routes/notes.route"));
const quiz_route_1 = __importDefault(require("./routes/quiz.route"));
const studyplan_route_1 = __importDefault(require("./routes/studyplan.route"));
app.use('/api/auth', auth_route_1.default);
app.use('/api/notes', notes_route_1.default);
app.use('/api/quiz', quiz_route_1.default);
app.use('/api/studyplan', studyplan_route_1.default);
// Basic Route for testing
app.get('/', (req, res) => {
    res.json({ message: 'Welcome to the AI Study Companion API' });
});
// Start Server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
