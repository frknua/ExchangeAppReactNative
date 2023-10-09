import { configureStore } from '@reduxjs/toolkit';
import modalReducer from './modalReducer';

export const Store = configureStore({
    reducer: {
      modal: modalReducer
    },
  });