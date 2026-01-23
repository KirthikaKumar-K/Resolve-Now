import React, { useState } from 'react'

type Role = 'USER' | 'ADMIN'

interface LoginProps {
  onLogin: (role: Role) => void
}

export const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault() // prevent page refresh

    if (username === 'admin' && password === 'admin') {
      onLogin('ADMIN')
    } else if (username === 'user' && password === 'user') {
      onLogin('USER')
    } else {
      setError('Invalid credentials')
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="bg-white p-8 rounded-xl shadow-lg w-96">
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>

        <form onSubmit={handleSubmit}>
          <input
            className="w-full mb-4 px-4 py-2 border rounded-lg"
            placeholder="Username"
            value={username}
            onChange={e => setUsername(e.target.value)}
          />

          <input
            className="w-full mb-4 px-4 py-2 border rounded-lg"
            type="password"
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />

          {error && (
            <p className="text-red-500 text-sm mb-3 text-center">{error}</p>
          )}

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  )
}
