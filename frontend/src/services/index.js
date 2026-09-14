import api from './api'

export const authService = {
  register: (data) => api.post('/auth/register', data),
  login: (email, password) => api.post('/auth/login', { email, password }),
  logout: () => api.post('/auth/logout'),
  getCurrentUser: () => api.get('/auth/me'),
  refreshToken: (token) => api.post('/auth/refresh', { token }),
}

export const feedbackService = {
  listFeedback: (params) => api.get('/feedback', { params }),
  getFeedback: (id) => api.get(`/feedback/${id}`),
  createFeedback: (data) => api.post('/feedback', data),
  updateFeedback: (id, data) => api.put(`/feedback/${id}`, data),
  deleteFeedback: (id) => api.delete(`/feedback/${id}`),
  addTag: (id, tag) => api.post(`/feedback/${id}/tags`, { tag }),
  bulkImport: (file) => {
    const formData = new FormData()
    formData.append('file', file)
    return api.post('/feedback/bulk/import', formData)
  },
  getRelatedFeedback: (id) => api.get(`/feedback/${id}/related`),
}

export const analyticsService = {
  getSentimentAnalytics: (params) => api.get('/analytics/sentiment', { params }),
  getThemeAnalytics: () => api.get('/analytics/themes'),
  getTrendAnalytics: () => api.get('/analytics/trends'),
  getDashboardData: () => api.get('/analytics/dashboard'),
  getSentimentTimeline: () => api.get('/analytics/sentiment/timeline'),
  getThemesEvolution: () => api.get('/analytics/themes/evolution'),
  getTopics: () => api.get('/analytics/topics'),
  generateForecast: (data) => api.post('/analytics/forecast', data),
}

export const reportService = {
  listReports: () => api.get('/reports'),
  getReport: (id) => api.get(`/reports/${id}`),
  createReport: (data) => api.post('/reports', data),
  updateReport: (id, data) => api.put(`/reports/${id}`, data),
  deleteReport: (id) => api.delete(`/reports/${id}`),
  generateReport: (id) => api.post(`/reports/${id}/generate`),
  emailReport: (id, recipients) => api.post(`/reports/${id}/email`, { recipients }),
  downloadReport: (id) => api.get(`/reports/${id}/download`),
  scheduleReport: (data) => api.post('/reports/schedule', data),
}
