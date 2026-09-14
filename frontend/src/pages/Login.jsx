import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { loginSuccess } from '../store/slices/authSlice'
import { authService } from '../services'
import { PrimaryButton } from '../components/Button'
import { useForm } from '../hooks/useForm'

const LoginPage = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [error, setError] = useState('')

  const { values, handleChange, handleSubmit } = useForm(
    { email: '', password: '' },
    async (formValues) => {
      try {
        const response = await authService.login(formValues.email, formValues.password)
        dispatch(loginSuccess(response.data))
        navigate('/dashboard')
      } catch (err) {
        setError(err.response?.data?.error || 'Login failed')
      }
    }
  )

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 to-blue-800 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl p-8 max-w-md w-full">
        <h1 className="text-3xl font-bold text-center mb-8 text-blue-600">Project LOOP</h1>

        {error && <div className="mb-4 p-4 bg-red-100 text-red-700 rounded-lg">{error}</div>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700 font-semibold mb-2">Email</label>
            <input
              type="email"
              name="email"
              value={values.email}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-600"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-2">Password</label>
            <input
              type="password"
              name="password"
              value={values.password}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-600"
              required
            />
          </div>

          <PrimaryButton type="submit" className="w-full">
            Login
          </PrimaryButton>
        </form>

        <p className="text-center text-gray-600 mt-6">
          Don't have an account? <a href="/register" className="text-blue-600 font-semibold">Register</a>
        </p>
      </div>
    </div>
  )
}

export default LoginPage
