import React, { useState } from "react"
import API from "../api/api"

export default function ChangePassword() {
  const [oldPassword, setOldPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [message, setMessage] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setMessage("")
    setError("")

    try {
      const token = localStorage.getItem("token")
      const res = await API.post(
        "/auth/change-password",
        { oldPassword, newPassword },
        { headers: { Authorization: `Bearer ${token}` } }
      )
      setMessage(res.data.message)
      setOldPassword("")
      setNewPassword("")
    } catch (err) {
      setError(err.response?.data?.message || "Error changing password")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-sm mx-auto my-40 p-6 border rounded shadow">
      <h2 className="text-xl font-bold mb-4">Change Password</h2>

      {/* Success or Error message */}
      {message && <p className="text-green-600 mb-2">{message}</p>}
      {error && <p className="text-red-600 mb-2">{error}</p>}

      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <input
          type="password"
          placeholder="Old Password"
          value={oldPassword}
          onChange={(e) => setOldPassword(e.target.value)}
          className="border p-2 rounded"
          required
          autoComplete="current-password"
        />
        <input
          type="password"
          placeholder="New Password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          className="border p-2 rounded"
          required
          autoComplete="new-password"
        />
        <button
          type="submit"
          className={`bg-primary text-white p-2 rounded ${
            loading ? "opacity-50 cursor-not-allowed" : ""
          }`}
          disabled={loading}
        >
          {loading ? "Updating..." : "Update Password"}
        </button>
      </form>
    </div>
  )
}
