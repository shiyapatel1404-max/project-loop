import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { loginSuccess } from '../store/slices/authSlice'
import { authService } from '../services'
import { PrimaryButton } from '../components/Button'
import { useForm } from '../hooks/useForm'

const RegisterPage = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [error, setError] = useState('')

  const { values, handleChange, handleSubmit } = useForm(
    { email: '', password: '', firstName: '', lastName: '' },
    async (formValues) => {
      try {
        const response = await authService.register(formValues)
        dispatch(loginSuccess(response.data))
        navigate('/dashboard')
      } catch (err) {
        setError(err.response?.data?.error || 'Registration failed')
      }
    }
  )

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 to-blue-800 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl p-8 max-w-md w-full">
        <h1 className="text-3xl font-bold text-center mb-8 text-blue-600">Project LOOP</h1>
        <h2 className="text-xl font-semibold text-center mb-6 text-gray-700">Create Account</h2>

        {error && <div className="mb-4 p-4 bg-red-100 text-red-700 rounded-lg">{error}</div>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="firstName"
            placeholder="First Name"
            value={values.firstName}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-600"
            required
          />

          <input
            type="text"
            name="lastName"
            placeholder="Last Name"
            value={values.lastName}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-600"
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={values.email}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-600"
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={values.password}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-600"
            required
          />

          <PrimaryButton type="submit" className="w-full">
            Register
          </PrimaryButton>
        </form>

        <p className="text-center text-gray-600 mt-6">
          Already have an account? <a href="/login" className="text-blue-600 font-semibold">Login</a>
        </p>
      </div>
    </div>
  )
}

export default RegisterPage
