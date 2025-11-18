import { Link } from 'react-router-dom'
import { useLogout } from '../hooks/useLogout'
import { useAuthContext } from '../hooks/useAuthContext'

const Navbar = () => {
  const { logout } = useLogout()
  const { user } = useAuthContext()

  const handleClick = () => {
    logout()
  }

  return (
    <header className="bg-white shadow-md">
      <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
        
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold text-blue-600 hover:text-blue-700">
          PostApp
        </Link>

        {/* Navigation Links */}
        <nav>
          {user ? (
            <div className="flex items-center gap-4">

            
              <Link 
                to="/profile" 
                className="text-gray-700 font-medium hover:text-blue-600"
              >
                {user.username}
              </Link>

              {/* Logout Button */}
              <button
                onClick={handleClick}
                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="flex gap-4">
              <Link 
                to="/login" 
                className="text-gray-700 font-medium hover:text-blue-600"
              >
                Login
              </Link>
              <Link 
                to="/signup" 
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
              >
                Signup
              </Link>
            </div>
          )}
        </nav>
      </div>
    </header>
  )
}

export default Navbar
