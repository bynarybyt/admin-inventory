import { configureStore } from '@reduxjs/toolkit';
import authenticationSlice from './slices/authenticationSlice.js'

export const store = configureStore({
  reducer: {
     authentication: authenticationSlice,
  },
})