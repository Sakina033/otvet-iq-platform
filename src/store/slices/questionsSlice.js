import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  addDoc,
  arrayUnion,
  collection,
  deleteDoc,
  doc,
  getDocs,
  orderBy,
  query,
  serverTimestamp,
  updateDoc
} from "firebase/firestore";
import { db } from "../../firebase/firebase";
import { getGeminiResponse } from "../../utils/gemini"; 

// Добавление вопроса
export const addQuestionToFirestore = createAsyncThunk(
  "questions/addQuestionToFirestore",
  async (questionData, { rejectWithValue }) => {
    try {
      const docRef = await addDoc(collection(db, "questions"), {
        ...questionData,
        createdAt: serverTimestamp(),
        conversation: [
          {role: "user", text: questionData.text}
        ]
      });

      return { 
        id: docRef.id, 
        ...questionData,
        conversation: [{role: "user", text: questionData.text}],
        createdAt: new Date().getTime()
      };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Удаление вопроса
export const deleteQuestionFromFirestore = createAsyncThunk(
  "questions/deleteQuestionsFromFirestore",
  async (id, { rejectWithValue }) => {
    try {
      await deleteDoc(doc(db, "questions", id));
      return id;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Подгрузка всех вопросов
export const fetchQuestionsFromFirestore = createAsyncThunk(
  "questions/fetchQuestionsFromFirestore",
  async (_, { rejectWithValue }) => {
    try {
      const q = query(
        collection(db, "questions"),
        orderBy("createdAt", "desc")
      );
      const snapshot = await getDocs(q);
      const questions = snapshot.docs.map((doc) => {
        const data = doc.data();
        return {
          id: doc.id,
          ...data,
          createdAt: data.createdAt ? data.createdAt.toMillis() : new Date().getTime(),
        }
      });
      return questions;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Генерация ответа от ИИ (Первый вопрос)
export const generateAIAnswer = createAsyncThunk(
  "questions/generateAIAnswer",
  async ({ questionId, userQuestionText }, { rejectWithValue }) => {
    try {
      const conversationArray = [{ role: "user", text: userQuestionText }];
      const aiText = await getGeminiResponse(conversationArray);
      
      const questionRef = doc(db, "questions", questionId)
    
      await updateDoc(questionRef, {
        conversation: arrayUnion({
          role: "model",
          text: aiText
        })
      })

      return {questionId, aiText}
    } catch (error) {
      return rejectWithValue(error.message);
    } 
});

// Продолжение диалога
export const replyToQuestion = createAsyncThunk(
  "questions/replyToQuestion",
  async ({ questionId, replyText }, { getState, rejectWithValue }) => {
    try {
      const state = getState();
      const question = state.questions.questions.find(q => q.id === questionId);
      
      const currentConversation = [...question.conversation, { role: "user", text: replyText }];

      const questionRef = doc(db, "questions", questionId);
      
      await updateDoc(questionRef, {
        conversation: arrayUnion({ role: "user", text: replyText })
      });

      const aiText = await getGeminiResponse(currentConversation);

      await updateDoc(questionRef, {
        conversation: arrayUnion({ role: "model", text: aiText })
      });

      return { questionId, replyText, aiText };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const initialState = {
  questions: [],
  loading: false,
  error: null,
  searchQuery: "",
};

const questionsSlice = createSlice({
  name: "questions",
  initialState,

  reducers: {
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
    }
  },

  extraReducers: (builder) => {
    builder
      .addCase(addQuestionToFirestore.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addQuestionToFirestore.fulfilled, (state, action) => {
        state.loading = false;
        state.questions.unshift(action.payload);
      })
      .addCase(addQuestionToFirestore.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteQuestionFromFirestore.fulfilled, (state, action) => {
        state.questions = state.questions.filter(
          (q) => q.id !== action.payload
        );
      })
      .addCase(fetchQuestionsFromFirestore.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchQuestionsFromFirestore.fulfilled, (state, action) => {
        state.loading = false;
        state.questions = action.payload;
      })
      .addCase(fetchQuestionsFromFirestore.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(generateAIAnswer.fulfilled, (state, action) => {
        const { questionId, aiText } = action.payload;
        const question = state.questions.find(q => q.id === questionId);
        if (question) {
          if (!question.conversation) question.conversation = [];
          question.conversation.push({
            role: "model",
            text: aiText
          });
        }
      })
      .addCase(replyToQuestion.fulfilled, (state, action) => {
        const { questionId, replyText, aiText } = action.payload;
        const question = state.questions.find(q => q.id === questionId);
        if (question && question.conversation) {
          question.conversation.push({ role: "user", text: replyText });
          question.conversation.push({ role: "model", text: aiText });
        }
      })
  },
});

export const { setSearchQuery } = questionsSlice.actions;
export default questionsSlice.reducer;