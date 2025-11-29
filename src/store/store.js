import { configureStore } from "@reduxjs/toolkit";
import questionsReducer from "./slices/questionsSlice";
import uiReducer from "./slices/uiSlice";

export const store = configureStore({
  reducer: {
    questions: questionsReducer,
    ui: uiReducer,
  },
});
