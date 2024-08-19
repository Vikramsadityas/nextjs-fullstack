// Make sure to include these imports:
import { GoogleGenerativeAI } from "@google/generative-ai";

export async function GET(request:Request){
    try {
        const genAI = new GoogleGenerativeAI(process.env.GenAI_API_KEY!);
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash"});
        const prompt = "Create a list of three open-ended and engaging questions formatted as a single string. Each question should be separated by '||'. These questions are for an anonymous social messaging platform, like Qooh.me, and should be suitable for a diverse audience. The questions should be professional for a social messaging platform. Avoid personal or sensitive topics, focusing instead on universal themes that encourage friendly interaction. For example, your output should be structured like this: 'What’s a hobby you’ve recently started?||If you could have dinner with any historical figure, who would it be?||What’s a simple thing that makes you happy?'. Ensure the questions are intriguing, foster curiosity, and contribute to a positive and welcoming conversational environment.";
        const result =await model.generateContent(prompt);
        console.log(result);
        return new Response(result.response.text())
    } catch (error) {
        console.error("Error ocured in suggest messages",error)
    }
}
