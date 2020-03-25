import { configureStore } from '@reduxjs/toolkit';
import todoReducer from './todo/todoReducer';

const store = configureStore({
  reducer: {
    todo: todoReducer,
  },
});

export default store;
