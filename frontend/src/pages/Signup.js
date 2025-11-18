import { useState } from 'react';
import { useSignup } from "../hooks/useSignup";

const Signup = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const { signup, isLoading, error } = useSignup();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await signup(username, password);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form 
        className="bg-white p-8 rounded-lg shadow-md w-full max-w-sm"
        onSubmit={handleSubmit}
      >
        <h3 className="text-2xl font-semibold mb-6 text-center">Sign Up</h3>

        <label className="block text-gray-700 mb-2">Username</label>
        <input
          type="text"
          onChange={(e) => setUsername(e.target.value)}
          value={username}
          required
          className="w-full px-4 py-2 mb-4 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <label className="block text-gray-700 mb-2">Password</label>
        <input
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          required
          className="w-full px-4 py-2 mb-6 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <button
          className={`w-full py-2 bg-blue-500 text-white font-semibold rounded hover:bg-blue-600 transition-colors ${
            isLoading ? 'opacity-50 cursor-not-allowed' : ''
          }`}
          disabled={isLoading}
        >
          {isLoading ? 'Signing Up...' : 'Signup'}
        </button>

        {error && (
          <div className="mt-4 text-red-500 text-sm text-center">
            {error}
          </div>
        )}
      </form>
    </div>
  );
};

export default Signup;
