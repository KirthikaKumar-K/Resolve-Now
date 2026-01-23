import React, { useState } from 'react'
import { Login } from './components/Login'
import { Dashboard } from './components/Dashboard'

type Role = 'USER' | 'ADMIN' | null

function App() {
  const [role, setRole] = useState<Role>(null)

  const handleLogout = () => {
    setRole(null)
  }

  if (!role) {
    return <Login onLogin={setRole} />
  }

  return <Dashboard role={role} onLogout={handleLogout} />
}

export default App
