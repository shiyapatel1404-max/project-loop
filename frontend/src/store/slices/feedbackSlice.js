import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  feedbackList: [],
  selectedFeedback: null,
  totalCount: 0,
  currentPage: 1,
  filters: {
    sentiment: null,
    status: null,
    dateRange: null,
  },
  loading: false,
  error: null,
}

const feedbackSlice = createSlice({
  name: 'feedback',
  initialState,
  reducers: {
    setFeedbackList: (state, action) => {
      state.feedbackList = action.payload
    },
    setSelectedFeedback: (state, action) => {
      state.selectedFeedback = action.payload
    },
    setFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload }
      state.currentPage = 1
    },
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload
    },
    setLoading: (state, action) => {
      state.loading = action.payload
    },
    setError: (state, action) => {
      state.error = action.payload
    },
  },
})

export const { setFeedbackList, setSelectedFeedback, setFilters, setCurrentPage, setLoading, setError } = feedbackSlice.actions
export default feedbackSlice.reducer
