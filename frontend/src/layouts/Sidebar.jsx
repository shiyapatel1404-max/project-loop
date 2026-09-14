import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

const Sidebar = () => {
  const { user } = useSelector((state) => state.auth)

  const menuItems = [
    { label: 'Dashboard', path: '/dashboard', icon: '📊' },
    { label: 'Feedback', path: '/feedback', icon: '💬' },
    { label: 'Analytics', path: '/analytics', icon: '📈' },
    { label: 'Reports', path: '/reports', icon: '📄' },
    { label: 'Teams', path: '/teams', icon: '👥', admin: true },
    { label: 'Users', path: '/users', icon: '👤', admin: true },
    { label: 'Settings', path: '/settings', icon: '⚙️' },
  ]

  return (
    <aside className="w-64 bg-gray-800 text-white p-6">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-blue-400">LOOP</h1>
        <p className="text-gray-400 text-sm">Feedback Intelligence</p>
      </div>

      <nav className="space-y-2">
        {menuItems.map((item) => {
          if (item.admin && user?.role !== 'admin' && user?.role !== 'manager') {
            return null
          }
          return (
            <Link
              key={item.path}
              to={item.path}
              className="block px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors"
            >
              <span className="mr-2">{item.icon}</span>
              {item.label}
            </Link>
          )
        })}
      </nav>
    </aside>
  )
}

export default Sidebar
