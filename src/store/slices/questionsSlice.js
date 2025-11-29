import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  orderBy,
  query,
  serverTimestamp,
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
      });

      return { 
        id: docRef.id, 
        ...questionData,
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

// Генерации ответа от ИИ
export const generateAIAnswer = createAsyncThunk(
  "questions/generateAIAnswer",
  async (userQuestionText, { dispatch }) => {
    const aiText = await getGeminiResponse(userQuestionText);

    const aiPost = {
      text: aiText,
      date: new Date().getTime(),
      author: "Gemini AI ✨",
      avatar: "https://cdn-icons-png.flaticon.com/512/4712/4712027.png", 
      isAi: true 
    };

    await dispatch(addQuestionToFirestore(aiPost));
  }
);

const initialState = {
  questions: [],
  loading: false,
  error: null,
};

const questionsSlice = createSlice({
  name: "questions",
  initialState,

  extraReducers: (builder) => {
    builder
      // Добавление
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
      // Удаление
      .addCase(deleteQuestionFromFirestore.fulfilled, (state, action) => {
        state.questions = state.questions.filter(
          (q) => q.id !== action.payload
        );
      })
      // Подгрузка всех вопросов
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
      });
  },
});

export default questionsSlice.reducer;
