import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  showModal: false,
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    openModal: (state) => {
      state.showModal = true;
    },
    closeModal: (state) => {
      state.showModal = false;
    },
    toggleModal: (state) => {
      state.showModal = !state.showModal;
    },
  },
});

export const { openModal, closeModal, toggleModal } = uiSlice.actions;
export default uiSlice.reducer;
