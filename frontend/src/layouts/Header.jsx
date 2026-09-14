import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../store/slices/authSlice'

const Header = () => {
  const dispatch = useDispatch()
  const { user } = useSelector((state) => state.auth)

  const handleLogout = () => {
    dispatch(logout())
  }

  return (
    <header className="bg-white shadow">
      <div className="px-6 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-blue-600">Project LOOP</h1>
        <div className="flex items-center gap-4">
          <span className="text-gray-700">{user?.email}</span>
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
          >
            Logout
          </button>
        </div>
      </div>
    </header>
  )
}

export default Header
