# AI Study Companion - Sequence Diagram

The **Sequence Diagram** details the step-by-step flow of operations for key features, showing how the Frontend, Backend, Database, and AI Service interact over time.

### 🔄 Key Workflows
1.  **Upload & Summary**: How a student uploads a note and receives an AI-generated summary.
2.  **Quiz Generation & Attempt**: The process of creating a quiz from notes, taking it, and submitting answers for scoring.
3.  **Generate Smart Study Plan**: How a student requests a study plan and AI generates daily tasks based on topics and deadlines.

![Sequence Diagram](assets/sequence_diagram.png)

## Feature: Upload Note & Generate Summary

```mermaid
sequenceDiagram
    autonumber
    actor S as Student
    participant FE as Frontend (React/Next.js)
    participant API as Backend API (Node/Spring)
    participant DB as Database
    participant AI as AI Service (OpenAI)

    S->>FE: Upload Study Material (PDF/Text)
    activate FE
    FE->>API: POST /api/notes/upload (file, userId)
    activate API
    
    API->>API: Validate File & User
    API->>AI: Request Summary Generation (fileContent)
    activate AI
    AI-->>API: Returning Summary Text
    deactivate AI

    API->>DB: Save Note Metadata & Summary
    activate DB
    DB-->>API: Confirmation
    deactivate DB

    API-->>FE: Return Success Response (noteId, summary)
    deactivate API
    
    FE-->>S: Display Success & Summary
    deactivate FE
```

## Feature: Generate & Take Quiz

```mermaid
sequenceDiagram
    autonumber
    actor S as Student
    participant FE as Frontend
    participant API as Backend API
    participant AI as AI Service
    participant DB as Database

    S->>FE: Request Quiz (noteId)
    activate FE
    FE->>API: POST /api/quiz/generate (noteId)
    activate API

    API->>DB: Fetch Note Content
    activate DB
    DB-->>API: content
    deactivate DB

    API->>AI: Generate MCQs from Content
    activate AI
    AI-->>API: List of Questions & Answers
    deactivate AI

    API->>DB: Save Quiz & Questions
    activate DB
    DB-->>API: quizId
    deactivate DB

    API-->>FE: Return Quiz Data
    deactivate API
    FE-->>S: Display Quiz Interface

    S->>FE: Submit Answers
    FE->>API: POST /api/quiz/submit (quizId, answers)
    activate API
    
    API->>API: Calculate Score
    API->>DB: Save User Progress/Result
    activate DB
    DB-->>API: Success
    deactivate DB

    API-->>FE: Return Score & Feedback
    deactivate API
    FE-->>S: Show Results
    deactivate FE
```

## Feature: Generate Smart Study Plan

```mermaid
sequenceDiagram
    autonumber
    actor S as Student
    participant FE as Frontend
    participant API as Backend API
    participant AI as AI Service
    participant DB as Database

    S->>FE: Request Study Plan (topics, examDate)
    activate FE
    FE->>API: POST /api/studyplan/generate (topics, examDate)
    activate API

    API->>AI: Generate Plan (topics, examDate)
    activate AI
    AI-->>API: List of Daily Tasks
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
