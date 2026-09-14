import { Routes, Route, Navigate } from 'react-router-dom'
import ProtectedRoute from './components/ProtectedRoute'
import Layout from './layouts/Layout'
import LoginPage from './pages/Login'
import RegisterPage from './pages/Register'
import DashboardPage from './pages/Dashboard'
import FeedbackPage from './pages/Feedback'

function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />

      <Route
        element={
          <ProtectedRoute>
            <Layout />
          </ProtectedRoute>
        }
      >
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/feedback" element={<FeedbackPage />} />
        <Route path="/analytics" element={<div>Analytics Page - Coming Soon</div>} />
        <Route path="/reports" element={<div>Reports Page - Coming Soon</div>} />
        <Route path="/teams" element={<div>Teams Page - Coming Soon</div>} />
        <Route path="/users" element={<div>Users Page - Coming Soon</div>} />
        <Route path="/settings" element={<div>Settings Page - Coming Soon</div>} />
      </Route>

      <Route path="/" element={<Navigate to="/dashboard" />} />
    </Routes>
  )
}

export default App
