import './styles/App.css'
import { useState } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { Landing } from './components/landing/Landing.jsx'
import { Login } from './components/landing/Login.jsx'
import { Register } from './components/landing/Register.jsx'
import { DashboardRoutes } from './components/dashboard/DashboardRoutes.jsx'

function App() {
  const [currentPage, setCurrentPage] = useState('landing')

  return (
    <Router>
      <main>
        <Routes>
          <Route path="/" element={<Landing setCurrentPage={setCurrentPage} />} />
          <Route path="/login" element={<Login setCurrentPage={setCurrentPage} />} />
          <Route path="/register" element={<Register setCurrentPage={setCurrentPage} />} />
          {currentPage === 'dashboard' && <Route path="/" element={<DashboardRoutes />} />}
        </Routes>
      </main>
    </Router>
  )
}

export default App
