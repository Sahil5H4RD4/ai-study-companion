import { GoogleGenerativeAI } from '@google/generative-ai';

// Warning: We are instantiating this without checking if the key is empty,
// in a real environment it would fail here if OPENAI_API_KEY is not set.
// We are re-using OPENAI_API_KEY name from the initial .env but using Gemini API
const genAI = new GoogleGenerativeAI(process.env.OPENAI_API_KEY || 'dummy_key');

export const generateSummary = async (text: string) => {
    try {
        const model = genAI.getGenerativeModel({ model: 'gemini-1.5-pro' });
        const prompt = `Summarize the following educational text concisely:\n\n${text}`;
        const result = await model.generateContent(prompt);
        const response = await result.response;
        return response.text();
    } catch (error) {
        console.error('Error generating summary:', error);
        throw new Error('AI Summary generation failed');
    }
};

export const generateQuiz = async (text: string) => {
    try {
        const model = genAI.getGenerativeModel({ model: 'gemini-1.5-pro' });
        const prompt = `Generate a 3-question multiple-choice quiz based on the following text. 
Return ONLY a valid JSON array of objects, where each object has:
- "text" (the question string)
- "options" (an array of 4 string options)
- "correctOptionIndex" (an integer 0-3 indicating the correct option)

Text:\n${text}`;

        const result = await model.generateContent(prompt);
        const response = await result.response;
        let jsonStr = response.text().trim();

        // Remove markdown formatting if present
        if (jsonStr.startsWith('\`\`\`json')) {
            jsonStr = jsonStr.substring(7, jsonStr.length - 3).trim();
        } else if (jsonStr.startsWith('\`\`\`')) {
            jsonStr = jsonStr.substring(3, jsonStr.length - 3).trim();
        }

        return JSON.parse(jsonStr);
    } catch (error) {
        console.error('Error generating quiz:', error);
        throw new Error('AI Quiz generation failed');
    }
};

export const generateStudyPlan = async (topics: string[], targetDateISO: string) => {
    try {
        const model = genAI.getGenerativeModel({ model: 'gemini-1.5-pro' });
        const prompt = `Create a study plan for the following topics: ${topics.join(', ')}. 
The exam date is ${targetDateISO}. 
Return ONLY a valid JSON array of tasks, where each task object has:
- "title" (string)
- "description" (string)
- "dueDate" (ISO 8601 date string, e.g., "2026-03-10T10:00:00.000Z", ensure it's before the exam date).`;

        const result = await model.generateContent(prompt);
        const response = await result.response;
        let jsonStr = response.text().trim();

        // Remove markdown formatting if present
        if (jsonStr.startsWith('\`\`\`json')) {
            jsonStr = jsonStr.substring(7, jsonStr.length - 3).trim();
        } else if (jsonStr.startsWith('\`\`\`')) {
            jsonStr = jsonStr.substring(3, jsonStr.length - 3).trim();
        }

        return JSON.parse(jsonStr);
    } catch (error) {
        console.error('Error generating study plan:', error);
        throw new Error('AI Study Plan generation failed');
    }
}
