import './styles/App.css'
import { useState } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { Landing } from './components/landing/Landing.jsx'
import { DashboardRoutes } from './components/dashboard/DashboardRoutes.jsx'

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)



  return (
    <Router>
      <main>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/dashboard/*" element={<DashboardRoutes />} />
        </Routes>
      </main>
    </Router>
  );
}

export default App
