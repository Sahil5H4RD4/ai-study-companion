# AI Study Companion - Sequence Diagram

The **Sequence Diagram** details the step-by-step flow of operations for key features, showing how the Frontend, Backend, Database, and AI Service interact over time.

### 🔄 Key Workflows
1.  **Upload & Summary**: How a student uploads a note and receives an AI-generated summary.
2.  **Quiz Generation**: The process of creating a quiz from notes, taking it, and receiving scores.
3.  **Generate Smart Study Plan**: How a student requests a study plan and AI generates daily tasks based on topics and deadlines.
4.  **AI Chat Tutor**: How a student asks questions and the backend handles conversation history with Groq.

![Sequence Diagram](assets/sequence_diagram.png)

## Feature: Upload Note & Generate Summary

```mermaid
sequenceDiagram
    autonumber
    actor S as Student
    participant FE as Frontend (Next.js)
    participant API as Backend (Express)
    participant DB as Database (SQLite)
    participant AI as AI Service (Groq)

    S->>FE: Provide Study Material (Text)
    activate FE
    FE->>API: POST /api/notes/summarize-text (text, title)
    activate API
    
    API->>API: Validate Text
    API->>AI: Request Summary Generation (text)
    activate AI
    AI-->>API: Returning Summary Text
    deactivate AI

    API->>DB: Save Note Metadata & Summary
    activate DB
    DB-->>API: Confirmation
    deactivate DB

    API-->>FE: Return Success Response (note, summary)
    deactivate API
    
    FE-->>S: Display Success & Summary
    deactivate FE
```

## Feature: Generate Quick Quiz

```mermaid
sequenceDiagram
    autonumber
    actor S as Student
    participant FE as Frontend
    participant API as Backend
    participant AI as AI Service
    participant DB as Database

    S->>FE: Request Quiz from Text
    activate FE
    FE->>API: POST /api/quiz/generate-from-text (text)
    activate API

    API->>AI: Generate MCQs from Content
    activate AI
    AI-->>API: List of Questions & Answers (JSON)
    deactivate AI

    API->>DB: Save Quiz & Questions
    activate DB
    DB-->>API: quizId
    deactivate DB

    API-->>FE: Return Quiz Data
    deactivate API
    FE-->>S: Display Interactive Quiz
    deactivate FE
```

## Feature: Generate Smart Study Plan

```mermaid
sequenceDiagram
    autonumber
    actor S as Student
    participant FE as Frontend
    participant API as Backend
    participant AI as AI Service
    participant DB as Database

    S->>FE: Request Study Plan (topics, examDate)
    activate FE
    FE->>API: POST /api/studyplan/generate-public (topics, examDate)
    activate API

    API->>AI: Generate Plan (topics, examDate)
    activate AI
    AI-->>API: List of Daily Tasks (JSON)
    deactivate AI

    API->>DB: Save Study Plan & Tasks
    activate DB
    DB-->>API: planId
    deactivate DB

    API-->>FE: Return Study Plan Data
    deactivate API
    FE-->>S: Display Study Calendar/Tasks
    deactivate FE
```

## Feature: AI Chat Tutor

```mermaid
sequenceDiagram
    autonumber
    actor S as Student
    participant FE as Frontend
    participant API as Backend
    participant AI as AI Service (Groq)

    S->>FE: Send Message in Chat
    activate FE
    FE->>API: POST /api/chat (message, history)
    activate API

    API->>API: Validate/Sanitize History
    API->>AI: generateChatResponse(message, history)
    activate AI
    AI-->>API: Returning AI Tutor Reply
    deactivate AI

    API-->>FE: Return { reply }
    deactivate API
    FE-->>S: Append Assistant Bubble to Chat
    deactivate FE
```
