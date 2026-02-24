# 🎓 AI Study Companion

<p align="center">
  <img src="https://img.shields.io/badge/Status-Design%20Phase-yellow?style=for-the-badge" alt="Status">
  <img src="https://img.shields.io/badge/Backend-Node.js%20%7C%20Express-339933?style=for-the-badge&logo=node.js&logoColor=white" alt="Backend">
  <img src="https://img.shields.io/badge/Frontend-React%20%7C%20Next.js-61DAFB?style=for-the-badge&logo=react&logoColor=black" alt="Frontend">
  <img src="https://img.shields.io/badge/AI-OpenAI%20%7C%20Gemini-412991?style=for-the-badge&logo=openai&logoColor=white" alt="AI">
  <img src="https://img.shields.io/badge/Database-PostgreSQL%20%7C%20MongoDB-4169E1?style=for-the-badge&logo=postgresql&logoColor=white" alt="Database">
</p>

> An intelligent, full-stack learning assistant that helps students organize study materials, generate AI-powered summaries & quizzes, and track academic progress.

---

## ✨ Key Features

| Feature | Description |
|---------|-------------|
| 📂 **Smart Notes** | Upload & organize notes with AI-powered summarization |
| 🧠 **Quiz Generator** | Auto-generate MCQs from your study materials |
| 📊 **Analytics** | Track performance and identify weak areas |
| ⏰ **Study Planner** | AI-driven revision schedules based on exam dates |
| 🔐 **Secure Auth** | JWT-based authentication & user management |

## 🏗️ Tech Stack

**Backend (75%)** — Node.js / Express · JWT · PostgreSQL / MongoDB · OpenAI / Gemini API  
**Frontend (25%)** — React / Next.js · Tailwind CSS · Chart.js

## 🏛️ Architecture Overview

```
┌──────────────┐     ┌──────────────┐     ┌──────────────┐
│   Frontend   │────▶│  Backend API │────▶│   Database   │
│  React/Next  │◀────│ Node/Express │◀────│ PostgreSQL / │
│              │     │              │     │   MongoDB    │
└──────────────┘     └──────┬───────┘     └──────────────┘
                            │
                     ┌──────▼───────┐
                     │  AI Service  │
                     │ OpenAI/Gemini│
                     └──────────────┘
```

## 📁 Project Structure

```
├── idea.md              # Detailed project idea & objectives
├── useCaseDiagram.md    # Use case diagram (Mermaid)
├── sequenceDiagram.md   # Sequence diagram (Mermaid)
├── classDiagram.md      # Class diagram (Mermaid)
├── ErDiagram.md         # ER diagram (Mermaid)
├── CONTRIBUTING.md      # Contribution guidelines
└── assets/              # Diagram images & media
```

## 📄 Documentation

- [**Project Idea**](idea.md) — Problem statement, objectives & feature breakdown
- [**Use Case Diagram**](useCaseDiagram.md) — Actor-system interactions
- [**Sequence Diagram**](sequenceDiagram.md) — Request flow & API interactions
- [**Class Diagram**](classDiagram.md) — OOP structure & relationships
- [**ER Diagram**](ErDiagram.md) — Database schema & entity relationships

## 🗺️ Roadmap

- [x] 📝 Define project idea & objectives
- [x] 📐 Create UML diagrams (Use Case, Sequence, Class, ER)
- [x] 📄 Complete documentation phase
- [ ] ⚙️ Set up backend project structure (Node.js / Express)
- [ ] 🗄️ Design & implement database schema
- [ ] 🔐 Implement JWT authentication
- [ ] 🤖 Integrate AI services (OpenAI / Gemini)
- [ ] 📚 Build note upload & summarization API
- [ ] 📝 Build quiz generation & evaluation API
- [ ] 📊 Build analytics & study planner APIs
- [ ] 🎨 Develop frontend UI (React / Next.js)
- [ ] 🧪 Write tests & finalize deployment

## 🚀 Getting Started

> 🔧 *Implementation coming soon — currently in the design & documentation phase.*

```bash
# Clone the repository
git clone https://github.com/Sahil5H4RD4/ai-study-companion.git
cd ai-study-companion

# Backend setup (coming soon)
npm install
npm run dev
```

## 🤝 Contributing

Contributions are welcome! Please read the [Contributing Guide](CONTRIBUTING.md) for details on our code of conduct, development workflow, and how to submit pull requests.

## 📝 License

This project is for educational purposes.

---

<p align="center">Made with ❤️ for smarter studying</p>
