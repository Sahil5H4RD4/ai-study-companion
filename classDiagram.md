# AI Study Companion - Class Diagram

The **Class Diagram** represents the static structure of the system, defining the objects, their attributes, methods, and relationships. It serves as a blueprint for the backend implementation and demonstrates strict adherence to Object-Oriented Programming (OOP) principles.

### 🏗️ Core Architecture & OOP Principles
- **Encapsulation**: Services (`NoteService`, `QuizService`, `StudyPlanService`) encapsulate database logic and business rules.
- **Single Responsibility Principle**: `ChatController` handles chat interactions, while `AIService` acts as a facade for Groq LLM integration.
- **Data Models**: `User`, `Note`, `Quiz`, `Question`, and `StudyPlan` represent Prisma ORM models with relational mapping.

![Class Diagram](assets/class_diagram.png)

```mermaid
classDiagram
    class User {
        +String id
        +String email
        +String passwordHash
        +String fullName
        +Role role
        +DateTime createdAt
    }

    class Note {
        +String id
        +String title
        +String content
        +String summary
        +String userId
        +DateTime createdAt
    }

    class Quiz {
        +String id
        +String title
        +String userId
        +String noteId
        +DateTime createdAt
    }

    class Question {
        +String id
        +String text
        +Json options
        +int correctOptionIndex
        +String quizId
    }

    class StudyPlan {
        +String id
        +DateTime examDate
        +String userId
        +DateTime createdAt
    }

    class Task {
        +String id
        +String title
        +String description
        +boolean isCompleted
        +DateTime dueDate
        +String studyPlanId
    }

    class NoteService {
        +createNote(data: Object) Promise~Note~
        +getAllNotes() Promise~List~Note~~
        +updateNoteSummary(id: String, summary: String) Promise~Note~
    }

    class QuizService {
        +createQuiz(data: Object) Promise~Quiz~
        +getAllQuizzes() Promise~List~Quiz~~
    }

    class StudyPlanService {
        +createPlan(data: Object) Promise~StudyPlan~
        +getAllPlans() Promise~List~StudyPlan~~
        +updateTaskCompletion(taskId: String, isCompleted: boolean) Promise~Task~
    }

    class ChatController {
        +chat(req: Request, res: Response) Promise~void~
    }

    class AIService {
        <<facade>>
        +generateSummary(text: String) Promise~String~
        +generateQuiz(text: String) Promise~List~Object~~
        +generateStudyPlan(topics: List~String~, targetDateISO: String) Promise~List~Object~~
        +generateChatResponse(message: String, history: List~Object~) Promise~String~
    }

    %% Relationships
    User "1" *-- "many" Note : owns
    User "1" *-- "many" Quiz : takes
    User "1" *-- "many" StudyPlan : has
    
    Note "1" --> "1" Quiz : source for
    Quiz "1" *-- "many" Question : contains
    StudyPlan "1" *-- "many" Task : includes

    %% Dependency mapping
    NoteService ..> Note : manages
    QuizService ..> Quiz : manages
    StudyPlanService ..> StudyPlan : manages
    
    NoteService ..> AIService : delegates summarization
    QuizService ..> AIService : delegates generation
    StudyPlanService ..> AIService : delegates planning
    ChatController ..> AIService : delegates chatting
```
