import { GoogleGenerativeAI } from "@google/generative-ai";

const API_KEY = process.env.REACT_APP_GEMINI_API_KEY;

const genAI = new GoogleGenerativeAI(API_KEY);

export const getGeminiResponse = async (questionText) => {
  
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-pro" });
    
    const prompt = `Представь, что ты умный помощник на сайте Otvet IQ. 
    Твоя задача — дать полезный и краткий ответ на вопрос пользователя (не более 3-4 предложений).
    Вопрос: "${questionText}"`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    return text;
  } catch (error) {
    console.error("Ошибка Gemini:", error);
    return "Прости, мои нейроны сейчас перегружены. Попробуй спросить позже!";
  }
};