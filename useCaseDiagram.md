# AI Study Companion - Use Case Diagram

![Use Case Diagram](assets/combined_diagrams.png)


```mermaid
useCaseDiagram
    actor Student as "Student"
    actor AI as "AI Service"

    package "AI Study Companion System" {
        usecase "Sign Up / Login" as UC1
        usecase "Manage Profile" as UC2
        usecase "Upload Study Material (PDF/Text)" as UC3
        usecase "View AI Summaries" as UC4
        usecase "Organize Notes by Tags" as UC5
        usecase "Generate AI Quiz" as UC6
        usecase "Take Quiz & View Score" as UC7
        usecase "View Performance Analytics" as UC8
        usecase "Generate Smart Study Plan" as UC9
    }

    Student --> UC1
    Student --> UC2
    Student --> UC3
    Student --> UC4
    Student --> UC5
    Student --> UC6
    Student --> UC7
    Student --> UC8
    Student --> UC9

    UC3 ..> AI : Uses
    UC6 ..> AI : Uses
    UC9 ..> AI : Uses
```
