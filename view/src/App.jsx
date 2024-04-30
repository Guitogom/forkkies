import './styles/App.css'
import { useState } from 'react'
import { Landing } from './components/landing/Landing.jsx'
import { Login } from './components/landing/Login.jsx'
import { Register } from './components/landing/Register.jsx'
import { Dashboard } from './components/dashboard/Dashboard.jsx'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

function App() {


  return (
    <Router>
      <main>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/terms" element={<div><h1>Componente de terminos, si ves esto es que aun no esta implementado y es posible que incluso se nos haya olvidado.</h1></div>} />
          <Route path="/error" element={<div><h1>Componente de error, si ves esto es que aun no esta implementado y es posible que incluso se nos haya olvidado.</h1></div>} />
        </Routes>
      </main>
    </Router>
  )
}

export default App
