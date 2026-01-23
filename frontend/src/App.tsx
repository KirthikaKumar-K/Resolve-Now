import { useState, useEffect } from 'react'
import { Login } from './components/Login'
import { Dashboard } from './components/Dashboard'

type Role = 'USER' | 'ADMIN' | null

function App() {
  const [role, setRole] = useState<Role>(() => {
    // Initialize from localStorage
    const savedRole = localStorage.getItem('userRole')
    return (savedRole as Role) || null
  })

  useEffect(() => {
    // Persist role to localStorage whenever it changes
    if (role) {
      localStorage.setItem('userRole', role)
    } else {
      localStorage.removeItem('userRole')
    }
  }, [role])

  const handleLogout = () => {
    setRole(null)
  }

  if (!role) {
    return <Login onLogin={setRole} />
  }

  return <Dashboard role={role} onLogout={handleLogout} />
}

export default App
