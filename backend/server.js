const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
const authRoutes = require('./routes/auth.route');
const notesRoutes = require('./routes/notes.route');

app.use('/api/auth', authRoutes);
app.use('/api/notes', notesRoutes);

// Basic Route for testing
app.get('/', (req, res) => {
    res.json({ message: 'Welcome to the AI Study Companion API' });
});

// Start Server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
