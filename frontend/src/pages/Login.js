import { useState } from 'react'
import { useLogin } from '../hooks/useLogin.js'

const Login = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const { login, isLoading, error } = useLogin()

  const handleSubmit = async (e) => {
    e.preventDefault()
    await login(username, password)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <form 
        className="w-full max-w-sm bg-white p-8 rounded-xl shadow-lg"
        onSubmit={handleSubmit}
      >
        <h3 className="text-2xl font-bold text-center mb-6 text-blue-600">Login</h3>

        <label className="block mb-2 font-semibold text-gray-700">Username</label>
        <input
          type="text"
          onChange={(e) => setUsername(e.target.value)}
          value={username}
          className="w-full mb-4 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
        />

        <label className="block mb-2 font-semibold text-gray-700">Password</label>
        <input
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          className="w-full mb-4 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
        />

        <button
          className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition disabled:bg-gray-400"
          disabled={isLoading}
        >
          Login
        </button>

        {error && (
          <div className="mt-4 p-3 bg-red-100 text-red-700 text-center rounded-lg">
            {error}
          </div>
        )}
      </form>
    </div>
  )
}

export default Login
