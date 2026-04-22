import Groq from 'groq-sdk';

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });
const MODEL = 'llama-3.3-70b-versatile';

// ─── Summary ────────────────────────────────────────────────────────────────
export const generateSummary = async (text: string): Promise<string> => {
    const chat = await groq.chat.completions.create({
        model: MODEL,
        messages: [
            {
                role: 'system',
                content:
                    'You are an expert educational summarizer. Create clear, concise, and structured summaries optimized for student learning. Use bullet points and headings where appropriate.',
            },
            {
                role: 'user',
                content: `Summarize the following educational text concisely and clearly:\n\n${text}`,
            },
        ],
        temperature: 0.4,
        max_tokens: 1024,
    });
    return chat.choices[0]?.message?.content ?? '';
};

// ─── Quiz Generation ─────────────────────────────────────────────────────────
export const generateQuiz = async (text: string): Promise<any[]> => {
    const chat = await groq.chat.completions.create({
        model: MODEL,
        messages: [
            {
                role: 'system',
                content:
                    'You are an expert quiz creator. Always respond with ONLY valid JSON — no markdown, no explanation, just the raw JSON array.',
            },
            {
                role: 'user',
                content: `Generate exactly 5 multiple-choice questions based on this text.
Return ONLY a JSON array where each element has:
- "text": question string
- "options": array of exactly 4 strings
- "correctOptionIndex": integer 0–3

Text:
${text}`,
            },
        ],
        temperature: 0.5,
        max_tokens: 2048,
    });

    let raw = (chat.choices[0]?.message?.content ?? '').trim();
    const match = raw.match(/\[[\s\S]*\]/);
    if (match) raw = match[0];
    return JSON.parse(raw);
};

// ─── Study Plan ───────────────────────────────────────────────────────────────
export const generateStudyPlan = async (topics: string[], targetDateISO: string): Promise<any[]> => {
    const chat = await groq.chat.completions.create({
        model: MODEL,
        messages: [
            {
                role: 'system',
                content:
                    'You are an expert academic planner. Always respond with ONLY valid JSON — no markdown, no explanation.',
            },
            {
                role: 'user',
                content: `Create a detailed study plan for these topics: ${topics.join(', ')}.
Exam date: ${targetDateISO}.
Return ONLY a JSON array of task objects, each with:
- "title": string (short task name)
- "description": string (what to study/do)
- "dueDate": ISO 8601 date string (must be before exam date)

Spread tasks evenly before the exam date.`,
            },
        ],
        temperature: 0.4,
        max_tokens: 2048,
    });

    let raw = (chat.choices[0]?.message?.content ?? '').trim();
    const match = raw.match(/\[[\s\S]*\]/);
    if (match) raw = match[0];
    return JSON.parse(raw);
};

// ─── Chat ─────────────────────────────────────────────────────────────────────
export const generateChatResponse = async (message: string, history: { role: 'user' | 'assistant'; content: string }[]): Promise<string> => {
    // Groq/Llama-3 strictly requires the first message after system to be from 'user'.
    // Remove any leading 'assistant' messages from history.
    let validHistory = [...history];
    while (validHistory.length > 0 && validHistory[0].role === 'assistant') {
        validHistory.shift();
    }

    const chat = await groq.chat.completions.create({
        model: MODEL,
        messages: [
            {
                role: 'system',
                content:
                    'You are a knowledgeable and friendly AI study tutor. Help students understand complex topics, explain concepts clearly, give examples, and motivate them. Keep responses focused and educational.',
            },
            ...validHistory,
            { role: 'user', content: message },
        ],
        temperature: 0.7,
        max_tokens: 1024,
    });
    return chat.choices[0]?.message?.content ?? '';
};
