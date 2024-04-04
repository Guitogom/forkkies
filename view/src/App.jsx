import './styles/App.css'
import { useState } from 'react'
import { Landing } from './components/landing/Landing.jsx'
import { Login } from './components/landing/Login.jsx'
import { Register } from './components/landing/Register.jsx'
import { Dashboard } from './components/dashboard/Dashboard.jsx'

function App() {
  const [currentPage, setCurrentPage] = useState('landing')

  let content = null

  switch (currentPage) {
    case 'landing':
      content = <Landing setCurrentPage={setCurrentPage} />
      break
    case 'login':
      content = <Login setCurrentPage={setCurrentPage} />
      break
    case 'register':
      content = <Register setCurrentPage={setCurrentPage} />
      break
    case 'dashboard':
      content = <Dashboard />
      break
    default:
      content = <Landing setCurrentPage={setCurrentPage} />
  }

  return (
    <main>
      {content}
    </main>
  )
}

export default App
