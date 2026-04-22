# 🎓 AI Study Companion

<p align="center">
  <a href="https://ai-study-companion-beige.vercel.app"><img src="https://img.shields.io/badge/Live-Deployment-success?style=for-the-badge&logo=vercel&logoColor=white" alt="Live Deployment"></a>
  <img src="https://img.shields.io/badge/Backend-Node.js%20%7C%20Express-339933?style=for-the-badge&logo=node.js&logoColor=white" alt="Backend">
  <img src="https://img.shields.io/badge/Frontend-React%20%7C%20Next.js-61DAFB?style=for-the-badge&logo=react&logoColor=black" alt="Frontend">
  <img src="https://img.shields.io/badge/AI-Groq%20%7C%20Llama%203-f55036?style=for-the-badge&logo=ai&logoColor=white" alt="AI">
  <img src="https://img.shields.io/badge/Database-SQLite%20%7C%20Prisma-003B57?style=for-the-badge&logo=sqlite&logoColor=white" alt="Database">
</p>

> An intelligent, full-stack learning assistant that helps students organize study materials, generate AI-powered summaries & quizzes, and chat with a virtual tutor.

### 🚀 **[Access the Live Deployed Application Here!](https://ai-study-companion-beige.vercel.app)** 🚀


---

## ✨ Key Features

| Feature | Description |
|---------|-------------|
| 📂 **Smart Notes** | Upload & organize notes with AI-powered summarization |
| 🧠 **Quiz Generator** | Auto-generate MCQs from your study materials |
| 🤖 **AI Chat Tutor** | Chat with a Llama 3.3 powered tutor for instant explanations |
| ⏰ **Study Planner** | AI-driven revision schedules based on exam dates |
| 🎨 **Stitch Design** | Beautiful, accessible, neon-glassmorphic responsive UI |

## 🏗️ Tech Stack

**Backend** — Node.js / Express · Prisma ORM · SQLite · Groq SDK (llama-3.3-70b-versatile) · **Deployed on Render**  
**Frontend** — React / Next.js · Tailwind CSS · "Stitch" Custom UI · **Deployed on Vercel**  
**DevOps** — Automated CI/CD via GitHub Integrations


## 🏛️ Architecture Overview

```
┌──────────────┐     ┌──────────────┐     ┌──────────────┐
│   Frontend   │────▶│  Backend API │────▶│   Database   │
│  React/Next  │◀────│ Node/Express │◀────│    SQLite    │
└──────────────┘     └──────┬───────┘     └──────────────┘
                            │
                     ┌──────▼───────┐
                     │  AI Service  │
                     │  Groq Llama 3│
                     └──────────────┘
```

## 📄 Documentation (SESD Final Submission)

- [**Project Idea**](idea.md) — Problem statement, objectives & feature breakdown
- [**Use Case Diagram**](useCaseDiagram.md) — Actor-system interactions
- [**Sequence Diagram**](sequenceDiagram.md) — Request flow & API interactions
- [**Class Diagram**](classDiagram.md) — OOP structure & relationships
- [**ER Diagram**](ErDiagram.md) — Database schema & entity relationships

## 🗺️ Roadmap & Completion

- [x] 📝 Define project idea & objectives
- [x] 📐 Create UML diagrams (Use Case, Sequence, Class, ER)
- [x] 📄 Complete documentation phase
- [x] ⚙️ Set up backend project structure & OOP Architecture
- [x] 🗄️ Design & implement database schema (Prisma/SQLite)
- [x] 🤖 Integrate AI services (Migrated to Groq Llama 3 for latency)
- [x] 📚 Build note upload & summarization API
- [x] 📝 Build quiz generation API
- [x] 📊 Build AI chat tutor & study planner APIs
- [x] 🎨 Develop frontend UI (Next.js with custom Stitch theme)
- [x] 🧪 Finalize SESD deployment

## 🚀 Getting Started Locally

```bash
# Clone the repository
git clone https://github.com/Sahil5H4RD4/ai-study-companion.git
cd ai-study-companion

# 1. Setup Backend
cd backend
npm install
npx prisma db push
npm run dev # Runs on port 5000

# 2. Setup Frontend
cd ../frontend
npm install
npm run dev # Runs on port 3000
```

## 📝 License

This project is for educational purposes.

---

<p align="center">Made with ❤️ for smarter studying</p>
