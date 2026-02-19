# AI Study Companion - Entity Relationship Diagram

The **ER Diagram** visualizes the database schema, showing the tables and how they relate to each other. This structure ensures data integrity and efficient retrieval (e.g., retrieving all quizzes for a specific note).

### 🗄️ Database Schemas
- **USERS**: Stores account information and roles.
- **NOTES**: Contains metadata and content of uploaded files.
- **QUIZZES & QUESTIONS**: Stores generated tests and their associated questions/answers.
- **RESULTS**: Tracks student scores and progress.
- **STUDY_PLANS**: Manages personalized schedules and deadlines.

![ER Diagram](assets/er_diagram.png)


```mermaid
erDiagram
    USERS {
        UUID id PK
        VARCHAR email
        VARCHAR password_hash
        VARCHAR full_name
        TIMESTAMP created_at
        VARCHAR role "STUDENT/ADMIN"
    }

    NOTES {
        UUID id PK
        UUID user_id FK
        VARCHAR title
        TEXT content
        VARCHAR file_url
        TEXT summary
        TIMESTAMP created_at
    }

    TAGS {
        UUID id PK
        VARCHAR name
    }

    NOTE_TAGS {
        UUID note_id FK
        UUID tag_id FK
    }

    QUIZZES {
        UUID id PK
        UUID note_id FK "Optional link to source note"
        UUID created_by FK
        VARCHAR title
        TIMESTAMP created_at
    }

    QUESTIONS {
        UUID id PK
        UUID quiz_id FK
        TEXT question_text
        JSON options "Array of options"
        INTEGER correct_option_index
    }

    RESULTS {
        UUID id PK
        UUID user_id FK
        UUID quiz_id FK
        INTEGER score
        INTEGER total_questions
        TIMESTAMP attempted_at
    }

    STUDY_PLANS {
        UUID id PK
        UUID user_id FK
        DATE exam_date
        JSON generated_plan "Structure of daily tasks"
        TIMESTAMP created_at
    }

    USERS ||--o{ NOTES : uploads
    USERS ||--o{ RESULTS : achieves
    USERS ||--o{ STUDY_PLANS : has
    USERS ||--o{ QUIZZES : creates
    NOTES ||--o{ NOTE_TAGS : has
    TAGS ||--o{ NOTE_TAGS : belongs_to
    NOTES |o--o{ QUIZZES : generates
    QUIZZES ||--|{ QUESTIONS : contains
    QUIZZES ||--o{ RESULTS : refer
```
