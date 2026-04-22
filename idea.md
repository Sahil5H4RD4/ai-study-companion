# 🚀 AI Study Companion – Project Idea

## 📌 Project Overview
**AI Study Companion** is an intelligent, full-stack learning assistant designed to help students organize their study materials, generate AI-powered summaries and quizzes, and track their academic progress. It bridges the gap between traditional note-taking and smart, personalized learning.

## 📖 Problem Statement
Students today face several challenges:
- **Disorganized Material**: Difficulty in managing scattered notes and resources.
- **Lack of Tracking**: No easy way to monitor learning progress over time.
- **Inefficient Revision**: Manual summarization and quiz creation consume valuable study time.
- **Limited Feedback**: Lack of instant doubt clarification and performance analysis.
- **Deadline Management**: Struggle to balance multiple assignments and exam dates.

*Current solutions lack a centralized, intelligent system that personalizes the learning experience.*

## 🎯 Objective
To build a **Full Stack AI-powered study assistant** that:
- 📂 **Organizes** subjects and notes efficiently.
- 📝 **Generates** concise AI summaries from uploaded content.
- 🧠 **Creates** automatic quizzes to test knowledge retention.
- 📊 **Tracks** performance and identifies weak areas.
- 📅 **Suggests** personalized revision plans based on exam schedules.

## 🧠 Core Features

### 👤 User Management
- **Secure Access**: Signup and Login with JWT Authentication.
- **Profile Customization**: Manage user details and preferences.

### 📚 Study Material Management
- **Smart Uploads**: Upload notes in PDF or Text format.
- **AI Summarization**: Get instant, digestible summaries of complex topics.
- **Organized Library**: Tag-based system for easy retrieval of notes.

### 📝 AI Quiz Generator
- **Auto-Generated MCQs**: Create quizzes directly from your notes.
- **Instant Evaluation**: Get immediate feedback on your answers.
- **Score History**: Track your scores over time.

### 📊 Performance Analytics
- **Insightful Dashboards**: Visualize your learning curve.
- **Weakness Detection**: Identify topics that need more focus.
- **Study Habits**: Monitor study time and consistency.

### ⏰ Smart Study Planner
- **Deadline Integration**: Input exam dates to generate a study schedule.
- **Adaptive Planning**: AI adjusts the plan based on your progress.
- **Daily Tasks**: Breakdown of study goals into manageable daily tasks.

## 🏗️ Tech Stack

### Backend
- **Runtime**: Node.js / Express
- **ORM**: Prisma
- **Database**: SQLite (Production on Render)
- **AI Integration**: Groq SDK (Llama 3.3-70b-versatile)
- **Deployment**: Render

### Frontend
- **Framework**: React / Next.js
- **Styling**: Vanilla CSS (Stitch Theme)
- **Deployment**: Vercel


## 🧠 Backend Architecture
The project follows **Clean Architecture** principles to ensure scalability and maintainability:

- `controllers/`: Handle incoming HTTP requests.
- `services/`: Contain business logic and AI integration.
- `repositories/`: Manage data access and database interactions.
- `models/`: Define data structures and schemas.
- `middlewares/`: Handle authentication and error processing.
- `utils/`: Helper functions and constants.

### OOP Principles Applied
- **Encapsulation**: Private class properties for sensitive data.
- **Abstraction**: Hiding complex service logic behind simple interfaces.
- **Inheritance**: `StudentUser` extending a base `User` class.
- **Polymorphism**: Multiple implementations for the `AIService` interface.

## 📌 Why This Project Stands Out
- **AI-First Approach**: Leverages ultra-fast Groq AI for content generation.
- **Robust Architecture**: Built with industry-standard design patterns and Prisma ORM.
- **Sleek UX**: Custom glassmorphic "Stitch" design system for a premium feel.
- **Cloud Native**: Fully deployed on Vercel and Render with automated CI/CD.

### 🌐 Live Links
- **Application**: [https://ai-study-companion-beige.vercel.app](https://ai-study-companion-beige.vercel.app)
- **Backend API**: [https://ai-study-companion-xp0u.onrender.com](https://ai-study-companion-xp0u.onrender.com)


