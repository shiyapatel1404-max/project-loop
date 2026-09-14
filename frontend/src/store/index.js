import { configureStore } from '@reduxjs/toolkit'
import authReducer from './slices/authSlice'
import feedbackReducer from './slices/feedbackSlice'
import analyticsReducer from './slices/analyticsSlice'

const store = configureStore({
  reducer: {
    auth: authReducer,
    feedback: feedbackReducer,
    analytics: analyticsReducer,
  },
})

export default store
