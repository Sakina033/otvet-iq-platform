import { GoogleGenerativeAI } from "@google/generative-ai";

const API_KEY = process.env.REACT_APP_GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(API_KEY);

export const getGeminiResponse = async (conversationArray) => {
  try {
    const model = genAI.getGenerativeModel({ 
      model: "gemini-2.5-flash",
      systemInstruction: "Ты — умный помощник на сайте Otvet IQ. Твоя задача — давать полезные ответы. ВАЖНО: НИКОГДА не здоровайся. НИКОГДА не пиши 'Как искусственный интеллект'. Отвечай живо, используй эмодзи. Пиши не более 3-4 предложений."
    });

    const historyData = conversationArray.slice(0, -1).map(msg => ({
      role: msg.role === 'model' ? 'model' : 'user',
      parts: [{ text: msg.text }],
    }));

    const lastMessage = conversationArray[conversationArray.length - 1].text;

    const chat = model.startChat({
      history: historyData,
    });

    const result = await chat.sendMessage(lastMessage);
    const response = await result.response;
    return response.text();
    
  } catch (error) {
    console.error("Ошибка Gemini:", error);
    return "Прости, мои нейроны сейчас перегружены. Попробуй спросить позже!";
  }
};