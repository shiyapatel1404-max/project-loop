import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  sentimentData: {},
  themeData: [],
  trendData: [],
  dashboardMetrics: {},
  loading: false,
  error: null,
}

const analyticsSlice = createSlice({
  name: 'analytics',
  initialState,
  reducers: {
    setSentimentData: (state, action) => {
      state.sentimentData = action.payload
    },
    setThemeData: (state, action) => {
      state.themeData = action.payload
    },
    setTrendData: (state, action) => {
      state.trendData = action.payload
    },
    setDashboardMetrics: (state, action) => {
      state.dashboardMetrics = action.payload
    },
    setLoading: (state, action) => {
      state.loading = action.payload
    },
    setError: (state, action) => {
      state.error = action.payload
    },
  },
})

export const { setSentimentData, setThemeData, setTrendData, setDashboardMetrics, setLoading, setError } = analyticsSlice.actions
export default analyticsSlice.reducer
