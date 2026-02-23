import { GoogleGenerativeAI } from "@google/generative-ai";

const API_KEY = process.env.REACT_APP_GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(API_KEY);

export const getGeminiResponse = async (conversationArray) => {
  try {
    const model = genAI.getGenerativeModel({ 
      model: "gemini-2.5-flash",
      systemInstruction: "Ты — умный помощник на сайте Otvet IQ. В чате могут писать разные пользователи, их сообщения будут начинаться с 'Имя: текст'. Твоя задача: 1) Если к обсуждению присоединился НОВЫЙ человек, один раз приветливо обратись к нему по имени. 2) Если тот же человек пишет следующее сообщение подряд — НЕ здоровайся снова, отвечай сразу по делу. 3) НИКОГДА не пиши 'Как искусственный интеллект'. Отвечай живо, используй эмодзи. Пиши не более 5-6 предложений."
    });

    const historyData = conversationArray.slice(0, -1).map(msg => {
      const textWithContext = msg.authorName && msg.role === 'user' 
        ? `${msg.authorName}: ${msg.text}` 
        : msg.text;

      return {
        role: msg.role === 'model' ? 'model' : 'user',
        parts: [{ text: textWithContext }],
      };
    });

    const lastMsg = conversationArray[conversationArray.length - 1];
    const lastMessageText = lastMsg.authorName && lastMsg.role === 'user'
      ? `${lastMsg.authorName}: ${lastMsg.text}`
      : lastMsg.text;

    const chat = model.startChat({
      history: historyData,
    });

    const result = await chat.sendMessage(lastMessageText);
    const response = await result.response;
    return response.text();
    
  } catch (error) {
    console.error("Ошибка Gemini:", error);
    return "Прости, мои нейроны сейчас перегружены. Попробуй спросить позже!";
  }
};