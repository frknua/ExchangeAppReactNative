import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    show: false
  };

export const slice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    showModal: (state, action) => {
      state.show = action.payload;
    }
  }
});

export const { showModal } = slice.actions;

export const selectShowModal = (state: any) => state.modal.show;

export default slice.reducer;