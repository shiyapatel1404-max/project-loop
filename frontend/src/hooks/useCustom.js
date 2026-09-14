import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setFeedbackList, setLoading, setError } from '../store/slices/feedbackSlice'
import { feedbackService } from '../services'

export const useFeedback = () => {
  const dispatch = useDispatch()
  const { feedbackList, loading, error } = useSelector((state) => state.feedback)

  const fetchFeedback = async (filters) => {
    dispatch(setLoading(true))
    try {
      const response = await feedbackService.listFeedback(filters)
      dispatch(setFeedbackList(response.data.feedback))
    } catch (err) {
      dispatch(setError(err.message))
    } finally {
      dispatch(setLoading(false))
    }
  }

  return { feedbackList, loading, error, fetchFeedback }
}

export const useAnalytics = () => {
  const dispatch = useDispatch()
  const { sentimentData, themeData, loading } = useSelector((state) => state.analytics)
  const [data, setData] = useState(null)

  const fetchAnalytics = async () => {
    try {
      const sentiment = await analyticsService.getSentimentAnalytics()
      const themes = await analyticsService.getThemeAnalytics()
      setData({ sentiment: sentiment.data, themes: themes.data })
    } catch (err) {
      console.error('Analytics fetch error:', err)
    }
  }

  return { data, loading, fetchAnalytics }
}
