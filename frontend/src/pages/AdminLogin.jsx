import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import API from '../api/api'

export default function AdminLogin() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const res = await API.post('/auth/login', { username, password })
      localStorage.setItem('token', res.data.token)  // Save JWT
      setError('')
      
      // Trigger localStorage event to update Header
      window.dispatchEvent(new Event('storage'))

      navigate('/admin')  // გადატანა AdminPanel–ზე
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed')
    }
  }

  return (
    <div className="max-w-sm mx-auto my-52 p-6 border rounded shadow">
      <h1 className="text-2xl font-colasta mb-4">Admin Login</h1>
      {error && <p className="text-red-500">{error}</p>}
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={e => setUsername(e.target.value)}
          className="border p-2 rounded"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          className="border p-2 rounded"
          required
          autoComplete="new-password"
          name="password"  
        />
        <button type="submit" className="bg-primary text-white p-2 rounded">
          Login
        </button>
      </form>

      {/* Forgot password link */}
      <div className="text-center mt-4">
        <Link 
          to="/forgot-password" 
          className="text-sm font-colasta text-primary hover:underline"
        >
          Forgot Password?
        </Link>
      </div>
    </div>
  )
}
